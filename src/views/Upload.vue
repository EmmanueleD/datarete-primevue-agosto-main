<template>
  <div class="wrapper">
    <h1>UpLoader</h1>

    <Card v-if="controllando">
      <template #content>
        <div class="flex justify-content-between align-items-center">
          <div class="flex flex-column">
            <label>Password</label>
            <Password v-model="password" :feedback="false" toggleMask="" />
          </div>

          <Button @click="check" label="Check"></Button>
        </div>
      </template>
    </Card>

    <Card v-if="autorizzato" class="mb-4">
      <template #content>
        <div class="flex gap-4 justify-content-between align-items-center">
          <div class="flex align-items-center mb-4">
            <label>/api/Upload?type=</label>
            <InputText type="text" v-model="nomeCartella"></InputText>
          </div>
          <i class="pi-spin pi spinner" v-if="loading"></i>
          <FileUpload
            @uploader="uploadFile"
            mode="basic"
            uploadIcon="pi pi-paperclip"
            name="demo[]"
            :customUpload="true"
            :previewWidth="50"
            chooseLabel="Upload"
            :auto="true"
            :loading="loading"
          />
        </div>
      </template>
    </Card>

    <Card v-if="autorizzato">
      <template #content>
        <div class="flex gap-4 justify-content-between align-items-center">
          <div class="flex align-items-center mb-4">
            <label>Importatore di anagrafiche</label>
          </div>
          <i class="pi-spin pi spinner" v-if="loading"></i>
          <FileUpload
            @uploader="uploadFile2"
            mode="basic"
            uploadIcon="pi pi-paperclip"
            name="demo[]"
            :customUpload="true"
            :previewWidth="50"
            chooseLabel="Upload"
            :auto="true"
            :loading="loading"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref } from "vue"
import AxiosService from "@/axiosServices/AxiosService"

const loading = ref(false)

const fileToUpload = ref()
const nomeCartella = ref("Generale")
const controllando = ref(true)
const autorizzato = ref(false)
const password = ref("datarete123")

function check() {
  controllando.value = false
  if (password.value == "") {
    autorizzato.value = true
  } else {
    controllando.value = true
  }
}

function uploadFile(ev) {
  loading.value = true

  const service = new AxiosService("files")

  for (let i = 0; i < ev.files.length; i++) {
    const formData = new FormData()
    formData.append("file", ev.files[i])
    service
      .postCustomEndpoint("Upload?type=" + nomeCartella.value, "", formData)
      .then((res) => {
        fileToUpload.value = res
      })
      .finally(() => {
        loading.value = false
      })
  }
}

function uploadFile2(ev) {
  loading.value = true
  const service = new AxiosService("files")
  for (let i = 0; i < ev.files.length; i++) {
    const formData = new FormData()
    formData.append("file", ev.files[i])
    service
      .postCustomEndpoint("Upload?type=" + nomeCartella.value, "", formData)
      .then((res) => {
        fileToUpload.value = res
        const serviceImportanzione = new AxiosService("Import/ImportExcel")
        serviceImportanzione
          .create({ filePath: fileToUpload.value })
          .then((res) => {
            if (res) {
              console.log("caricamento a buon fine")
            }
          })
          .finally(() => {
            loading.value = false
          })
      })
  }
}
</script>

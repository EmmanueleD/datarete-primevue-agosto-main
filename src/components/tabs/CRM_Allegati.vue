<template>
  <div class="mb-4 p-2 w-full flex justify-content-end">
    <FileUpload
      @uploader="uploadFile"
      mode="basic"
      uploadIcon="pi pi-paperclip"
      name="demo[]"
      :customUpload="true"
      :previewWidth="50"
      chooseLabel="Aggiungi allegato"
      :auto="true"
    />
  </div>
  <div class="w-full p-5 grid-center" v-if="loading">
    <i class="pi pi-spin pi-spinner text-3xl"></i>
  </div>
  <div v-else>
    <div v-for="allegato in allegati" :key="allegato.ID">
      <div
        class="flex w-full ml-4 p-2 gap-4 text-blue-400 cursor-pointer align-items-center"
      >
        <div>
          <Button
            @click="editFile(allegato)"
            icon="pi pi-pencil"
            class="p-button-rounded p-button-outlined mr-2"
          ></Button>
          <Button
            @click="confirmDeleteFile(allegato)"
            icon="pi pi-trash"
            class="p-button-rounded p-button-outlined p-button-danger"
          ></Button>
        </div>
        <div class="flex flex-column">
          <a
            v-if="allegato.mode == 'view'"
            :href="'https://prestitosi-core.datarete.cloud' + allegato.URL"
            class="m-0 text-xl no-underline text-blue-500"
            target="blank"
            >{{ allegato.NOME }}</a
          >
          <InputText
            v-if="allegato.mode == 'edit'"
            type="text"
            v-model="allegato.NOME"
          ></InputText>
          <p class="text-gray-500">
            {{ new Date(allegato.DATA_CARICAMENTO).toLocaleDateString("it") }}
          </p>
        </div>
        <Button
          :loading="loadingAllegato"
          v-if="allegato.mode == 'edit'"
          label="Salva"
          @click="rinominaAllegato(allegato)"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import AxiosService from "@/axiosServices/AxiosService"
import { useRoute } from "vue-router"
import { useConfirm } from "primevue/useconfirm"

const route = useRoute()
const urlFile = ref()
const loading = ref(false)
const loadingAllegato = ref(false)
const confirm = useConfirm()

const allegati = ref()

function uploadFile(ev) {
  loading.value = true
  const service = new AxiosService("files")

  for (let i = 0; i < ev.files.length; i++) {
    const formData = new FormData()
    formData.append("file", ev.files[i])
    service
      .postCustomEndpoint("Upload?type=" + "AllegatiAnagrafiche", "", formData)
      .then((res) => {
        console.log(
          "🚀 ~ file: CRM_Allegati.vue ~ line 39 ~ uploadFile ~ res",
          res
        )
        urlFile.value = res
      })
      .finally(() => {
        const serviceAddAllegato = new AxiosService(
          "Anagrafiche/AddAllegati/" + route.params.idAnagrafica
        )
        serviceAddAllegato
          .create({
            NOME: urlFile.value.substring(
              urlFile.value.indexOf("_") + 1,
              urlFile.value.length
            ),
            URL: urlFile.value,
            DATA_CARICAMENTO: new Date(),
          })
          .finally(() => {
            getAllegati()
          })
        loading.value = false
      })
  }
}

function editFile(allegato) {
  allegato.mode = "edit"
}

function rinominaAllegato(allegato) {
  loadingAllegato.value = true
  const service = new AxiosService("Anagrafiche/EditAllegati")
  allegato.mode = "view"
  service
    .update(allegato)
    .then((res) => res)
    .finally(() => {
      loadingAllegato.value = false
    })
}

function deleteFile(elementID) {
  loadingAllegato.value = true
  const service = new AxiosService("Anagrafiche/DeleteAllegati")
  service
    .delete(elementID)
    .then((res) => res)
    .finally(() => {
      loadingAllegato.value = false
      getAllegati()
    })
}

function confirmDeleteFile(element) {
  confirm.require({
    message: "Sei sicuro di voler eliminare " + element.NOME + " ?",
    header: "Conferma Eliminazione",
    icon: "pi pi-fw pi-trash",
    acceptClass: "p-button-danger",
    accept: () => {
      deleteFile(element.ID || element.id)
    },
    reject: () => {
      return
    },
  })
}

function getAllegati() {
  loading.value = true
  allegati.value = []
  const service = new AxiosService(
    "Anagrafiche/GetAllegati/" + route.params.idAnagrafica
  )
  service
    .read()
    .then((res) => {
      res.map((x) => (x.mode = "view"))
      allegati.value = res
    })
    .finally(() => {
      loading.value = false
    })
}

getAllegati()
</script>

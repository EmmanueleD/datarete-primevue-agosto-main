<template>
  <div class="wrapper">
    <h1>UpLoader - Anagrafiche</h1>

    <Card class="mb-4">
      <template #content>
        <div class="flex gap-4 justify-content-between align-items-center">
          <div class="flex align-items-center mb-4">
            <label>Stato: </label>
            <Dropdown
              :options="statiOptions"
              optionLabel="nome"
              optionValue="id"
              v-model="statiSelected"
            ></Dropdown>
          </div>
          <i class="pi-spin pi spinner" v-if="loading"></i>

          <div class="flex flex-column align-items-end">
            <div class="flex justify-content-between">
              <Button
                class="mr-2"
                label="Scarica modello"
                @click="downlodModelloLead"
              ></Button>
              <FileUpload
                :disabled="statiSelected == 0"
                @uploader="uploadFile2"
                mode="basic"
                uploadIcon="pi pi-paperclip"
                name="demo[]"
                :customUpload="true"
                :previewWidth="50"
                :maxFileSize="1000000"
                chooseLabel="Upload"
                :auto="true"
                :loading="loadingUpload"
              />
            </div>
            <span v-if="statiSelected == 0" class="text-red-500"
              >Seleziona uno stato poter eseguire un'importazione</span
            >
          </div>
        </div>
      </template>
    </Card>
    <Card v-if="fileToUpload">
      <template #content>
        <div class="flex justify-content-end">
          <Button
            :loading="loadingImport"
            @click="eseguiLImportazione"
            label="Esegui l'importazione"
          ></Button>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AxiosService from "@/axiosServices/AxiosService";

const loadingUpload = ref(false);
const loadingImport = ref(false);

const fileToUpload = ref();

function uploadFile2(ev) {
  loadingUpload.value = true;
  const service = new AxiosService("files");
  for (let i = 0; i < ev.files.length; i++) {
    const formData = new FormData();
    formData.append("file", ev.files[i]);
    service
      .postCustomEndpoint("Upload?type=importatoreClient", "", formData)
      .then((res) => {
        fileToUpload.value = res;
      })
      .finally(() => {
        loadingUpload.value = false;
      });
  }
}

function eseguiLImportazione() {
  loadingImport.value = true;
  const serviceImportanzione = new AxiosService(
    "Import/ImportExcelLight/" + statiSelected.value
  );
  serviceImportanzione
    .create({ filePath: fileToUpload.value })
    .then((res) => {
      if (res) {
        console.log("importazione andato a buon fine");
      }
    })
    .catch((err) =>
      console.log("errore nel caricamento dell file nell'importatore")
    )
    .finally(() => {
      loadingImport.value = false;
    });
}

function downlodModelloLead() {
  window.open(
    "https://prestitosi-core.datarete.cloud/Drive/_COMMON/DataReteCore_ModelloLead.xlsx"
  );
}

const statiOptions = ref([]);
const statiSelected = ref(0);

function getStatiOptions() {
  const service = new AxiosService("Options/StatiAnagrafiche/GetStati/0");
  service.read().then((res) => {
    statiOptions.value = res;
  });
}

getStatiOptions();
</script>
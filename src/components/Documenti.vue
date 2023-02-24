<template>
  <div class="wrapper">
    <div v-for="item of data" :key="item.id">
      <h3 class="mb-4">{{ item.title }}</h3>
      <div
        class="grid mb-4 w-full"
        v-for="documento of item.documenti"
        :key="documento.id"
      >
        <div class="col-12">
          <Card>
            <template #content>
              <div class="flex justify-content-between">
                <div class="col-4">
                  <h4>{{ documento.title }}</h4>
                  <FileUpload
                    @uploader="uploadFile"
                    mode="basic"
                    uploadIcon="pi pi-paperclip"
                    name="demo[]"
                    :customUpload="true"
                    :previewWidth="50"
                    :maxFileSize="90000000"
                    :auto="true"
                  />
                </div>

                <div class="col-8">
                  <DataTable
                    :value="documento.files"
                    :stripedRows="true"
                    :rows="10"
                    table-layout="auto"
                  >
                    <Column field="nome" header="NOME FILE"></Column>
                    <Column field="info" header="INFORMAZIONI FILE"></Column>
                    <Column header="AZIONI">
                      <template #body>
                        <Button
                          icon="pi pi-file"
                          class="p-button-rounded mr-2"
                        ></Button>
                        <Button
                          icon="pi pi-trash"
                          class="p-button-rounded p-button-danger"
                        ></Button>
                      </template>
                    </Column>
                  </DataTable>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import AxiosService from "@/axiosServices/AxiosService";

const tempUrlFile = ref("");
const route = useRoute();

function getDocumentiPratica() {
  const service = new AxiosService(
    "Pratiche/GetDocumentiPratica/" + route.params.idPratica
  );

  service.read().then((res) => {
    documentiPratica.value = res;
    console.log("documenti pratica , , ,   ", documentiPratica.value);
  });
}

function uploadFile(ev) {
  const service = new AxiosService("files");

  for (let i = 0; i < ev.files.length; i++) {
    const formData = new FormData();
    formData.append("file", ev.files[i]);
    service
      .postCustomEndpoint("Upload?type=" + "DocumentiPratiche", "", formData)
      .then((res) => {
        console.log(
          "🚀 ~ file: Documenti.vue ~ line 60 ~ uploadFile ~ res",
          res
        );
        tempUrlFile.value = res;
      });
  }
}

const documentiPratica = ref([]);

getDocumentiPratica();
</script>
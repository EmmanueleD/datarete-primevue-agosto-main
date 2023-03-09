<template>
  <div>
    <DataTable
      :value="data"
      :stripedRows="true"
      :loading="loading"
      :paginator="true"
      :rows="10"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink "
      table-layout="auto"
    >
      <Column field="tipoDocumento" header="Documento">
        <template #body="{ data }">
          <span class="font-bold">{{ data.TipoDocumento }}</span>
        </template>
      </Column>

      <Column header="Azioni">
        <template #body="{ data }">
          <div class="flex align-items-center">
            <Button
              v-tooltip.bottom="'Inserisci un documento'"
              v-if="data.documenti.length == 0"
              @click="showUploadDialog(data)"
              icon="pi pi-plus"
              class="p-button-rounded mr-2"
            ></Button>
            <Button
              v-tooltip.bottom="'Sostituisci il documento'"
              v-else
              @click="showUploadDialog(data)"
              icon="pi pi-replay"
              class="p-button-rounded mr-2"
            ></Button>
            <Button
              v-tooltip.bottom="'Visualizza il documento'"
              v-if="data.documenti.length > 0"
              icon="pi pi-eye"
              @click="showDocumentiCaricati(data)"
              class="p-button-rounded mr-2"
            ></Button>
            <Button
              v-tooltip.bottom="'Scarica il documento'"
              v-if="data.documenti.length > 0"
              icon="pi pi-download"
              class="p-button-rounded mr-2"
            ></Button>
            <Button
              v-tooltip.bottom="'Elimina il documento'"
              v-if="data.documenti.length > 0"
              icon="pi pi-trash"
              @click="showConfirmDelete(data)"
              class="p-button-rounded p-button-danger"
            ></Button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>

  <Dialog
    header="Caricamento documento"
    v-model:visible="uploadDialogVisible"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
  >
    <FileUpload
      name="demo[]"
      url="https://prestitosi-core.datarete.cloud/api/Upload?type=DocumentiPratiche"
      @upload="uploadFile($event)"
      :multiple="false"
    >
      <template #empty>
        <p>Trascina qui il nuovo documento che vuoi caricare</p>
      </template>
    </FileUpload>
  </Dialog>

  <Dialog
    header="Visualizzatore documenti by ArkadiaGroup"
    v-model:visible="documentiCaricatiDialogVisible"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw', height: '60vh' }"
    :maximizable="true"
    :modal="true"
  >
    <iframe
      :src="documentiCaricatiDialogData.documenti[0].Url"
      frameborder="0"
      scrolling="auto"
      width="100%"
      height="95%"
    ></iframe>
  </Dialog>
</template>

<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
import { useStore } from "vuex"
import AxiosService from "@/axiosServices/AxiosService"

const props = defineProps({
  id_tipo_prodotto: Number,
})

const loading = ref(false)
const route = useRoute()
const store = useStore()
const data = ref([])

function showConfirmDelete(data) {
  console.log(data)
}

const documentiCaricatiDialogVisible = ref(false)
const documentiCaricatiDialogData = ref()
function showDocumentiCaricati(document) {
  documentiCaricatiDialogVisible.value = true
  documentiCaricatiDialogData.value = document
}

const uploadDialogVisible = ref(false)
const uploadDialogData = ref()
function showUploadDialog(data) {
  uploadDialogVisible.value = true
  uploadDialogData.value = data
}

const urlFile = ref("")

function uploadFile(ev) {
  loading.value = true
  urlFile.value = ""
  const service = new AxiosService("files")
  for (let i = 0; i < ev.files.length; i++) {
    const formData = new FormData()
    formData.append("file", ev.files[i])
    service
      .postCustomEndpoint("Upload?type=" + "DocumentiPratiche", "", formData)
      .then((res) => {
        console.log("upload documenti pratiche ", res)
        urlFile.value = res
      })
      .finally(() => {
        uploadDialogVisible.value = false
        loading.value = false

        caricaDocumentoPratica()
      })
  }
}

function caricaDocumentoPratica() {
  loading.value = true

  const service = new AxiosService(
    "Pratiche/NuovoDocumentoPratica/" + route.params.idPratica
  )

  service
    .create({
      idAgente: store.getters["loggedUser"].id,
      idPratica: route.params.idPratica,
      idTipoDocTipoProd: uploadDialogData.value.idTipoDocTipoProd,
      Agente: store.getters["loggedUser"].nome,
      Url: "https://prestitosi-core.datarete.cloud/" + urlFile.value,
    })
    .then((res) => {
      console.log(
        "🚀 ~ file: DocumentiPratica.vue:147 ~ caricaDocumentoPratica ~ res",
        res
      )
    })
    .finally(() => {
      getData(props.id_tipo_prodotto)
    })
}

function getData() {
  const service = new AxiosService(
    "Pratiche/GetDocumentiPratica/" + route.params.idPratica
  )

  loading.value = true

  service
    .read()
    .then((res) => {
      data.value = res
    })
    .finally(() => {
      loading.value = false
    })
}

getData()
</script>

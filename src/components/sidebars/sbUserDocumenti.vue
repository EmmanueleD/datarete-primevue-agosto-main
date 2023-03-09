<template>
  <ConfirmDialog></ConfirmDialog>
  <h1 class="mb-4">{{ sidebarData.view.title }}</h1>
  <div class="w-full flex justify-content-end">
    <Button
      @click="caricamentoDocumentiVisible = true"
      label="Carica un documento"
    ></Button>
  </div>

  <h3>Mandato</h3>
  <DataTable stripedRows :value="documenti.mandato" :loading="loading.mandato">
    <Column field="nome" header="Nome"></Column>
    <Column field="dataInserimento" header="Data Inserimento">
      <template #body="{ data }">{{
        new Date(data.dataInserimento).toLocaleDateString("it", {
          year: "2-digit",
          month: "short",
          day: "2-digit",
        })
      }}</template>
    </Column>
    <Column field="dataScadenza" header="Data Scadenza">
      <template #body="{ data }">{{
        new Date(data.dataScadenza).toLocaleDateString("it", {
          year: "2-digit",
          month: "short",
          day: "2-digit",
        })
      }}</template>
    </Column>
    <Column header="Azioni">
      <template #body="{ data }">
        <Button
          @click="showVisualizzatoreDocumenti(data)"
          icon="pi pi-file"
          class="p-button-rounded mr-2"
        ></Button>
        <Button
          @click="confirmDeleteDocumento(data.id)"
          icon="pi pi-trash"
          class="p-button-rounded p-button-danger"
        ></Button>
      </template>
    </Column>
  </DataTable>
  <div class="my-6"></div>
  <h3>Documenti di Identità</h3>
  <DataTable
    stripedRows
    :value="documenti.identita"
    :loading="loading.identita"
  >
    <Column field="nome" header="Nome"></Column>
    <Column field="dataInserimento" header="Data Inserimento">
      <template #body="{ data }">{{
        new Date(data.dataInserimento).toLocaleDateString("it", {
          year: "2-digit",
          month: "short",
          day: "2-digit",
        })
      }}</template>
    </Column>
    <Column field="dataScadenza" header="Data Scadenza">
      <template #body="{ data }">{{
        new Date(data.dataScadenza).toLocaleDateString("it", {
          year: "2-digit",
          month: "short",
          day: "2-digit",
        })
      }}</template>
    </Column>
    <Column header="Azioni">
      <template #body="{ data }">
        <Button
          @click="showVisualizzatoreDocumenti(data)"
          icon="pi pi-file"
          class="p-button-rounded mr-2"
        ></Button>
        <Button
          @click="confirmDeleteDocumento(data.id)"
          icon="pi pi-trash"
          class="p-button-rounded p-button-danger"
        ></Button>
      </template>
    </Column>
  </DataTable>
  <div class="my-6"></div>
  <h3>Aggiornamento di Condizioni</h3>
  <DataTable
    stripedRows
    :value="documenti.condizioni"
    :loading="loading.condizioni"
  >
    <template #empty>Non ci sono documenti per questa categoria</template>
    <Column field="nome" header="Nome"></Column>
    <Column field="dataInserimento" header="Data Inserimento">
      <template #body="{ data }">{{
        new Date(data.dataInserimento).toLocaleDateString("it", {
          year: "2-digit",
          month: "short",
          day: "2-digit",
        })
      }}</template>
    </Column>
    <Column field="dataScadenza" header="Data Scadenza">
      <template #body="{ data }">{{
        new Date(data.dataScadenza).toLocaleDateString("it", {
          year: "2-digit",
          month: "short",
          day: "2-digit",
        })
      }}</template>
    </Column>
    <Column header="Azioni">
      <template #body="{ data }">
        <Button
          @click="showVisualizzatoreDocumenti(data)"
          icon="pi pi-file"
          class="p-button-rounded mr-2"
        ></Button>
        <Button
          @click="confirmDeleteDocumento(data.id)"
          icon="pi pi-trash"
          class="p-button-rounded p-button-danger"
        ></Button>
      </template>
    </Column>
  </DataTable>
  <div class="my-6"></div>
  <h3>Lettere di Intenti</h3>
  <DataTable stripedRows :value="documenti.intenti" :loading="loading.intenti">
    <Column field="nome" header="Nome"></Column>
    <Column field="dataInserimento" header="Data Inserimento">
      <template #body="{ data }">{{
        new Date(data.dataInserimento).toLocaleDateString("it", {
          year: "2-digit",
          month: "short",
          day: "2-digit",
        })
      }}</template>
    </Column>
    <Column field="dataScadenza" header="Data Scadenza">
      <template #body="{ data }">{{
        new Date(data.dataScadenza).toLocaleDateString("it", {
          year: "2-digit",
          month: "short",
          day: "2-digit",
        })
      }}</template>
    </Column>
    <Column header="Azioni">
      <template #body="{ data }">
        <Button
          @click="showVisualizzatoreDocumenti(data)"
          icon="pi pi-file"
          class="p-button-rounded mr-2"
        ></Button>
        <Button
          @click="confirmDeleteDocumento(data.id)"
          icon="pi pi-trash"
          class="p-button-rounded p-button-danger"
        ></Button>
      </template>
    </Column>
  </DataTable>
  <div class="my-6"></div>
  <h3>Aggiornamento Corsi</h3>
  <DataTable stripedRows :value="documenti.corsi" :loading="loading.corsi">
    <Column field="nome" header="Nome"></Column>
    <Column field="dataInserimento" header="Data Inserimento">
      <template #body="{ data }">{{
        new Date(data.dataInserimento).toLocaleDateString("it", {
          year: "2-digit",
          month: "short",
          day: "2-digit",
        })
      }}</template>
    </Column>
    <Column field="dataScadenza" header="Data Scadenza">
      <template #body="{ data }">{{
        new Date(data.dataScadenza).toLocaleDateString("it", {
          year: "2-digit",
          month: "short",
          day: "2-digit",
        })
      }}</template>
    </Column>
    <Column header="Azioni">
      <template #body="{ data }">
        <Button
          @click="showVisualizzatoreDocumenti(data)"
          icon="pi pi-file"
          class="p-button-rounded mr-2"
        ></Button>
        <Button
          @click="confirmDeleteDocumento(data.id)"
          icon="pi pi-trash"
          class="p-button-rounded p-button-danger"
        ></Button>
      </template>
    </Column>
  </DataTable>
  <Dialog
    v-model:visible="caricamentoDocumentiVisible"
    modal
    header="Caricamento documenti"
    :style="{ width: '40vw' }"
  >
    <FileUpload
      @uploader="uploadFile"
      mode="basic"
      uploadIcon="pi pi-paperclip"
      name="demo[]"
      :customUpload="true"
      :previewWidth="50"
      :auto="true"
    >
      <template #empty>
        <p>Trascina qui il documento que vuoi caricare</p>
      </template>
    </FileUpload>

    <div class="flex flex-column my-4">
      <label>Tipo del documento</label>
      <Dropdown
        optionLabel="label"
        optionValue="id"
        :options="tipiDocumenti"
        v-model="tempTipoDocumento"
      >
      </Dropdown>
    </div>

    <div class="flex flex-column my-4">
      <label>Nome del documento</label>
      <InputText type="text" v-model="tempTitoloFile"> </InputText>
    </div>

    <div class="flex flex-column my-4">
      <label>Data di Scadenza</label>
      <Calendar :minDate="new Date()" v-model="tempDataScadenzaFile"></Calendar>
    </div>

    <div class="w-full flex justify-content-end">
      <Button @click="caricaDocumento" label="Aggiungi documento"></Button>
    </div>
  </Dialog>
  <Dialog
    v-model:visible="visualizzatoreDocumentiVisible"
    maximizable
    :style="{ width: '30vw', height: '100vh' }"
  >
    <template #header>{{ tempDocumento.nome }}</template>
    <iframe
      :src="tempDocumento.url"
      frameBorder="0"
      scrolling="auto"
      width="100%"
      height="95%"
    ></iframe>
  </Dialog>
</template>

<script setup>
import { ref } from "vue"
import { useConfirm } from "primevue/useconfirm"
import AxiosService from "@/axiosServices/AxiosService"
const props = defineProps({
  sidebarData: Object,
})
const confirm = useConfirm()
const visualizzatoreDocumentiVisible = ref(false)

const tipiDocumenti = [
  {
    id: 1,
    name: "mandato",
    label: "Mandato",
  },
  {
    id: 2,
    name: "identita",
    label: "Documenti di identità",
  },
  {
    id: 3,
    name: "condizioni",
    label: "Aggiornamento Condizioni",
  },
  {
    id: 4,
    name: "intenti",
    label: "Lettere di Intenti",
  },
  {
    id: 5,
    name: "corsi",
    label: "Aggiornamento Corsi",
  },
]

const documenti = ref({
  mandato: [],
  identita: [],
  condizioni: [],
  intenti: [],
  corsi: [],
})

const loading = ref({
  mandato: false,
  identita: false,
  condizioni: false,
  intenti: false,
  corsi: false,
})

function getData() {
  documenti.value = {
    mandato: [],
    identita: [],
    condizioni: [],
    intenti: [],
    corsi: [],
  }

  tipiDocumenti.forEach((tipo) => {
    loading.value[tipo.name] = true
    const service = new AxiosService(
      props.sidebarData.view.endpointGET +
        tipo.id +
        "/" +
        props.sidebarData.event.id
    )
    service
      .read()
      .then((res) => {
        documenti.value[tipo.name] = res
      })
      .finally(() => {
        loading.value[tipo.name] = false
      })
  })
}

function confirmDeleteDocumento(idDocumento) {
  confirm.require({
    message: "Sei Sicuro di voler eliminare questo documento?",
    header: "Eliminazione definitiva",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    accept: () => {
      deleteDocumento(idDocumento)
    },
    reject: () => {
      return
    },
  })
}

function deleteDocumento(idDocumento) {
  const service = new AxiosService(props.sidebarData.view.endpointDELETE)

  service
    .delete(idDocumento)
    .then((res) => {
      console.log("documento eliminato")
    })
    .finally(() => {
      getData()
    })
}

const caricamentoDocumentiVisible = ref(false)

const tempUrlFile = ref("")
const tempTitoloFile = ref("")
const tempDataScadenzaFile = ref("")
const tempTipoDocumento = ref(null)

function uploadFile(ev) {
  const service = new AxiosService("files")

  for (let i = 0; i < ev.files.length; i++) {
    const formData = new FormData()
    formData.append("file", ev.files[i])
    service
      .postCustomEndpoint("Upload?type=" + "DocumentiPratiche", "", formData)
      .then((res) => {
        console.log(
          "🚀 ~ file: Documenti.vue ~ line 60 ~ uploadFile ~ res",
          res
        )
        tempUrlFile.value = res
      })
  }
}

function caricaDocumento() {
  const service = new AxiosService(props.sidebarData.view.endpointPOST)

  service
    .create({
      idUser: props.sidebarData.event.id,
      idDocType: tempTipoDocumento.value,
      nome: tempTitoloFile.value,
      url: tempUrlFile.value,
      dataScadenza: tempDataScadenzaFile.value,
    })
    .then((res) => {
      console.log(res)
    })
    .finally(() => {
      caricamentoDocumentiVisible.value = false
      getData()
    })
}

const tempDocumento = ref()
function showVisualizzatoreDocumenti(documento) {
  visualizzatoreDocumentiVisible.value = true
  tempDocumento.value = {}
  tempDocumento.value = documento
  tempDocumento.value.url =
    "https://prestitosi-core.datarete.cloud" + documento.url
}

getData()
</script>

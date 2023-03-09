<template>
  <Toast></Toast>

  <!-- {{ sidebarData }} -->

  <h1 v-if="!tmpItem.id" class="mb-4">Nuova Circolare</h1>
  <h1 v-else class="mb-4">Modifica Circolare</h1>

  <div class="grid w-full">
    <div class="flex flex-column col-12 mb-4">
      <label for="titolo">Titolo</label>
      <InputText id="titolo" type="text" v-model="tmpItem.titolo"></InputText>
    </div>
    <div class="flex flex-column col-12 mb-4">
      <label for="argomento">Argomento</label>
      <InputText
        id="argomento"
        type="text"
        v-model="tmpItem.argomento"
      ></InputText>
    </div>
    <div class="flex flex-column col-12 col-lg-4 mb-4">
      <label for="priorita">Priorità</label>
      <Dropdown
        :filter="true"
        id="priorita"
        v-model="tmpItem.priorita"
        :options="[
          { name: 'Urgente', value: 3 },
          { name: 'Alta', value: 2 },
          { name: 'Normale', value: 1 },
          { name: 'Bassa', value: 0 },
        ]"
        optionLabel="name"
        optionValue="value"
      />
    </div>
    <div class="flex flex-column col-12 col-lg-4 mb-4">
      <label for="livelli">Livelli</label>
      <MultiSelect
        :filter="true"
        id="livelli"
        v-model="tmpItem.livelli"
        :options="livelliOptions"
        optionLabel="text"
        optionValue="value"
      />
    </div>
    <div class="flex flex-column col-12 col-lg-4 mb-4">
      <label for="livelli">Sedi</label>
      <MultiSelect
        :filter="true"
        id="livelli"
        v-model="tmpItem.sedi"
        :options="sediOptions"
        optionLabel="nome"
        optionValue="id"
      />
    </div>
  </div>

  <FileUpload
    @uploader="uploadFile"
    mode="basic"
    uploadIcon="pi pi-paperclip"
    name="demo[]"
    :customUpload="true"
    :previewWidth="50"
    :chooseLabel="
      tmpItem.urlFile ? fileName(tmpItem.urlFile) : 'Allega File Circolare'
    "
    :auto="true"
  />
  <div class="w-100 flex justify-content-end align-items-end col-12 col-md-2">
    <Button
      label="Salva Circolare"
      @click="inviaCircolare"
      :loading="loading"
    ></Button>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { useToast } from "primevue/usetoast"
import AxiosService from "@/axiosServices/AxiosService"

// eslint-disable-next-line no-undef
const emits = defineEmits(["event_HideNuovaCircolare", "event_refreshList"])

// eslint-disable-next-line no-undef
const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object,
})

const toast = useToast()

const loading = ref(false)

const newCircolare = ref({
  idUtentePubblicazione: 0,
  argomento: "",
  titolo: "",
  priorita: 0,
  dataPubblicazione: new Date(),
  urlFile: "",
  livelli: [],
})

const tmpItem = ref({ ...props.sidebarData })

function uploadFile(ev) {
  const service = new AxiosService("files")

  for (let i = 0; i < ev.files.length; i++) {
    const formData = new FormData()
    formData.append("file", ev.files[i])
    service
      .postCustomEndpoint("Upload?type=" + "Circolari", "", formData)
      .then((res) => {
        console.log(
          "🚀 ~ file: NuovaCircolare.vue ~ line 78 ~ uploadFile ~ res",
          res
        )
        newCircolare.value.urlFile = res
      })
  }
}

function inviaCircolare() {
  loading.value = true
  if (tmpItem.value.id) {
    const servicePUT = new AxiosService("Circolari/EditCircolare")
    servicePUT
      .update(tmpItem.value)
      .then((res) => {
        if (res) {
          toast.add({
            severity: "success",
            summary: "Nuova Opzione Creata",
            detail: tmpItem.value.titolo,
            life: 3000,
          })
          emits("event_refreshList")
          emits("event_HideOptionsManager")
        }
      })
      .catch((error) => {
        toast.add({
          severity: "error",
          summary: "'Errore nella modifica dell'opzione",
          detail: error,
          life: 3000,
        })
        emits("event_refreshList")
        emits("event_HideOptionsManager")
      })
  } else {
    const servicePOST = new AxiosService("postCircolare")
    servicePOST
      .postCustomEndpoint("Circolari/AddCircolare", "", newCircolare.value)
      .then((res) => {
        if (res) {
          toast.add({
            severity: "success",
            summary: "Nuova Circolare Inviata",
            detail: tmpItem.value.titolo,
            life: 3000,
          })
        }
      })
      .finally(() => {
        loading.value = false
        emits("event_HideNuovaCircolare")
      })
      .catch((error) => {
        toast.add({
          severity: "error",
          summary: "'Errore nell'invio della Circolare'",
          detail: error,
          life: 3000,
        })
      })
  }
}

function fileName(file) {
  const fileArr = file.replaceAll(" ", "-").split("_")
  return fileArr[1]
}

//GET SEDI AZIENDA
const sediOptions = ref()
const serviceSediGET = new AxiosService("Gestione/SediAzienda/GetSedi")
function getSedi() {
  serviceSediGET.read().then((res) => {
    sediOptions.value = res
  })
}
getSedi()

// GET LIVELLI
const livelliOptions = ref()
const serviceLivelliGET = new AxiosService("Options/GetLoginLevels")
function getLivelli() {
  serviceLivelliGET.read().then((res) => {
    console.log(
      "🚀 ~ file: NuovaCircolare.vue ~ line 156 ~ serviceLivelliGET.read ~ res",
      res
    )
    livelliOptions.value = res
  })
}
getLivelli()
</script>

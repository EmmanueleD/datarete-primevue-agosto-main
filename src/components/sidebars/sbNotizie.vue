<template>
  <Toast></Toast>

  <h1 class="mb-4" v-if="sidebarData.event.id">Modifica opzione</h1>
  <h1 class="mb-4" v-else>Nuova opzione</h1>

  <div class="grid">
    <div class="flex flex-column col-12">
      <label>Titolo</label>
      <InputText type="text" v-model="tempItem.titolo"></InputText>
    </div>

    <div class="flex flex-column col-12">
      <label>Testo</label>
      <Editor v-model="tempItem.testo" editorStyle="height: 320px" />
    </div>

    <div class="flex flex-column col-12">
      <label>Data</label>
      <Calendar v-model="tempItem.data"></Calendar>
    </div>

    <div class="w-100 flex justify-content-end align-items-end col-12">
      <Button :loading="loading" label="Salva" @click="save"></Button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { useStore } from "vuex"
import { useRoute } from "vue-router"
import { useToast } from "primevue/usetoast"
import AxiosService from "@/axiosServices/AxiosService"

const store = useStore()
const route = useRoute()

// eslint-disable-next-line no-undef
const emits = defineEmits(["event_HidesbArgomentiTicket", "event_refreshList"])

// eslint-disable-next-line no-undef
const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object,
})

const toast = useToast()
const servicePOST = new AxiosService(props.sidebarData.view.endpointPOST)
const servicePUT = new AxiosService(props.sidebarData.view.endpointPUT)

const loading = ref(false)

const tempItem = ref({
  titolo: "",
  testo: "",
  data: new Date(),
})
props.sidebarData.event
  ? (tempItem.value = { ...props.sidebarData.event })
  : null
// API CONNECTIONS
function save() {
  loading.value = true
  if (props.sidebarData.event.id) {
    servicePUT
      .update(tempItem.value)
      .then((res) => {
        if (res) {
          toast.add({
            severity: "success",
            summary: "Nuova Opzione Creata",
            detail: props.sidebarData.event.nome,
            life: 3000,
          })
          emits("event_refreshList")
          emits("event_HidesbArgomentiTicket")
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
        emits("event_HidesbArgomentiTicket")
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    servicePOST
      .create(tempItem.value)
      .then((res) => {
        if (res) {
          toast.add({
            severity: "success",
            summary: "Nuova Opzione Creata",
            detail: props.sidebarData.event.nome,
            life: 3000,
          })
          emits("event_refreshList")
          emits("event_HidesbArgomentiTicket")
        }
      })
      .catch((error) => {
        toast.add({
          severity: "error",
          summary: "'Errore nella creazione dell'opzione",
          detail: error,
          life: 3000,
        })
        emits("event_refreshList")
        emits("event_HidesbArgomentiTicket")
      })
      .finally(() => {
        loading.value = false
      })
  }
}
</script>

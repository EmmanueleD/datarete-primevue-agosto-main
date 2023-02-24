<template>
  <Toast></Toast>

  <h1 class="mb-4" v-if="sidebarData.event.id">Modifica opzione</h1>
  <h1 class="mb-4" v-else>Nuova opzione</h1>

  <div class="grid">
    <div class="flex flex-column col-12">
      <label>Nome</label>
      <InputText type="text" v-model="tempItem.nome"></InputText>
    </div>

    <div class="flex flex-column col-12">
      <label>Ordine</label>
      <InputNumber type="number" v-model="tempItem.ordine"></InputNumber>
    </div>

    <div class="w-100 flex justify-content-end align-items-end col-12">
      <Button :loading="loading" label="Salva" @click="save"></Button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import AxiosService from "@/axiosServices/AxiosService";

// eslint-disable-next-line no-undef
const emits = defineEmits(["event_HidesbArgomentiTicket", "event_refreshList"]);

// eslint-disable-next-line no-undef
const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object,
});

const toast = useToast();
const servicePOST = new AxiosService(props.sidebarData.view.endpointPOST);
const servicePUT = new AxiosService(props.sidebarData.view.endpointPUT);

const loading = ref(false);

const tempItem = ref({
  descrizione: "",
  tipo: "",
  importo: "",
  stato: "",
  data_inserito: "",
});
props.sidebarData.event
  ? (tempItem.value = { ...props.sidebarData.event })
  : null;
// API CONNECTIONS
function save() {
  loading.value = true;
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
          });
        }
      })
      .catch((error) => {
        toast.add({
          severity: "error",
          summary: "'Errore nella modifica dell'opzione",
          detail: error,
          life: 3000,
        });
      })
      .finally(() => {
        loading.value = false;
        emits("event_refreshList");
        emits("event_HidesbArgomentiTicket");
      });
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
          });
        }
      })
      .catch((error) => {
        toast.add({
          severity: "error",
          summary: "'Errore nella creazione dell'opzione",
          detail: error,
          life: 3000,
        });
      })
      .finally(() => {
        loading.value = false;
        emits("event_refreshList");
        emits("event_HidesbArgomentiTicket");
      });
  }
}

// GET UTENTI
const utentiOptions = ref([]);
function getUtenti() {
  loading.value = true;
  const service = new AxiosService("Options/GetUsers");
  service
    .read()
    .then((res) => (utentiOptions.value = res))
    .catch((err) => console.log(err))
    .finally(() => (loading.value = false));
}

// TIPI SEDE
const luogoOptions = ref([
  {
    value: 1,
    text: "Sala riunioni A",
  },
  {
    value: 2,
    text: "Sala riunioni B",
  },
  {
    value: 3,
    text: "Sala riunioni C",
  },
  {
    value: 4,
    text: "Sala riunioni D",
  },
]);

getUtenti();
</script>
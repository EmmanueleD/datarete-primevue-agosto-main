<template>
  <Toast></Toast>

  <h1 class="mb-4" v-if="sidebarData.event.id">Modifica opzione</h1>
  <h1 class="mb-4" v-else>Nuova opzione</h1>

  <div v-if="loading" class="w-full grid-center" style="height: 20vh">
    <i class="pi pi-spin pi-spinner text-3xl"></i>
  </div>

  <div v-else class="grid">
    <div class="flex flex-column col-12">
      <label>Agente</label>
      <Dropdown
        :filter="true"
        v-model="tempItem.idAgente"
        :options="utentiOptions"
        optionLabel="text"
        optionValue="value"
      ></Dropdown>
    </div>

    <div class="flex flex-column col-4">
      <label>Tipo</label>
      <Dropdown
        v-model="tempItem.entrata"
        :options="[
          { text: 'Entrata', value: true },
          { text: 'Uscita', value: false },
        ]"
        optionLabel="text"
        optionValue="value"
      ></Dropdown>
    </div>

    <div class="flex flex-column col-8">
      <label>Importo</label>
      <InputNumber type="number" v-model="tempItem.importo"></InputNumber>
    </div>

    <div class="flex flex-column col-4">
      <label>Stato</label>
      <Dropdown
        :options="statiOptions"
        optionLabel="nome"
        optionValue="id"
        v-model="tempItem.idStato"
      ></Dropdown>
    </div>

    <div class="flex flex-column col-8">
      <label>Descrizione</label>
      <InputText type="text" v-model="tempItem.descrizione"></InputText>
    </div>

    <div class="w-100 flex justify-content-end align-items-end col-12">
      <Button label="Salva" @click="save"></Button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import AxiosService from "@/axiosServices/AxiosService";

const store = useStore();
const route = useRoute();

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
  idAgente: store.getters["loggedUser"].id,
  idPratica: route.params.idPratica,
  idStato: 0,
  Agente:
    store.getters["loggedUser"].nome +
    " " +
    store.getters["loggedUser"].cognome,
  importo: 0,
  Stato: "",
  dataInserimento: "",
  entrata: true,
  descrizione: "",
});
props.sidebarData.event
  ? (tempItem.value = { ...props.sidebarData.event })
  : null;
// API CONNECTIONS
function save() {
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
          emits("event_refreshList");
          emits("event_HidesbArgomentiTicket");
        }
      })
      .catch((error) => {
        toast.add({
          severity: "error",
          summary: "'Errore nella modifica dell'opzione",
          detail: error,
          life: 3000,
        });
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
          emits("event_refreshList");
          emits("event_HidesbArgomentiTicket");
        }
      })
      .catch((error) => {
        toast.add({
          severity: "error",
          summary: "'Errore nella creazione dell'opzione",
          detail: error,
          life: 3000,
        });
        emits("event_refreshList");
        emits("event_HidesbArgomentiTicket");
      });
  }
}

const statiOptions = ref();
function getStatiOption() {
  const service = new AxiosService("Options/StatiCompensiPratiche/GetStati");

  service.read().then((res) => {
    statiOptions.value = res;
  });
}

getStatiOption();

const utentiOptions = ref();
function getUtentiOptions() {
  loading.value = true;
  const service = new AxiosService("Options/GetUsers");
  service
    .read()
    .then((res) => {
      utentiOptions.value = res;
    })
    .finally(() => {
      loading.value = false;
    });
}

getUtentiOptions();
</script>
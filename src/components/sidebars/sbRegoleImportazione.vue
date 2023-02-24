<template>
  <Toast></Toast>

  <h1 class="mb-4" v-if="sidebarData.event.id">Modifica opzione</h1>
  <h1 class="mb-4" v-else>Nuova opzione</h1>

  <div class="grid">
    <div class="col-12 flex flex-column mb-4">
      <label>Seleziona il tipo di Provenienza</label>
      <Dropdown
        :filter="true"
        :options="['Regioni', 'Province']"
        v-model="tempItem.CAMPO"
      ></Dropdown>
    </div>

    <div class="flex flex-column col-12 mb-4">
      <label>Scrivi le {{ tipoProvenienza }} di Provenienza</label>
      <p class="text-gray-500">Premi "Invio" dopo ogni elemento</p>
      <Chips v-model="tempItem.VALORI" />
    </div>

    <Divider></Divider>

    <!-- <InputSwitch v-model="destinazioneSede" class="mr'4" /> -->
    <h4 class="cursor-pointer ml-2">
      <span
        @click="destinazioneSede = true"
        :class="{ 'not-current': !destinazioneSede }"
        >Destinazione Sede</span
      ><span class="ml-2 mr-1">/ </span
      ><span
        @click="destinazioneSede = false"
        :class="{ 'not-current': destinazioneSede }"
        >Destinazione Utente
      </span>
    </h4>

    <div v-if="destinazioneSede" class="flex flex-column col-12 mb-4">
      <!-- <label>Destinazione Sede</label> -->
      <Dropdown
        :filter="true"
        :options="sediOptions"
        optionLabel="nome"
        optionValue="id"
        v-model="tempItem.ID_SEDE"
      >
      </Dropdown>
    </div>
    <div v-else class="flex flex-column col-12 mb-4">
      <!-- <label>Destinazione Utente</label> -->
      <Dropdown
        :filter="true"
        :options="utentiOptions"
        optionLabel="text"
        optionValue="value"
        v-model="tempItem.ID_UTENTE"
      >
      </Dropdown>
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
const destinazioneSede = ref(true);
const tempItem = ref({});
props.sidebarData.event
  ? (tempItem.value = { ...props.sidebarData.event })
  : null;
// API CONNECTIONS
function save() {
  loading.value = true;
  if (props.sidebarData.event.id || props.sidebarData.event.ID) {
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
        emits("event_refreshList");
        emits("event_HidesbArgomentiTicket");
        loading.value = false;
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
        emits("event_refreshList");
        emits("event_HidesbArgomentiTicket");
        loading.value = false;
      });
  }
}

// GET SEDI
const sediOptions = ref([{
  nome: 'Nessuna sede',
  id: 0
}]);
function getSedi() {
  sediOptions.value = [{
  nome: 'Nessuna sede',
  id: 0
}]
  loading.value = true;
  const service = new AxiosService("Gestione/SediAzienda/GetSedi");
  service
    .read()
    .then((res) => {
    
      res.forEach(element => {
        sediOptions.value.push(element)
      });
      
    })
    .catch((err) => console.log(err))
    .finally(() => (loading.value = false));
}

// GET UTENTI
const utentiOptions = ref([{
  text: "Nessun utente",
  value: 0
}]);
function getUtenti() {
  utentiOptions.value = [{
  text: "Nessun utente",
  value: 0
}]
  loading.value = true;
  const service = new AxiosService("Options/GetUsers");
  service
    .read()
    .then((res) => {
    
    res.forEach(element => {
      utentiOptions.value.push(element)
    })
      
    })
    .catch((err) => console.log(err))
    .finally(() => (loading.value = false));
}

// TIPI SEDE
const tipoProvenienza = ref("Regioni");

getSedi();
getUtenti();
</script>
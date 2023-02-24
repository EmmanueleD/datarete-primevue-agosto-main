<template>
  <Toast></Toast>

  <h1 class="mb-4" v-if="sidebarData.event.id">Modifica opzione</h1>
  <h1 class="mb-4" v-else>Nuova opzione</h1>

  <div class="grid">
    <div class="flex flex-column col-12">
      <label>Tipo Documento</label>
      <Dropdown
        v-model="tempItem.idTipoDocumento"
        :options="tipiDocumentoOptions"
        optionLabel="nome"
        optionValue="id"
      ></Dropdown>
    </div>

    <div class="flex flex-column col-12">
      <label>Tipo Prodotto</label>
      <Dropdown
        v-model="tempItem.idTipoProdotto"
        :options="tipiProdottoOptions"
        optionLabel="text"
        optionValue="value"
      ></Dropdown>
    </div>

    <div class="flex align-items-center col-6 mb-4">
      <Checkbox v-model="tempItem.obbligatorio" :binary="true"></Checkbox>
      <label class="ml-2">Obbligatorio</label>
    </div>

    <div class="w-100 flex justify-content-end align-items-end col-12">
      <Button label="Salva" @click="save"></Button>
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
  nomeDocumento: "",
  nomeProdotto: "",
  idTipoProdotto: 0,
  idTipoDocumento: 0,
  obbligatorio: false,
  ordine: 0,
});
props.sidebarData.event
  ? (tempItem.value = { ...props.sidebarData.event })
  : tempItem.value;
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

const tipiProdottoOptions = ref([]);
function getTipiProdotto() {
  loading.value = true;
  const service = new AxiosService("Options/TipiProdotto");
  service
    .read()
    .then((res) => {
      tipiProdottoOptions.value = res;
    })
    .finally(() => {
      loading.value = false;
    });
}

const tipiDocumentoOptions = ref([]);
function getTipiDocumento() {
  loading.value = true;
  const service = new AxiosService("Options/TipiDocumento");
  service
    .read()
    .then((res) => {
      tipiDocumentoOptions.value = res;
    })
    .finally(() => {
      loading.value = false;
    });
}

getTipiProdotto();
getTipiDocumento();
</script>
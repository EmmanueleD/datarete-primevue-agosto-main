<template>
  <Toast></Toast>

  <h1 v-if="sidebarData.event.id">Modifica contenuto</h1>
  <h1 v-else>Nuovo contenuto</h1>

  <div class="grid">
    <div class="flex flex-column col-12">
      <label>Categoria</label>
      <Dropdown v-model="tempItem.categoria" :options="['Generale']"></Dropdown>
    </div>

    <div class="flex flex-column col-12">
      <label>Titolo</label>
      <InputText type="text" v-model="tempItem.titolo"></InputText>
    </div>

    <div class="flex flex-column col-12">
      <label>Descrizione</label>
      <InputText type="text" v-model="tempItem.descrizione"></InputText>
    </div>

    <div class="flex flex-column col-12">
      <label>Data </label>
      <Calendar v-model="tempItem.data" :minDate="new Date()"></Calendar>
    </div>

    <div class="flex flex-column col-12">
      <label>Embed Code</label>
      <InputText
        type="text"
        v-model="tempItem.embed"
        :minDate="tempItem.embed"
      ></InputText>
    </div>

    <div
      class="w-full grid-center mt-4 mb-4"
      v-if="tempItem.embed"
      v-html="tempItem.embed"
    ></div>

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
  categoria: "Generale",
  titolo: "",
  descrizione: "",
  data: "",
  embed: null,
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
</script>
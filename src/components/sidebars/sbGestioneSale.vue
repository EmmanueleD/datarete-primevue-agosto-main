<template>
  <Toast></Toast>
  <!-- {{ sidebarData }} -->
  <h1 v-if="tmpItem.id">Modifica opzione</h1>
  <h1 v-else>Nuova opzione</h1>

  <div class="flex flex-column col-12 mb-4">
    <label>Immagine</label>
    <FileUpload
      @uploader="uploadFile"
      mode="basic"
      uploadIcon="pi pi-paperclip"
      name="demo[]"
      :customUpload="true"
      :previewWidth="50"
      :maxFileSize="1000000"
      :chooseLabel="tmpItem.urlFile ? fileName(urlFile) : 'Aggiungi immagine'"
      :auto="true"
    />
  </div>

  <div class="flex flex-column col-12 mb-4">
    <label>Nome</label>
    <InputText type="text" v-model="tmpItem.nome"></InputText>
  </div>

  <div class="flex flex-column col-12 mb-4">
    <label>Dettagli</label>
    <Chips v-model="tmpItem.tag" />
  </div>
  <div class="flex flex-column col-12 mb-4">
    <label>Capienza</label>
    <InputNumber v-model="tmpItem.capienza"></InputNumber>
  </div>

  <div class="flex flex-column col-12 mb-4">
    <label>Sede</label>
    <Dropdown
      :filter="true"
      v-model="tmpItem.sedeAzienda"
      :options="sediOptions"
      optionLabel="nome"
      optionValue="id"
    >
    </Dropdown>
  </div>

  <div
    class="
      w-100
      flex
      justify-content-end
      align-items-end
      col-12
      mb-4
      col-md-2
      mt-4
    "
  >
    <Button :loading="loading" label="Salva" @click="save"></Button>
  </div>
</template>
<script setup>
import { ref, defineEmits, defineProps } from "vue";
import { useToast } from "primevue/usetoast";
import AxiosService from "@/axiosServices/AxiosService";

const emits = defineEmits(["event_HideOptionsManager", "event_refreshList"]);

const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object,
});

const toast = useToast();
const servicePOST = new AxiosService(props.sidebarData.view.endpointPOST);
const servicePUT = new AxiosService(props.sidebarData.view.endpointPUT);
const loading = ref(false);
const tmpItem = ref({ ...props.sidebarData.event });

function save() {
  loading.value = true;
  if (tmpItem.value.id) {
    servicePUT
      .update(tmpItem.value)
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
        emits("event_HideOptionsManager");
      });
  } else {
    servicePOST
      .create(tmpItem.value)
      .then((res) => {
        if (res) {
          toast.add({
            severity: "success",
            summary: "Nuova Opzione Creata",
            detail: tmpItem.value.nome,
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
        emits("event_HideOptionsManager");
        loading.value = false;
      });
  }
}

const urlFile = ref("");

function uploadFile(ev) {
  const service = new AxiosService("files");

  for (let i = 0; i < ev.files.length; i++) {
    const formData = new FormData();
    formData.append("file", ev.files[i]);
    service
      .postCustomEndpoint("Upload?type=" + "ImgSaleRiunione", "", formData)
      .then((res) => {
        console.log(
          "🚀 ~ file: sbGestioneSale.vue ~ line 101 ~ uploadFile ~ res",
          res
        );
        tmpItem.value.immagine =
          "https://prestitosi-core.datarete.cloud/" + res;
      });
  }
}

const sediOptions = ref();
function getSediAzienda() {
  loading.value = true;
  const service = new AxiosService("Gestione/SediAzienda/GetSedi");
  service
    .read()
    .then((res) => (sediOptions.value = res))
    .finally(() => {
      loading.value = false;
    });
}

getSediAzienda();

function hideGestionePrivilegi() {
  emits("event_HideOptionsManager");
}
</script>
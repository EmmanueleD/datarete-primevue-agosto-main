<template>
  <div class="w-full flex justify-content-end my-2">
    <Button
      @click="showSidebar(objectNewCompenso)"
      icon="pi pi-plus"
      label="Aggiungi voce"
    ></Button>
  </div>
  <TableSkeleton v-if="loading"></TableSkeleton>
  <DataTable
    v-else
    :value="data"
    :stripedRows="true"
    :paginator="true"
    :rows="10"
    :resizableColumns="true"
    :scrollable="true"
    table-layout="auto"
    ref="dt"
  >
    <Column field="dataInserimento" header="Data Inserimento" :sortable="true">
      <template #body="{ data }">
        {{ new Date(data.dataInserimento).toLocaleDateString("it") }}
      </template>
    </Column>
    <Column field="descrizione" header="Descrizione"></Column>
    <Column field="importo" header="Importo">
      <template #body="{ data }">
        <span
          :class="{
            'text-pink-500': data.entrata == false,
            'text-green-500': data.entrata == true,
          }"
          >€ {{ data.importo.toFixed(2) }}</span
        >
      </template>
    </Column>
    <Column field="Stato" header="Stato"></Column>
    <Column field="azioni" header="Azioni">
      <template #body="{ data }">
        <Button
          @click="showSidebar(data)"
          icon="pi pi-pencil"
          class="p-button-rounded mr-2"
        ></Button>
        <Button
          icon="pi pi-trash"
          class="p-button-rounded p-button-danger"
        ></Button>
      </template>
    </Column>
  </DataTable>
  <Sidebar
    v-model:visible="sidebarVisible"
    :baseZIndex="10000"
    position="right"
    class="p-sidebar-md"
    @hide="$emit('event_HideOptionsManager')"
    ><sbCompensi
      @event_refreshList="getViewData"
      :sidebarData="sidebarData"
    ></sbCompensi
  ></Sidebar>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

import AxiosService from "@/axiosServices/AxiosService";
import TableSkeleton from "@/components/skeletons/TableSkeleton.vue";
import sbCompensi from "@/components/sidebars/sbCompensi.vue";

const confirm = useConfirm();
const toast = useToast();
const loading = ref(false);
const store = useStore();
const route = useRoute();

const data = ref([]);

// GET DATA FOR THE VIEW
function getViewData() {
  hideSidebar();
  loading.value = true;
  const serviceGET = new AxiosService(
    view.endpointGET + "/" + route.params.idPratica
  );

  serviceGET
    .read()
    .then((res) => {
      if (res) {
        data.value ? (data.value.length = 0) : null;
        data.value = res;
        toast.add({
          severity: "success",
          summary: "Lista Opzioni Caricata",
          life: 3000,
        });
      }
    })
    .catch((err) => {
      toast.add({
        severity: "error",
        summary: "Errore nel caricamento della lista delle Opzioni",
        detail: err,
        life: 3000,
      });
    })
    .finally(() => {
      loading.value = false;
    });
}

// SETTING VIEW
const view = {
  title: "Compensi",
  endpointGET: "Pratiche/GetCompensiPratica",
  endpointPOST: "Pratiche/AddCompensiPratica",
  endpointPUT: "Pratiche/EditCompensiPratica", // /ID
  endpointDELETE: "Pratiche/DeleteCompensiPratica", // /ID
};

// SETTINGS AND DYNAMICS SIDEBAR
const sidebarVisible = ref(false);
const sidebarData = ref({
  view: view,
  event: {},
});

const objectNewCompenso = {
  idAgente: store.getters["loggedUser"].id,
  idPratica: route.params.idPratica,
  idStato: 0,
  Stato: "",
  Agente:
    store.getters["loggedUser"].nome +
    " " +
    store.getters["loggedUser"].cognome,
  importo: 0,
  dataInserimento: "",
  entrata: true,
  descrizione: "",
};
function showSidebar(event) {
  sidebarData.value.event = event;
  sidebarVisible.value = true;
}
function hideSidebar() {
  sidebarVisible.value = false;
  sidebarData.value = {
    view: view,
    event: {},
  };
}

// DELETE OPTION
function confirmDelete(element) {
  confirm.require({
    message: 'Sei sicuro di voler eliminare "' + element.nome + '"',
    header: "Conferma Eliminazione",
    icon: "pi pi-fw pi-trash",
    acceptClass: "p-button-danger",
    accept: () => {
      deleteStato(element);
    },
    reject: () => {
      return;
    },
  });
}
const serviceDELETE = new AxiosService(view.endpointDELETE);
function deleteStato(element) {
  serviceDELETE
    .delete(element.id)
    .then((res) => {
      if (res) {
        toast.add({
          severity: "success",
          summary: "Opzione Eliminata",
          detail: element.nome,
          life: 3000,
        });
        data.value ? (data.value.length = 0) : null;
        getViewData();
      }
    })
    .catch((error) => {
      toast.add({
        severity: "error",
        summary: "Errore nell'eliminazione dell'opzione'",
        detail: error,
        life: 3000,
      });
      data.value ? (data.value.length = 0) : null;
      getViewData();
    });
}

getViewData();
</script>
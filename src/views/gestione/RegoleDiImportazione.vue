<template>
  <div class="wrapper">
    <ConfirmDialog></ConfirmDialog>
    <h1>{{ view.title }}</h1>
    <Card>
      <template #content>
        <div class="flex justify-content-end">
          <Button
            label="Aggiungi Opzione"
            @click="showSidebar({})"
            class="p-button=info"
          ></Button>
        </div>
      </template>
    </Card>
    <Card>
      <template #content>
        <div v-if="contentLoading">
          <TableSkeleton></TableSkeleton>
        </div>
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
          <Column field="AZIONI" header="Azioni">
            <template #body="{ data }">
              <Button
                @click="showSidebar(data)"
                icon="pi pi-pencil"
                class="p-button-rounded p-button-outlined mr-2"
              ></Button>
              <Button
                @click="confirmDelete(data)"
                icon="pi pi-trash"
                class="p-button-rounded p-button-outlined p-button-danger"
              ></Button>
            </template>
          </Column>
          <Column field="CAMPO" header="Campo"></Column>
          <Column field="VALORI" header="Valori"></Column>
          <Column field="SEDE" header="Sede"></Column>
          <Column field="UTENTE" header="Utente"></Column>
        </DataTable>
      </template>
    </Card>
  </div>
  <Sidebar
    v-model:visible="sidebarVisible"
    :baseZIndex="10000"
    position="right"
    class="p-sidebar-md"
    @hide="$emit('event_HideOptionsManager')"
  >
    <sbRegoleImportazione
      :sidebarData="sidebarData"
      @event_refreshList="hideSidebar"
    >
    </sbRegoleImportazione>
  </Sidebar>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

import AxiosService from "@/axiosServices/AxiosService";
import TableSkeleton from "@/components/skeletons/TableSkeleton.vue";
import sbRegoleImportazione from "@/components/sidebars/sbRegoleImportazione.vue";

const store = useStore();
function setContentLoading_true() {
  store.dispatch("CONTENTLOADING_TRUE");
}
function setContentLoading_false() {
  store.dispatch("CONTENTLOADING_FALSE");
}
const contentLoading = computed(() => store.getters.contentLoading);

const confirm = useConfirm();
const toast = useToast();

const data = ref();

// GET DATA FOR THE VIEW
function getViewData() {
  const serviceGET = new AxiosService(view.endpointGET);
  setContentLoading_true();
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
        setContentLoading_false();
      }
    })
    .catch((err) => {
      toast.add({
        severity: "error",
        summary: "Errore nel caricamento della lista delle Opzioni",
        detail: err,
        life: 3000,
      });
      setContentLoading_false();
    });
}

// SETTING VIEW
const view = {
  title: "Regole di Importazione",
  endpointGET: "LeadCore/GetLogiche",
  endpointPOST: "LeadCore/AddLogica",
  endpointPUT: "LeadCore/EditLogica", // /ID
  endpointDELETE: "LeadCore/DeleteLogica", // /ID
};

// SETTINGS AND DYNAMICS SIDEBAR
const sidebarVisible = ref(false);
const sidebarData = ref({
  view: view,
  event: {},
});
function showSidebar(event) {
  sidebarData.value.view = view;
  sidebarData.value.event = event;
  sidebarVisible.value = true;
}
function hideSidebar() {
  sidebarVisible.value = false;
  sidebarData.value = {
    view: view,
    event: {},
  };
  getViewData();
}

// DELETE OPTION
function confirmDelete(element) {
  confirm.require({
    message:
      'Sei sicuro di voler eliminare "' +
      element.CAMPO +
      '": ' +
      '"' +
      element.VALORI +
      '"',
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
    .delete(element.id || element.ID)
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
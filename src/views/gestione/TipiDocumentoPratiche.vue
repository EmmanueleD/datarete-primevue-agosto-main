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
          <Column field="nomeDocumento" header="Nome Documento"> </Column>
          <Column field="nomeTipoProdotto" header="Nome Prodotto"> </Column>
          <Column field="obbligatorio" header="Obbligatorio"> </Column>

          <Column header="Azioni" style="max-width: 200px">
            <template #body="{ data }">
              <Button
                @click="showSidebar(data)"
                icon="pi pi-fw pi-pencil"
                class="mr-2 p-button-rounded p-button-info"
              ></Button>
              <Button
                @click="confirmDelete(data)"
                icon="pi pi-fw pi-trash"
                class="p-button-rounded p-button-danger"
              ></Button>
            </template>
          </Column>
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
    <sbTipiDocumentoPratiche
      @event_refreshList="getViewData"
      :sidebarData="sidebarData"
    >
    </sbTipiDocumentoPratiche>
  </Sidebar>
</template>

<script setup>
import { ref, computed } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

import AxiosService from "@/axiosServices/AxiosService";
import TableSkeleton from "@/components/skeletons/TableSkeleton.vue";
import sbTipiDocumentoPratiche from "@/components/sidebars/sbTipiDocumentoPratiche.vue";

const confirm = useConfirm();
const toast = useToast();

const data = ref();

// GET DATA FOR THE VIEW
function getViewData() {
  hideSidebar();
  const serviceGET = new AxiosService(view.endpointGET);

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
    });
}

// SETTING VIEW
const view = {
  title: "Tipi Documento Pratiche",
  endpointGET: "Options/GetDocumentiByTipoProdotto/0",
  endpointPOST: "Options/TipoDocumentoTipoProdotto",
  endpointPUT: "Options/TipoDocumentoTipoProdotto", // /ID
  endpointDELETE: "Options/TipoDocumentoTipoProdotto", // /ID
};

// SETTINGS AND DYNAMICS SIDEBAR
const sidebarVisible = ref(false);
const sidebarData = ref({
  view: view,
  event: {},
});
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
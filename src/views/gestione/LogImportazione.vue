<template>
  <div class="wrapper">
    <ConfirmDialog></ConfirmDialog>
    <h1>{{ view.title }}</h1>

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
          removableSort
        >
          <Column field="ANAGRAFICA" header="Anagrafica" :sortable="true">
          </Column>
          <Column field="UTENTE" header="Utente" :sortable="true"> </Column>
          <Column header="Stato" :sortable="true">
            <template #body="{ data }">
              <div v-if="data.ASSEGNATA == true">
                <i class="pi pi-check-circle text-green-400"></i>
              </div>
              <div v-else>
                <i class="pi pi-times-circle text-red-400 mr-2"></i>
                <span class="font-italic">{{ data.ERRORE }}</span>
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";

import AxiosService from "@/axiosServices/AxiosService";
import TableSkeleton from "@/components/skeletons/TableSkeleton.vue";

const store = useStore();

const toast = useToast();

const data = ref();

// GET DATA FOR THE VIEW
function getViewData() {
  const serviceGET = new AxiosService(view.endpointGET);

  serviceGET
    .read()
    .then((res) => {
      if (res) {
        data.value ? (data.value.length = 0) : null;
        data.value = res;
        toast.add({
          severity: "success",
          summary: "Lista Log Caricata",
          life: 3000,
        });
      }
    })
    .catch((err) => {
      toast.add({
        severity: "error",
        summary: "Errore nel caricamento della lista dei Log",
        detail: err,
        life: 3000,
      });
    });
}

// SETTING VIEW
const view = {
  title: "Log Importazione",
  endpointGET: "LeadCore/GetLog",
  // endpointPOST: 'Options/Sesso',
  // endpointPUT: 'Options/Sesso', // /ID
  // endpointDELETE: 'Options/Sesso' // /ID
};

getViewData();
</script>
<template>
  <div class="wrapper">
    <ConfirmDialog></ConfirmDialog>
    <h1>{{ view.title }}</h1>
    <Card>
      <template #content>
        <div class="flex justify-content-end">
          <Button
            label="Aggiungi Contenuto"
            @click="showCorsoSidebar({})"
            class="p-button=info"
          ></Button>
        </div>
      </template>
    </Card>
    <Card>
      <template #content>
        <div v-if="loading">
          <TableSkeleton></TableSkeleton>
        </div>
        <div v-else class="grid">
          <div
            class="col-12 col-md-4 px-3 mb-4"
            v-for="corso in data"
            :key="corso.id"
          >
            <div class="shadow-2 py-2 px-3 border-round-md">
              <div class="flex justify-content-between">
                <span class="font-bold text-xl">{{ corso.titolo }}</span>
                <div class="flex flex-column align-items-end">
                  <span class="text-gray-500">
                    {{
                      new Date(corso.data).toLocaleDateString("it", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })
                    }}</span
                  ><span
                    class="
                      font-italic
                      text-300
                      surface-700
                      px-4
                      border-round-lg
                    "
                    >{{ corso.id_categoria }}</span
                  >
                </div>
              </div>
              <span>{{ corso.descrizione }}</span>
              <div
                class="w-full grid-center mt-4 mb-4"
                v-html="corso.embed"
              ></div>

              <div class="w-full flex justify-content-end align-items-center">
                <Button
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-danger mr-2"
                ></Button>
                <Button
                  @click="showCorsoSidebar(corso)"
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-info"
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
  <Sidebar
    v-model:visible="corsoSidebarVisible"
    :baseZIndex="10000"
    position="right"
    class="p-sidebar-md"
    @hide="$emit('event_HideOptionsManager')"
  >
    <sbFormazioneOnline
      @event_refreshList="corsoHideSidebar"
      :sidebarData="corsoSidebarData"
    >
    </sbFormazioneOnline>
  </Sidebar>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

import AxiosService from "@/axiosServices/AxiosService";
import TableSkeleton from "@/components/skeletons/TableSkeleton.vue";
import sbFormazioneOnline from "@/components/sidebars/sbFormazioneOnline.vue";

const router = useRouter();

const store = useStore();

const confirm = useConfirm();
const toast = useToast();

const data = ref([]);

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
          summary: "Lista Contenuti Caricata",
          life: 3000,
        });
      }
    })
    .catch((err) => {
      toast.add({
        severity: "error",
        summary: "Errore nel caricamento della lista dei contenuti",
        detail: err,
        life: 3000,
      });
    });
}

// SETTING VIEW
const view = {
  title: "Formazione Online",
  endpointGET: "Plugin/FormazioneOnline/GetContent/0",
  endpointPOST: "Plugin/FormazioneOnline/AddContent",
  endpointPUT: "Plugin/FormazioneOnline/EditContent", // /ID
  endpointDELETE: "Plugin/FormazioneOnline/DeleteContent", // /ID
};

// SETTINGS AND DYNAMICS SIDEBARS
const corsoSidebarVisible = ref(false);
const corsoSidebarData = ref({
  view: view,
  event: {},
});
function showCorsoSidebar(event) {
  corsoSidebarData.value.event = event;
  corsoSidebarVisible.value = true;
}
function corsoHideSidebar() {
  corsoSidebarVisible.value = false;
  corsoSidebarData.value = {
    view: view,
    event: {},
  };
  getViewData();
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

//util functions
function formatDateTime(value) {
  if (value) {
    let dateString = "";
    dateString = new Date(value).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    let timeString = "";
    timeString = new Date(value).toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    });

    let totString = dateString + " " + timeString;
    return totString;
  }
  return "";
}

getViewData();
</script>
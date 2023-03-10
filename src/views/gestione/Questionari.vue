<template>
  <div class="wrapper">
    <ConfirmDialog></ConfirmDialog>
    <h1>{{ view.title }}</h1>
    <Card>
      <template #content>
        <div class="flex justify-content-end">
          <Button
            label="Aggiungi Opzione"
            @click="showSidebar()"
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
          <Column field="nome" header="Nome">
            <template #body="{ data }">
              {{ data.title }}
            </template>
          </Column>
          <Column field="id_tipo" header="Categoria">
            <template #body="{ data }">
              <span v-if="data.id_tipo == 1">CRM</span>
              <span v-if="data.id_tipo == 2">Pratiche</span>
            </template>
          </Column>
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
    @hide="hideSidebar"
  >
    <PostPutQuestionario
      @event_hidePPQuestionario="hideSidebar"
      :item="sidebarData"
    ></PostPutQuestionario>
  </Sidebar>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

import AxiosService from "@/axiosServices/AxiosService";
import TableSkeleton from "@/components/skeletons/TableSkeleton.vue";
import PostPutQuestionario from "@/components/sidebars/Questionari/PostPutQuestionario.vue";

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
async function getViewData() {
  const serviceGET = new AxiosService(view.endpointGET);
  setContentLoading_true();
  await serviceGET
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
  title: "Gestione Questionari",
  endpointGET: "Surveys/GetSurveys/0",
  endpointPOST: "Surveys/AddSurvey",
  endpointPUT: "Surveys/EditSurvey", // /ID
  endpointDELETE: "Surveys/DeleteSurvey", // /ID
};

// SETTINGS AND DYNAMICS SIDEBAR
const sidebarVisible = ref(false);
const sidebarData = ref({
  view: view,
  event: {},
});
function showSidebar(event) {
  if (event) {
    sidebarData.value.event = event;
  } else {
    sidebarData.value.event = {
      title: "",
      questions: [],
    };
  }
  sidebarVisible.value = true;
}

function hideSidebar() {
  sidebarData.value.event = null;
  sidebarVisible.value = false;
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

getViewData();
</script>
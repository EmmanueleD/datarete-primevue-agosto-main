<template>

  <div class="wrapper">
    <ConfirmDialog></ConfirmDialog>
    <h1>{{ view.title }}</h1>
    <Card>
      <template #content>
        <div class="flex justify-content-end">
          <Button label="Aggiungi Opzione" @click="showSidebar({})" class="p-button=info"></Button>
        </div>
      </template>
    </Card>
    <Card>
      <template #content>
        <div v-if="contentLoading">
          <TableSkeleton></TableSkeleton>
        </div>
        <DataTable v-else :value="data" :stripedRows="true" :paginator="true" :rows="10" :resizableColumns="true"
          :scrollable="true" table-layout="auto" ref="dt">
          <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"
            :sortable="col.sortable">

            <template #body="{ data }">

              <div v-if="col.field == 'pagata'" class="grid-center w-full">
                <i v-if="data.pagata" class="pi pi-fw pi-check-circle" style="color:darkgreen"></i>
                <i v-else class="pi pi-fw pi-times-circle" style="color:brown"></i>
              </div>
              <div v-else-if="col.field == 'data'" class="grid-center w-full">
                {{ data.data.toLocaleDateString('it-IT') }}
              </div>
              <div v-else>
                {{ data[col.field] }}
              </div>

            </template>

          </Column>

          <Column header="Azioni" style="max-width: 200px">
            <template #body="{ data }">
              <Button @click="showSidebar(data)" icon="pi pi-fw pi-pencil"
                class="mr-2 p-button-rounded p-button-info"></Button>
              <Button @click="confirmDelete(data)" icon="pi pi-fw pi-trash"
                class="p-button-rounded p-button-danger"></Button>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
  <Sidebar v-model:visible="sidebarVisible" :baseZIndex="10000" position="right" class="p-sidebar-md"
    @hide="$emit('event_HideOptionsManager')">
    <sbScadenziario :sidebarData="sidebarData">
    </sbScadenziario>
  </Sidebar>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast'

import AxiosService from '@/axiosServices/AxiosService';
import TableSkeleton from '@/components/skeletons/TableSkeleton.vue';
import sbScadenziario from '@/components/sidebars/sbScadenziario.vue';

const store = useStore()
function setContentLoading_true() {
  store.dispatch('CONTENTLOADING_TRUE')
}
function setContentLoading_false() {
  store.dispatch('CONTENTLOADING_FALSE')
}
const contentLoading = computed(() => store.getters.contentLoading)

const confirm = useConfirm()
const toast = useToast()

const data = ref([
  {
    id: 1,
    data: new Date(),
    nome: 'bg85',
    importo: 100000,
    pagata: false
  },
  {
    id: 2,
    data: new Date(),
    nome: 'aas9',
    importo: 80000,
    pagata: true
  }
])

const columns = [
  { field: 'data', header: 'DATA', sortable: false },
  { field: 'nome', header: 'NOME', sortable: true },
  { field: 'importo', header: 'IMPORTO', sortable: true },
  { field: 'pagata', header: 'PAGATA', sortable: true },
]

// GET DATA FOR THE VIEW
function getViewData() {
  const serviceGET = new AxiosService(view.endpointGET)
  setContentLoading_true()
  serviceGET.read()
    .then(res => {
      if (res) {
        data.value ? data.value.length = 0 : null
        data.value = res
        toast.add({ severity: 'success', summary: 'Lista Opzioni Caricata', life: 3000 });
        setContentLoading_false()
      }
    })
    .catch(err => {
      toast.add({ severity: 'error', summary: 'Errore nel caricamento della lista delle Opzioni', detail: err, life: 3000 });
      setContentLoading_false()
    })
}

// SETTING VIEW
const view = {
  title: 'Scadenziario Pagamenti',
  // endpointGET: 'Options/Sesso',
  // endpointPOST: 'Options/Sesso',
  // endpointPUT: 'Options/Sesso', // /ID
  // endpointDELETE: 'Options/Sesso' // /ID
}

// SETTINGS AND DYNAMICS SIDEBAR
const sidebarVisible = ref(false)
const sidebarData = ref({
  view: view,
  event: {}
})
function showSidebar(event) {
  sidebarData.value.event = event
  sidebarVisible.value = true
}
function hideSidebar() {
  sidebarVisible.value = false
  sidebarData.value = {
    view: view,
    event: {}
  }
}

// DELETE OPTION
function confirmDelete(element) {
  confirm.require({
    message: 'Sei sicuro di voler eliminare "' + element.nome + '"',
    header: 'Conferma Eliminazione',
    icon: 'pi pi-fw pi-trash',
    acceptClass: 'p-button-danger',
    accept: () => {
      deleteStato(element)
    },
    reject: () => {
      return
    }
  })
}
const serviceDELETE = new AxiosService(view.endpointDELETE)
function deleteStato(element) {
  serviceDELETE.delete(element.id).
    then(res => {
      if (res) {
        toast.add({ severity: 'success', summary: 'Opzione Eliminata', detail: element.nome, life: 3000 });
        data.value ? data.value.length = 0 : null
        getViewData()
      }
    })
    .catch(error => {
      toast.add({ severity: 'error', summary: "Errore nell'eliminazione dell'opzione'", detail: error, life: 3000 });
      data.value ? data.value.length = 0 : null
      getViewData()
    })
}

getViewData()
</script>
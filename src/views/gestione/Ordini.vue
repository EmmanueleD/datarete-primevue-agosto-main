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
          <Column field="nome" header="NOME">
            <template #body="{ data }">
              {{ data.nome }}
            </template>
          </Column>
          <Column field="quantita" header="QUANTITA">
            <template #body="{ data }">
              {{ data.quantita }}
            </template>
          </Column>
          <Column field="prezzo" header="PREZZO">
            <template #body="{ data }">
              {{ (data.prezzo).toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'EUR',
                })
              }}
            </template>
          </Column>
          <Column field="stato" header="STATO">
            <template #body="{ data }">
              <span v-if="data.stato == 1">In Attesa di Approvazione</span>
              <span v-if="data.stato == 2">Approvato</span>
              <span v-if="data.stato == 3">Inviato</span>
              <span v-if="data.stato == 4">Ricevuto</span>
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
    @hide="hideSidebar">
    <sbOrdini :sidebarData="sidebarData">
    </sbOrdini>
  </Sidebar>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast'

import AxiosService from '@/axiosServices/AxiosService';
import TableSkeleton from '@/components/skeletons/TableSkeleton.vue';
import sbOrdini from '@/components/sidebars/sbOrdini.vue';

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
    nome: 'ordine numero 1',
    quantita: 2,
    prezzo: 34,
    stato: 1
  },
  {
    id: 1,
    nome: 'ordine numero 2',
    quantita: 4,
    prezzo: 68,
    stato: 2
  },
  {
    id: 1,
    nome: 'ordine numero 3',
    quantita: 8,
    prezzo: 68,
    stato: 3
  },
  {
    id: 1,
    nome: 'ordine numero 4',
    quantita: 16,
    prezzo: 136,
    stato: 4
  },
])

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
  title: 'Ordini',
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
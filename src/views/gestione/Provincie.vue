<template>

  <div class="wrapper">
    <ConfirmDialog></ConfirmDialog>
    <h1>{{ view.title }}</h1>
    <Card class="mb-4">
      <template #content>
        <div class="flex justify-content-end">
          <Button label="Aggiungi Opzione" @click="showSidebar({})" class="p-button=info"></Button>
        </div>
      </template>
    </Card>
    <Card class="mb-4">
      <template #content>
        <div class="flex justify-content-start align-items-center mb-2">
          <div class="flex flex-column col-12 col-md-4">
            <label for="nation-filter">Nazione</label>
            <Dropdown :filter="true" id="nation-filter" :showClear="true" :options="nationOptions"
              v-model="nationSelected" optionValue="id" optionLabel="nome" placeholder="Seleziona un'opzione"
              @change="getRegions">
            </Dropdown>
          </div>
          <div class="flex flex-column col-12 col-md-4">
            <label for="region-filter">Regione</label>
            <Dropdown :filter="true" id="region-filter" :showClear="true" :options="regionsOptions"
              v-model="regionSelected" optionValue="id" optionLabel="nome" placeholder="Seleziona un'opzione">
            </Dropdown>
          </div>

        </div>
        <div class="flex justify-content-end">
          <Button label="Filtra" @click="geoFilter" class="p-button=info"></Button>
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
          <Column field="nome" header="Nome">
            <template #body="{ data }">
              {{ data.nome }}
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
    <OptionsManager :sidebarData="sidebarData">
    </OptionsManager>
  </Sidebar>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast'

import AxiosService from '@/axiosServices/AxiosService';
import TableSkeleton from '@/components/skeletons/TableSkeleton.vue';
import OptionsManager from '@/components/sidebars/OptionsManager.vue';

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

const data = ref()

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

// FILTER BY NATIONS && REGIONS
const nationOptions = ref()
const nationSelected = ref()
function getNations() {
  const service = new AxiosService('Geographic/GetNazioni')
  service.getOptions('Geographic/GetNazioni')
    .then(res => {
      if (res) {
        nationOptions.value = res
      }
    })
}
getNations()
const regionsOptions = ref()
const regionSelected = ref()
function getRegions() {
  const service = new AxiosService('Geographic/GetRegioni')
  service.getOptions('Geographic/GetRegioni/' + nationSelected.value)
    .then(res => {
      if (res) {
        regionsOptions.value = res
      }
    })
}
function geoFilter() {
  const service = new AxiosService('Geographic/GetProvince')
  service.getOptions('Geographic/GetProvince/' + regionSelected.value)
    .then(res => {
      if (res) {
        data.value = res
      }
    })
}

// SETTING VIEW
const view = {
  title: 'Province',
  endpointGET: 'Options/Province',
  endpointPOST: 'Options/Province',
  endpointPUT: 'Options/Province', // /ID
  endpointDELETE: 'Options/Province' // /ID
}

// SETTINGS AND DYNAMICS SIDEBAR
const sidebarVisible = ref(false)
const sidebarData = ref({
  view: view,
  event: {}
})
function showSidebar(event) {
  sidebarData.value.event = {
    regionsOptions: regionsOptions.value,
    ...event
  }
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
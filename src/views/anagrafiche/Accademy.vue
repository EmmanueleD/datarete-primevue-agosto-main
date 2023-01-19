<template>
  <Toast></Toast>
  <div class="wrapper">
    <h1>Academy</h1>
    <TableSkeleton v-if="loading"></TableSkeleton>
    <DataTable v-else :value="data" :stripedRows="true" :paginator="true" :rows="10" :resizableColumns="true"
      :scrollable="true" table-layout="auto" ref="dt" :globalFilterFields="['nome', 'cognome', 'email', 'attivo']"
      v-model:filters="filters1">

      <template #header>
        <div class="flex justify-content-between">
          <Button type="button" icon="pi pi-filter-slash" label="Pulisci i Filtri" class="p-button-outlined"
            @click="clearFilter1()" />
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters1['global'].value" placeholder="Cerca..." />
          </span>
        </div>
      </template>


      <Column header="AZIONI">
        <template #body="{ data }">
          <i role="button" class="pi pi-fw pi-eye mr-2"></i>
          <i @click="showSidebar(data)" role="button" class="pi pi-fw pi-cog"></i>
        </template>
      </Column>
      <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field" :sortable="col.sortable">

        <template #body="{ data }">
          <div v-if="col.field == 'imgprofilo'">
            <Avatar :image="data[col.field]" size="xlarge" shape="circle"></Avatar>
          </div>
          <div v-else-if="col.field == 'attivo'" class="grid-center w-full">
            <i v-if="data.attivo" class="pi pi-fw pi-check-circle" style="color:darkgreen"></i>
            <i v-else class="pi pi-fw pi-times-circle" style="color:brown"></i>
          </div>
          <div v-else>
            {{ data[col.field] }}
          </div>

        </template>

      </Column>
    </DataTable>
  </div>

  <Sidebar v-model:visible="sidebarVisible" :baseZIndex="10000" position="right" class="p-sidebar-md"
    @hide="$emit('event_HideUsersSidebar')">

    <sbAccademy @event_HideUsersSidebar="event_HideUsersSidebar" :sidebarData="sidebarData">
    </sbAccademy>
  </Sidebar>
</template>

<script setup>
import { ref } from 'vue';
import TableSkeleton from '@/components/skeletons/TableSkeleton.vue';
import AxiosService from '@/axiosServices/AxiosService';
import { useToast } from 'primevue/usetoast';
import { FilterMatchMode } from 'primevue/api';
import sbAccademy from '@/components/sidebars/sbAccademy.vue';

const toast = useToast()
const loading = ref(false)

const columns = [
  { field: 'imgprofilo', header: 'IMMAGINE', sortable: false },
  { field: 'cognome', header: 'COGNOME', sortable: true },
  { field: 'nome', header: 'NOME', sortable: true },
  { field: 'email', header: 'EMAIL', sortable: true },
  { field: 'interesse', header: 'INTERESSE', sortable: true },
  { field: 'attivo', header: 'ATTIVO', sortable: true }
]
//GET DATAATABLE DATA
const data = ref()
function getDatatableData() {
  data.value = [
    {
      id: 1,
      imgprofilo: 'https://picsum.photos/id/30/200',
      cognome: 'Fabbri',
      nome: 'Elena',
      email: 'elena@fabbri.it',
      interesse: 'interesse',
      attivo: false
    },
    {
      id: 2,
      imgprofilo: 'https://picsum.photos/id/41/200',
      cognome: 'Cavallo',
      nome: 'Rachele',
      email: 'rachele@cavallo.it',
      interesse: 'interesse',
      attivo: false
    },
    {
      id: 3,
      imgprofilo: 'https://picsum.photos/id/52/200',
      cognome: 'Collina',
      nome: 'Francesco',
      email: 'francesco@collina.it',
      interesse: 'interesse',
      attivo: false
    },
    {
      id: 4,
      imgprofilo: 'https://picsum.photos/id/63/200',
      cognome: 'Barone',
      nome: 'Michele',
      email: 'michele@barone.it',
      interesse: 'interesse',
      attivo: false
    },
    {
      id: 5,
      imgprofilo: 'https://picsum.photos/id/69/200',
      cognome: 'Costanzo',
      nome: 'Maria',
      email: 'maria@costanzo.it',
      interesse: 'interesse',
      attivo: false
    },
    {
      id: 6,
      imgprofilo: 'https://picsum.photos/id/90/200',
      cognome: 'Orefice',
      nome: 'Giosue',
      email: 'gio@orefice.it',
      interesse: 'interesse',
      attivo: false
    }
  ]

  // loading.value = true
  // const service = new AxiosService('Auth/Users')
  // service.read()
  //   .then(res => {
  //     data.value = res
  //     toast.add(
  //       {
  //         severity: 'success',
  //         summary: 'Caricamento Eventi Completato',
  //         // detail: res,
  //         life: 3000
  //       }
  //     );
  //   })
  //   .catch(err => {
  //     toast.add(
  //       {
  //         severity: 'error',
  //         summary: 'Caricamento Eventi Completato',
  //         detail: err,
  //         life: 3000
  //       }
  //     );
  //   })
  //   .finally(() => {
  //     loading.value = false
  //   })
}


// DATATABLE AND FILTERS SETTINFG
const filters1 = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
})

function clearFilter1() {
  initFilters1()
}
function initFilters1() {
  filters1.value = {
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
  }
}

// SETTING VIEW
const view = {
  title: 'Utenti',
  endpointGET: 'Auth/Users',
  endpointPOST: 'Auth/Users',
  endpointPUT: 'Auth/Users', // /ID
  endpointDELETE: 'Auth/Users' // /ID
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
function event_HideUsersSidebar() {
  sidebarVisible.value = false
  sidebarData.value = {
    view: view,
    event: {}
  }
  getDatatableData()
}

// SETUP
getDatatableData()
</script>
<template>
  <div class="wrapper">
    <div class="mb-4 plugin-title flex justify-content-between align-items-center">
      <h1>{{ view.title }}</h1>
      <Chip icon="pi pi-star-fill" label="PlugIn" class="small-chip custom-chip"></Chip>
    </div>

    <Card class="mb-4">
      <template #content>
        <div class="flex justify-content-end">
          <Button @click="showSidebar" label="Aggiungi Item"></Button>
        </div>
      </template>
    </Card>

    <Card>

      <template #content>
        <div v-if="contentLoading">
          <TableSkeleton></TableSkeleton>
        </div>
        <DataTable v-else :value="items" :stripedRows="true" :paginator="true" :rows="10" :resizableColumns="true"
          :scrollable="true" table-layout="auto" ref="dt">
          <Column field="nome" header="NOME" :sortable="true">
            <template #body="{data}">
              <strong>{{data.nome}}</strong>
            </template>
          </Column>
          <Column field="categoria" header="CATEGORIA" :sortable="true">
            <template #body="{data}">
              <Chip label="informatica" v-if="data.categoria==1" style="background: Midnightblue; color: azure">
              </Chip>
              <Chip label="utili cucina" v-if="data.categoria==2" style="background: burlywood; color: maroon">
              </Chip>
              <Chip label="cancelleria" v-if="data.categoria==3" style="background: sienna; color: white">
              </Chip>
            </template>
          </Column>
          <Column field="codice" header="CODICE"></Column>
          <Column field="sede" header="SEDE" :sortable="true">
            <!-- <template #body="{data}">
              <span> {{ getNomeSede(data.sede) }} </span>
            </template> -->
          </Column>
          <Column field="n_items" header="N ITEMS" :sortable="true"></Column>
          <Column header="AZIONI">
            <template #body="{data}">
              <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2"></Button>
              <Button @click="showSidebar(data)" icon="pi pi-pencil" class="p-button-rounded"></Button>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
  <Sidebar v-model:visible="sidebarVisible" :baseZIndex="10000" position="right" class="p-sidebar-md"
    @hide="hideSidebar">
    <PostPutInventario :sidebarData="sidebarData" @event_HidePPinventario="hideSidebar" @event_refreshList="getList">
    </PostPutInventario>
  </Sidebar>
</template>

<script setup>
import { ref } from 'vue'
import AxiosService from '@/axiosServices/AxiosService'
import TableSkeleton from '@/components/skeletons/TableSkeleton.vue'
import PostPutInventario from '@/components/sidebars/PostPutInventario.vue'
const contentLoading = ref(false)

const view = {
  title: 'Inventario',
  // endpointGET: 'Options/StatiGiuridici',
  // endpointPOST: 'Options/StatiGiuridici',
  // endpointPUT: 'Options/StatiGiuridici', // /ID
  // endpointDELETE: 'Options/StatiGiuridici' // /ID
}

const loading = ref(false)

const sidebarVisible = ref(false)
const sidebarData = ref({
  view: view.value,
  event: {}
})

function showSidebar(event) {
  if (event.id) {
    sidebarData.value.event = event
  }
  sidebarVisible.value = true
}

function hideSidebar() {
  sidebarData.value = {
    view: view.value,
    event: {}
  }
  sidebarVisible.value = false
}

const items = ref([
  {
    id: 1,
    nome: 'iMac',
    categoria: 1,
    codice: '3487dry2348',
    sede: 14,
    n_items: 1,
  },
  {
    id: 2,
    nome: 'Casse Sony SC23',
    categoria: 1,
    codice: 'fq089fh03',
    sede: 14,
    n_items: 1,
  },
  {
    id: 3,
    nome: 'Microonde',
    categoria: 2,
    codice: 'ar09w8hv9-q',
    sede: 15,
    n_items: 1,
  },
  {
    id: 4,
    nome: 'Penna Bic Nera',
    categoria: 3,
    codice: '12d489h-cc',
    sede: 17,
    n_items: 40,
  },
  {
    id: 5,
    nome: 'PostIt',
    categoria: 3,
    codice: 'avfs-98v',
    sede: 16,
    n_items: 23,
  },
  {
    id: 6,
    nome: 'Mouse Logitech aa120',
    categoria: 1,
    codice: 'avsr80dgv',
    sede: 14,
    n_items: 1,
  },
])

// const sediOptions = ref([])
// function getSedi() {
//   loading.value = true
//   const service = new AxiosService('Gestione/SediAzienda/GetSedi')
//   service.read().then(res => sediOptions.value = res).catch(err => console.log(err)).finally(() => loading.value = false)
// }

// function getNomeSede(id) {

//   if (sediOptions.value.length > 0) {
//     return sediOptions.value.filter(x => x.id == id)[0].nome
//   }
//   return false


// }


function getList() {
  console.log('get list', items.value)
}


</script>
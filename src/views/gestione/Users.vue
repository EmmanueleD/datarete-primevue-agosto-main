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
          :globalFilterFields="[
            'nome',
            'cognome',
            'luogonascita',
            'email',
            'telefono',
            'username',
            'cellulare',
          ]"
          v-model:filters="filters1"
          filterDisplay="menu"
          :scrollable="true"
          table-layout="auto"
          ref="dt"
        >
          <template #header>
            <div class="flex justify-content-between">
              <Button
                type="button"
                icon="pi pi-filter-slash"
                label="Pulisci i Filtri"
                class="p-button-outlined"
                @click="clearFilter1()"
              />
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters1['global'].value"
                  placeholder="Cerca..."
                />
              </span>
            </div>
          </template>
          <Column field="id" header="ID"></Column>
          <Column field="imgprofilo">
            <template #body="{ data }">
              <Avatar
                v-if="data.imgprofilo"
                :image="data.imgprofilo"
                class="mr-2"
                size="xlarge"
              />
              <Avatar
                v-else
                :label="data.nome.charAt(0) + data.cognome.charAt(0)"
                class="mr-2"
                size="xlarge"
              />
            </template>
          </Column>
          <Column field="nome" header="Nome completo">
            <template #body="{ data }">
              {{ data.nome }} {{ data.cognome }}
            </template>
          </Column>
          <Column field="email" header="Email">
            <template #body="{ data }">
              {{ data.email }}
            </template>
          </Column>
          <Column field="luogonascita" header="Luogo">
            <template #body="{ data }">
              {{ data.luogonascita }}
            </template>
          </Column>
          <Column field="attivo" header="Attivo">
            <template #body="{ data }">
              <i v-if="data.attivo" class="pi pi-fw pi-check"></i>
              <i v-else class="pi pi-fw pi-times"></i>
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
                @click="showDocumentiSidebar(data)"
                icon="pi pi-fw pi-file"
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
    @hide="$emit('event_HideUsersSidebar')"
  >
    <UsersSidebar
      @event_HideUsersSidebar="event_HideUsersSidebar"
      :sidebarData="sidebarData"
    >
    </UsersSidebar>
  </Sidebar>
  <Sidebar
    v-model:visible="sidebarDocumentiVisible"
    :baseZIndex="10000"
    position="right"
    class="p-sidebar-lg"
    @hide="$emit('event_HideUsersSidebar')"
  >
    <sbUserDocumenti :sidebarData="sidebarDocumentiData"></sbUserDocumenti>
  </Sidebar>
</template>

<script setup>
import { ref, computed } from "vue"
import { useStore } from "vuex"
import { useConfirm } from "primevue/useconfirm"
import { useToast } from "primevue/usetoast"

import AxiosService from "@/axiosServices/AxiosService"
import TableSkeleton from "@/components/skeletons/TableSkeleton.vue"
import UsersSidebar from "@/components/sidebars/UsersSidebar.vue"
import sbUserDocumenti from "@/components/sidebars/sbUserDocumenti.vue"

import { FilterMatchMode } from "primevue/api"

const store = useStore()
function setContentLoading_true() {
  store.dispatch("CONTENTLOADING_TRUE")
}
function setContentLoading_false() {
  store.dispatch("CONTENTLOADING_FALSE")
}
const contentLoading = computed(() => store.getters.contentLoading)

const confirm = useConfirm()
const toast = useToast()

const data = ref()

// GET DATA FOR THE VIEW
function getViewData() {
  const serviceGET = new AxiosService(view.endpointGET)
  setContentLoading_true()
  serviceGET
    .read()
    .then((res) => {
      if (res) {
        data.value ? (data.value.length = 0) : null
        data.value = res
        toast.add({
          severity: "success",
          summary: "Lista Opzioni Caricata",
          life: 3000,
        })
        setContentLoading_false()
      }
    })
    .catch((err) => {
      toast.add({
        severity: "error",
        summary: "Errore nel caricamento della lista delle Opzioni",
        detail: err,
        life: 3000,
      })
      setContentLoading_false()
    })
}

// SETTING VIEW
const view = {
  title: "Utenti",
  endpointGET: "Auth/Users",
  endpointPOST: "Auth/Users",
  endpointPUT: "Auth/Users", // /ID
  endpointDELETE: "Auth/Users", // /ID
}

const viewDocumenti = {
  title: "Documenti Utenti",
  endpointGET: "Auth/UserDocuments/",
  endpointPOST: "Auth/AddUserDocuments/",
  endpointPUT: "Auth/UpdateUserDocuments/", // /ID
  endpointDELETE: "Auth/DeleteUserDocuments/", // /ID
}

// SETTINGS AND DYNAMICS SIDEBAR
const sidebarVisible = ref(false)
const sidebarData = ref({
  view: view,
  event: {},
})
function showSidebar(event) {
  sidebarData.value.event = event
  sidebarVisible.value = true
}
function event_HideUsersSidebar() {
  sidebarVisible.value = false
  sidebarData.value = {
    view: view,
    event: {},
  }
  getViewData()
}

const sidebarDocumentiVisible = ref(false)
const sidebarDocumentiData = ref({
  view: viewDocumenti,
  event: {},
})
function showDocumentiSidebar(event) {
  sidebarDocumentiVisible.value = true
  sidebarDocumentiData.value.event = event
}
function event_HideDocumentiSidebar() {
  sidebarDocumentiVisible.value = false
  sidebarDocumentiData.value = {
    view: viewDocumenti,
    event: {},
  }
  getViewData()
}

// DELETE OPTION
function confirmDelete(element) {
  confirm.require({
    message: 'Sei sicuro di voler eliminare "' + element.nome + '"',
    header: "Conferma Eliminazione",
    icon: "pi pi-fw pi-trash",
    acceptClass: "p-button-danger",
    accept: () => {
      deleteStato(element)
    },
    reject: () => {
      return
    },
  })
}
const serviceDELETE = new AxiosService(view.endpointDELETE)
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
        })
        data.value ? (data.value.length = 0) : null
        getViewData()
      }
    })
    .catch((error) => {
      toast.add({
        severity: "error",
        summary: "Errore nell'eliminazione dell'opzione'",
        detail: error,
        life: 3000,
      })
      data.value ? (data.value.length = 0) : null
      getViewData()
    })
}

// DATATABLE AND FILTERS SETTINFG
const filters1 = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

function clearFilter1() {
  initFilters1()
}
function initFilters1() {
  filters1.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  }
}

getViewData()
</script>

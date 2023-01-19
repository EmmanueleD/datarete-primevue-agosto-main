<template>
  <div class="wrapper">

    <ConfirmDialog></ConfirmDialog>


    <h1>Stati Pratiche</h1>

    <Card class="mb-4">
      <template #content>
        <div class="flex justify-content-end">
          <Button label="Nuovo Stato Anagrafiche" @click="showSidebar({})" class="p-button-info"></Button>
        </div>
      </template>
    </Card>

    <Card class="mb-4">
      <template #content>
        <div v-if="contentLoading" class="content-loading">
          <Skeleton></Skeleton>
        </div>
        <div v-else>
          <VueDraggableNext class="dragArea list-group" :list="statiAnagrafiche" @change="dragged($event)">
            <div class="list-group-item" v-for="element in statiAnagrafiche" :key="element.id">
              <div>
                <Chip v-if="element.displayLead" label="Lead" icon="pi pi-flag" class="mr-2 mb-2 custom-chip" />
                <Chip v-if="element.displayCliente" label="Cliente" icon="pi pi-users" class="mr-2 mb-2 custom-chip" />


                <span>{{ element.nome }}</span>
              </div>
              <div>
                <Button @click="showSidebar(element)" icon="pi pi-fw pi-pencil"
                  class="mr-2 p-button-rounded p-button-info"></Button>
                <Button @click="confirmDelete(element)" icon="pi pi-fw pi-trash"
                  class="p-button-rounded p-button-danger"></Button>
              </div>
            </div>
          </VueDraggableNext>
        </div>
      </template>
    </Card>

    <Sidebar v-model:visible="sidebarVisible" :baseZIndex="10000" position="right" class="p-sidebar-md"
      @hide="$emit('event_hideSidebar')">

      <StatoAnagrafica :sidebarData="sidebarData"></StatoAnagrafica>
    </Sidebar>


  </div>
</template>

<script setup >
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast'

import AxiosService from '@/axiosServices/AxiosService';
import { VueDraggableNext } from 'vue-draggable-next'
import StatoAnagrafica from '../../components/sidebars/StatoAnagrafica.vue'

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

const serviceDELETE = new AxiosService('Options/StatiAnagrafiche/DeleteStato')
function deleteStato(element) {
  serviceDELETE.delete(element.id).
    then(res => {
      if (res) {
        toast.add({ severity: 'success', summary: 'Stato Eliminato', detail: element.nome, life: 3000 });
        getData()
      }
    })
    .catch(error => {
      toast.add({ severity: 'error', summary: "Errore nell'eliminazione dello stato", detail: error, life: 3000 });
      getData()
    })
}


const sidebarVisible = ref(false)
const sidebarData = ref()
function showSidebar(event) {
  sidebarVisible.value = true
  sidebarData.value = event
}
function hideSidebar() {
  sidebarVisible.value = false
  sidebarData.value = {}
}

const serviceGET = new AxiosService('Options/StatiAnagrafiche/GetStati')
const statiAnagrafiche = ref()

function getData() {
  setContentLoading_true()
  serviceGET.read()
    .then(res => {
      statiAnagrafiche.value = res
      setContentLoading_false()
    })
}

function dragged(event) {
  console.log("🚀 ~ file: StatiAnagrafica.vue ~ line 49 ~ dragged ~ event", event)
}


getData()

</script>
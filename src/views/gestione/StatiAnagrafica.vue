<template>
  <div class="wrapper">

    <ConfirmDialog></ConfirmDialog>


    <h1>Stati Anagrafiche</h1>

    <Card class="mb-4">
      <template #content>
        <div class="flex justify-content-end">
          <Button label="Nuovo Stato Anagrafiche" @click="showStatoAnagrafica({})" class="p-button-info"></Button>
        </div>
      </template>
    </Card>

    <Card class="mb-4">
      <template #content>
        <div v-if="contentLoading" class="content-loading">
          <Skeleton></Skeleton>
        </div>
        <div v-else-if="statiAnagrafiche">

          <nested-draggable @showSidebar="showStatoAnagrafica({})" @end="onEnd" :tasks="statiAnagrafiche">
          </nested-draggable>

        </div>

      </template>
    </Card>



    <Sidebar v-model:visible="statoAnagraficaVisible" :baseZIndex="10000" position="right" class="p-sidebar-md"
      @hide="$emit('event_HideStatoAnagrafica')" @event_refreshList="hideSidebar">

      <StatoAnagrafica :sidebarData="statoAnagraficaData"></StatoAnagrafica>
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
import nestedDraggable from '../../components/nested.vue'
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

function onEnd(event) {
  console.log("🚀 ~ file: StatiAnagrafica.vue:86 ~ onEnd ~ event", event, statiAnagrafiche.value)
  const service = new AxiosService()
  service.updateWithoutId('Options/StatiAnagrafiche/UpdateArrayOrder', statiAnagrafiche.value)
    .finally(() => getStatiAnagrafiche())

}

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
        getStatiAnagrafiche()
      }
    })
    .catch(error => {
      toast.add({ severity: 'error', summary: "Errore nell'eliminazione dello stato", detail: error, life: 3000 });
      getStatiAnagrafiche()
    })
}


const statoAnagraficaVisible = ref(false)
const statoAnagraficaData = ref()
function showStatoAnagrafica(event) {
  console.log("🚀 ~ file: StatiAnagrafica.vue:109 ~ showStatoAnagrafica ~ event", event)
  statoAnagraficaVisible.value = true
  statoAnagraficaData.value = event
}
function hideStatoAnagrafica() {
  statoAnagraficaVisible.value = false
  statoAnagraficaData.value = {}
}

const serviceGET = new AxiosService('Options/StatiAnagrafiche/GetStati/0')
const statiAnagrafiche = ref()

function getStatiAnagrafiche() {
  setContentLoading_true()
  serviceGET.read()
    .then(res => {
      statiAnagrafiche.value = res
      setContentLoading_false()
    })
}

function hideSidebar() {
  statoAnagraficaVisible.value = false
  statoAnagraficaData.value = {}
  getStatiAnagrafiche()
}

function dragged(event) {
  console.log("🚀 ~ file: StatiAnagrafica.vue ~ line 49 ~ dragged ~ event", event)
}


getStatiAnagrafiche()

</script>
<template>
  <div class="wrapper">

    <ConfirmDialog></ConfirmDialog>


    <h1>Stati Evento</h1>

    <Card class="mb-4">
      <template #content>
        <div class="flex justify-content-end">
          <Button label="Nuovo Stato Evento" @click="showStatoEvento({})" class="p-button-info"></Button>
        </div>
      </template>
    </Card>

    <Card class="mb-4">
      <template #content>
        <div v-if="contentLoading" class="content-loading">
          <Skeleton></Skeleton>
        </div>
        <div v-else>
          <VueDraggableNext class="dragArea list-group" :list="statiEvento" @change="dragged($event)">
            <div class="list-group-item" v-for="element in statiEvento" :key="element.id">
              <div>
                <!-- <Chip v-if="element.displayLead" label="Lead" icon="pi pi-flag" class="mr-2 mb-2 custom-chip" />
                <Chip v-if="element.displayCliente" label="Cliente" icon="pi pi-users" class="mr-2 mb-2 custom-chip" /> -->


                <span>{{ element.nome }}</span>
              </div>
              <div>
                <Button @click="showStatoEvento(element)" icon="pi pi-fw pi-pencil"
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
      @hide="$emit('event_HideOptionsManager')">
      <OptionsManager :sidebarData="sidebarData">
      </OptionsManager>
    </Sidebar>
    <!-- <StatiEvento :sidebarVisible="statiEventoVisible" :sidebarData="statiEventoData" @StatiEvento="StatiEvento"
      @event_refreshList="getstatiEvento"></StatiEvento> -->
  </div>
</template>

<script setup >
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast'

import AxiosService from '@/axiosServices/AxiosService';
import { VueDraggableNext } from 'vue-draggable-next'
// import StatiEvento from '../../components/sidebars/StatiEvento.vue'

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

const serviceDELETE = new AxiosService('Options/statiEvento/DeleteStato')
function deleteStato(element) {
  console.log(" ENDPOINT DELETE STATO EVENTO  🚀 ~ file: StatiEvento.vue ~ line 88 ~ deleteStato ~ element", element)
  // serviceDELETE.delete(element.id).
  //   then(res => {
  //     if (res) {
  //       toast.add({ severity: 'success', summary: 'Stato Eliminato', detail: element.nome, life: 3000 });
  //       getstatiEvento()
  //     }
  //   })
  //   .catch(error => {
  //     toast.add({ severity: 'error', summary: "Errore nell'eliminazione dello stato", detail: error, life: 3000 });
  //     getstatiEvento()
  //   })
}


const statiEventoVisible = ref(false)
const statiEventoData = ref()
function showStatoEvento(event) {
  statiEventoVisible.value = true
  statiEventoData.value = event
}
function hidestatiEvento() {
  statiEventoVisible.value = false
  statiEventoData.value = {}
}

const serviceGET = new AxiosService('Options/statiEvento/GetStati')
const statiEvento = ref()

function getstatiEvento() {
  setContentLoading_true()
  serviceGET.read()
    .then(res => {
      statiEvento.value = res
      setContentLoading_false()
    })
}

function dragged(event) {
  console.log("🚀 ~ file: StatiAnagrafica.vue ~ line 49 ~ dragged ~ event", event)
}


// getstatiEvento()

</script>
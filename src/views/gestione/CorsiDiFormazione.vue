<template>

  <div class="wrapper">
    <ConfirmDialog></ConfirmDialog>
    <h1>{{ view.title }}</h1>
    <Card>
      <template #content>
        <div class="flex justify-content-end">
          <Button label="Aggiungi Opzione" @click="showCorsoSidebar({})" class="p-button=info"></Button>
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
          <Column field="titolo" header="TITOLO">
            <template #body="{ data }">
              {{ data.titolo }}
            </template>
          </Column>
          <!-- <Column field="descrizione" header="DESCRIZIONE">
            <template #body="{ data }">
              {{ data.descrizione }}
            </template>
          </Column> -->
          <Column field="data_inizio" header="DATA INIZIO">
            <template #body="{ data }">
              {{ formatDateTime(data.data_inizio) }}
            </template>
          </Column>
          <Column field="data_fine" header="DATA FINE">
            <template #body="{ data }">
              {{ formatDateTime(data.data_fine) }}
            </template>
          </Column>
          <Column field="luogo" header="LUOGO">
            <template #body="{ data }">
              {{ data.luogo.text }}
            </template>
          </Column>
          <Column header="Azioni" style="max-width: 200px">
            <template #body="{ data }">
              <Button @click="goto(data.id)" icon="pi pi-fw pi-calendar"
                class="mr-2 p-button-rounded p-button-info"></Button>
              <Button @click="showCorsoSidebar(data)" icon="pi pi-fw pi-pencil"
                class="mr-2 p-button-rounded p-button-info"></Button>
              <Button @click="confirmDelete(data)" icon="pi pi-fw pi-trash"
                class="p-button-rounded p-button-danger"></Button>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
  <Sidebar v-model:visible="corsoSidebarVisible" :baseZIndex="10000" position="right" class="p-sidebar-md"
    @hide="$emit('event_HideOptionsManager')">
    <sbCorsiFormazione :sidebarData="corsoSidebarData">
    </sbCorsiFormazione>
  </Sidebar>
  <Sidebar v-model:visible="dateSidebarVisible" :baseZIndex="10000" position="right" class="p-sidebar-lg"
    @hide="$emit('event_HideOptionsManager')">
    <SbDateCorsoDiFormazione :sidebarData="dateSidebarData">
    </SbDateCorsoDiFormazione>
  </Sidebar>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast'

import AxiosService from '@/axiosServices/AxiosService';
import TableSkeleton from '@/components/skeletons/TableSkeleton.vue';
import sbCorsiFormazione from '@/components/sidebars/sbCorsiFormazione.vue'
import SbDateCorsoDiFormazione from '@/components/sidebars/sbDateCorsoDiFormazione.vue';

const router = useRouter()

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
  data.value = [
    {
      id: 1,
      titolo: 'Corso Procacciatori e Agenti di Commercio',
      descrizione: 'Valido per chiunque si interfacci con i clienti, che si tratti di un agente di commercio o di personale di vendita che svolge la sua attività ...',
      data_inizio: new Date('03/04/2022'),
      data_fine: new Date('03/13/2022'),
      luogo: {
        value: 1,
        text: 'Sala riunioni A'
      }
    },
    {
      id: 2,
      titolo: 'Tecniche di vendita',
      descrizione: 'Come riuscire a vendere e come vendere di più',
      data_inizio: new Date('02/18/2022'),
      data_fine: new Date('02/20/2022'),
      luogo: {
        value: 4,
        text: 'Sala riunioni D'
      }
    },
    {
      id: 3,
      titolo: 'Tecniche di comunicazione e persuasione rapide al telefono e in streming',
      descrizione: 'Ogni settore sta perdendo quantitativi di fatturato dovuto alla impossibilità di agenti, venditori e sales manager di interagire efficacemente con i clienti',
      data_inizio: new Date('02/19/2022'),
      data_fine: new Date('02/22/2022'),
      luogo: {
        value: 2,
        text: 'Sala riunioni B'
      }
    },
    {
      id: 4,
      titolo: 'Corso di sicurezza in Ufficio',
      descrizione: '',
      data_inizio: new Date('01/02/2022'),
      data_fine: new Date('01/02/2022'),
      luogo: {
        value: 1,
        text: 'Sala riunioni A'
      }
    }
  ]
  // const serviceGET = new AxiosService(view.endpointGET)
  // setContentLoading_true()
  // serviceGET.read()
  //   .then(res => {
  //     if (res) {
  //       data.value ? data.value.length = 0 : null
  //       data.value = res
  //       toast.add({ severity: 'success', summary: 'Lista Opzioni Caricata', life: 3000 });
  //       setContentLoading_false()
  //     }
  //   })
  //   .catch(err => {
  //     toast.add({ severity: 'error', summary: 'Errore nel caricamento della lista delle Opzioni', detail: err, life: 3000 });
  //     setContentLoading_false()
  //   })
}

// SETTING VIEW
const view = {
  title: 'Corsi di Formazione',
  // endpointGET: 'Options/Sesso',
  // endpointPOST: 'Options/Sesso',
  // endpointPUT: 'Options/Sesso', // /ID
  // endpointDELETE: 'Options/Sesso' // /ID
}

// SETTINGS AND DYNAMICS SIDEBARS
const corsoSidebarVisible = ref(false)
const corsoSidebarData = ref({
  view: view,
  event: {}
})
function showCorsoSidebar(event) {
  corsoSidebarData.value.event = event
  corsoSidebarVisible.value = true
}
function corsoHideSidebar() {
  corsoSidebarVisible.value = false
  corsoSidebarData.value = {
    view: view,
    event: {}
  }
}

function goto(id) {
  router.push('/gestione/dettaglio-corso/' + id)
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


//util functions
function formatDateTime(value) {
  if (value) {
    let dateString = ''
    dateString = new Date(value).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    let timeString = ''
    timeString = new Date(value).toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit'
    })

    let totString = dateString + ' ' + timeString
    return totString
  }
  return ''
}

getViewData()
</script>
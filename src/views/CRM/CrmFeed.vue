<template>
  <ConfirmDialog></ConfirmDialog>
  <div class="wrapper">
    <Toast></Toast>

    <TabView ref="tabview1" v-model:activeIndex="active">
      <TabPanel header="Anagrafica">
        <NuovaAnagrafica :showAnagrafica="true" :showIndirizzi="false" :showContatti="false" :showDocumenti="false"
          :sidebarData="{ ID: route.params.idAnagrafica }"></NuovaAnagrafica>
      </TabPanel>
      <TabPanel header="Indirizzi">
        <NuovaAnagrafica :showAnagrafica="false" :showIndirizzi="true" :showContatti="false" :showDocumenti="false"
          :sidebarData="{ ID: route.params.idAnagrafica }"></NuovaAnagrafica>

      </TabPanel>
      <TabPanel header="Contatti">
        <NuovaAnagrafica :showAnagrafica="false" :showIndirizzi="false" :showContatti="true" :showDocumenti="false"
          :sidebarData="{ ID: route.params.idAnagrafica }"></NuovaAnagrafica>

      </TabPanel>
      <TabPanel header="Documenti">
        <NuovaAnagrafica :showAnagrafica="false" :showIndirizzi="false" :showContatti="false" :showDocumenti="true"
          :sidebarData="{ ID: route.params.idAnagrafica }"></NuovaAnagrafica>

      </TabPanel>
      <TabPanel header="Timeline">

        <div class="py-2 px-6">
          <CrmPostPutNota @reloadFeed="getCrmItems"></CrmPostPutNota>
        </div>



        <Divider></Divider>

        <Card class="mb-2" v-for="item of tutteLeAttivita" :key="item.id">
          <template #content>
            <CrmItemNota @confirmDeleteItem="confirmDeleteItem($event)" @reloadFeed="getCrmItems"
              v-if="item.id_type == 1" :item="item">
            </CrmItemNota>
            <CrmItemAppuntamento v-if="item.id_type == 2" :item="item"></CrmItemAppuntamento>
            <CrmItemPratica v-if="item.id_type == 3" :item="item"></CrmItemPratica>
          </template>
        </Card>
      </TabPanel>
      <TabPanel header="Attività">
        <div class="w-full flex flex-column mb-4 p-2">
          <div class="w-full flex justify-content-end mb-4 p-2">
            <Button @click="showSidebarEventi(currentProfile)" label="Nuova attività" icon="pi pi-calendar"></Button>
          </div>
        </div>
        <FullCalendar :options="calendarOptions"></FullCalendar>
      </TabPanel>
      <TabPanel header="Preventivi">

        <div class="w-full flex flex-column">
          <div class="w-full flex justify-content-end">
            <SplitButton label="Nuovo preventivo" icon="pi pi-plus" :model="buttonNuovoPreventivo"></SplitButton>
          </div>
        </div>

        <Preventivi :idAnagrafica="route.params.idAnagrafica" :headerVisible="false" :searchVisible="false">
        </Preventivi>

      </TabPanel>
      <TabPanel header="Pratiche"></TabPanel>
      <TabPanel header="Altri Impegni">
        <Card>
          <template #content>
            <div class="flex w-full justify-content-end">
              <Button @click="showSidebarAltriImpegni" icon="pi pi-plus" label="Aggiungi Attività"></Button>
            </div>
          </template>
        </Card>
        <DataTable :value="altriImpegniData" :stripedRows="true" :paginator="true" :rows="10" :resizableColumns="true"
          :scrollable="true" table-layout="auto" ref="dt">
          <Column header="Azioni">
            <template #body="{ data }">
              <Button @click="showSidebarAltriImpegni(data)" icon="pi pi-pencil" class="p-button-rounded mr-2" />
              <Button @click="confirmDeleteAltriImpegni(data)" icon="pi pi-trash"
                class="p-button-danger p-button-rounded" />
            </template>
          </Column>
          <Column field="tipo" header="Tipo"></Column>
          <Column field="decorrenza" header="Decorrenza">
            <template #body="{ data }">
              {{ new Date(data.decorrenza).toLocaleDateString('it') }}
            </template>
          </Column>
          <Column field="importo_rata" header="Importo Rata"></Column>
          <Column field="gestione" header="Gestione"></Column>
          <Column field="erogato" header="Erogato">
            <template #body="{ data }">
              <i v-if="data.erogato" class="pi pi-check"></i>
              <i v-else class="pi pi-times"></i>
            </template>
          </Column>
          <Column field="istituto" header="Istituto"></Column>
          <Column field="durata_rate" header="Durata Rate"></Column>
          <Column field="tan" header="TAN"></Column>
          <Column field="estingue" header="Estingue">
            <template #body="{ data }">
              <i v-if="data.estingue" class="pi pi-check"></i>
              <i v-else class="pi pi-times"></i>
            </template>
          </Column>
          <Column field="perc_mediazione" header="perc_mediazione"></Column>

        </DataTable>
        <Sidebar v-model:visible="sidebarAltriImpegniVisible" :baseZIndex="10000" position="right" class="p-sidebar-md">
          <div class="wrapper">
            <h1>Modifica impegno</h1>
            <div class="flex w-full justify-content-between mb-4 flex-column">
              <span>Tipo</span>
              <InputText type="text" v-model="sidebarAltriImpegniData.tipo"></InputText>
            </div>
            <div class="flex w-full justify-content-between mb-4 flex-column">
              <span>Decorrenza</span>
              <Calendar v-model="sidebarAltriImpegniData.decorrenza"></Calendar>
            </div>
            <div class="flex w-full justify-content-between mb-4 flex-column">
              <span>Importo Rata</span>
              <InputNumber type="number" v-model="sidebarAltriImpegniData.importo_rata"></InputNumber>
            </div>
            <div class="flex w-full justify-content-between mb-4 flex-column">
              <span>Gestione</span>
              <InputText type="text" v-model="sidebarAltriImpegniData.gestione"></InputText>
            </div>
            <div class="flex w-full justify-content-start gap-4 align-items-center mb-4 ">
              <InputSwitch v-model="sidebarAltriImpegniData.erogato"></InputSwitch>
              <span>Erogato</span>
            </div>
            <div class="flex w-full justify-content-between mb-4 flex-column">
              <span>Istituto</span>
              <InputText type="text" v-model="sidebarAltriImpegniData.istituto"></InputText>
            </div>
            <div class="flex w-full justify-content-between mb-4 flex-column">
              <span>Durata Rate</span>
              <InputNumber type="number" v-model="sidebarAltriImpegniData.durata_rate"></InputNumber>
            </div>
            <div class="flex w-full justify-content-between mb-4 flex-column">
              <span>TAN</span>
              <InputNumber type="number" v-model="sidebarAltriImpegniData.tan"></InputNumber>
            </div>
            <div class="flex w-full justify-content-start gap-4 align-items-center mb-4 ">
              <InputSwitch v-model="sidebarAltriImpegniData.estingue"></InputSwitch>
              <span>Estingue</span>
            </div>
            <div class="flex w-full justify-content-between mb-4 flex-column">
              <span>Percentuale Mediazione</span>
              <InputNumber type="number" v-model="sidebarAltriImpegniData.perc_mediazione"></InputNumber>
            </div>
            <div class="w-full flex justify-content-end">
              <Button :loading="loading" @click="saveAltriImpegni" label="Salva"></Button>
            </div>
          </div>
        </Sidebar>
      </TabPanel>
      <TabPanel header="Allegati">
        <CRM_Allegati></CRM_Allegati>
      </TabPanel>
    </TabView>

  </div>
  <Sidebar v-model:visible="sidebarEventiVisible" :baseZIndex="10000" position="right" class="p-sidebar-md">
    <SidebarEventi @event_refreshEvents="resetSidebarEventi" :sidebarData="sidebarEventiData"></SidebarEventi>
  </Sidebar>
</template>

<script setup>
import { ref, watch } from 'vue';
import CrmItemNota from '@/components/CRM/CrmItemNota.vue';
import CrmItemAppuntamento from '@/components/CRM/CrmItemAppuntamento.vue';
import CrmItemPratica from '@/components/CRM/CrmItemPratica.vue';
import AxiosService from '@/axiosServices/AxiosService';
import { useRoute, useRouter } from 'vue-router'
import itLocale from '@fullcalendar/core/locales/it';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from "primevue/useconfirm";
import NuovaAnagrafica from '@/components/sidebars/NuovaAnagrafica.vue';
import '../../../node_modules/@fullcalendar/core/vdom'// solves problem with Vite
import FullCalendar from '@fullcalendar/vue3/dist/FullCalendar'
import dayGridPlugin from '../../../node_modules/@fullcalendar/daygrid'
import timeGridPlugin from '../../../node_modules/@fullcalendar/timegrid'
import interactionPlugin from '../../../node_modules/@fullcalendar/interaction'
import listPlugin from '../../../node_modules/@fullcalendar/list'
import bootstrap5Plugin from '../../../node_modules/@fullcalendar/bootstrap5';
import CRM_Allegati from '@/components/tabs/CRM_Allegati.vue';
import CrmPostPutNota from '@/components/CRM/CrmPostPutNota.vue';
import Preventivi from '../pratiche/Preventivi.vue';
import SidebarEventi from '@/components/sidebars/SidebarEventi.vue';
import store from '@/store';
const toast = useToast()
const confirm = useConfirm()
const route = useRoute()
const router = useRouter()

// eslint-disable-next-line no-undef
const props = defineProps({
  reloadFeed: Boolean,
  currentProfile: Object
})



// eslint-disable-next-line no-undef
const emits = defineEmits(['feedReloaded'])

// 1==nota, 2==appuntamenti, 3==pratiche
const active = ref(0)

const loading = ref(false)

const tutteLeAttivita = ref([])
const sidebarAltriImpegniVisible = ref(false)
const sidebarAltriImpegniData = ref({
  tipo: '',
  decorrenza: '',
  importo_rata: 0,
  gestione: '',
  erogato: '',
  istituto: '',
  durata_rate: 0,
  tan: '',
  estingue: true,
  perc_mediazione: 0
})
function showSidebarAltriImpegni(event) {
  sidebarAltriImpegniVisible.value = true
  sidebarAltriImpegniData.value = { ...event }
}
const altriImpegniData = ref([])
function getAltriImpegni() {
  loading.value = true
  console.log('get altri impegni')
  const service = new AxiosService('Anagrafiche/GetAltriImpegni/' + route.params.idAnagrafica)
  service.read()
    .then(res => {
      altriImpegniData.value = res
    })
    .finally(() => {
      loading.value = false
    })
}

const buttonNuovoPreventivo = [
  {
    label: 'Prestito',
    command: () => {
      router.push('/pratiche/preventivo-prestito/' + route.params.idAnagrafica + '/0')
    }
  },
  {
    label: 'Mutuo',
    command: () => {
      router.push('/pratiche/preventivo-mutuo/' + route.params.idAnagrafica + '/0')
    }
  },
  {
    label: 'Cessione del quinto',
    command: () => {
      router.push('/pratiche/preventivo-cqs/' + route.params.idAnagrafica + '/0')
    }
  }
]


function resetAltriImegnisideBar() {
  sidebarAltriImpegniData.value = {

    tipo: '',
    decorrenza: '',
    importo_rata: 0,
    gestione: '',
    erogato: '',
    istituto: '',
    durata_rate: 0,
    tan: '',
    estingue: true,
    perc_mediazione: 0
  }
}

function saveAltriImpegni() {
  loading.value = true
  if (sidebarAltriImpegniData.value.ID) {
    const service = new AxiosService('Anagrafiche/EditAltriImpegni')
    service.update(sidebarAltriImpegniData.value)
      .then(res => res)
      .finally(() => {
        resetAltriImegnisideBar()
        loading.value = false
        getAltriImpegni()
        sidebarAltriImpegniVisible.value = false
      })
  } else {
    const service = new AxiosService('Anagrafiche/AddAltriImpegni/' + route.params.idAnagrafica)
    service.create(sidebarAltriImpegniData.value)
      .then(res => res)
      .finally(() => {
        resetAltriImegnisideBar()
        loading.value = false
        getAltriImpegni()
        sidebarAltriImpegniVisible.value = false
      })
  }
}

function deleteAltriImpegni(element) {
  loading.value = true
  const service = new AxiosService('Anagrafiche/DeleteAltriImpegni')
  service.delete(element)
    .then(res => res)
    .finally(() => {
      loading.value = false
      getAltriImpegni()
    })
}


function confirmDeleteAltriImpegni(element) {
  confirm.require({
    message: 'Sei sicuro di voler eliminare questo elemento?',
    header: 'Conferma Eliminazione',
    icon: 'pi pi-fw pi-trash',
    acceptClass: 'p-button-danger',
    accept: () => {
      deleteAltriImpegni(element.ID || element.id)
    },
    reject: () => {
      return
    }
  })
}

getAltriImpegni()

function getCrmItems() {

  tutteLeAttivita.value.splice(0)
  console.log('getCrmItems')
  const serviceGET = new AxiosService('Crm/GetCrmRecord/')

  serviceGET.readCustomEndpoint('Crm/GetCrmRecord/' + route.params.idAnagrafica, '')
    .then(res => {
      tutteLeAttivita.value = res
    })
    .finally(() => {
      emits('feedReloaded')
    })

}

function confirmDeleteItem(element) {
  confirm.require({
    message: 'Sei sicuro di voler eliminare "' + element.oggetto + '"',
    header: 'Conferma Eliminazione',
    icon: 'pi pi-fw pi-trash',
    acceptClass: 'p-button-danger',
    accept: () => {
      deleteItem(element)
    },
    reject: () => {
      return
    }
  })
}

function deleteItem(item) {
  const serviceDELETE = new AxiosService('Crm/DeleteCrmRecord/' + route.params.isAnagrafica)
  serviceDELETE.deleteCustomWQuery('Crm/DeleteCrmRecord/' + route.params.isAnagrafica, item.id)
    .then(() => {
      toast.add(
        {
          severity: 'success',
          summary: 'Nota Eliminata',
          // detail: res,
          life: 3000
        }
      );
    })
    .catch((err) => {
      toast.add(
        {
          severity: 'error',
          summary: "Errore nell'eliminazione della Nota",
          detail: err,
          life: 3000
        }
      );
    })
    .finally(() => {
      getCrmItems()
    })

}

getCrmItems()

const currentDateInterval = ref([])

const calendarOptions = ref({
  datesSet: event => getEvents(event),
  plugins: [dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin, bootstrap5Plugin],
  themeSystem: "bootstrap5",
  headerToolbar: {

    right: 'timeGridWeek,timeGridDay listYear',
    center: 'title',
    left: 'prev,today,next'
  },
  lazyFetching: false,
  slotMinTime: '07:00',
  slotMaxTime: '22:00',
  slotDuration: '00:15:00',
  editable: true,
  height: 'auto',
  aspectRatio: 1,
  eventBackgroundColor: "#123123",
  eventBorderColor: "#ffffffff",
  events: [],
  initialView: 'listYear',
  eventDisplay: "auto",
  nowIndicator: true,
  locale: itLocale,
  // eventClick: eventClickHandler

})



function getEvents(event) {
  console.log("🚀 ~ file: PrenotazioneSale.vue ~ line 159 ~ getEvents ~ event", event)

  const starting = event.startStr.slice(0, 10)
  const ending = event.endStr.slice(0, 10)

  if (
    currentDateInterval.value[0] != starting ||
    currentDateInterval.value[1] != ending

  ) {
    const service = new AxiosService('Calendar/GetEvents/' + route.params.idAnagrafica + '/0')
    service.read()
      .then(res => {
        currentDateInterval.value[0] = event.startStr.slice(0, 10)
        currentDateInterval.value[1] = event.endStr.slice(0, 10)
        calendarOptions.value.events = res.map(x => {
          return {
            start: x.start,
            end: x.end,
            title: x.title,
            id: x.id
          }
        })
      })
  }
}


const sidebarEventiVisible = ref(false)
const sidebarEventiData = ref(null)
function showSidebarEventi(event) {

  sidebarEventiData.value = { ...event }

  const service = new AxiosService('Options/GetUsers')
  service.read()
    .then(res => {
      sidebarEventiData.value.userOptions = res
    })
    .finally(() => {
      sidebarEventiVisible.value = true
    })
}
function resetSidebarEventi() {
  sidebarEventiVisible.value = false
  sidebarEventiData.value = null
}


watch(() => props.reloadFeed, (first, second) => {
  console.log(' do something')
  getCrmItems()
})

</script>

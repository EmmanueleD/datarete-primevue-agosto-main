<template>
  <Toast></Toast>
  <div class="wrapper">
    <div class="mb-4 plugin-title flex justify-content-between align-items-center">
      <h1>Gestione Visitatori</h1>
      <Chip icon="pi pi-star-fill" label="PlugIn" class="small-chip custom-chip"></Chip>
    </div>
    <div class="grid">
      <div class="col-6">
        <h2 class="mb-4">Nuovo visitatore</h2>
        <Card>
          <template #content>
            <form @submit.prevent="handleSubmit">
              <div class="flex flex-column col-12">
                <label for="first-name">Nome</label>
                <InputText id="first-name" type="text" v-model="tempVisitatore.nome_visitatore" />
              </div>
              <div class="flex flex-column col-12">
                <label for="last-name">Cognome</label>
                <InputText id="last-name" type="text" v-model="tempVisitatore.cognome_visitatore" />
              </div>
              <div class="flex flex-column col-12">
                <label for="enterprise">Azienda</label>
                <InputText id="enterprise" type="text" v-model="tempVisitatore.azienda" />
              </div>
              <div class="flex flex-column col-12">
                <label for="target">Destinatario</label>
                <Dropdown :filter="true" v-model="tempVisitatore.id_user_visita" :options="destinatariOptions"
                  optionLabel="text" optionValue="value"></Dropdown>
              </div>
              <div class="flex flex-column col-12">
                <label for="goal">Motivo della visita</label>
                <InputText id="goal" type="text" v-model="tempVisitatore.motivo" />
              </div>
              <div class="flex flex-column col-12">
                <label for="goal">Data della visita</label>
                <Calendar v-model="tempVisitatore.data_visita" :showTime="true" />
              </div>
              <div class="mt-4 flex justify-content-end">
                <Button :loading="loading" @click="postVisitor" type="submit" label="Metti in coda"></Button>
              </div>
            </form>
          </template>
        </Card>
      </div>
      <div class="col-6 ">
        <h2 class="mb-4" role="button">
          <span @click="getWaitingVisitors" :class="{ 'grey-text': view == 'leaving' }">Visitatori in attesa </span>/
          <span @click="getLeavingVisitors" :class="{ 'grey-text': view == 'attesa' }"> Storico Visitatori</span>
        </h2>

        <!-- <VueDraggableNext class="dragArea list-group" :list="visitatori" @change="dragged($event)"> -->
        <div v-if="loading" style="width: 100%; height: 350px" class="grid-center">
          <i class="pi pi-fw pi-spin pi-spinner" style="font-size: 2rem"></i>
        </div>
        <div v-else>
          <Card v-for="(item, i) in visitatori" :key="i" class=" mb-4">
            <template #content>
              <div class="grid">
                <div class="col-6 flex flex-column">
                  <span>
                    <h4>{{ item.cognome_visitatore }} {{ item.nome_visitatore }}</h4>
                  </span>
                  <span><i>{{ item.azienda }}</i></span>
                </div>
                <div class="col-6 flex flex-column justify-content-between">
                  <span>
                    Per: {{ item.nome_user_visita }}
                  </span>
                  <span>{{ formatDate(item.data_visita) }}</span>

                  <span>Motivo: {{ item.motivo }}</span>
                </div>
              </div>
              <div class="grid pt-2">
                <div class="col-6 flex justify-content-start align-items-center">
                  <i role="button" @click="deleteVisita(item)" class="pi pi-fw pi-trash" style="color:brown"></i>
                </div>
                <div v-if="view == 'attesa'" class="col-6 flex justify-content-end">
                  <Button @click="setVisto(item)" icon="pi pi-check"
                    class="p-button-rounded p-button-poutlined"></Button>
                </div>
              </div>
            </template>
          </Card>
        </div>
        <!-- </VueDraggableNext> -->

      </div>
    </div>
  </div>
</template>

<script setup>
import AxiosService from '@/axiosServices/AxiosService';
import { useToast } from 'primevue/usetoast';
// import { VueDraggableNext } from 'vue-draggable-next'
// import { datetimeToString } from '../../utils/DatetimeUtils'

import { ref } from 'vue';

const loading = ref(false)
const toast = useToast()
// GET VISITORS LIST [ON MOUNTED]
const serviceGETVisitors = new AxiosService('Plugin/Visitatori/Lista/0')
const serviceGETLeaving = new AxiosService('Plugin/Visitatori/Lista/1')

const view = ref('attesa')

function getLeavingVisitors() {
  loading.value = true
  view.value = 'leaving'
  serviceGETLeaving.read()
    .then(res => {
      toast.add(
        {
          severity: 'success',
          summary: 'Caricamento Visite Completato',
          // detail: res,
          life: 3000
        }
      );
      visitatori.value.splice(0)
      visitatori.value = res
    })
    .catch(err => console.log(err))
    .finally(() => loading.value = false)
}

function getWaitingVisitors() {
  loading.value = true
  view.value = 'attesa'
  serviceGETVisitors.read()
    .then(res => {
      toast.add(
        {
          severity: 'success',
          summary: 'Caricamento Visite Completato',
          // detail: res,
          life: 3000
        }
      );
      visitatori.value.splice(0)
      visitatori.value = res
    })
    .catch(err => console.log(err))
    .finally(() => loading.value = false)
}

getWaitingVisitors()


// POST NEW VISITOR
const servicePOSTVisitor = new AxiosService('Plugin/Visitatori/AddVisit/')
async function postVisitor() {
  await servicePOSTVisitor.create(tempVisitatore.value)
    .then(() => {
      toast.add(
        {
          severity: 'success',
          summary: 'Caricamento Visite Completato',
          // detail: res,
          life: 3000
        }
      );
    })
  getWaitingVisitors()
}

const tempVisitatore = ref({
  nome_visitatore: '',
  cognome_visitatore: '',
  azienda: '',
  motivo: '',
  id_user_visita: null,
  data_visita: new Date(),
  visto: false
})
const visitatori = ref([])

function handleSubmit() {
  const currentVisitatore = { ...tempVisitatore.value }
  visitatori.value.push(currentVisitatore)
}

// function dragged(event) {
//   console.log("🚀 ~ file: StatiAnagrafica.vue ~ line 49 ~ dragged ~ event", event)
// }

const destinatariOptions = ref([])
const destinatarioSelected = ref(null)
function getDestinatariOptions() {
  const service = new AxiosService('Options/GetUsers')
  service.read().then(res => destinatariOptions.value = res).catch(err => console.log(err))
}

function deleteVisita(item) {
  loading.value = true
  const serviceDELETE = new AxiosService('Plugin/Visitatori/DeleteVisit')
  serviceDELETE.delete(item.id)
    .then(() => {
      toast.add(
        {
          severity: 'success',
          summary: 'Visita Eliminata',
          // detail: res,
          life: 3000
        }
      );
    })
    .catch(err => console.log(err))
    .finally(() => getWaitingVisitors())
}

function formatDate(date) {
  return new Date(date).toLocaleDateString(['it-IT']) + ' ' + new Date(date).toLocaleTimeString(['it-IT'], { hour: '2-digit', minute: '2-digit' })
}

function setVisto(item) {
  loading.value = true
  const servicePOST = new AxiosService('Plugin/Visitatori/VistoVisit/' + item.id)
  servicePOST.create()
    .then(res => console.log(res))
    .catch(err => console.log(err))
    .finally(() => {
      getWaitingVisitors()
    })
}

getDestinatariOptions()
</script>

<style lang="scss" scoped>
.grey-text {
  color: grey;
}
</style>
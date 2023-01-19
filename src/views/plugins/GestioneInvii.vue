<template>
  <Toast></Toast>
  <div class="wrapper">
    <div class="mb-4 plugin-title flex justify-content-between align-items-center">
      <h1>Gestione Invii</h1>
      <Chip icon="pi pi-star-fill" label="PlugIn" class="small-chip custom-chip"></Chip>
    </div>
    <div class="grid">
      <div class="col-4">
        <h2 class="mb-4">Nuovo Invio</h2>
        <Card>
          <template #content>
            <form @submit.prevent="handleSubmit">
              <div class="flex flex-column col-12">
                <label>Mittente</label>
                <Dropdown :filter="true" v-model="tmpInvio.id_mittente" :options="utentiOptions" optionLabel="text"
                  optionValue="value">
                </Dropdown>
              </div>
              <div class="flex flex-column col-12">
                <label>Destinatario</label>
                <Dropdown :filter="true" v-model="tmpInvio.id_destinatario" :options="utentiOptions" optionLabel="text"
                  optionValue="value"></Dropdown>
              </div>
              <div class="flex flex-column col-12">
                <label for="enterprise">Sede destinazione</label>
                <Dropdown :filter="true" v-model="tmpInvio.sede_destinazione" :options="sediOptions" optionLabel="nome"
                  optionValue="id"></Dropdown>
              </div>
              <div class="flex flex-column col-12">
                <label for="target">Contenuto corrispondenza</label>
                <InputText v-model="tmpInvio.contenuto_corrispondenza" type="text"></InputText>
              </div>

              <div class="mt-4 flex justify-content-end">
                <Button :loading="loading" @click="postShipment" type="submit" label="Metti in coda"></Button>
              </div>
            </form>
          </template>
        </Card>
      </div>
      <div class="col-8 ">
        <h2 class="mb-4" role="button">
          <span @click="getQueuedShipment" :class="{ 'grey-text': (view == 'traveling' || view == 'recived') }">Invii
            in coda </span>
          <span @click="getTravelingShipment" :class="{ 'grey-text': (view == 'queued' || view == 'recived') }">/ Invii
            in transito </span>
          <span @click="getRecivedShipment" :class="{ 'grey-text': (view == 'traveling' || view == 'queued') }">/ Invii
            ricevuti</span>
        </h2>

        <!-- <VueDraggableNext class="dragArea list-group" :list="visitatori" @change="dragged($event)"> -->
        <div v-if="loading" style="width: 100%; height: 350px" class="grid-center">
          <i class="pi pi-fw pi-spin pi-spinner" style="font-size: 2rem"></i>
        </div>
        <div v-else>
          <Card v-for="(item, i) in visitatori" :key="i" class=" mb-4">
            <template #content>
              <div class="grid">
                <div class="col-12 flex flex-column">
                  <div>
                    <div class="flex justify-content-between align-items-center">
                      <span>Da: {{ item.nome_mittente }}</span>
                      <span>A: {{ item.nome_destinatario }}</span>
                    </div>

                    <div>
                      <div v-if="item.id_utente_ricezione" class="flex justify-content-end mt-2">
                        <span>
                          Ricevuto da: {{ item.nome_utente_ricezione }}
                        </span>
                      </div>
                      <div class="flex justify-content-end">
                        <span style="font-weight: 700">
                          {{ item.nome_sede_destinazione }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 flex flex-column justify-content-between">
                  <span>
                    <span style="font-weight: 700">Contenuto</span>: {{ item.contenuto_corrispondenza }}
                  </span>
                  <Divider></Divider>
                  <span>
                    <span style="font-weight: 700">Data inserimento</span>: {{ formatDate(item.data_inserimento) }}
                  </span><span>
                    <span style="font-weight: 700">Data invio</span>: {{ formatDate(item.data_invio) }}
                  </span><span>
                    <span style="font-weight: 700">Data ricezione</span>: {{ formatDate(item.data_ricezione) }}
                  </span>
                </div>
              </div>
              <div class="grid pt-2">
                <div class="col-6 flex justify-content-start align-items-center">
                  <i role="button" @click="deleteShipment(item)" class="pi pi-fw pi-trash" style="color:brown"></i>
                </div>
                <div v-if="view == 'queued'" class="col-6 flex justify-content-end">
                  <Button @click="setInviato(item)" label="Segna come Inviato" class=" p-button-outlined"></Button>
                </div>
                <div v-if="view == 'traveling'" class="col-6 flex justify-content-end">
                  <Button :loading="loading" @click="setRicevuto(item)" label="Segna come Ricevuto"
                    class=" p-button-outlined"></Button>
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
import { useStore } from 'vuex';
import { ref } from 'vue';

const loading = ref(false)
const toast = useToast()
const store = useStore()
// GET VISITORS LIST [ON MOUNTED]
const serviceGETQueued = new AxiosService('Plugin/Spedizioni/2')
const serviceGETTraveling = new AxiosService('Plugin/Spedizioni/0')
const serviceGETRecived = new AxiosService('Plugin/Spedizioni/1')

const view = ref('queued')


function getQueuedShipment() {
  loading.value = true
  view.value = 'queued'
  serviceGETQueued.readCustomEndpoint('Plugin/Spedizioni/0')
    .then(res => {
      toast.add(
        {
          severity: 'success',
          summary: 'Caricamento Invii Completato',
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

function getTravelingShipment() {
  loading.value = true
  view.value = 'traveling'
  serviceGETTraveling.readCustomEndpoint('Plugin/Spedizioni/1')
    .then(res => {
      toast.add(
        {
          severity: 'success',
          summary: 'Caricamento Invii Completato',
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

function getRecivedShipment() {
  loading.value = true
  view.value = 'recived'
  serviceGETRecived.readCustomEndpoint('Plugin/Spedizioni/2')
    .then(res => {
      toast.add(
        {
          severity: 'success',
          summary: 'Caricamento Invii Completato',
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

getQueuedShipment()


// POST NEW VISITOR
const servicePOSTShipment = new AxiosService('Plugin/Spedizioni/InserisciSpedizione/')
async function postShipment() {
  tmpInvio.value.data_inserimento = new Date()
  await servicePOSTShipment.create(tmpInvio.value)
    .then(() => {
      toast.add(
        {
          severity: 'success',
          summary: 'Caricamento Invii Completato',
          // detail: res,
          life: 3000
        }
      );
    })
  getQueuedShipment()
}

const tmpInvio = ref({
  id_mittente: '',
  id_destinatario: '',
  sede_destinazione: '',
  contenuto_corrispondenza: '',
  data_invio: null,
  data_ricezione: null,
  data_inserimento: null,
  stato: 0,
  id_utente_ricezione: ''
})
const visitatori = ref([])

// function handleSubmit() {
//   const currentVisitatore = { ...tmpInvio.value }
//   visitatori.value.push(currentVisitatore)
// }

// function dragged(event) {
//   console.log("🚀 ~ file: StatiAnagrafica.vue ~ line 49 ~ dragged ~ event", event)
// }

const serviceGETUtentiOptions = new AxiosService('Options/GetUsers')
const utentiOptions = ref([])
function getUtentiOptions() {
  serviceGETUtentiOptions.read()
    .then(res => utentiOptions.value = res)
    .catch(err => console.log(err))
}
getUtentiOptions()

const serviceGETSediOptions = new AxiosService('Gestione/SediAzienda/GetSedi')
const sediOptions = ref([])
function getSediOptions() {
  serviceGETSediOptions.read()
    .then(res => sediOptions.value = res)
    .catch(err => console.log(err))
}
getSediOptions()

const statiInvioOptions = [
  {
    value: 0,
    text: 'Inserito'
  },
  {
    value: 1,
    text: 'Spedito'
  },
  {
    value: 2,
    text: 'Ricevuto'
  }
]

function deleteShipment(item) {
  loading.value = true
  const serviceDELETE = new AxiosService('Plugin/Spedizioni/EliminaSpediazione')
  serviceDELETE.delete(item.id)
    .then(() => {
      toast.add(
        {
          severity: 'success',
          summary: 'Invio Eliminato',
          // detail: res,
          life: 3000
        }
      );
    })
    .catch(err => console.log(err))
    .finally(() => getQueuedShipment())
}

function formatDate(date) {
  if (date) {
    return new Date(date).toLocaleDateString(['it-IT']) + ' ' + new Date(date).toLocaleTimeString(['it-IT'], { hour: '2-digit', minute: '2-digit' })
  }
  return ' ... '

}

function setInviato(item) {
  loading.value = true
  if (item.id) {
    loading.value = true
    item.stato = 1
    item.data_invio = new Date()
    const servicePUT = new AxiosService('Plugin/Spedizioni/AggiornaSpedizione')
    servicePUT.update(item)
      .then(res => res)
      .catch(err => console.log(err))
      .finally(() => {
        loading.value = false
        getTravelingShipment()
      })
  }
}

function setRicevuto(item) {
  loading.value = true
  if (item.id) {
    loading.value = true
    item.stato = 2
    item.data_ricezione = new Date()
    item.id_utente_ricezione = store.state.user.user.id
    const servicePUT = new AxiosService('Plugin/Spedizioni/AggiornaSpedizione')
    servicePUT.update(item)
      .then(res => res)
      .catch(err => console.log(err))
      .finally(() => {
        loading.value = false
        getRecivedShipment()
      })
  }
}


</script>

<style lang="scss" scoped>
.grey-text {
  color: grey;
}
</style>
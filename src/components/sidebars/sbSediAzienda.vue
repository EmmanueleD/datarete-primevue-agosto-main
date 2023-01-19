<template>
  <Toast></Toast>

  <h1 v-if="sidebarData.event.id">Modifica opzione</h1>
  <h1 v-else>Nuova opzione</h1>

  <div class="grid">
    <div class="flex flex-column col-12 col-md-7">
      <label for="nome">Nome</label>
      <InputText id="nome" type="text" v-model="tempItem.nome"></InputText>
    </div>

    <div class="flex flex-column col-8">
      <label for="indirizzo">Indirizzo</label>
      <InputText id="indirizzo" type="text" v-model="tempItem.indirizzo"></InputText>
    </div>
    <div class="flex flex-column col-3">
      <label for="civico">Civico</label>
      <InputText id="civico" type="text" v-model="tempItem.civico"></InputText>
    </div>

    <div class="flex flex-column col-6 ">
      <label for="tipo-sede">Tipo Sede</label>
      <Dropdown :filter="true" id="tipo-sede" v-model="tempItem.idTipoSede" :options="tipoSedeOptions"
        optionLabel="nome" optionValue="id" placeholder="Seleziona il tipo di Sede">
      </Dropdown>
    </div>

    <div class="col-12">
      <ChooserGeography :nazioneSelected="tempItem.idNazione" :regioneSelected="tempItem.idRegione"
        :provinciaSelected="tempItem.idProvincia" :cittaSelected="tempItem.idCitta"
        @event_geoFilter="populateTempItemFromGeoFilter($event, tempItem)"></ChooserGeography>
    </div>

    <div class="w-100 flex justify-content-end align-items-end col-12 col-md-2">
      <Button :loading="loading" label="Salva" @click="save"></Button>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits, defineProps, } from 'vue';
import { useToast } from 'primevue/usetoast'
import AxiosService from '@/axiosServices/AxiosService';
import ChooserGeography from '../ChooserGeography.vue';

const emits = defineEmits(['event_HideSbSediAzienda'])

const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object
})

const toast = useToast()
const servicePOST = new AxiosService(props.sidebarData.view.endpointPOST)
const servicePUT = new AxiosService(props.sidebarData.view.endpointPUT)

const loading = ref(false)

function checkPut() {
  console.log('checkPut')
  if (props.sidebarData.event) {
    console.log("🚀 ~ file: sbSediAzienda.vue ~ line 59 ~ checkPut ~ props.sidebarData.event", props.sidebarData.event)
    console.log('in if')
    tempItem.value.idNazione = props.sidebarData.event.idNazione
    tempItem.value.idRegione = props.sidebarData.event.idRegione
    tempItem.value.idProvincia = props.sidebarData.event.idProvincia
    tempItem.value.idCitta = props.sidebarData.event.idCitta
    tempItem.value.Regione = props.sidebarData.event.Regione
    tempItem.value.Provincia = props.sidebarData.event.Provincia
    tempItem.value.Citta = props.sidebarData.event.Citta
    tempItem.value.nome = props.sidebarData.event.nome
    tempItem.value.indirizzo = props.sidebarData.event.indirizzo
    tempItem.value.civico = props.sidebarData.event.civico
  }
}

// GEO FILTER
function populateTempItemFromGeoFilter(event, item) {
  console.log("🚀 ~ file: sbSediAzienda.vue ~ line 79 ~ populateTempItemFromGeoFilter ~ item", item)
  console.log("🚀 ~ file: sbSediAzienda.vue ~ line 79 ~ populateTempItemFromGeoFilter ~ event", event)
  item.idNazione = event.idNazione
  item.idRegione = event.idRegione
  item.idProvincia = event.idProvincia
  item.idCitta = event.idCitta
  item.Citta = event.Citta
  item.Provincia = event.Provincia
  item.Regione = event.Regione
}



// TIPI SEDE
const tipoSedeOptions = ref([])
const tipoSedeSelected = ref()
function getTipiSede() {

  const serviceGET = new AxiosService('Options/TipiSede')
  serviceGET.read()
    .then(res => {
      tipoSedeOptions.value = res
    })
    .catch(error => console.log(error))

}

//OBJ TO SEND TO API
// const tempItem = ref({
//   id: 0,
//   nome: "",
//   indirizzo: "",
//   civico: "",
//   idTipoSede: 0,
//   TipoSede: "",
//   idNazione: 0,
//   idRegione: 0,
//   Regione: "",
//   idProvincia: 0,
//   Provincia: "",
//   idCitta: 0,
//   Citta: ""
// })
const tempItem = ref({ ...props.sidebarData.event })
// API CONNECTIONS
function save() {
  loading.value = true
  if (props.sidebarData.event.id) {
    servicePUT.update(tempItem.value)
      .then(res => {
        if (res) {
          toast.add({ severity: 'success', summary: 'Nuova Opzione Creata', detail: props.sidebarData.event.nome, life: 3000 });
          emits('event_refreshList')
          emits('event_HideSbSediAzienda')
        }
      })
      .catch(error => {
        toast.add({ severity: 'error', summary: "'Errore nella modifica dell'opzione", detail: error, life: 3000 });
        emits('event_refreshList')
        emits('event_HideSbSediAzienda')
      })
      .finally(() => {
        loading.value = false
        emits('event_HideSbSediAzienda')
      })
  } else {
    servicePOST.create(tempItem.value)
      .then(res => {
        if (res) {
          toast.add({ severity: 'success', summary: 'Nuova Opzione Creata', detail: props.sidebarData.event.nome, life: 3000 });
          emits('event_refreshList')
          emits('event_HideSbSediAzienda')
        }
      })
      .catch(error => {
        toast.add({ severity: 'error', summary: "'Errore nella creazione dell'opzione", detail: error, life: 3000 });
        emits('event_refreshList')
        emits('event_HideSbSediAzienda')
      })
      .finally(() => {
        loading.value = false
        emits('event_HideSbSediAzienda')
      })
  }
}

getTipiSede()
</script>
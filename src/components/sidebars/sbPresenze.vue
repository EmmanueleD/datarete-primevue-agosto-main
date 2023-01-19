<template>
  <Toast></Toast>

  <h1 v-if="sidebarData.event.id">Presenze</h1>
  <div class="grid p-4">
    <div class="col-12 flex align-items-center gap-3 " v-for="partecipante in tempItem.partecipanti"
      :key="partecipante.value">
      <InputSwitch v-model="partecipante.presente" />
      <span>{{ partecipante.text }}</span>
    </div>


    <div class="w-100 flex justify-content-end align-items-end col-12 ">
      <Button label="Salva" @click="save"></Button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast'
import AxiosService from '@/axiosServices/AxiosService';

// eslint-disable-next-line no-undef
const emits = defineEmits(['event_HidesbArgomentiTicket', 'event_refreshList'])

// eslint-disable-next-line no-undef
const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object
})

const toast = useToast()
const servicePOST = new AxiosService(props.sidebarData.view.endpointPOST)
const servicePUT = new AxiosService(props.sidebarData.view.endpointPUT)

const loading = ref(false)

const tempItem = ref({
  titolo: '',
  descrizione: '',
  data_inizio: '',
  data_fine: '',
  luogo: {
    value: 0,
    text: ''
  },
  partecipanti: []
})
props.sidebarData.event ? tempItem.value = { ...props.sidebarData.event } : null
// API CONNECTIONS
function save() {
  if (props.sidebarData.event.id) {
    servicePUT.update(tempItem.value)
      .then(res => {
        if (res) {
          toast.add({ severity: 'success', summary: 'Nuova Opzione Creata', detail: props.sidebarData.event.nome, life: 3000 });
          emits('event_refreshList')
          emits('event_HidesbArgomentiTicket')
        }
      })
      .catch(error => {
        toast.add({ severity: 'error', summary: "'Errore nella modifica dell'opzione", detail: error, life: 3000 });
        emits('event_refreshList')
        emits('event_HidesbArgomentiTicket')
      })
  } else {
    servicePOST.create(tempItem.value)
      .then(res => {
        if (res) {
          toast.add({ severity: 'success', summary: 'Nuova Opzione Creata', detail: props.sidebarData.event.nome, life: 3000 });
          emits('event_refreshList')
          emits('event_HidesbArgomentiTicket')
        }
      })
      .catch(error => {
        toast.add({ severity: 'error', summary: "'Errore nella creazione dell'opzione", detail: error, life: 3000 });
        emits('event_refreshList')
        emits('event_HidesbArgomentiTicket')
      })
  }
}


// GET UTENTI
const utentiOptions = ref([])
function getUtenti() {
  loading.value = true
  const service = new AxiosService('Options/GetUsers')
  service.read().then(res => utentiOptions.value = res).catch(err => console.log(err)).finally(() => loading.value = false)
}

// TIPI SEDE
const luogoOptions = ref([
  {
    value: 1,
    text: 'Sala riunioni A'
  },
  {
    value: 2,
    text: 'Sala riunioni B'
  },
  {
    value: 3,
    text: 'Sala riunioni C'
  },
  {
    value: 4,
    text: 'Sala riunioni D'
  }
])

const partecipantiOptions = ref([
  {
    value: 1,
    text: 'Emmanuele Durante'
  },
  {
    value: 2,
    text: "Massimiliano Pighi"
  },
])

getUtenti()
</script>
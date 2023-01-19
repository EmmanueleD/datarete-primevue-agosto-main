<template>
  <Toast></Toast>

  <h1 class="mb-4" v-if="sidebarData.event.id">Modifica opzione</h1>
  <h1 class="mb-4" v-else>Nuova opzione</h1>

  <div class="grid">
    <!-- <div class="flex align-items-center col-6 mb-4">
      <Checkbox v-model="tempItem.soggetto_privato"></Checkbox>
      <label class="ml-2">Soggetto Privato</label>
    </div>

    <div class="flex align-items-center col-6 mb-4">
      <Checkbox v-model="tempItem.persona_fisica"></Checkbox>
      <label class="ml-2">Persona Fisica</label>
    </div> -->

    <div class="flex flex-column col-12 ">
      <label>Nome</label>
      <InputText type="text" v-model="tempItem.nome"></InputText>
    </div>

    <div class="flex flex-column col-12 ">
      <label>Cognome</label>
      <InputText type="text" v-model="tempItem.ragione_sociale"></InputText>
    </div>

    <div class="flex flex-column col-12 ">
      <label>Email</label>
      <InputText type="text" v-model="tempItem.indirizzo"></InputText>
    </div>

    <div class="flex flex-column col-12 ">
      <label>Telefono Cellulare</label>
      <InputText type="text" v-model="tempItem.telefono"></InputText>
    </div>

    <div class="flex flex-column col-12 ">
      <label>Provincia</label>
      <Dropdown :filter="true" :options="provinciaOptions" optionLabel="nome" optionValue="id"></Dropdown>
    </div>

    <div class="flex flex-column col-12 ">
      <label class="mb-2">Prodotti Trattati</label>
      <div class="flex gap-2 mb-2">
        <Checkbox v-model="tempItem.soggetto_privato"></Checkbox>
        <label>Prestiti personali</label>
      </div>
      <div class="flex gap-2 mb-2">
        <Checkbox v-model="tempItem.soggetto_privato"></Checkbox>
        <label>Cessioni del quinto</label>
      </div>
      <div class="flex gap-2 mb-2">
        <Checkbox v-model="tempItem.soggetto_privato"></Checkbox>
        <label>Mutui</label>
      </div>
      <div class="flex gap-2 mb-2">
        <Checkbox v-model="tempItem.soggetto_privato"></Checkbox>
        <label>Finanziamenti aziendali</label>
      </div>
      <div class="flex gap-2 mb-2">
        <Checkbox v-model="tempItem.soggetto_privato"></Checkbox>
        <label>Tutti</label>
      </div>

    </div>

    <div class="flex flex-column col-12 ">
      <label>Iscrizioe OAM</label>
      <Dropdown :filter="true" :options="['Agente', 'Collaboratore', 'Nessuna']"></Dropdown>
    </div>

    <div class="flex flex-column col-12 ">
      <label>Note</label>
      <Textarea v-model="value" rows="5" cols="30" />
    </div>

    <Divider class="mt-4 mb-4"></Divider>

    <div class="flex flex-column col-12 ">
      <label>Interessato a</label>
      <Dropdown
        :options="['First Class Accademy', 'Agency', 'Point', 'Filiale', 'Collaborazione', 'Candidatura spontanea', 'Negozio del credito']">
      </Dropdown>
    </div>

    <div class="flex flex-column col-12 ">
      <label>Profilo</label>
      <Dropdown :filter="true" v-model="profiloSelected" :options="['Neofita', 'Settore Credito', 'Settore parallelo']">
      </Dropdown>
    </div>

    <div v-if="profiloSelected == 'Settore parallelo'" class="flex flex-column col-12 ml-4 pl-4">
      <label>Settore Parallelo</label>
      <Dropdown :filter="true" v-model="profiloSelected"
        :options="['Assicurativo', 'Immobiliare', 'CAF e Patronato', 'Altro']">
      </Dropdown>
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

const profiloSelected = ref()

const tempItem = ref({
  nome: '',
  soggetto_privato: false,
  codice_fiscale: '',
  patita_iva: '',
  persona_fisica: '',
  ragione_sociale: '',
  indirizzo: '',
  telefono: '',
  email: '',
  sito_web: '',
  saldo_anno_precedente: 0,
  dare: 0,
  avere: 0,
  saldo_avere: 0
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

getUtenti()
</script>
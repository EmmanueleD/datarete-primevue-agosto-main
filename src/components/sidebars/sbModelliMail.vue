<template>
  <Toast></Toast>

  <h1 v-if="sidebarData.event.id">Modifica opzione</h1>
  <h1 v-else>Nuova opzione</h1>

  <div class="grid">
    <div class="flex flex-column col-12 ">
      <label for="nome">Nome</label>
      <InputText id="nome" type="text" v-model="tempItem.nome"></InputText>
    </div>

    <div class="flex flex-column col-12">
      <label>Categoria</label>
      <Dropdown :filter="true" v-model="tempItem.categoria" :options="categoriaOptions" optionValue="value"
        optionLabel="text">
      </Dropdown>
    </div>


    <div class="flex flex-column col-12 mt-4">
      <label for="tipo-sede">Testo</label>
      <Editor id="editor" v-model="tempItem.text" editorStyle="height: 400px">
        <template v-slot:toolbar>
          <span class="ql-formats">
            <button class="ql-bold" v-tooltip.bottom="'Bold'"></button>
            <button class="ql-italic" v-tooltip.bottom="'Italic'"></button>
            <button class="ql-underline" v-tooltip.bottom="'Underline'"></button>
          </span>
        </template>
      </Editor>
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
  nome: '',
  tipoHelpDesk: 0,
  utenteDiRiferimetno: []
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
const categoriaOptions = ref([
  {
    value: 1,
    text: 'IT'
  },
  {
    value: 2,
    text: 'Legale'
  },
  {
    value: 3,
    text: 'Pratiche'
  },

])

getUtenti()
</script>
<template>
  <Toast></Toast>

  <h1 class="mb-4" v-if="sidebarData.event.id">Modifica opzione</h1>
  <h1 class="mb-4" v-else>Nuova opzione</h1>

  <div class="grid">

    <div class="flex flex-column col-12 ">
      <label>Nome</label>
      <InputText type="text" v-model="tempItem.nome"></InputText>
    </div>

    <div class="flex flex-column col-12 ">
      <label>Fonte</label>
      <InputText type="text" v-model="tempItem.fonte"></InputText>
    </div>

    <div class="flex flex-column col-12 ">
      <label>Short Link</label>
      <InputText type="text" v-model="tempItem.shortCode"></InputText>
    </div>

    <div class="flex flex-column col-12 ">
      <label>Data inizio</label>
      <Calendar v-model="tempItem.dataInizio"></Calendar>
    </div>

    <div class="flex flex-column col-12 ">
      <label>Data fine</label>
      <Calendar v-model="tempItem.dataFine"></Calendar>
    </div>

    <div class="flex flex-column col-12 ">
      <label>Descrizione</label>
      <Textarea v-model="tempItem.descrizione" rows="5" cols="30" />
    </div>

    <div class="flex w-full justify-content-end mt-4">
      <Button :loading="loading" label="Salva" @click="save"></Button>
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
  fonte: '',
  shortLink: '',
  dataInizio: '',
  dataFine: '',
  descrizione: ''
})
tempItem.value = { ...props.sidebarData.event }
tempItem.value.dataInizio = new Date(tempItem.value.dataInizio).toLocaleDateString('it')
tempItem.value.dataFine = new Date(tempItem.value.dataFine).toLocaleDateString('it')
// API CONNECTIONS
function save() {
  loading.value = true
  if (tempItem.value.id) {
    servicePUT.update(tempItem.value)
      .then(res => {
        if (res) {
          toast.add({ severity: 'success', summary: 'Nuova Opzione Creata', detail: tempItem.value.nome, life: 3000 });
          emits('event_refreshList')
          emits('event_HidesbArgomentiTicket')
        }
      })
      .catch(error => {
        toast.add({ severity: 'error', summary: "'Errore nella modifica dell'opzione", detail: error, life: 3000 });
        emits('event_refreshList')
        emits('event_HidesbArgomentiTicket')
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    servicePOST.create(tempItem.value)
      .then(res => {
        if (res) {
          toast.add({ severity: 'success', summary: 'Nuova Opzione Creata', detail: tempItem.value.nome, life: 3000 });
          emits('event_refreshList')
          emits('event_HidesbArgomentiTicket')
        }
      })
      .catch(error => {
        toast.add({ severity: 'error', summary: "'Errore nella creazione dell'opzione", detail: error, life: 3000 });
        emits('event_refreshList')
        emits('event_HidesbArgomentiTicket')
      })
      .finally(() => {
        loading.value = false
      })
  }
}



</script>
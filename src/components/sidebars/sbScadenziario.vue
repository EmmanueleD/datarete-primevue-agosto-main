<template>
  <Toast></Toast>

  <h1 class="mb-4" v-if="sidebarData.event.id">Modifica opzione</h1>
  <h1 class="mb-4" v-else>Nuova opzione</h1>

  <div class="grid">
    <div class="flex align-items-center col-6 mb-4">
      <InputSwitch v-model="tempItem.pagata" />
      <label class="ml-2">Pagato</label>
    </div>



    <div class="flex flex-column col-12 ">
      <label>Data</label>
      <InputText type="text" v-model="tempItem.data"></InputText>
    </div>

    <div class="flex flex-column col-12 ">
      <label>Nome</label>
      <InputText type="text" v-model="tempItem.nome"></InputText>
    </div>

    <div class="flex flex-column col-12 ">
      <label>Importo</label>
      <InputNumber type="number" v-model="tempItem.importo"></InputNumber>
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
  data: '',
  nome: '',
  importo: 0,
  pagata: false
})
props.sidebarData.event ? tempItem.value = { ...props.sidebarData.event } : null
tempItem.value.data = new Date(tempItem.value.data).toLocaleDateString('it-IT')
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

</script>
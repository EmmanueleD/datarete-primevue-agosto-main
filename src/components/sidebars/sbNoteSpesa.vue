<template>
  <Toast></Toast>
  <!-- {{ sidebarData }} -->
  <h1 v-if="tmpItem.id">Modifica opzione</h1>
  <h1 v-else>Nuova opzione</h1>

  <div class="flex flex-column col-12">
    <label>Nome</label>
    <InputText type="text" v-model="tmpItem.nome"></InputText>
  </div>

  <div class="flex flex-column col-12">
    <label>Dettagli</label>
    <InputNumber type="number" v-model="tmpItem.dettagli"></InputNumber>
  </div>

  <div class="flex flex-column col-12">
    <label>Costo</label>
    <InputNumber mode="currency" currency="EUR" locale="it-IT" v-model="tmpItem.costo"></InputNumber>
  </div>

  <div class="flex flex-column col-12">
    <label>Stato</label>
    <Dropdown :filter="true" :options="statoOptions" v-model="tmpItem.stato" optionLabel="text" optionValue="value">
    </Dropdown>
  </div>

  <div class="w-100 flex justify-content-end align-items-end col-12 col-md-2 mt-4">
    <Button label="Salva" @click="save"></Button>
  </div>
</template>
<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import { useToast } from 'primevue/usetoast'
import AxiosService from '@/axiosServices/AxiosService';

const emits = defineEmits(['event_HideOptionsManager', 'event_refreshList'])

const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object
})

const toast = useToast()
const servicePOST = new AxiosService(props.sidebarData.view.endpointPOST)
const servicePUT = new AxiosService(props.sidebarData.view.endpointPUT)

const tmpItem = ref({ ...props.sidebarData.event })

function save() {
  if (tmpItem.value.id) {
    servicePUT.update(tmpItem.value.event)
      .then(res => {
        if (res) {
          toast.add({ severity: 'success', summary: 'Nuova Opzione Creata', detail: props.sidebarData.event.nome, life: 3000 });
          emits('event_refreshList')
          emits('event_HideOptionsManager')
        }
      })
      .catch(error => {
        toast.add({ severity: 'error', summary: "'Errore nella modifica dell'opzione", detail: error, life: 3000 });
        emits('event_refreshList')
        emits('event_HideOptionsManager')
      })
  } else {
    servicePOST.create(tmpItem.value)
      .then(res => {
        if (res) {
          toast.add({ severity: 'success', summary: 'Nuova Opzione Creata', detail: tmpItem.value.nome, life: 3000 });
          emits('event_refreshList')
          emits('event_HideOptionsManager')
        }
      })
      .catch(error => {
        toast.add({ severity: 'error', summary: "'Errore nella creazione dell'opzione", detail: error, life: 3000 });
        emits('event_refreshList')
        emits('event_HideOptionsManager')
      })
  }
}


const statoOptions = ref([
  {
    value: 1,
    text: 'In Attesa di Approvazione'
  },
  {
    value: 2,
    text: 'Approvato'
  },
  {
    value: 3,
    text: 'Rimborsato'
  },
])

function hideGestionePrivilegi() {
  emits('event_HideOptionsManager')
}
</script>
<template>

  <Toast></Toast>


  <div class="wrapper">
    <div v-if="sidebarData.id">
      <h3 class="mb-4">Modifica Stato Anadrafica</h3>
      <div class="flex flex-column col-12 col-md-5">
        <label for="nome">Nome Stato </label>
        <InputText id="nome" type="text" v-model="tmpItem.nome" />
      </div>
      <div class="flex justify-content-start align-items-end col-12 col-md-2">
        <Checkbox v-model="tmpItem.displayLead" :binary="true" @change="toggleDisplayCliente" />
        <label class="ml-3">Lead</label>
      </div>
      <div class="flex justify-content-start align-items-end col-12 col-md-2">
        <Checkbox v-model="tmpItem.displayCliente" :binary="true" @change="toggleDispalyLead" />
        <label class="ml-3">Cliente</label>
      </div>
    </div>
    <div v-else>
      <h3 class="mb-4">Nuovo Stato Anadrafica</h3>
      <div class="flex flex-column col-12 ">
        <label for="nome">Nome Stato </label>
        <InputText id="nome" type="text" v-model="tmpItem.nome" />
      </div>
      <div class="flex justify-content-start align-items-end col-12 col-md-2">
        <Checkbox v-model="tmpItem.displayLead" :binary="true" @change="toggleDisplayCliente" />
        <label class="ml-3">Lead</label>
      </div>
      <div class="flex justify-content-start align-items-end col-12 col-md-2">
        <Checkbox v-model="tmpItem.displayCliente" :binary="true" @change="toggleDispalyLead" />
        <label class="ml-3">Cliente</label>
      </div>
    </div>
    <Divider></Divider>
    <div class=" v-full flex justify-content-start align-items-end col-12">
      <Checkbox v-model="tmpItem.recallDateRequired" :binary="true" @change="toggleDispalyLead" />
      <label class="ml-3">Richiede data Recall</label>
    </div>
    <div class="grid mt-4 mb-4">
      <div class="col-1">

      </div>
      <div class="col">
        Numero giorni notifica
      </div>
      <div class="col">
        Numero ripetizioni notifica
      </div>

    </div>
    <div class="grid align-items-center mb-2">
      <div class="col-1">
        1
      </div>
      <div class="col">
        <InputNumber type="number" v-model="tmpItem.alert_1_days"></InputNumber>
      </div>
      <div class="col">
        <InputNumber type="number" v-model="tmpItem.alert_1_reps"></InputNumber>
      </div>
    </div>
    <div class="grid align-items-center mb-2">
      <div class="col-1">
        2
      </div>
      <div class="col">
        <InputNumber type="number" v-model="tmpItem.alert_2_days"></InputNumber>
      </div>
      <div class="col">
        <InputNumber type="number" v-model="tmpItem.alert_2_reps"></InputNumber>
      </div>
    </div>
    <div class="grid align-items-center mb-2">
      <div class="col-1">
        3
      </div>
      <div class="col">
        <InputNumber type="number" v-model="tmpItem.alert_3_days"></InputNumber>
      </div>
      <div class="col">
        <InputNumber type="number" v-model="tmpItem.alert_3_reps"></InputNumber>
      </div>
    </div>
    <div class="grid align-items-center mb-2">
      <div class="col-1">
        4
      </div>
      <div class="col">
        <InputNumber type="number" v-model="tmpItem.alert_4_days"></InputNumber>
      </div>
      <div class="col">
        <InputNumber type="number" v-model="tmpItem.alert_4_reps"></InputNumber>
      </div>
    </div>
    <div class="grid align-items-center mb-2">
      <div class="col-1">
        5
      </div>
      <div class="col">
        <InputNumber type="number" v-model="tmpItem.alert_5_days"></InputNumber>
      </div>
      <div class="col">
        <InputNumber type="number" v-model="tmpItem.alert_5_reps"></InputNumber>
      </div>
    </div>
    <div class="w-full flex justify-content-end align-items-end col-12">
      <Button label="Salva" @click="save"></Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import axios from 'axios'
import AxiosService from '@/axiosServices/AxiosService';

const emit = defineEmits(['event_HideStatoAnagrafica', 'event_refreshList'])

const servicePOST = new AxiosService('Options/StatiAnagrafiche/AddStato')
const servicePUT = new AxiosService('Options/StatiAnagrafiche/UpdateStato')
const toast = useToast()

const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object
})


function toggleDisplayCliente() {
  if (props.sidebarData.displayCliente) {
    props.sidebarData.displayCliente = false
  }
}
function toggleDispalyLead() {
  if (props.sidebarData.displayLead) {
    props.sidebarData.displayLead = false
  }
}

const tmpItem = ref({ ...props.sidebarData })

function save() {
  if (tmpItem.value.id) {
    servicePUT.update(tmpItem.value)
      .then(res => {
        if (res) {
          toast.add({ severity: 'success', summary: 'Nuovo Stato Creato', detail: tmpItem.value.nome, life: 3000 });
          emit('event_refreshList')
          emit('event_HideStatoAnagrafica')
        }
      })
      .catch(error => {
        toast.add({ severity: 'error', summary: 'Errore nella modifica dello stato', detail: error, life: 3000 });
        emit('event_refreshList')
        emit('event_HideStatoAnagrafica')
      })
  } else {
    servicePOST.create(tmpItem.value)
      .then(res => {
        if (res) {
          toast.add({ severity: 'success', summary: 'Nuovo Stato Creato', detail: tmpItem.value.nome, life: 3000 });
          emit('event_refreshList')
          emit('event_HideStatoAnagrafica')
        }
      })
      .catch(error => {
        toast.add({ severity: 'error', summary: 'Errore nella creazione dello stato', detail: error, life: 3000 });
        emit('event_refreshList')
        emit('event_HideStatoAnagrafica')
      })
  }
}
</script>
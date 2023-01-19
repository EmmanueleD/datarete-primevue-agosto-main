<template>

  <Toast></Toast>

  <Sidebar v-model:visible="sidebarVisible" :baseZIndex="10000" position="right" class="p-sidebar-md"
    @hide="$emit('event_HideStatiEvento')">
    <div class="wrapper">
      <div v-if="sidebarData.id">
        <h3 class="mb-4">Modifica Stato Evento</h3>
        <div class="flex flex-column col-12 col-md-5">
          <label for="nome">Nome Stato </label>
          <InputText id="nome" type="text" v-model="sidebarData.nome" />
        </div>

      </div>
      <div v-else>
        <h3 class="mb-4">Nuovo Stato Evento</h3>
        <div class="flex flex-column col-12 col-md-5">
          <label for="nome">Nome Stato </label>
          <InputText id="nome" type="text" v-model="sidebarData.nome" />
        </div>

      </div>
      <div class="w-100 flex justify-content-end align-items-end col-12 col-md-2">
        <Button label="Salva" @click="save"></Button>
      </div>
    </div>
  </Sidebar>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import axios from 'axios'
import AxiosService from '@/axiosServices/AxiosService';

const emit = defineEmits(['event_HideStatoEvento', 'event_refreshList'])

// const servicePOST = new AxiosService('Options/StatiAnagrafiche/AddStato')
// const servicePUT = new AxiosService('Options/StatiAnagrafiche/UpdateStato')
const toast = useToast()

const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object
})



function save() {
  if (props.sidebarData.id) {
    servicePUT.update(props.sidebarData)
      .then(res => {
        if (res) {
          toast.add({ severity: 'success', summary: 'Nuovo Stato Creato', detail: props.sidebarData.nome, life: 3000 });
          emit('event_refreshList')
          emit('event_HideStatoAnagrafica')
        }
      })
      .catch(error => {
        toast.add({ severity: 'error', summary: 'Errore nella creazione dello stato', detail: error, life: 3000 });
        emit('event_refreshList')
        emit('event_HideStatoAnagrafica')
      })
  } else {
    servicePOST.create(props.sidebarData)
      .then(res => {
        if (res) {
          toast.add({ severity: 'success', summary: 'Nuovo Stato Creato', detail: props.sidebarData.nome, life: 3000 });
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
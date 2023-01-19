<template>
  <div>
    <h1 v-if="!sidebarData.id_evento">Prenotazione Sala Riunione</h1>
    <h1 v-else>Modifica Prenotazione</h1>
  </div>

  <div class="flex flex-column w-full justify-content-start">
    <label>Data e Ora di Inizio</label>
    <Calendar :minDate="new Date()" v-model="tmpItem.dataora_inizio" :showTime="true" :showSeconds="false"></Calendar>
  </div>
  <div class="flex flex-column w-full justify-content-start my-4">
    <label>Data e Ora di Inizio</label>
    <Calendar :minDate="new Date(tmpItem.dataora_inizio)" v-model="tmpItem.dataora_fine" :showTime="true"
      :showSeconds="false">
    </Calendar>
  </div>

  <div class="flex flex-column w-full justify-content-start my-4">
    <label>Descrizione</label>
    <InputText type="text" v-model="tmpItem.descrizione"></InputText>
  </div>

  <div class="flex justify-content-end w-full gap-2">
    <Button v-if="sidebarData.id_evento" :loading="loading" icon="pi pi-trash" label="Elimina Prenotazione"
      @click="eliminaPrenotazione" class="p-button-danger"></Button>
    <Button :loading="loading" icon="pi pi-check" label="Prenota" @click="prenotaSala"></Button>
  </div>
</template>

<script setup>
import AxiosService from '@/axiosServices/AxiosService';
import { ref } from 'vue';
import { useStore } from 'vuex';
// eslint-disable-next-line no-undef
const props = defineProps({
  sidebarData: Object
})

console.log("props sidebarData , ", props.sidebarData)
// eslint-disable-next-line no-undef
const emits = defineEmits(['nuovaPrenotazioneFatta'])

const store = useStore()
const id_utente = ref(store.state.user.user.id)

const loading = ref(false)

const tmpItem = ref({
  id_utente_prenotazione: id_utente.value,
  id_sala: props.sidebarData.id,
  dataora_inizio: '',
  dataora_fine: '',
  descrizione: ''
})

tmpItem.value.dataora_inizio = props.sidebarData.start || ''
tmpItem.value.dataora_fine = props.sidebarData.end || ''
tmpItem.value.descrizione = props.sidebarData.title || ''

function prenotaSala() {
  loading.value = true
  const service = new AxiosService('Plugin/PrenotazioneSale')
  service.create(tmpItem.value)
    .then(res => console.log(res))
    .finally(() => {
      emits('nuovaPrenotazioneFatta')
      loading.value = false
    })
}

function eliminaPrenotazione() {
  loading.value = true
  const service = new AxiosService("Plugin/PrenotazioneSale")
  service.delete(props.sidebarData.id_evento)
    .then(res => console.log(res))
    .finally(() => {
      loading.value = false
      emits('nuovaPrenotazioneFatta')
    })
}

</script>
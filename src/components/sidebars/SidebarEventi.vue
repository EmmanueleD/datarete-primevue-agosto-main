<template>
  <Toast />

  <h3>Nuovo Evento</h3>

  <div class="flex flex-column justify-content-start w-full mb-4">
    <label>Nome Evento</label>
    <InputText tyoe="text" v-model="tmpItem.title"></InputText>
  </div>

  <div class="flex flex-column justify-content-start w-full mb-4">
    <label>Data inizio</label>
    <Calendar dateFormat="dd-mm-yy" :showTime="true" :minDate="new Date()" v-model="tmpItem.start"></Calendar>
  </div>

  <div class="flex flex-column justify-content-start w-full mb-4">
    <label>Data fine</label>
    <Calendar dateFormat="dd-mm-yy" :showTime="true" :minDate="tmpItem.start" v-model="tmpItem.end"></Calendar>
  </div>

  <div class="flex flex-column justify-content-start-w-full mb-4">
    <label>Partecipanti</label>
    <MultiSelect :filter="true" :options="props.sidebarData.userOptions" optionLabel="text" optionValue="value"
      v-model="partecipanti">
    </MultiSelect>
  </div>

  <div class="flex flex-column justify-content-start w-full mb-4">
    <label>Descrizione</label>
    <Textarea tyoe="text" v-model="tmpItem.description" rows="5" cols="30"></Textarea>
  </div>

  <div class="flex justify-content end">
    <Button :loading="loading" label="Salva" @click="save"></Button>
  </div>




</template>

<script setup>
import { ref, onMounted } from 'vue'
import AxiosService from '@/axiosServices/AxiosService';
import { useToast } from "primevue/usetoast";
import { useStore } from 'vuex';

const store = useStore()
const loading = ref(false)
const toast = useToast()
// eslint-disable-next-line no-undef
const emit = defineEmits(['event_refreshEvents'])

// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object,

})

function checkSidebarData() {
  if (props.sidebarData.nome && props.sidebarData.cognome) {
    tmpItem.value.title = props.sidebarData.nome + ' ' + props.sidebarData.cognome
    partecipanti.value.push(store.getters.loggedUser.id)
  }

}

onMounted(() => {
  checkSidebarData()
})

// //GET SIDEBARDATA
// function setupSidebar() {
//   if (props.sidebarData) {
//     Object.assign(values.value, props.sidebarData);
//   }
// }

const tmpItem = ref({
  title: '',
  start: '',
  end: '',
  description: '',
  partecipanti: []
})
const partecipanti = ref([])

const servicePOST = new AxiosService('Calendar/AddEvent')
const servicePUT = new AxiosService('Calendar/UpdateEvent')
function save() {
  loading.value = true

  partecipanti.value.forEach(partecipante => {
    tmpItem.value.partecipanti.push({
      id_utente: partecipante
    })
  })

  if (tmpItem.value.id) {
    servicePUT.updateCustomEndpoint('Calendar/UpdateEvent', tmpItem.value)
      .then(() => {

        toast.add(
          {
            severity: 'success',
            summary: 'Evento Modificato',
            // detail: values.value.title,
            life: 3000
          }
        );
      })
      .catch(error => {
        console.log("🚀 ~ file: SidebarEventi.vue ~ line 158 ~ save ~ error", error)
        toast.add(
          {
            severity: 'error',
            summary: 'Errore',
            detail: error,
            life: 3000
          }
        );
      })
      .finally(() => {
        loading.value = false
        emit('event_refreshEvents')
      })
  } else {
    if (props.sidebarData.id) {
      tmpItem.value.id_anagrafica = props.sidebarData.id
    }
    servicePOST.create(tmpItem.value)
      .then(() => {
        emit('event_refreshEvents')
        toast.add(
          {
            severity: 'success',
            summary: 'Evento Creato',
            // detail: values.value.title,
            life: 3000
          }
        );
      })
      .catch(error => {
        toast.add(
          {
            severity: 'error',
            summary: 'Errore',
            detail: error,
            life: 3000
          }
        );
      })
      .finally(() => {
        loading.value = false
        emit('event_refreshEvents')
      })
  }
}



</script>
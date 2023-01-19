<template>
  <Toast></Toast>
  <h4 v-if="item">Modifica Appuntamento</h4>
  <h4 v-else class="mb-4">Nuovo Appuntamento</h4>
  <Accordion>
    <AccordionTab header="Apri Editor">
      <div class="w-full flex flex-column align-items-start mb-4">
        <label for="title">Titolo</label>
        <InputText v-model="tmpItem.title" class="w-full" id="title" placeholder="titolo"></InputText>
      </div>
      <div class="w-full flex flex-column align-items-start mb-4">
        <label for="title">Descrizione</label>
        <InputText v-model="tmpItem.description" class="w-full" id="title" placeholder="descrizione"></InputText>
      </div>
      <div class="grid">
        <div class="col-6 flex flex-column align-items-start mb-4 ">
          <label for="data">Data Inizio</label>
          <Calendar v-model="tmpItem.start" class="w-full" inputId="data" :minDate="minDate" :manualInput="false"
            :showTime="true" :showButtonBar="true" :baseZIndex="1001" />
        </div>
        <div class="col-6 flex flex-column align-items-start mb-4">
          <label for="data">Data Fine</label>
          <Calendar v-model="tmpItem.end" class="w-full" inputId="data" :minDate="tmpItem.start" :manualInput="false"
            :showTime="true" :showButtonBar="true" :baseZIndex="1001" />
        </div>
      </div>
      <div class="flex justify-content-end">
        <Button :loading="loading" @click="salva" class="mt-4" label="Salva"></Button>
      </div>
    </AccordionTab>
  </Accordion>

</template>

<script setup>
import { ref } from 'vue';
import store from '@/store';
import AxiosService from '@/axiosServices/AxiosService';
import { useToast } from 'primevue/usetoast'

const toast = useToast()

// eslint-disable-next-line no-undef
const props = defineProps({
  item: Object
})

const tmpItem = ref({ ...props.item })
const minDate = new Date()
const currentCrm = store.getters['getCurrentCrm']
const loading = ref(false)

function setTmpItem() {
  tmpItem.value.id_anagrafica = currentCrm.ID
  tmpItem.value.nome_anagrafica = currentCrm.NOME + ' ' + currentCrm.Cognome
  tmpItem.value.partecipanti = []
  tmpItem.value.partecipanti.push({
    id_utente: currentCrm.ID,
    nome_cognome: currentCrm.NOME + ' ' + currentCrm.Cognome,
    mail: 'err@404.it',
    accepted: false
  })
  console.log(tmpItem.value)
}

setTmpItem()


const servicePOST = new AxiosService('Calendar/AddEvent')
const servicePUT = new AxiosService('Calendar/UpdateEvent')
function salva() {
  loading.value = true
  if (tmpItem.value.id) {
    servicePUT.update(tmpItem.value)
      .then(res => {
        if (res) {
          toast.add(
            {
              severity: 'success',
              summary: 'Evento Modificato',
              detail: res.title,
              life: 3000
            }
          );
        }
      })
      .catch(err => {
        toast.add(
          {
            severity: 'error',
            summary: 'Errore nella modifica di questo evento',
            detail: err,
            life: 3000
          }
        );
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    servicePOST.create(tmpItem.value)
      .then(res => {
        if (res) {
          toast.add(
            {
              severity: 'success',
              summary: 'Evento Creato',
              detail: res.title,
              life: 3000
            }
          );
        }
      })
      .catch(err => {
        toast.add(
          {
            severity: 'error',
            summary: 'Errore nella modifica di questo evento',
            detail: err,
            life: 3000
          }
        );
      })
      .finally(() => {
        loading.value = false
      })
  }
}

// CAMPI DELL'OGGETTO CHE NON VENGONO MANDATI
// {
//   "id_type": 0,
//   "type_string": "string",
//   "last_status_id": 0,
//   "last_status": "string",
//   "storicoStati": [
//     {
//       "id": 0,
//       "id_evento": 0,
//       "id_utente": 0,
//       "utente": "string",
//       "id_stato": 0,
//       "stato": "string",
//       "nota": "string",
//       "data_stato": "2022-10-05T08:28:40.275Z"
//     }
//   ]
// }
</script>
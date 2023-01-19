<template>
  <h1 class="mb-4" v-if="props.item">Modifica Ticket</h1>
  <h1 class="mb-4" v-else>Crea Nuovo Ticket</h1>
  <div class="grid">
    <!-- <div class="col-12">
      {
      "id": 0,
      "data": "2022-09-30T12:23:04.130Z",
      "titolo": "string",
      "descrizione": "string",
      "created_by": 0,
      "created_by_string": "string",
      "id_type": 0,
      "type_text": "string",
      "id_status": 0,
      "status_text": "string",
      "need_reply": true,
      "solved": true
      }
    </div> -->
    <div class="col-12">
      <div class="w-full flex flex-column align-items-start mb-4">
        <label class="mb-2" for="title">Titolo</label>
        <InputText v-model="tmpItem.titolo" class="w-full" id="title" placeholder="titolo"></InputText>
      </div>
      <div class="w-full flex flex-column align-items-start mb-4">
        <label class="mb-2">Argomento</label>
        <Dropdown :filter="true" v-model="tmpItem.id_argomento" class="w-full" placeholder="argomento"
          :options="argomentiOptions" optionLabel="nome" optionValue="id"></Dropdown>
      </div>
      <div class="w-full flex flex-column align-items-start mb-4">
        <label class="mb-2" for="description">Descrizione</label>
        <Textarea v-model="tmpItem.descrizione" class="w-full" id="description" placeholder="Descrizione"></Textarea>
      </div>
      <div class="w-full flex justify-content-end">
        <Button @click="save" label="Invia"></Button>
      </div>
    </div>
  </div>



</template>

<script setup>
import { ref } from 'vue';
import store from '@/store';
import AxiosService from '@/axiosServices/AxiosService';
// eslint-disable-next-line no-undef
const props = defineProps({
  item: Object,
  id_type: Number
})

// eslint-disable-next-line no-unused-vars, no-undef
const emits = defineEmits('hide_newTicket')
const tmpItem = ref({ ...props.item })

const argomentiOptions = ref([])

function getArgomentiOptions() {
  const service = new AxiosService('Options/ArgomentiTicket/' + props.id_type)
  service.read().then(res => argomentiOptions.value = res)
}
getArgomentiOptions()
// const prova = {
//   "id": 0,
//   "data": "2022-10-03T15:18:14.712Z",
//   "titolo": "string",
//   "descrizione": "string",
//   "created_by": 0,
//   "created_by_string": "string",
//   "id_type": 0,
//   "type_text": "string",
//   "id_status": 0,
//   "status_text": "string",
//   "need_reply": true,
//   "solved": true
// }
const servicePOST = new AxiosService('HelpDesk')
const servicePUT = new AxiosService('HelpDesk')

function save() {
  if (tmpItem.value.id) {
    servicePUT.update(tmpItem.value)
  } else {
    switch (props.id_type) {
      case 1:
        tmpItem.value.type_text = 'IT'
        tmpItem.value.id_type = 1
        break;
      case 2:
        tmpItem.value.type_text = 'Legale'
        tmpItem.value.id_type = 2
        break;
      case 3:
        tmpItem.value.type_text = 'Pratiche'
        tmpItem.value.id_type = 3
        break;
    }



    tmpItem.value.data = new Date()
    tmpItem.value.created_by = store.state.user.user.id

    tmpItem.value.id_status = 2
    tmpItem.value.status_text = 'Aperto'
    tmpItem.value.need_reply = true
    tmpItem.value.solved = false
    servicePOST.create(tmpItem.value).then(res => console.log('RES', res))
    emits('hide_newTicket')
  }
}
</script>
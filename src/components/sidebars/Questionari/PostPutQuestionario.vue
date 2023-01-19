<template>
  <Toast></Toast>
  <div class="flex justify-content-between mb-4">
    <span v-if="tmpQuestionario.id">
      <h1>Modifica Questionario</h1>
    </span>
    <span v-else>
      <h1>Crea Questionario</h1>
    </span>
  </div>
  <div>
    <div class="flex justify-content-between align-items-center w-full mb-4">
      <div class="flex flex-column mb-4">
        <label for="questionario-title">Titolo</label>
        <InputText type="text" v-model="tmpQuestionario.title"></InputText>
      </div>
      <Button :loading="loading" @click="save" icon="pi pi-save" label="Salva Questionario"></Button>
    </div>
    <template v-for="(question, index) of tmpQuestionario.questions" :key="index">
      <PostPutDomanda v-if="!question.delete" @deleteDomanda="deleteDomanda" @eventEditQuestion="eventEditQuestion"
        :question="question" :questionIndex="index">
      </PostPutDomanda>
    </template>
    <div class="flex justify-content-end">
      <Button @click="addQuestion" label="+ Aggiungi Domanda"></Button>
    </div>
  </div>
</template>

<script setup>
import AxiosService from '@/axiosServices/AxiosService';
import { ref } from 'vue'
import PostPutDomanda from './PostPutDomanda.vue'
import { useToast } from 'primevue/usetoast'
// eslint-disable-next-line no-undef
const props = defineProps({
  item: Object
})

// eslint-disable-next-line no-undef
const emits = defineEmits(['event_hidePPQuestionario'])

const toast = useToast()

const tmpQuestionario = ref()
tmpQuestionario.value = JSON.parse(JSON.stringify(props.item.event))

function addQuestion() {
  tmpQuestionario.value.questions.push(
    {
      question: 'Domanda',
      tmpId: Date.now(),
      answers: []
    }
  )
}

function deleteDomanda(id) {
  tmpQuestionario.value.questions.map(element => {
    if ('tmpId' in element && element.tmpId == id) {
      element.delete = true
    }
    if ('id' in element && element.id == id) {
      element.delete = true
    }
  })
}

function eventEditQuestion(event) {
  tmpQuestionario.value.questions[event.questionIndex] = event
}

const servicePOST = new AxiosService(props.item.view.endpointPOST)
const servicePUT = new AxiosService(props.item.view.endpointPUT)
const loading = ref(false)
function save() {
  loading.value = true
  if (tmpQuestionario.value.id) {
    servicePUT.update(tmpQuestionario.value)
      .then(res => {
        if (res) {
          toast.add(
            {
              severity: 'success',
              summary: 'Questionario Modificato',
              // detail: res,
              life: 3000
            }
          );
        }

      })
      .catch(err => {
        toast.add(
          {
            severity: 'error',
            summary: 'Errore nella Modifica del Questionario',
            detail: err,
            life: 3000
          }
        );
      })
      .finally(() => {
        loading.value = false
        emits('event_hidePPQuestionario')
      })
  } else {
    servicePOST.create(tmpQuestionario.value)
      .then(res => {
        if (res) {
          toast.add(
            {
              severity: 'success',
              summary: 'Questionario Creato',
              // detail: res,
              life: 3000
            }
          );
        }

      })
      .catch(err => {
        toast.add(
          {
            severity: 'error',
            summary: 'Errore nella Creazione del Questionario',
            detail: err,
            life: 3000
          }
        );
      })
      .finally(() => {
        loading.value = false
        emits('event_hidePPQuestionario')
      })
  }
}
</script>
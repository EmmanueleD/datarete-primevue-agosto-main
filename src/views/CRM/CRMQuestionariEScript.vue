<template>
  <Toast></Toast>
  <div>

    <TabView>

      <TabPanel header="Script">
        <Card style="height: 100%; overflow-y:scroll">
          <template #content>
            <Dropdown :filter="true" class="mb-4 w-full" v-model="scriptSelected" :options="scriptsOptions"
              optionLabel="titolo" optionValue="testo" placeholder="Seleziona lo Script" />
            <Divider />

            <span v-if="scriptSelected" v-html="scriptSelected"></span>
          </template>
        </Card>
      </TabPanel>
      <TabPanel header="Questionari">
        <Card>
          <template #content>
            <Dropdown :filter="true" @change="resetTmpRispostaQuestionario" class="mb-4 w-full"
              v-model="questionarioSelected" :options="questionariOptions" optionLabel="title"
              placeholder="Seleziona il Questionario" />
            <Divider />
            <div class="question" v-for="question of questionarioSelected.questions" :key="question.id">

              <h5 class="mt-4">{{ question.question }}</h5>
              <Dropdown :filter="true" class="w-full mb-4" v-model="tmpRispostaQuestionario[question.question]"
                :options="question.answers" optionLabel="answer" optionValue="answer"></Dropdown>

            </div>
          </template>
          <template #footer>
            <div class="flex justify-content-end">
              <Button :loading="loading" @click="salvaQuestionarioComeNota" label="Salva"></Button>
            </div>
          </template>
        </Card>
      </TabPanel>
    </TabView>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import AxiosService from '@/axiosServices/AxiosService';

// eslint-disable-next-line no-undef
const emits = defineEmits(['reloadFeed'])

const loading = ref(false)
const route = useRoute()
const toast = useToast()

const scriptSelected = ref('')
const scriptsOptions = ref([])

const serviceGETScripts = new AxiosService('Script/GetScripts')
function getScripts() {
  loading.value = true
  serviceGETScripts.read()
    .then(res => {
      if (res) {
        scriptsOptions.value = res
      }
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      loading.value = false
    })
}

const questionarioSelected = ref('')
const questionariOptions = ref([])
const tmpRispostaQuestionario = ref({ oggetto: null, messaggio: [] })

const serviceGETQuestionari = new AxiosService('Surveys/GetSurveys')
function getQuestionari() {
  loading.value = true
  questionariOptions.value.splice(0)
  serviceGETQuestionari.read()
    .then(res => {
      if (res) {
        questionariOptions.value = res
      }
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      loading.value = false
    })
}

function resetTmpRispostaQuestionario() {
  tmpRispostaQuestionario.value = {}
}

function salvaQuestionarioComeNota() {

  loading.value = true
  const servicePOST = new AxiosService('Crm/InsertCrmRecord/' + route.params.idAnagrafica)

  const nuovaNota = {
    oggetto: questionarioSelected.value.title,
    data: new Date(),
    id_type: 1,
    messaggio: ''
  }

  const entries = Object.entries(tmpRispostaQuestionario.value)

  entries.forEach(entry => {
    nuovaNota.messaggio = nuovaNota.messaggio + '<p><strong>' + entry[0] + '</strong></p><p>' + entry[1] + '</p><br>'
  })

  servicePOST.create(nuovaNota)
    .then(() => {
      toast.add(
        {
          severity: 'success',
          summary: 'Nuova risposta al questionario registrata',
          // detail: res,
          life: 3000
        }
      );
    })
    .catch((err) => {
      toast.add(
        {
          severity: 'error',
          summary: 'Errore nella registrazione della risposta al questionario',
          detail: err,
          life: 3000
        }
      );
    })
    .finally(() => {
      loading.value = false
      emits('reloadFeed')
    })
}




getScripts()
getQuestionari()
</script>
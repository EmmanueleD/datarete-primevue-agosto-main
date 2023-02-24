<template>
  <div class="wrapper">
    <h1>Pratica: {{ id_pratica }}</h1>
    <div class="grid">
      <div class="col-3">
        <Card>
          <template #header>
            <div class="bg-gray-800 px-4 text-white">Dettagli pratica</div>
          </template>
          <template #content>
            <h2 class="mb-4">{{ pratica.TipoProdotto }}</h2>
            <div
              class="campo-dettaglio mb-3 flex justify-content-between align-items-center"
            >
              <span>Numero</span>
              <span s class="font-semibold">{{ id_pratica }}</span>
            </div>
            <div
              class="campo-dettaglio mb-3 flex justify-content-between align-items-center"
            >
              <span>Inserita</span>
              <span>{{
                new Date(pratica.dataInserimento).toLocaleString("it-IT", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}</span>
            </div>
            <div
              class="campo-dettaglio mb-3 flex justify-content-between align-items-center"
            >
              <span>Cliente</span>
              <span>{{ pratica.Cliente }}</span>
            </div>
            <div
              class="campo-dettaglio mb-3 flex justify-content-between align-items-center"
            >
              <span>Agente</span>
              <span class="cursor-pointer">{{ pratica.Agente }}</span>
            </div>
            <div
              class="campo-dettaglio mb-3 flex justify-content-between align-items-center"
            >
              <span>Istituto</span>
              <span class="cursor-pointer">{{
                pratica.istitutoFinanziatore
              }}</span>
            </div>
            <div
              class="campo-dettaglio mb-3 flex justify-content-between align-items-center"
            >
              <span>Importo Richiesto</span>
              <span href="#" class="font-semibold">
                € {{ pratica.importo }}</span
              >
            </div>
            <div
              class="campo-dettaglio mb-3 flex justify-content-between align-items-center"
            >
              <span>Durata</span>
              <span>
                <span href="#" class="font-semibold"
                  >{{ pratica.durata }} mesi
                </span>
                <span class="text-gray-500 text-sm">
                  ({{ pratica.durata / 12 }} anni)</span
                >
              </span>
            </div>
            <Divider></Divider>
            <div
              class="campo-dettaglio mb-3 flex flex-column justify-content-between align-items-center"
            >
              <div v-if="pratica">
                <span>Stato corrente: </span>
                <span class="font-bold">{{ pratica.Stato }}</span>
              </div>
              <Divider></Divider>

              <div class="w-full flex flex-column my-4">
                <span class="font-bold">Cambia stato pratica</span>
                <Dropdown
                  :filter="true"
                  v-model="tmpStato"
                  :options="statoPraticaOptions"
                  optionLabel="nome"
                  placeholder="Seleziona uno stato"
                  @change="statoIsChanging"
                />
              </div>
            </div>
            <div class="flex flex-column pt-2 pb-2" v-if="statoChanging">
              <InputText
                type="text"
                v-model="notaStato"
                placeholder="Nota stato..."
              ></InputText>
              <div class="w-full flex justify-content-end">
                <Button
                  :loading="loading"
                  class="mt-2 p-button-sm p-button-outlined p-button-rounded"
                  label="Cambia Stato"
                  @click="changeStato"
                ></Button>
              </div>
              <Divider class="mb-4"></Divider>
            </div>

            <div class="w-full flex flex-column my-4">
              <span class="font-bold">Remote Chat</span>
              <Textarea v-model="remoteChat"></Textarea>
              <div class="w-full flex justify-content-end">
                <Button
                  @click="sendRemoteChat"
                  class="p-button-rounded p-button-outlined p-button-sm mt-2"
                  label="Invia"
                ></Button>
              </div>
            </div>

            <div v-if="pratica.StoricoStati" class="text-gray-500">
              <div class="mb-4">
                <span class="font-bold">Storico </span>
              </div>
              <div>
                <Storico :storico="pratica.StoricoStati"></Storico>
              </div>
            </div>
          </template>
        </Card>
      </div>
      <div class="col-9">
        <Card>
          <template #content>
            <TabView ref="tabview1">
              <TabPanel header="Dettagli">
                <div class="grid">
                  <div class="col-12 flex justify-content-between flex-wrap">
                    <div v-if="!loading" class="col flex flex-column mb-4">
                      <label>Agente</label>
                      <InputText v-model="pratica.Agente"> </InputText>
                    </div>
                    <div v-if="!loading" class="col flex flex-column mb-4">
                      <label>Cliente</label>
                      <InputText type="text" v-model="pratica.Cliente">
                      </InputText>
                    </div>
                  </div>

                  <div class="col-12 flex justify-content-between flex-wrap">
                    <div class="flex flex-column mb-4 col">
                      <label>Tipo</label>
                      <InputText
                        type="text"
                        placeholder="Tipo operazione"
                        v-model="pratica.TipoProdotto"
                      ></InputText>
                    </div>

                    <div class="flex flex-column mb-4 col">
                      <label>Prodotto</label>
                      <InputText
                        type="text"
                        placeholder="Tipo operazione"
                        v-model="pratica.descrizioneProdotto"
                      >
                      </InputText>
                    </div>

                    <div class="flex flex-column mb-4 col">
                      <label>Istituto</label>
                      <InputText
                        type="text"
                        placeholder="Tipo operazione"
                        v-model="pratica.istitutoFinanziatore"
                      >
                      </InputText>
                    </div>
                  </div>

                  <div class="col-12 flex justify-content-between flex-wrap">
                    <div class="flex col flex-column mb-4">
                      <label>Rata</label>
                      <InputText
                        type="text"
                        placeholder="Tipo operazione"
                        v-model="pratica.importoRata"
                      ></InputText>
                    </div>

                    <div class="flex col flex-column mb-4">
                      <label>Durata</label>
                      <InputText
                        type="text"
                        placeholder="Tipo operazione"
                        v-model="pratica.durata"
                      ></InputText>
                    </div>

                    <div class="flex col flex-column mb-4">
                      <label>Montante</label>
                      <InputText
                        type="text"
                        placeholder="Tipo operazione"
                        v-model="pratica.montante"
                      ></InputText>
                    </div>

                    <div class="flex col flex-column mb-4">
                      <label>TAN</label>
                      <InputText
                        type="text"
                        placeholder="Tipo operazione"
                        v-model="pratica.tan"
                      ></InputText>
                    </div>
                  </div>

                  <div class="col-12 flex justify-content-between flex-wrap">
                    <div class="flex col flex-column mb-4">
                      <label>Data decorrenza</label>
                      <Calendar v-model="pratica.dataDecorrenza"></Calendar>
                    </div>
                    <div class="flex col flex-column mb-4">
                      <label>Data scandenza</label>
                      <Calendar v-model="pratica.dataScadenza"></Calendar>
                    </div>
                    <div class="flex col flex-column mb-4">
                      <label>Data rinnovo</label>
                      <Calendar v-model="pratica.dataRinnovo"></Calendar>
                    </div>
                  </div>

                  <div class="col-12 flex flex-wrap justify-content-between">
                    <div class="flex col flex-column mr-4">
                      <label>Erogato</label>
                      <InputNumber
                        type="number"
                        v-model="pratica.importoErogato"
                      ></InputNumber>
                    </div>
                    <div class="flex col flex-column">
                      <label>Importo Richiesto</label>
                      <InputNumber
                        type="number"
                        v-model="pratica.importoErogato"
                      ></InputNumber>
                    </div>
                    <div class="flex col flex-column">
                      <label>Valore attuale</label>
                      <InputNumber
                        type="number"
                        v-model="pratica.valore_attuale"
                      ></InputNumber>
                    </div>
                  </div>

                  <div class="flex justify-content-end mb-4 w-full">
                    <Button
                      @click="salvaPratica"
                      :loading="loading"
                      label="Salva"
                    ></Button>
                  </div>
                </div>
              </TabPanel>

              <TabPanel header="Documenti">
                <!-- <Documenti></Documenti> -->
                <DocumentiPratica
                  :id_tipo_prodotto="pratica.idTipoProdotto"
                ></DocumentiPratica>
              </TabPanel>
              <TabPanel header="Compensi">
                <Compensi></Compensi>
              </TabPanel>
              <TabPanel header="Appunti">
                <Textarea :rows="10" v-model="pratica.NotaGenerale"></Textarea>
                <div class="flex justify-content-end w-full">
                  <Button
                    :loading="loading"
                    @click="aggiornaNotaPratica"
                    label="Salva appunti"
                  ></Button>
                </div>
              </TabPanel>

              <TabPanel header="Questionari">
                <div class="w-full flex justify-content-end">
                  <SplitButton
                    label="Aggiungi questionario"
                    icon="pi pi-plus"
                    @click="save"
                    :model="questionariOptions"
                  ></SplitButton>
                </div>
                <DataTable
                  :loading="loadingQuestionari"
                  :value="questionariData"
                  :stripedRows="true"
                  :paginator="true"
                  :rows="10"
                  :resizableColumns="true"
                  :scrollable="true"
                  table-layout="auto"
                  ref="dt"
                >
                  <Column field="questionario" header="Nome"></Column>
                  <Column field="stato" header="Stato"></Column>
                  <Column field="data_compilazione" header="Data compilazione">
                    <template #body="{ data }">
                      <span class="text-sm">
                        {{
                          new Date(data.data_compilazione).toLocaleDateString(
                            "it",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        }}
                      </span>
                    </template>
                  </Column>
                  <Column field="azioni" header="Azioni">
                    <template #body="{ data }">
                      <Button
                        @click="showSidebarQuestionari(data)"
                        icon="pi pi-pencil"
                        class="p-button-rounded"
                      ></Button>
                    </template>
                  </Column>
                </DataTable>
              </TabPanel>
            </TabView>
          </template>
        </Card>
      </div>
    </div>
  </div>
  <!-- <Sidebar
    v-model:visible="sidebarAltriImpegniVisible"
    :baseZIndex="10000"
    position="right"
    class="p-sidebar-md"
  >
    <div class="wrapper">
      <h1>Modifica impegno</h1>
      <div class="flex w-full justify-content-between mb-4 flex-column">
        <span>Tipo</span>
        <InputText
          type="text"
          v-model="sidebarAltriImpegniData.tipo"
        ></InputText>
      </div>
      <div class="flex w-full justify-content-between mb-4 flex-column">
        <span>Decorrenza</span>
        <Calendar v-model="sidebarAltriImpegniData.decorrenza"></Calendar>
      </div>
      <div class="flex w-full justify-content-between mb-4 flex-column">
        <span>Importo Rata</span>
        <InputNumber
          type="number"
          v-model="sidebarAltriImpegniData.importo_rata"
        ></InputNumber>
      </div>
      <div class="flex w-full justify-content-between mb-4 flex-column">
        <span>Gestione</span>
        <InputText
          type="text"
          v-model="sidebarAltriImpegniData.gestione"
        ></InputText>
      </div>
      <div
        class="flex w-full justify-content-start gap-4 align-items-center mb-4"
      >
        <InputSwitch v-model="sidebarAltriImpegniData.erogato"></InputSwitch>
        <span>Erogato</span>
      </div>
      <div class="flex w-full justify-content-between mb-4 flex-column">
        <span>Istituto</span>
        <InputText
          type="text"
          v-model="sidebarAltriImpegniData.istituto"
        ></InputText>
      </div>
      <div class="flex w-full justify-content-between mb-4 flex-column">
        <span>Durata Rate</span>
        <InputNumber
          type="number"
          v-model="sidebarAltriImpegniData.durata_rate"
        ></InputNumber>
      </div>
      <div class="flex w-full justify-content-between mb-4 flex-column">
        <span>TAN</span>
        <InputNumber
          type="number"
          v-model="sidebarAltriImpegniData.tan"
        ></InputNumber>
      </div>
      <div
        class="flex w-full justify-content-start gap-4 align-items-center mb-4"
      >
        <InputSwitch v-model="sidebarAltriImpegniData.estingue"></InputSwitch>
        <span>Estingue</span>
      </div>
      <div class="flex w-full justify-content-between mb-4 flex-column">
        <span>Percentuale Mediazione</span>
        <InputNumber
          type="number"
          v-model="sidebarAltriImpegniData.perc_mediazione"
        ></InputNumber>
      </div>
      <div class="w-full flex justify-content-end">
        <Button label="Salva"></Button>
      </div>
    </div>
  </Sidebar> -->
  <Sidebar
    v-model:visible="sidebarQuestionariVisible"
    :baseZIndex="10000"
    position="right"
    class="p-sidebar-md"
  >
    <div
      v-if="loadingQuestionariSidebar"
      class="w-full grid-center"
      style="height: 20vh"
    >
      <i class="pi pi-spin pi-spinner text-3xl"></i>
    </div>
    <div v-else class="wrapper">
      <h4>{{ currentQuestionario.questionario }}</h4>
      <div
        class="question"
        v-for="question of currentQuestionarioDetails.questions"
        :key="question.id"
      >
        <h5 class="mt-4">{{ question.question }}</h5>
        <Dropdown
          class="w-full mb-4"
          v-model="question.id_AnswerSelected"
          :options="question.answers"
          optionLabel="answer"
          optionValue="id"
        ></Dropdown>
      </div>
      <div class="w-full flex justify-content-end">
        <Button @click="salvaQuestionario" label="Salva"></Button>
      </div>
    </div>
  </Sidebar>
</template>

<script setup>
import AxiosService from "@/axiosServices/AxiosService"
import { ref } from "vue"
import { useRoute } from "vue-router"
import { useStore } from "vuex"
// import Documenti from "@/components/Documenti.vue";
import DocumentiPratica from "@/components/tabs/DocumentiPratica.vue"
import Compensi from "@/components/tabs/Compensi.vue"
import { Axios } from "axios"
import Storico from "@/components/tabs/Storico.vue"

const route = useRoute()
const store = useStore()
const id_pratica = route.params.idPratica

const statoPraticaOptions = ref([])
const tmpStato = ref()
function getStatoPraticaOptions() {
  const service = new AxiosService(
    "Options/StatiPratiche/GetStati/" + pratica.value.idTipoProdotto
  )

  service.read().then((res) => {
    statoPraticaOptions.value = res
  })
}

const pratica = ref({})

function getData() {
  pratica.value = {}
  const service = new AxiosService(
    "Pratiche/GetPratica/" + route.params.idPratica
  )
  service
    .read()
    .then((res) => {
      pratica.value = res

      res.dataDecorrenza
        ? (pratica.value.dataDecorrenza = new Date(res.dataDecorrenza))
        : ""
      res.dataScadenza
        ? (pratica.value.dataScadenza = new Date(res.dataScadenza))
        : ""
      res.dataRinnovo
        ? (pratica.value.dataRinnovo = new Date(res.dataRinnovo))
        : ""
    })
    .finally(() => {
      getStatoPraticaOptions()
    })
}

const questionariData = ref([])
const loadingQuestionari = ref(false)

function getQuestionari() {
  loadingQuestionari.value = true
  const service = new AxiosService(
    "Pratiche/GetQuestionariPratica/" + route.params.idPratica
  )
  service
    .read()
    .then((res) => {
      questionariData.value = res
    })
    .finally(() => {
      loadingQuestionari.value = false
    })
}

const currentQuestionarioDetails = ref()
const loadingQuestionariSidebar = ref(false)
function getQuestionario(id_questionario) {
  loadingQuestionariSidebar.value = true
  console.log("trigger get questionario , ", id_questionario)
  const service = new AxiosService(
    "Pratiche/GetQuestionarioPratica/" + id_questionario
  )

  service
    .read()
    .then((res) => {
      console.log("res get questionario, ", res)
      currentQuestionarioDetails.value = res
    })
    .finally(() => {
      loadingQuestionariSidebar.value = false
    })
}

function salvaQuestionario() {
  const service = new AxiosService("Pratiche/SaveQuestionarioPratica/")

  const objToPost = (currentQuestionarioDetails.value = {
    ...currentQuestionarioDetails.value,
    id: currentQuestionario.value.id,
  })

  service
    .update(currentQuestionarioDetails.value)
    .then((res) => {
      console.log("update, ", res)
    })
    .finally(() => {
      sidebarQuestionariVisible.value = false
      getQuestionari()
    })
}

const sidebarQuestionariVisible = ref(false)
const currentQuestionario = ref()
function showSidebarQuestionari(event) {
  sidebarQuestionariVisible.value = true
  currentQuestionario.value = event
  getQuestionario(event.id)
}

const loading = ref(false)

function aggiornaNotaPratica() {
  loading.value = true
  const service = new AxiosService(
    "Pratiche/AggiornaNotaPratica/" + route.params.idPratica
  )
  service
    .create({ appunti: pratica.value.NotaGenerale })
    .then((res) => {
      console.log(res)
    })
    .finally(() => {
      loading.value = false
      getData()
    })
}

const statoChanging = ref(false)

function statoIsChanging() {
  statoChanging.value = true
}
const notaStato = ref("")

function changeStato() {
  loading.value = true

  const service = new AxiosService("Pratiche/AggiornaStatoPratica")
  service
    .update({
      id: route.params.idPratica,
      idAgente: store.getters.loggedUser.id,
      idStato: tmpStato.value.id,
      idPratica: route.params.idPratica,
      Nota: notaStato.value,
      dataEvento: new Date(),
    })
    .then((res) => {
      console.log(res)
    })
    .finally(() => {
      loading.value = false
      statoChanging.value = false
      getData()
    })
}

function salvaPratica() {
  console.log("triggere salva dettagli pratica , ", pratica.value)
  const service = new AxiosService(
    "Pratiche/AggiornaPratica" + "/" + route.params.idPratica
  )

  service
    .updateWithoutId(
      "Pratiche/AggiornaPratica" + "/" + route.params.idPratica,
      pratica.value
    )
    .then((res) => {
      console.log(res)
    })
    .finally(() => {
      getQuestoinariOptions()
      getQuestionari()
      getData()
    })
}

const questionariOptions = ref([])
function getQuestoinariOptions() {
  const service = new AxiosService("Surveys/GetSurveys/2")
  service.read().then((res) => {
    questionariOptions.value = res.map((x) => ({
      label: x.title,

      command: () => {
        const service = new AxiosService(
          "Pratiche/AggiungiQuestionario/" + route.params.idPratica + "/" + x.id
        )

        service
          .create()
          .then((res) => {
            console.log("aggiungi questionario , ", res)
          })
          .finally(() => {
            getQuestionari()
          })
      },
    }))
  })
}

const remoteChat = ref()
function sendRemoteChat() {
  const service = new AxiosService("Pratiche/AddLemon")

  service
    .create({
      idAgente: store.getters.loggedUser.id,
      idStato: 0,
      idPratica: route.params.idPratica,
      Nota: remoteChat.value,
      dataEvento: new Date(),
    })
    .then(() => {
      getData()
    })
    .finally(() => {
      remoteChat.value = ""
    })
}

getQuestoinariOptions()
getQuestionari()
getData()
</script>

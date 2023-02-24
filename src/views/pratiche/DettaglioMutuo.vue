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
              v-if="pratica.clienti"
              class="campo-dettaglio mb-3 flex justify-content-between align-items-center"
            >
              <span>Cliente</span>
              <span v-if="pratica.clienti.length > 0">{{
                pratica.clienti[0].nome + " " + pratica.clienti[0].cognome
              }}</span>
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
                  <div class="col-12 flex justify-content-start flex-wrap pt-4">
                    <div class="col-12 col-md-4 flex flex-column mb-4">
                      <label>Agente</label>
                      <div v-if="loadingUtentiOptions" class="w-full pt-4">
                        <Skeleton></Skeleton>
                      </div>
                      <Dropdown
                        v-else
                        :filter="true"
                        v-model="pratica.idAgente"
                        :options="utentiOptions"
                        optionLabel="text"
                        optionValue="value"
                      ></Dropdown>
                    </div>
                    <div class="col-12 col-md-4 flex flex-column mb-4">
                      <label>Collega</label>
                      <div v-if="loadingUtentiOptions" class="w-full pt-4">
                        <Skeleton></Skeleton>
                      </div>
                      <Dropdown
                        v-else
                        :filter="true"
                        v-model="pratica.idAgenteCollega"
                        :options="utentiOptions"
                        optionLabel="text"
                        optionValue="value"
                      ></Dropdown>
                    </div>
                    <div class="col-12 col-md-2 flex flex-column mb-4">
                      <label>% collega</label>
                      <InputNumber
                        v-model="pratica.percentualeCollega"
                        :min-fraction-digits="0"
                        :max-fraction-digits="2"
                      ></InputNumber>
                    </div>
                  </div>

                  <Divider class="my-4"></Divider>

                  <div class="col-12">
                    <h4>Prodotto</h4>
                  </div>
                  <div class="col-12 col-md-8">
                    <div class="flex flex-column mb-4 col">
                      <label>Prodotto</label>
                      <InputText
                        type="text"
                        placeholder="Tipo operazione"
                        v-model="pratica.descrizioneProdotto"
                      >
                      </InputText>
                    </div>
                  </div>
                  <div class="col-12 col-md-4">
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
                      <label>Motivo del finanziamento</label>
                      <InputText
                        type="text"
                        v-model="pratica.motivoFinanzimento"
                      ></InputText>
                    </div>

                    <div class="flex col flex-column mb-4">
                      <label>Importo richiesto</label>
                      <InputNumber v-model="pratica.importo"></InputNumber>
                    </div>

                    <div class="flex col flex-column mb-4">
                      <label>Importo finanziato</label>
                      <InputNumber
                        v-model="pratica.importoErogato"
                      ></InputNumber>
                    </div>

                    <div class="flex col flex-column mb-4">
                      <label>Tipo di Tasso</label>
                      <InputText
                        type="text"
                        v-model="pratica.tipoTasso"
                      ></InputText>
                    </div>

                    <div class="flex col flex-column mb-4">
                      <label>Tasso finito</label>
                      <InputNumber v-model="pratica.tassoFinito"></InputNumber>
                    </div>

                    <div class="flex col flex-column mb-4">
                      <label>Intermediazione (%)</label>
                      <InputNumber
                        :min-fraction-digits="0"
                        :max-fraction-digits="2"
                        v-model="pratica.percentualeMediazione"
                      ></InputNumber>
                    </div>

                    <div class="flex col flex-column mb-4">
                      <label>Assicurazione</label>
                      <InputNumber
                        v-model="pratica.importoPolizza"
                      ></InputNumber>
                    </div>

                    <div class="flex col flex-column mb-4">
                      <label>LTV</label>
                      <InputNumber v-model="pratica.LTV"></InputNumber>
                    </div>

                    <div class="flex col flex-column mb-4">
                      <label>Rata</label>
                      <InputText
                        type="text"
                        v-model="pratica.importoRata"
                      ></InputText>
                    </div>

                    <div class="flex col flex-column mb-4">
                      <label>Durata</label>
                      <InputText
                        type="text"
                        v-model="pratica.durata"
                      ></InputText>
                    </div>
                  </div>

                  <Divider class="my-4"></Divider>
                  <div class="col-12">
                    <h4>Polizze banca</h4>
                  </div>
                  <div class="col-12 flex justify-content-between">
                    <div class="flex">
                      <Checkbox
                        v-model="pratica.noPolizza"
                        :binary="true"
                        class="mr-2"
                      ></Checkbox>
                      <label>No polizza</label>
                    </div>
                    <div class="flex">
                      <Checkbox
                        v-model="pratica.polVitaUnico"
                        :binary="true"
                        class="mr-2"
                      ></Checkbox>
                      <label>Vita premio unico</label>
                    </div>
                    <div class="flex">
                      <Checkbox
                        v-model="pratica.polLavoroUnico"
                        :binary="true"
                        class="mr-2"
                      ></Checkbox>
                      <label>Lavoro premio unico</label>
                    </div>
                    <div class="flex">
                      <Checkbox
                        v-model="pratica.polVitaMensile"
                        :binary="true"
                        class="mr-2"
                      ></Checkbox>
                      <label>Vita prmensile</label>
                    </div>
                    <div class="flex">
                      <Checkbox
                        v-model="pratica.polLavoroMensile"
                        :binary="true"
                        class="mr-2"
                      ></Checkbox>
                      <label>Lavoro prmensile</label>
                    </div>
                  </div>

                  <div class="col-12 flex flex-wrap justify-content-between">
                    <div class="flex col-12 col-md-3 flex-column">
                      <label>Premio totale polizza</label>
                      <InputNumber
                        type="number"
                        v-model="pratica.premioPolizza"
                      ></InputNumber>
                    </div>
                    <div class="flex col-12 col-md-3 flex-column">
                      <label>Stato Pol. banca</label>
                      <InputNumber
                        type="number"
                        v-model="pratica.statoPolizza"
                      ></InputNumber>
                    </div>
                    <div class="flex col-12 col-md-3 flex-column">
                      <label>Data POL CT-L</label>
                      <Calendar v-model="pratica.dataPolizzaCtl"></Calendar>
                    </div>
                    <div class="flex col-12 col-md-3 flex-column">
                      <label>POL Data-Comp</label>
                      <Calendar v-model="pratica.polizzaDataComp"></Calendar>
                    </div>
                  </div>

                  <Divider class="my-4"></Divider>
                  <div class="col-12">
                    <h4>Immobile in oggetto</h4>
                  </div>

                  <div class="col-12 flex flex-wrap justify-content-between">
                    <div class="flex flex-column col-12 col-md-4">
                      <label>Tipo immobile</label>
                      <InputText
                        v-model="pratica.tipoImmobile"
                        type="text"
                      ></InputText>
                    </div>

                    <div class="flex flex-column col-12 col-md-4">
                      <label>Valore immobile</label>
                      <InputNumber
                        v-model="pratica.valoreImmobile"
                      ></InputNumber>
                    </div>

                    <div class="flex flex-column col-12 col-md-4">
                      <label>Destinazione d'uso</label>
                      <InputText
                        v-model="pratica.destinazioneUso"
                        type="text"
                      ></InputText>
                    </div>

                    <div class="flex flex-column col-12 col-md-4">
                      <label>Provenienza immobile</label>
                      <InputText
                        v-model="pratica.provenienzaImmobile"
                        type="text"
                      ></InputText>
                    </div>

                    <div class="flex flex-column col-12 col-md-4">
                      <label>Comune</label>
                      <InputText
                        v-model="pratica.comuneImmobile"
                        type="text"
                      ></InputText>
                    </div>

                    <div class="flex flex-column col-12 col-md-4">
                      <label>CAP</label>
                      <InputText
                        v-model="pratica.capImmobile"
                        type="text"
                      ></InputText>
                    </div>

                    <div class="flex flex-column col-12 col-md-4">
                      <label>Indirizzo</label>
                      <InputText
                        v-model="pratica.indirizzoImmobile"
                        type="text"
                      ></InputText>
                    </div>

                    <div class="flex flex-column col-12 col-md-4">
                      <label>Numero civico</label>
                      <InputText
                        v-model="pratica.civicoImmobile"
                        type="text"
                      ></InputText>
                    </div>

                    <div class="flex align-items-center col-12 col-md-4">
                      <Checkbox
                        :binary="true"
                        v-model="pratica.voucherMutuo"
                        class="mr-4"
                      ></Checkbox>
                      <label>Voucher Mutuo</label>
                    </div>
                  </div>
                  <Divider class="my-4"></Divider>
                  <div class="col-12">
                    <h4>S.A.L.</h4>
                  </div>
                  <div class="col-12 flex flex-wrap justify-content-between">
                    <div class="flex align-items-center col-12 col-md-4">
                      <Checkbox
                        :binary="true"
                        v-model="pratica.sal"
                        class="mr-4"
                      ></Checkbox>
                      <label>Il mutuo è un SAL?</label>
                    </div>
                    <Message class="col-12" v-if="mutuoSal" severity="warn"
                      >La gestione dei SAL è esclusivamente in WebApp</Message
                    >
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
              <TabPanel header="Mediazione">
                <Mediazione :pratica="pratica"></Mediazione>
              </TabPanel>
              <TabPanel header="Clienti">
                <Clienti
                  @needRefreshPratica="getData()"
                  :pratica="pratica"
                ></Clienti>
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
              <TabPanel header="Privacy">
                <div
                  class="w-full flex align-center justify-content-start my-4"
                  v-for="link in privacyLinks"
                  :key="link.id"
                >
                  <Checkbox v-model="link.value" class="mr-2"></Checkbox>

                  <span
                    ><a :href="'//' + link.url" target="_blank">{{
                      link.title
                    }}</a></span
                  >
                </div>
              </TabPanel>
            </TabView>
          </template>
        </Card>
      </div>
    </div>
  </div>

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

        <InputText
          class="w-full"
          v-if="question.answers[question.answers.length - 1].aperta"
          type="text"
          v-model="question.answers[question.answers.length - 1].answer"
        ></InputText>
        <Dropdown
          v-else
          class="w-full mb-4"
          v-model="question.id_AnswerSelected"
          :options="question.answers"
          optionLabel="answer"
          optionValue="id"
        ></Dropdown>
      </div>
      <div class="w-full flex justify-content-end">
        <Button
          :loading="loading"
          @click="salvaQuestionario"
          label="Salva"
        ></Button>
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
import Clienti from "@/components/tabs/Clienti.vue"
import Mediazione from "@/components/tabs/Mediazione.vue"

const route = useRoute()
const store = useStore()
const id_pratica = route.params.idPratica

const mutuoSal = ref(false)

const privacyLinks = ref([
  {
    id: 1,
    url: "www.google.com",
    title: "Link privacy numero 1",
    value: false,
  },
  {
    id: 2,
    url: "www.google.com",
    title: "Link privacy numero 2",
    value: false,
  },
  {
    id: 3,
    url: "www.google.com",
    title: "Link privacy numero 3",
    value: false,
  },
])

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
  loading.value = true
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
      loading.value = false
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

const utentiOptions = ref()
const loadingUtentiOptions = ref(false)
function getUtentiOptions() {
  loadingUtentiOptions.value = true
  const service = new AxiosService("Options/GetUsers")
  service
    .read()
    .then((res) => {
      utentiOptions.value = res
    })
    .finally(() => {
      loadingUtentiOptions.value = false
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

getUtentiOptions()
getQuestoinariOptions()
getQuestionari()
getData()
</script>

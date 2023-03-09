<template>
  <Toast></Toast>
  <div class="wrapper">
    <h1 class="mb-4">Preventivo Prestito</h1>

    <Card class="mb-4">
      <template #content>
        <div class="flex flex-column justify-content-between">
          <div class="w-full flex flex-column justify-content-between">
            <label>Seleziona l'istituto che ti interessa </label>
            <Dropdown
              :filter="true"
              :options="istitutiOptions"
              v-model="istitutiSelected"
            ></Dropdown>
          </div>
          <div class="flex justify-content-end w-full mt-4">
            <Button
              class="mr-2"
              @click="resettaFiltro"
              label="Resetta filtro"
            ></Button>
            <Button @click="filterByIstituto" label="Filtra"></Button>
          </div>
        </div>
      </template>
    </Card>

    <div class="grid">
      <div class="col-12 col-lg-4">
        <Card>
          <template #content>
            <h2 class="mb-4" role="button">
              <span v-if="route.params.idAnagrafica != 0">{{
                objectToPost.nomeCliente
              }}</span>
              <span v-else-if="route.params.idPreventivo != 0">{{
                objectToPost.nomeCliente
              }}</span>
              <span v-else>Nuovo Cliente</span>
            </h2>

            <div v-if="loading">
              <i class="pi pi-spin pi-spinner"></i>
            </div>
            <div v-else>
              <div>
                <div class="flex flex-column w-full mb-4">
                  <label>Nome e cognome </label>
                  <InputText
                    type="text"
                    v-model="objectToPost.nomeCliente"
                  ></InputText>
                </div>
                <div
                  class="flex flex-column w-full mb-4"
                  :class="{ 'not-valid-item': !valid_dataNascita }"
                >
                  <label>Data di nascita</label>
                  <Calendar v-model="objectToPost.dataNascita"></Calendar>
                </div>
                <div
                  class="flex flex-column w-full mb-4"
                  :class="{ 'not-valid-item': !valid_dataAssunzione }"
                >
                  <label>Data di assunzione</label>
                  <Calendar v-model="objectToPost.dataAssunzione"></Calendar>
                </div>
                <div
                  class="flex flex-column w-full mb-4"
                  :class="{ 'not-valid-item': !valid_sesso }"
                >
                  <label>Genere</label>
                  <Dropdown
                    :filter="true"
                    :options="genereOptions"
                    optionLabel="text"
                    optionValue="value"
                    v-model="objectToPost.sesso"
                  >
                  </Dropdown>
                </div>
                <div
                  class="flex flex-column w-full mb-4"
                  :class="{ 'not-valid-item': !valid_tipoRapporto }"
                >
                  <label>Tipo rapporto lavoro</label>
                  <Dropdown
                    :filter="true"
                    v-model="objectToPost.tipoRapporto"
                    :options="tipoRapportoOptions"
                    optionLabel="text"
                    optionValue="text"
                  ></Dropdown>
                </div>
              </div>
            </div>
          </template>
        </Card>
        <Card class="mt-4">
          <template #content>
            <h2>Prestito personale</h2>
            <div
              class="flex flex-column w-full mb-4"
              :class="{ 'not-valid-item': !valid_redditoRichiedenti }"
            >
              <label>Reddito mensile netto del richiedente </label>
              <InputNumber
                currency="EUR"
                mode="currency"
                locale="it-IT"
                :minFractionDigits="2"
                v-model="objectToPost.redditoRichiedenti"
              ></InputNumber>
            </div>
            <div
              class="flex flex-column w-full mb-4"
              :class="{ 'not-valid-item': !valid_importoRichiesto }"
            >
              <label>Importo richiesto</label>
              <InputNumber
                currency="EUR"
                mode="currency"
                locale="it-IT"
                :minFractionDigits="2"
                v-model="objectToPost.importoRichiesto"
              ></InputNumber>
            </div>

            <div
              class="flex flex-column w-full mb-4"
              :class="{ 'not-valid-item': !valid_durata }"
            >
              <label>Durata mesi</label>
              <Dropdown
                :filter="true"
                type="text"
                v-model="objectToPost.durata"
                :options="durataOptions"
              ></Dropdown>
            </div>
          </template>
        </Card>
        <div class="flex justify-content-between mt-4">
          <Button
            :disabled="!isValidFilter"
            :loading="loading"
            label="Salva preventivo"
            @click="salvaPreventivo"
            class="mr-4"
          ></Button>
          <Button
            :disabled="!isValidFilter"
            :loading="loading"
            label="Ricerca opzioni"
            @click="ricercaRisultati"
          ></Button>
        </div>
      </div>
      <div class="col-12 col-lg-8">
        <div v-for="(item, index) of finalRisultato" :key="index">
          <Card v-if="item.Stato == ''" class="mb-4 py-0 px-1">
            <template #content>
              <div class="grid py-0">
                <div class="col-6 flex flex-column align-items-start py-0">
                  <div
                    v-if="item.logo"
                    class="py-0 col-4 flex justify-content-end"
                  >
                    <img
                      class="w-full"
                      :src="
                        'https://prestitosi.mediafacile.it/WS/preventivi/partner/' +
                        item.logo
                      "
                    />
                  </div>
                  <span class="mt-1 font-bold">
                    {{ item.Descrizione_prodotto }}</span
                  >
                  <span class="mt-1"
                    ><span>Polizza: </span>
                    <span class="text-xs">{{
                      item.Descrizione_polizza
                    }}</span></span
                  >
                </div>
                <div
                  class="col-6 flex flex-column justify-content-end align-items-center"
                >
                  <div
                    class="w-full flex justify-content-end alifn-items-center mb-2"
                  >
                    <Button
                      @click="showModal(item)"
                      icon="pi pi-info"
                      class="p-button-outlined p-button-rounded mr-2"
                    ></Button>
                    <Button
                      @click="creaPratica(item)"
                      icon="pi pi-plus"
                      class="p-button-outlined p-button-rounded mr-2"
                    ></Button>
                  </div>
                  <div
                    class="flex justify-content-between align-items-center gap-2 w-full"
                  >
                    <div
                      class="flex flex-column align-items-end justify-content-between"
                    >
                      <div>IMPORTO RATA</div>
                      <div class="font-bold" style="font-size: 1.2rem">
                        {{ formateDivise(item.Importo_rata) }}
                      </div>
                    </div>
                    <div
                      class="flex flex-column align-items-end justify-content-between"
                    >
                      <div>TAEG</div>
                      <div class="font-bold" style="font-size: 1.2rem">
                        {{ item.TAEG }}
                      </div>
                    </div>
                    <div
                      class="flex flex-column align-items-end justify-content-between"
                    >
                      <div>IMPORTO EROGATO</div>
                      <div class="font-bold" style="font-size: 1.2rem">
                        {{ formateDivise(item.Importo_erogato) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>
        <Divider class="mt-4 mb-4"></Divider>
        <div v-for="(item, index) of finalRisultato" :key="index">
          <Card v-if="item.length > 0" class="mb-4 py-0 px-1">
            <template #content>
              <div class="grid py-0 text-gray-500">
                <div class="col-6 flex flex-column align-items-start py-0">
                  <div
                    v-if="item.logo"
                    class="py-0 col-4 flex justify-content-end"
                  >
                    <img
                      class="w-full opacity-70"
                      :src="
                        'https://prestitosi.mediafacile.it/WS/preventivi/partner/' +
                        item.logo
                      "
                    />
                  </div>
                  <span class="mt-1 font-bold">
                    {{ item.Descrizione_prodotto }}</span
                  >
                  <span class="mt-1"
                    ><span>Stato: </span>
                    <span class="text-xs">{{ item.Stato }}</span></span
                  >
                </div>
                <div
                  class="col-6 flex flex-column justify-content-end align-items-center"
                >
                  <div
                    class="w-full flex justify-content-end alifn-items-center mb-2"
                  >
                    <Tag
                      class="px-4 py-2"
                      icon="pi pi-times"
                      severity="danger"
                      value="Non Valido"
                    ></Tag>
                  </div>
                  <div
                    class="flex justify-content-between align-items-center gap-2 w-full"
                  >
                    <div
                      class="flex flex-column align-items-end justify-content-between"
                    >
                      <div>IMPORTO RATA</div>
                      <div class="font-bold" style="font-size: 1.2rem">
                        {{ formateDivise(item.Importo_rata) }}
                      </div>
                    </div>
                    <div
                      class="flex flex-column align-items-end justify-content-between"
                    >
                      <div>TAEG</div>
                      <div class="font-bold" style="font-size: 1.2rem">
                        {{ item.TAEG }}
                      </div>
                    </div>
                    <div
                      class="flex flex-column align-items-end justify-content-between"
                    >
                      <div>IMPORTO EROGATO</div>
                      <div class="font-bold" style="font-size: 1.2rem">
                        {{ formateDivise(item.Importo_erogato) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
  <Dialog
    class="mr-4"
    :header="tmpItem.Denominazione_istituto"
    v-model:visible="modalVisible"
    position="right"
    :breakpoints="{ '960px': '400px', '640px': '300px' }"
    :style="{ width: '400px' }"
  >
    <div class="flex flex-column">
      <span style="font-weight: bold">{{ tmpItem.Descrizione_prodotto }}</span>
      <span>{{ tmpItem.Descrizione_polizza }}</span>
    </div>
    <Divider></Divider>
    <div>
      <div class="flex justify-content-between">
        <span>Importo Richiesto</span>
        <span>{{ objectToPost.importoRichiesto }},00 €</span>
      </div>
      <div class="flex justify-content-between">
        <span>Importo finanziato</span>
        <span>{{ formateDivise(tmpItem.Importo_erogato) }}</span>
      </div>
      <div class="flex justify-content-between">
        <span>Durata</span>
        <span>{{ tmpItem.Durata }}</span>
      </div>
    </div>
    <Divider></Divider>
    <div class="flex justify-content-between">
      <span>Importo rata</span>
      <span>{{ formateDivise(tmpItem.Importo_rata) }}</span>
    </div>
    <Divider></Divider>
    <div>
      <div class="flex justify-content-between">
        <span>Importo Interessi</span>
        <span>{{ formateDivise(tmpItem.Importo_interessi) }}</span>
      </div>
      <div class="flex justify-content-between">
        <span>Importo Imposta</span>
        <span>{{ formateDivise(tmpItem.Importo_imposta) }}</span>
      </div>
      <div class="flex justify-content-between">
        <span>Importo Commissione</span>
        <span>{{ formateDivise(tmpItem.Importo_commissione || "0,00") }}</span>
      </div>
      <div class="flex justify-content-between">
        <span>Importo Polizza</span>
        <span>{{ formateDivise(tmpItem.Importo_polizza) }}</span>
      </div>
      <div class="flex justify-content-between">
        <span>Importo Spese Istruttoria</span>
        <span>{{ formateDivise(tmpItem.Importo_spese_registro) }}</span>
      </div>
      <div class="flex justify-content-between">
        <span>Importo Altre Spese</span>
        <span>{{ formateDivise(tmpItem.Importo_spese_altre) }}</span>
      </div>
    </div>
    <Divider></Divider>
    <div>
      <div class="flex justify-content-between">
        <span>TAN</span>
        <span>{{ tmpItem.TAN }} %</span>
      </div>
      <div class="flex justify-content-between">
        <span>TAEG</span>
        <span>{{ tmpItem.TAEG }} %</span>
      </div>
    </div>
  </Dialog>
  <Sidebar
    v-model:visible="confermaAnagraficaVisible"
    :baseZIndex="10000"
    position="right"
    class="p-sidebar-md"
  >
    <NuovaAnagraficaSimplified
      @event_refreshList="salvaAnagraficaECreaPreventivo($event)"
    ></NuovaAnagraficaSimplified>
  </Sidebar>
</template>

<script setup>
import AxiosService from "@/axiosServices/AxiosService"
import { useRoute } from "vue-router"
import axios from "axios"
import { ref, computed } from "vue"
import { useStore } from "vuex"
import { useToast } from "primevue/usetoast"
import NuovaAnagraficaSimplified from "@/components/sidebars/NuovaAnagraficaSimplified.vue"

const loading = ref(false)
const route = useRoute()
const store = useStore()
const toast = useToast()

const confermaAnagraficaVisible = ref(false)
function showConfermaAnagrafica() {
  confermaAnagraficaVisible.value = true
}

function checkRouteParams() {
  if (route.params.idAnagrafica != 0) {
    getRetail(route.params.idAnagrafica)
  }
  if (route.params.idPreventivo != 0) {
    getFiltro(route.params.idPreventivo)
  }
}
checkRouteParams()

function getRetail(id) {
  console.log("get retail")
  loading.value = true
  const service = new AxiosService("Anagrafiche/Retail/" + id)
  service
    .read()
    .then((res) => {
      objectToPost.value.nomeCliente = res.nome + " " + res.cognome
      objectToPost.value.dataNascita = new Date(res.dataNascita)
      // .toLocaleDateString('it', {
      //   year: 'numeric',
      //   month: '2-digit',
      //   day: '2-digit',
      // })
      objectToPost.value.dataAssunzione = new Date(res.dataAssunzione)
      // .toLocaleDateString('it', {
      //   year: 'numeric',
      //   month: '2-digit',
      //   day: '2-digit',
      // })
      if (res.idSess0 == 1) {
        objectToPost.value.sesso = "M"
      } else if (res.idSesso == 3) {
        objectToPost.value.sesso = "F"
      } else {
        objectToPost.value.sesso = ""
      }
      objectToPost.value.tipoRapporto = res.professione
      objectToPost.value.redditoRichiedenti = 0
    })
    .catch((err) => console.log(err))
    .finally(() => (loading.value = false))
}

function getFiltro(idPreventivo) {
  console.log("get filtro")
  const service = new AxiosService("Preventivatore/GetPreventivi")
  service
    .create({
      idCliente: 0,
      idAgente: 0,
      idPreventivo: idPreventivo,
    })
    .then((res) => {
      objectToPost.value = { ...res[0] }
      objectToPost.value.redditoRichiedenti.toString().replaceAll(",", ".")
      objectToPost.value.importoRichiesto.toString().replaceAll(",", ".")
      ricercaRisultati()
    })
}

function creaPratica(item, idNuovoCliente) {
  tempItem.value = {}
  tempItem.value = { ...item }
  console.log("🚀 ~ file: PreventivoCQS.vue:545 ~ creaPratica ~ item", item)
  if (route.params.idAnagrafica == 0 && route.params.idPreventivo == 0) {
    console.log("no anagrafica no pratica")
    showConfermaAnagrafica()
  } else {
    const praticaToPost = {
      importoRata: item.Importo_rata,
      durata: item.Durata,
      importoInteressi: item.Importo_interessi,
      importoImposta: item.Importo_imposta,
      importoPolizza: item.Importo_polizza,
      importoSpeseRegistro: item.Importo_spese_registro,
      importoSpeseAltre: item.Importo_spese_altre,
      importoErogato: item.Importo_erogato,
      tan: item.TAN,
      taeg: item.TAEG,
      teg: item.TEG,
      descrizioneProdotto: item.Descrizione_prodotto,
      descrizionePolizza: item.Descrizione_polizza,
      idStato: item.Stato,
      istitutoFinanziatore: item.Denominazione_istituto,
      dataInserimento: null,
      dataScadenza: null,
      dataLiquidazione: null,
      idAgente: store.getters.loggedUser.id,
      idCliente: idNuovoCliente || route.params.idAnagrafica,
      percentualeMediazione: objectToPost.value.percentualeMediazione,
    }

    const service = new AxiosService("Pratiche/NuovaPratica/prestito")
    service.create(praticaToPost).then(() => {
      toast.add({
        severity: "success",
        summary: "Nuova Pratica creata",
        detail: 'La puoi trovare nel menu "GESTIONE PRATICHE/Bozze"',
        life: 10000,
      })
    })
  }
}

const genereOptions = [
  {
    text: "Uomo",
    value: "M",
  },
  {
    text: "Donna",
    value: "F",
  },
]

const tipoRapportoOptions = [
  {
    text: "Statale",
  },
  {
    text: "Pubblico",
  },
  {
    text: "Privato SPA",
  },
  {
    text: "Privato SRL",
  },
  {
    text: "Medico",
  },
  {
    text: "Pensionato INPS",
  },
  {
    text: "Pensionato altri enti",
  },
  {
    text: "Postale",
  },
  {
    text: "Ferroviere",
  },
  {
    text: "Parapubblico",
  },
  {
    text: "Libero professionista",
  },
  {
    text: "Autonomo",
  },
]

// PRESTITO
const durataOptions = [12, 24, 36, 48, 60, 72, 84, 96]
const have_risultati = ref(true)
const risultato = ref([])

const objectToPost = ref({
  nome: "",
  cognome: "",
  nomeCliente: "",
  dataNascita: "",
  dataAssunzione: "",
  dataDecorrenza: null,
  sesso: "",
  tipoRapporto: "",
  durata: 0,
  durataAnni: 0,
  tipoTasso: "",
  finalita: "",
  provinciaImmobile: "",
  rinnovo: "",
  importoRichiesto: 0,
  importoRata: 0,
  valoreImmobile: 0,
  redditoRichiedenti: 0,
  speseMediazione: 0,
})

const tempItem = ref()

function salvaAnagraficaECreaPreventivo(idNuovoCliente) {
  loading.value = true
  const praticaToPost = {
    importoRata:
      tempItem.value.Importo_rata.indexOf(",") > -1
        ? tempItem.value.Importo_rata.replace(",", ".")
        : tempItem.value.Importo_rata,
    durata: tempItem.value.Durata,
    importoInteressi:
      tempItem.value.Importo_interessi.indexOf(",") > -1
        ? tempItem.value.Importo_interessi.replace(",", ".")
        : tempItem.value.Importo_interessi,
    importoImposta:
      tempItem.value.Importo_imposta.indexOf(",") > -1
        ? tempItem.value.Importo_imposta.replace(",", ".")
        : tempItem.value.Importo_imposta,
    importoPolizza:
      tempItem.value.Importo_polizza.indexOf(",") > -1
        ? tempItem.value.Importo_polizza.replace(",", ".")
        : tempItem.value.Importo_polizza,
    importoSpeseRegistro:
      tempItem.value.Importo_spese_registro.indexOf(",") > -1
        ? tempItem.value.Importo_spese_registro.replace(",", ".")
        : tempItem.value.Importo_spese_registro,
    importoSpeseAltre:
      tempItem.value.Importo_spese_altre.indexOf(",") > -1
        ? tempItem.value.Importo_spese_altre.replace(",", ".")
        : tempItem.value.Importo_spese_altre,
    importoErogato:
      tempItem.value.Importo_erogato.indexOf(",") > -1
        ? tempItem.value.Importo_erogato.replace(",", ".")
        : tempItem.value.Importo_erogato,
    importoRichiesto: objectToPost.value.importoRichiesto,
    // importoRichiesto:
    //   objectToPost.value.importoRichiesto.indexOf(",") > -1
    //     ? objectToPost.value.importoRichiesto.replace(",", ".")
    //     : objectToPost.value.importoRichiesto,
    tan:
      tempItem.value.TAN.indexOf(",") > -1
        ? tempItem.value.TAN.replace(",", ".")
        : tempItem.value.TAN,
    taeg:
      tempItem.value.TAEG.indexOf(",") > -1
        ? tempItem.value.TAEG.replace(",", ".")
        : tempItem.value.TAEG,
    teg:
      tempItem.value.TEG.indexOf(",") > -1
        ? tempItem.value.TEG.replace(",", ".")
        : tempItem.value.TEG,
    descrizioneProdotto: tempItem.value.Descrizione_prodotto,
    descrizionePolizza: tempItem.value.Descrizione_polizza,
    idStato: tempItem.value.Stato,
    istitutoFinanziatore: tempItem.value.Denominazione_istituto,
    dataInserimento: null,
    dataScadenza: null,
    dataLiquidazione: null,
    idAgente: store.getters.loggedUser.id,
    idCliente: idNuovoCliente,
    percentualeMediazione: objectToPost.value.percentualeMediazione,
  }

  const service = new AxiosService("Pratiche/NuovaPratica/prestito")

  service
    .create(praticaToPost)
    .then((res) => {
      console.log(res)
      toast.add({
        severity: "success",
        summary: "Nuova Pratica creata",
        detail: 'La puoi trovare nel menu "GESTIONE PRATICHE/Bozze"',
        life: 10000,
      })
    })
    .finally(() => {
      confermaAnagraficaVisible.value = false
      loading.value = false
      console.log("pratica creata")
    })
}

var parseString = require("xml2js").parseString
function ricercaRisultati() {
  loading.value = true
  risultato.value.splice(0)
  filteredRisultato.value.splice(0)
  reducedRisultato.value.splice(0)
  finalRisultato.value.splice(0)

  objectToPost.value.redditoRichiedenti.toString().replaceAll(".", ",")
  objectToPost.value.importoRichiesto.toString().replaceAll(".", ",")
  axios
    .post(
      "https://prestitosi-core.datarete.cloud/api/Preventivatore/PreventivoPrestito",
      objectToPost.value
    )
    .then((response) => {
      // var self = this;
      parseString(response.data, function (err, result) {
        // console.log("🚀 ~ file: PreventivoPrestito.vue ~ line 222 ~ result", result.fmresultset.resultset[0].record)
        console.log(
          "🚀 ~ file: PreventivoPrestito.vue ~ line 222 ~ result",
          result
        )

        if (result.fmresultset.resultset[0].$.count == 0) {
          have_risultati.value = false
          return
        }

        result.fmresultset.resultset[0].record.map((item) => {
          return item.field.map((field) => {
            field.nome = field.$.name
            field.value = field.data[0]
            delete field.$
            delete field.data
          })
        })
        risultato.value = result.fmresultset.resultset[0].record

        risultato.value.forEach((item) => {
          const newItem = item.field.filter((field) => {
            if (
              field.nome == "Durata" ||
              field.nome == "TAEG" ||
              field.nome == "Importo_rata" ||
              field.nome == "Importo_erogato" ||
              field.nome == "Descrizione_prodotto" ||
              field.nome == "Denominazione_istituto" ||
              field.nome == "Importo_interessi" ||
              field.nome == "Importo_imposta" ||
              field.nome == "Importo_polizza" ||
              field.nome == "Importo_spese_registro" ||
              field.nome == "Importo_spese_altre" ||
              field.nome == "TAN" ||
              field.nome == "TEG" ||
              field.nome == "Stato" ||
              field.nome == "Descrizione_polizza" ||
              field.nome == "logo"
            ) {
              return true
            }
            return false
          })
          filteredRisultato.value.push(newItem)
        })

        filteredRisultato.value.forEach((item) => {
          const newItem = item.reduce(
            (obj, item) => ({ ...obj, [item.nome]: item.value }),
            {}
          )
          reducedRisultato.value.push(newItem)
          finalRisultato.value.push(newItem)
        })

        console.log(
          "🚀 ~ file: PreventivoPrestito.vue ~ line 228 ~ risultato.value",
          reducedRisultato.value
        )
      })
    })
    .finally(() => {
      loading.value = false
      const listIstituti = []
      reducedRisultato.value.forEach((element) => {
        listIstituti.push(element.Denominazione_istituto)
      })

      istitutiOptions.value = getIstituti(listIstituti)
    })
}

function getIstituti(array) {
  return Array.from(new Set(array))
}

const reducedRisultato = ref([])
const filteredRisultato = ref([])

const finalRisultato = ref([])

const istitutiOptions = ref([])
const istitutiSelected = ref()
function filterByIstituto() {
  console.log(
    "trigger filter by istituto",
    finalRisultato.value,
    reducedRisultato.value
  )
  finalRisultato.value.splice(0)

  console.log("istituti selected , ", istitutiSelected.value)
  finalRisultato.value = reducedRisultato.value.filter((x) => {
    console.log(
      "dentro il ciclo , ",
      x.Denominazione_istituto,
      istitutiSelected.value
    )
    return x.Denominazione_istituto == istitutiSelected.value
  })
}

const tmpItem = ref({})
const modalVisible = ref(false)
function showModal(item) {
  tmpItem.value = {}
  modalVisible.value = true
  tmpItem.value = { ...item }
}

const objSalvaPreventivo = ref({})
function salvaPreventivo() {
  loading.value = true
  objSalvaPreventivo.value = {
    ...objectToPost.value,
    numeroRisultati: reducedRisultato.value.length,
    IDCliente: route.params.idAnagrafica,
  }
  const service = new AxiosService("Preventivatore/SalvaPreventivo/prestito")
  service
    .create(objSalvaPreventivo.value)
    .then((res) => {
      console.log(res)
    })
    .finally(() => {
      loading.value = false
    })
}

function formateDivise(string) {
  return parseFloat(string.replace(",", ".")).toLocaleString("it-IT", {
    style: "currency",
    currency: "EUR",
  })
}

// OPEN PRATICA
function openPreventivo(event) {
  console.log(
    "🚀 ~ file: PreventivoPrestito.vue:469 ~ openPreventivo ~ event",
    event
  )
}

const isValidFilter = computed({
  get() {
    if (
      valid_dataNascita.value &&
      valid_dataAssunzione.value &&
      valid_sesso.value &&
      valid_tipoRapporto.value &&
      valid_redditoRichiedenti.value &&
      valid_importoRichiesto.value &&
      valid_durata.value
    )
      return true
    return false
  },
})

const valid_dataNascita = computed({
  get() {
    return objectToPost.value.dataNascita.length <= 0 ? false : true
  },
})
const valid_dataAssunzione = computed({
  get() {
    return objectToPost.value.dataAssunzione.length <= 0 ? false : true
  },
})
const valid_sesso = computed({
  get() {
    return objectToPost.value.sesso.length <= 0 ? false : true
  },
})
const valid_tipoRapporto = computed({
  get() {
    return objectToPost.value.tipoRapporto.length <= 0 ? false : true
  },
})
const valid_redditoRichiedenti = computed({
  get() {
    return objectToPost.value.redditoRichiedenti == 0 ? false : true
  },
})
const valid_importoRichiesto = computed({
  get() {
    return objectToPost.value.importoRichiesto == 0 ? false : true
  },
})
const valid_durata = computed({
  get() {
    return objectToPost.value.durata == 0 ? false : true
  },
})
</script>

<style lang="scss" scoped>
.grey-text {
  color: grey;
}
</style>

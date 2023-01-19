<template>
  <div class="wrapper">
    <h1 class="mb-4">Preventivo Mutuo</h1>

    <Card v-if="istitutiOptions.length > 0" class="mb-4">
      <template #content>
        <div class="w-full flex justify-content-between">
          <Dropdown
            :filter="true"
            :options="istitutiOptions"
            v-model="istitutiSelected"
          ></Dropdown>
        </div>
        <div class="flex justify-content-end w-full">
          <Button @click="filterByIstituto" label="Filtra"></Button>
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
              <span v-else>Nuovo Cliente</span>
            </h2>

            <div v-if="loading">
              <i class="pi pi-spin pi-spinner"></i>
            </div>
            <div v-else>
              <div>
                <div
                  :class="{ 'not-valid-item': !valid_nomeCliente }"
                  class="flex flex-column w-full mb-4"
                >
                  <label>Nome e cognome</label>
                  <InputText
                    type="text"
                    v-model="objectToPost.nomeCliente"
                  ></InputText>
                </div>
                <div
                  :class="{ 'not-valid-item': !valid_dataNascita }"
                  class="flex flex-column w-full mb-4"
                >
                  <label>Data di nascita</label>
                  <Calendar v-model="objectToPost.dataNascita"></Calendar>
                </div>
                <div
                  :class="{ 'not-valid-item': !valid_dataAssunzione }"
                  class="flex flex-column w-full mb-4"
                >
                  <label>Data assunzione</label>
                  <Calendar v-model="objectToPost.dataAssunzione"></Calendar>
                </div>
                <div
                  :class="{ 'not-valid-item': !valid_sesso }"
                  class="flex flex-column w-full mb-4"
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
                  :class="{ 'not-valid-item': !valid_tipoRapporto }"
                  class="flex flex-column w-full mb-4"
                >
                  <label>Tipo rapporto</label>
                  <Dropdown
                    :filter="true"
                    :options="tipoRapportoOptions"
                    optionLabel="text"
                    optionValue="text"
                    v-model="objectToPost.tipoRapporto"
                  >
                  </Dropdown>
                </div>
              </div>
            </div>
          </template>
        </Card>
        <Card class="mt-4">
          <template #content>
            <h2>Mutuo</h2>
            <div
              :class="{ 'not-valid-item': !valid_finalita }"
              class="flex flex-column w-full mb-4"
            >
              <label>Finalità</label>
              <Dropdown
                :filter="true"
                :options="finalita"
                optionValue="value"
                optionLabel="text"
                v-model="objectToPost.finalita"
              >
              </Dropdown>
            </div>
            <div
              :class="{ 'not-valid-item': !valid_tipoTasso }"
              class="flex flex-column w-full mb-4"
            >
              <label>Tipo di tasso</label>
              <Dropdown
                :filter="true"
                :options="tipoTasso"
                optionValue="text"
                optionLabel="text"
                v-model="objectToPost.tipoTasso"
              >
              </Dropdown>
            </div>
            <div
              :class="{ 'not-valid-item': !valid_redditoRichiedenti }"
              class="flex flex-column w-full mb-4"
            >
              <label>Reddito mensile netto del richiedente</label>
              <InputNumber
                currency="EUR"
                mode="currency"
                locale="it-IT"
                :minFractionDigits="2"
                v-model="objectToPost.redditoRichiedenti"
              ></InputNumber>
            </div>
            <div
              :class="{ 'not-valid-item': !valid_importoRichiesto }"
              class="flex flex-column w-full mb-4"
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
              :class="{ 'not-valid-item': !valid_durataAnni }"
              class="flex flex-column w-full mb-4"
            >
              <label>Durata</label>
              <Dropdown
                :filter="true"
                type="text"
                v-model="objectToPost.durataAnni"
                :options="durataOptions"
              >
              </Dropdown>
            </div>
            <div
              :class="{ 'not-valid-item': !valid_provinciaImmobile }"
              class="flex flex-column w-full mb-4"
            >
              <label>Provincia immobile</label>
              <InputText
                type="text"
                v-model="objectToPost.provinciaImmobile"
              ></InputText>
            </div>
            <div
              :class="{ 'not-valid-item': !valid_valoreImmobile }"
              class="flex flex-column w-full mb-4"
            >
              <label>Valore immobile</label>
              <InputNumber
                currency="EUR"
                mode="currency"
                locale="it-IT"
                :minFractionDigits="2"
                v-model="objectToPost.valoreImmobile"
              ></InputNumber>
            </div>
            <div
              :class="{ 'not-valid-item': !valid_provvigione }"
              class="flex flex-column w-full mb-4"
            >
              <label>Provvigione</label>
              <InputNumber
                currency="EUR"
                mode="currency"
                locale="it-IT"
                :minFractionDigits="2"
                v-model="objectToPost.provvigione"
              ></InputNumber>
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
      <div v-if="have_risultati" class="col-12 col-lg-8">
        <div v-for="(item, index) of finalRisultato" :key="index">
          <Card v-if="item.Stato == ''" class="mb-4 py-4 px-2">
            <template #content>
              <div class="grid">
                <div class="col-8 flex flex-column align-items-start">
                  <h2 class="mb-2">{{ item.Denominazione_istituto }}</h2>
                  <span> {{ item.Descrizione_prodotto }}</span>
                </div>
                <div v-if="item.logo" class="col-4 flex justify-content-end">
                  <img
                    :src="
                      'https://prestitosi.mediafacile.it/WS/preventivi/partner/' +
                      item.logo
                    "
                  />
                </div>
              </div>

              <Divider></Divider>
              <div class="grid">
                <div class="col-6"></div>
                <div class="col-3">
                  <div>TAEG</div>
                  <div style="font-size: 2rem">{{ item.TAEG }}</div>
                </div>
                <div class="col-3">
                  <div>RATA</div>
                  <div style="font-size: 2rem">
                    {{ formateDivise(item.Importo_rata) }}
                  </div>
                </div>
              </div>
              <Divider></Divider>
              <div class="flex justify-content-between">
                <div class="">
                  <span>Polizza: </span>
                  <span>{{ item.Descrizione_polizza }}</span>
                </div>
                <div class="flex flex-grow justify-content-between">
                  <Button
                    @click="showModal(item)"
                    label="Dettagli"
                    class="p-button-outlined mr-2"
                  ></Button>
                  <Button
                    @click="openPreventivo(item)"
                    label="Salva Preventivo"
                    class="p-button-outlined mr-2"
                  ></Button>
                </div>
              </div>
            </template>
          </Card>
        </div>
        <Divider class="mt-4 mb-4"></Divider>
        <div v-for="(item, index) of finalRisultato" :key="index">
          <Card v-if="item.Stato.length > 0" class="mb-4 py-4 px-2">
            <template #header>
              <div class="w-full flex justify-content-end pr-4">
                <InlineMessage severity="warn" class="mr-4"
                  >Non abilitato</InlineMessage
                >
              </div>
            </template>
            <template #content>
              <div class="grid">
                <div
                  class="col-8 flex flex-column align-items-start"
                  style="color: darkgray"
                >
                  <h2 class="mb-2">{{ item.Denominazione_istituto }}</h2>
                  <span> {{ item.Descrizione_prodotto }}</span>
                </div>
                <div v-if="item.logo" class="col-4 flex justify-content-end">
                  <img
                    :src="
                      'https://prestitosi.mediafacile.it/WS/preventivi/partner/' +
                      item.logo
                    "
                  />
                </div>
              </div>

              <Divider></Divider>

              <div class="grid">
                <div class="col-9">
                  <span style="font-weight: bold">Non Abilitato: </span>
                  <span style="color: brown">{{ item.Stato }}</span>
                </div>
                <div class="col-3 flex justify-content-end">
                  <Button
                    disabled
                    @click="showModal(item)"
                    label="Dettagli"
                    class="p-button-outlined"
                  ></Button>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
      <div v-else>Non ci sono risultati</div>
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
        <span>Durata</span>
        <span>{{ tmpItem.Durata }}</span>
      </div>
    </div>
    <Divider></Divider>
    <div class="flex justify-content-between">
      <span>Importo Rata</span>
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
      <div class="flex justify-content-between">
        <span>Importo Provvigione</span>
        <span>{{ formateDivise(tmpItem.Importo_provvigione) }}</span>
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
</template>

<script setup >
import AxiosService from "@/axiosServices/AxiosService";
import { useRoute } from "vue-router";
import axios from "axios";
import { ref, computed } from "vue";

const loading = ref(false);
const route = useRoute();

function checkRouteParams() {
  console.log("trigger check route");
  if (route.params.idAnagrafica != 0) {
    console.log("idAnagrafica != 0");
    getRetail(route.params.idAnagrafica);
  }
  if (route.params.idPreventivo != 0) {
    console.log("idPreventivo != 0");
    getFiltro(route.params.idPreventivo);
  }
}
checkRouteParams();

function getRetail(id) {
  loading.value = true;
  const service = new AxiosService("Anagrafiche/Retail/" + id);
  service
    .read()
    .then((res) => {
      objectToPost.value.nomeCliente = res.nome + " " + res.cognome;
      objectToPost.value.dataNascita = new Date(
        res.dataNascita
      ).toLocaleDateString("it", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      objectToPost.value.dataAssunzione = new Date(
        res.dataAssunzione
      ).toLocaleDateString("it", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      if (res.idSess0 == 1) {
        objectToPost.value.sesso = "M";
      } else if (res.idSesso == 3) {
        objectToPost.value.sesso = "F";
      } else {
        objectToPost.value.sesso = "";
      }
      objectToPost.value.tipoRapporto = res.professione;
    })
    .catch((err) => console.log(err))
    .finally(() => (loading.value = false));
}

function getFiltro(idPreventivo) {
  console.log("get filtro");
  const service = new AxiosService("Preventivatore/GetPreventivi");
  service
    .create({
      idCliente: 0,
      idAgente: 0,
      idPreventivo: idPreventivo,
    })
    .then((res) => {
      objectToPost.value = { ...res[0] };
      objectToPost.value.importoRichiesto.toString().replaceAll(",", ".");
      objectToPost.value.redditoRichiedenti.toString().replaceAll(",", ".");
      objectToPost.value.valoreImmobile.toString().replaceAll(",", ".");
      objectToPost.value.provvigione.toString().replaceAll(",", ".");
      ricercaRisultati();
    });
}

const objectToPost = ref({
  nomeCliente: "",
  dataNascita: "",
  dataAssunzione: "",
  dataDecorrenza: "",
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
  provvigione: 0,
});

const genereOptions = [
  {
    text: "Uomo",
    value: "M",
  },
  {
    text: "Donna",
    value: "F",
  },
];

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
];

const finalita = [
  {
    value: "Acquisto prima casa",
    text: "Acquisto prima casa",
  },
  {
    value: "Surroga",
    text: "Surroga",
  },
  {
    value: "Acquisto seconda casa",
    text: "Acquisto seconda casa",
  },
  {
    value: "Acquisto in Asta",
    text: "Acquisto in asta",
  },
  {
    value: "Completamento costruzione",
    text: "Completamento costruzione",
  },
  {
    value: "Acquisto+Ristrutturazione",
    text: "Acquisto e ristrutturazione",
  },
  {
    value: "Ristrutturazione",
    text: "Ristrutturazione",
  },
  {
    value: "Liquidità",
    text: "Liquidità",
  },
  {
    value: "Consolidamento debiti",
    text: "Consolidamento debiti",
  },
  {
    value: "Sostituzione+Liquidità",
    text: "Sostituzione e liquidità",
  },
  {
    value: "Ristrutturazione+Liquidità",
    text: "Ristrutturazione e liquidità",
  },
];

const tipoTasso = [
  {
    text: "Fisso",
  },
  {
    text: "Variabile",
  },
  {
    text: "Variabile a rata costante",
  },
  {
    text: "Variabile con cap",
  },
  {
    text: "Misto",
  },
];

// PRESTITO
const durataOptions = [
  10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
  105, 110, 115, 120, 125, 130, 135, 140, 145, 160, 165, 170, 175, 180, 185,
  190, 195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250, 255, 260,
  265, 270, 275, 280, 285, 290, 295, 300,
];

//CALCOLA
const risultato = ref([]);

const have_risultati = ref(true);
var parseString = require("xml2js").parseString;
function ricercaRisultati() {
  loading.value = true;
  risultato.value.splice(0);
  filteredRisultato.value.splice(0);
  reducedRisultato.value.splice(0);

  objectToPost.value.importoRichiesto.toString().replaceAll(".", ",");
  objectToPost.value.redditoRichiedenti.toString().replaceAll(".", ",");
  objectToPost.value.valoreImmobile.toString().replaceAll(".", ",");
  objectToPost.value.provvigione.toString().replaceAll(".", ",");

  axios
    .post(
      "https://prestitosi-core.datarete.cloud/api/Preventivatore/PreventivoMutuo",
      objectToPost.value
    )
    .then((response) => {
      parseString(response.data, function (err, result) {
        if (result.fmresultset.resultset[0].$.count == 0) {
          have_risultati.value = false;
          return;
        }

        result.fmresultset.resultset[0].record.map((item) => {
          return item.field.map((field) => {
            field.nome = field.$.name;
            field.value = field.data[0];
            delete field.$;
            delete field.data;
          });
        });
        risultato.value = result.fmresultset.resultset[0].record;

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
              field.nome == "Importo_provvigione" ||
              field.nome == "TAN" ||
              field.nome == "TEG" ||
              field.nome == "Stato" ||
              field.nome == "Descrizione_polizza" ||
              field.nome == "logo"
            ) {
              return true;
            }
            return false;
          });
          filteredRisultato.value.push(newItem);
        });

        filteredRisultato.value.forEach((item) => {
          const newItem = item.reduce(
            (obj, item) => ({ ...obj, [item.nome]: item.value }),
            {}
          );
          reducedRisultato.value.push(newItem);
          finalRisultato.value.push(newItem);
        });
      });
    })
    .finally(() => {
      loading.value = false;
      const listIstituti = [];
      reducedRisultato.value.forEach((element) => {
        listIstituti.push(element.Denominazione_istituto);
      });

      istitutiOptions.value = getIstituti(listIstituti);
    });
}

const finalRisultato = ref([]);

const istitutiOptions = ref([]);
const istitutiSelected = ref();
function filterByIstituto() {
  finalRisultato.value.splice(0);
  finalRisultato.value = reducedRisultato.value.filter((x) => {
    x.Denominazione_istituto == istitutiSelected.value;
  });
}

function getIstituti(array) {
  return Array.from(new Set(array));
}

const reducedRisultato = ref([]);
const filteredRisultato = ref([]);

const tmpItem = ref({});
const modalVisible = ref(false);
function showModal(item) {
  tmpItem.value = {};
  modalVisible.value = true;
  tmpItem.value = { ...item };
}

function formateDivise(string) {
  return parseFloat(string.replace(",", ".")).toLocaleString("it-IT", {
    style: "currency",
    currency: "EUR",
  });
}

// OPEN PRATICA
function openPreventivo(event) {
  console.log(
    "🚀 ~ file: PreventivoPrestito.vue:469 ~ openPreventivo ~ event",
    event
  );
}

const objSalvaPreventivo = ref({});
function salvaPreventivo() {
  loading.value = true;
  objSalvaPreventivo.value = {
    ...objectToPost.value,
    numeroRisultati: reducedRisultato.value.length,
    IDCliente: route.params.idAnagrafica,
  };
  const service = new AxiosService("Preventivatore/SalvaPreventivo/mutuo");
  service
    .create(objSalvaPreventivo.value)
    .then((res) => {
      console.log(res);
    })
    .finally(() => {
      loading.value = false;
    });
}

const isValidFilter = computed({
  get() {
    if (
      valid_nomeCliente.value &&
      valid_dataNascita.value &&
      valid_dataAssunzione.value &&
      valid_sesso.value &&
      valid_tipoRapporto.value &&
      valid_finalita.value &&
      valid_tipoTasso.value &&
      valid_redditoRichiedenti.value &&
      valid_importoRichiesto.value &&
      valid_provvigione.value &&
      valid_durataAnni.value &&
      valid_provinciaImmobile.value &&
      valid_valoreImmobile.value
    )
      return true;
    return false;
  },
});

const valid_nomeCliente = computed({
  get() {
    return objectToPost.value.nomeCliente.length <= 0 ? false : true;
  },
});
const valid_finalita = computed({
  get() {
    return objectToPost.value.finalita.length <= 0 ? false : true;
  },
});
const valid_tipoTasso = computed({
  get() {
    return objectToPost.value.tipoTasso.length <= 0 ? false : true;
  },
});
const valid_provinciaImmobile = computed({
  get() {
    return objectToPost.value.provinciaImmobile.length <= 0 ? false : true;
  },
});
const valid_dataNascita = computed({
  get() {
    return objectToPost.value.dataNascita.length <= 0 ? false : true;
  },
});
const valid_dataAssunzione = computed({
  get() {
    return objectToPost.value.dataAssunzione.length <= 0 ? false : true;
  },
});
const valid_sesso = computed({
  get() {
    return objectToPost.value.sesso.length <= 0 ? false : true;
  },
});
const valid_tipoRapporto = computed({
  get() {
    return objectToPost.value.tipoRapporto.length <= 0 ? false : true;
  },
});
const valid_redditoRichiedenti = computed({
  get() {
    return objectToPost.value.redditoRichiedenti == 0 ? false : true;
  },
});
const valid_importoRichiesto = computed({
  get() {
    return objectToPost.value.importoRichiesto == 0 ? false : true;
  },
});
const valid_valoreImmobile = computed({
  get() {
    return objectToPost.value.valoreImmobile == 0 ? false : true;
  },
});
const valid_provvigione = computed({
  get() {
    return objectToPost.value.provvigione == 0 ? false : true;
  },
});
const valid_durataAnni = computed({
  get() {
    return objectToPost.value.durataAnni == 0 ? false : true;
  },
});
</script>

<style lang="scss" scoped>
.grey-text {
  color: grey;
}
</style>
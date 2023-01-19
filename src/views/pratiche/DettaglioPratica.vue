<template>
  <div class="wrapper">
    <h1>Pratica: {{ id_pratica }}</h1>
    <div class="grid">
      <dic class="col-3">
        <Card>
          <template #header>
            <div class="bg-gray-800 px-4 text-white">Dettagli pratica</div>
          </template>
          <template #content>
            <h2 class="mb-4">{{ pratica.TipoProdotto }}</h2>
            <div
              class="
                campo-dettaglio
                mb-3
                flex
                justify-content-between
                align-items-center
              "
            >
              <span>Numero</span>
              <span s class="font-semibold">{{ id_pratica }}</span>
            </div>
            <div
              class="
                campo-dettaglio
                mb-3
                flex
                justify-content-between
                align-items-center
              "
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
              class="
                campo-dettaglio
                mb-3
                flex
                justify-content-between
                align-items-center
              "
            >
              <span>Cliente</span>
              <span>{{ pratica.Cliente }}</span>
            </div>
            <div
              class="
                campo-dettaglio
                mb-3
                flex
                justify-content-between
                align-items-center
              "
            >
              <span>Agente</span>
              <span class="cursor-pointer">{{ pratica.Agente }}</span>
            </div>
            <div
              class="
                campo-dettaglio
                mb-3
                flex
                justify-content-between
                align-items-center
              "
            >
              <span>Istituto</span>
              <span class="cursor-pointer">{{
                pratica.istitutoFinanziatore
              }}</span>
            </div>
            <div
              class="
                campo-dettaglio
                mb-3
                flex
                justify-content-between
                align-items-center
              "
            >
              <span>Importo Erogato</span>
              <span href="#" class="font-semibold">
                € {{ pratica.importoErogato }}</span
              >
            </div>
            <div
              class="
                campo-dettaglio
                mb-3
                flex
                justify-content-between
                align-items-center
              "
            >
              <span>Durata</span>
              <span href="#" class="font-semibold"
                >{{ pratica.durata }} anni</span
              >
            </div>
            <Divider></Divider>
            <div
              class="
                campo-dettaglio
                mb-3
                flex
                justify-content-between
                align-items-center
              "
            >
              <span>Stato pratica</span>
              <Dropdown
                :filter="true"
                v-model="tmpStato"
                :options="statoPraticaOptions"
                optionLabel="nome"
                placeholder="Seleziona uno stato"
                @change="statoIsChanging"
              />
            </div>
            <div class="flex flex-column pt-2 pb-2" v-if="statoChanging">
              <InputText
                type="text"
                v-model="notaStato"
                placeholder="Nota stato..."
              ></InputText>
              <Button
                :loading="loading"
                class="mt-2"
                label="Cambia Stato"
                @click="changeStato"
              ></Button>
            </div>
            <div v-if="pratica.StoricoStati" class="text-gray-500">
              <div class="mb-4">
                <span class="font-bold">Storico stati</span>
              </div>
              <div
                v-for="(item, index) in pratica.StoricoStati"
                :key="index"
                class="pt-2 mb-2 flex justify-content-between"
              >
                <span>{{ item.Stato }}</span>
                <span>{{
                  new Date(item.dataEvento).toLocaleDateString("it", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }}</span>
              </div>
            </div>
          </template>
        </Card>
      </dic>
      <dic class="col-9">
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
                        v-model="pratica.erogato"
                      ></InputNumber>
                    </div>
                    <div class="flex col flex-column">
                      <label>Importo Richiesto</label>
                      <InputNumber
                        type="number"
                        v-model="pratica.importo_richiesto"
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
                    <Button :loading="loading" label="Salva"></Button>
                  </div>
                </div>
              </TabPanel>
              <TabPanel header="Storico">
                <Card
                  class="mb-2"
                  v-for="item of tutteLeAttivita"
                  :key="item.id"
                >
                  <template #content>
                    <CrmItemNota
                      @confirmDeleteItem="confirmDeleteItem($event)"
                      @reloadFeed="getCrmItems"
                      v-if="item.id_type == 1"
                      :item="item"
                    >
                    </CrmItemNota>
                    <CrmItemAppuntamento
                      v-if="item.id_type == 2"
                      :item="item"
                    ></CrmItemAppuntamento>
                    <CrmItemPratica
                      v-if="item.id_type == 3"
                      :item="item"
                    ></CrmItemPratica>
                  </template>
                </Card>
              </TabPanel>
              <TabPanel header="Documenti">
                <Documenti></Documenti>
              </TabPanel>
              <TabPanel header="Compensi">
                <DataTable
                  :value="compensiData"
                  :stripedRows="true"
                  :paginator="true"
                  :rows="10"
                  :resizableColumns="true"
                  :scrollable="true"
                  table-layout="auto"
                  ref="dt"
                >
                  <Column
                    field="data_inserito"
                    header="Inserito"
                    :sortable="true"
                  >
                    <template #body="{ data }">
                      {{
                        new Date(data.data_inserito).toLocaleDateString("it")
                      }}
                    </template>
                  </Column>
                  <Column field="descrizione" header="Descrizione"></Column>
                  <Column field="tipo" header="Tipo"></Column>
                  <Column field="importo" header="Importo">
                    <template #body="{ data }">
                      <span
                        :class="{
                          'text-pink-500': data.tipo == 'Uscita',
                          'text-green-500': data.tipo == 'Entrata',
                        }"
                        >€ {{ data.importo.toFixed(2) }}</span
                      >
                    </template>
                  </Column>
                  <Column field="stato" header="Stato"></Column>
                </DataTable>
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
                <DataTable
                  :value="questionariData"
                  :stripedRows="true"
                  :paginator="true"
                  :rows="10"
                  :resizableColumns="true"
                  :scrollable="true"
                  table-layout="auto"
                  ref="dt"
                >
                  <Column field="data" header="Data">
                    <template #body="{ data }">
                      {{ data.data.toLocaleDateString("it") }}
                    </template>
                  </Column>
                  <Column field="nome" header="Nome"></Column>
                  <Column field="stato" header="Stato"></Column>
                  <Column field="azioni" header="Azioni">
                    <template #body>
                      <Button
                        @click="showSidebarQuestionari"
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
      </dic>
    </div>
  </div>
  <Sidebar
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
  </Sidebar>
  <Sidebar
    v-model:visible="sidebarQuestionariVisible"
    :baseZIndex="10000"
    position="right"
    class="p-sidebar-md"
  >
    <div class="wrapper">
      <h1>Quesionario</h1>
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton class="mb-2"></Skeleton>
      <div class="w-full flex justify-content-end">
        <Button label="Salva"></Button>
      </div>
    </div>
  </Sidebar>
</template>

<script setup>
import AxiosService from "@/axiosServices/AxiosService";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Documenti from "@/components/Documenti.vue";

const route = useRoute();
const store = useStore();
const id_pratica = route.params.idPratica;

const statoPraticaOptions = ref([]);
const tmpStato = ref();
function getStatoPraticaOptions() {
  const service = new AxiosService(
    "Options/StatiPratiche/GetStati/" + pratica.value.idTipoProdotto
  );

  service.read().then((res) => {
    statoPraticaOptions.value = res;
  });
}

const pratica = ref({});

function getData() {
  const service = new AxiosService(
    "Pratiche/GetPratica/" + route.params.idPratica
  );
  service
    .read()
    .then((res) => {
      pratica.value = res;

      res.dataDecorrenza
        ? (pratica.value.dataDecorrenza = new Date(res.dataDecorrenza))
        : "";
      res.dataScadenza
        ? (pratica.value.dataScadenza = new Date(res.dataScadenza))
        : "";
      res.dataRinnovo
        ? (pratica.value.dataRinnovo = new Date(res.dataRinnovo))
        : "";
    })
    .finally(() => {
      getStatoPraticaOptions();
    });
}

const compensiData = ref([
  {
    id: 1,
    data_inserito: new Date("2022-11-03"),
    descrizione: "Agente",
    tipo: "Uscita",
    importo: 30,
    stato: "inserito",
  },
  {
    id: 1,
    data_inserito: new Date("2022-11-03"),
    descrizione: "Agente",
    tipo: "Entrata",
    importo: 28,
    stato: "inserito",
  },
]);

const questionariData = ref([
  {
    data: new Date("2022-08-12"),
    nome: "Persona giuridica",
    stato: "completo",
  },
  {
    data: new Date("2022-07-15"),
    nome: "Persona fisica",
    stato: "completo",
  },
]);

const sidebarQuestionariVisible = ref(false);
function showSidebarQuestionari(event) {
  sidebarQuestionariVisible.value = true;
  console.log(event);
}

const loading = ref(false);

function aggiornaNotaPratica() {
  loading.value = true;
  const service = new AxiosService(
    "Pratiche/AggiornaNotaPratica/" + route.params.idPratica
  );
  service
    .create({ appunti: pratica.value.NotaGenerale })
    .then((res) => {
      console.log(res);
    })
    .finally(() => {
      loading.value = false;
      getData();
    });
}

const statoChanging = ref(false);

function statoIsChanging() {
  statoChanging.value = true;
}
const notaStato = ref("");

function changeStato() {
  loading.value = true;
  const service = new AxiosService(
    "Pratiche/AggiornaStatoPratica/" + route.params.idPratica
  );
  service
    .create({
      idAgente: store.getters.loggedUser.id,
      idStato: tmpStato.value.id,
      idPratica: route.params.idPratica,
      Nota: notaStato.value,
      dataEvento: new Date(),
    })
    .then((res) => {
      console.log(res);
    })
    .finally(() => {
      loading.value = false;
      statoChanging.value = false;
      getData();
    });
}
getData();
</script>

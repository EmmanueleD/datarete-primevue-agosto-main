<template>
  <ConfirmDialog></ConfirmDialog>
  <Toast></Toast>
  <div class="wrapper">
    <h1>Anagrafiche {{ $route.name }}</h1>

    <Card class="mb-4">
      <template #content>
        <Accordion>
          <AccordionTab header="Filtri" class="w-full">
            <div class="flex flex-wrap w-full gap-4 align-items-center">
              <div class="flex flex-column flex-grow mb-4">
                <label>Cognome</label>
                <InputText type="text" v-model="filtro.cognome"></InputText>
              </div>
              <div class="flex flex-column flex-grow mb-4">
                <label>Nome</label>
                <InputText type="text" v-model="filtro.nome"></InputText>
              </div>
              <div class="flex flex-column flex-grow mb-4">
                <label>Codice fiscale</label>
                <InputText
                  type="text"
                  v-model="filtro.codice_fiscale"
                ></InputText>
              </div>
              <div class="flex flex-column flex-grow mb-4">
                <label>Telefono</label>
                <InputText
                  type="text"
                  v-model="filtro.numero_telefono"
                ></InputText>
              </div>
              <Divider></Divider>
              <div class="flex flex-column col-md-3 col-12 flex-grow mb-4">
                <label>Stato</label>
                <!-- <MultiSelect :filter="true" :options="statoOptions" optionLabel="nome" optionGroupLabel="nome"
                  optionGroupChildren="child" optionValue="id" v-model="filtro.stato">

                  <template #optiongroup="slotProps">
                    <div class="flex align-items-center country-item">

                      <div style="font-weight: bold">{{ slotProps.option.nome }}</div>
                    </div>
                  </template>
                </MultiSelect> -->
                <MultiSelect
                  :filter="true"
                  :options="statoOptions"
                  optionLabel="nome"
                  optionValue="id"
                  v-model="filtro.stato"
                  @change="
                    getSubStatoOptions(filtro.stato[filtro.stato.length - 1])
                  "
                >
                </MultiSelect>
              </div>
              <div class="flex flex-column col-md-3 col-12 flex-grow mb-4">
                <label>Sottostato</label>

                <MultiSelect
                  :filter="true"
                  :options="sottostatoOptions"
                  optionLabel="nome"
                  optionValue="id"
                  v-model="filtro.sottostato"
                >
                </MultiSelect>
              </div>
              <div class="flex flex-column col-md-3 col-12 flex-grow mb-4">
                <label>Origine</label>
                <MultiSelect
                  :filter="true"
                  :options="origineOptions"
                  optionLabel="nome"
                  optionValue="id"
                  v-model="filtro.origine"
                >
                </MultiSelect>
              </div>
              <div class="flex flex-column col-md-3 col-12 flex-grow mb-4">
                <label>Origine lead</label>
                <Dropdown
                  :filter="true"
                  v-model="filtro.origine_lead"
                  :options="origineLeadOptions"
                  optionLabel="text"
                  optionValue="text"
                ></Dropdown>
              </div>
              <div class="flex flex-column col-md-3 col-12 flex-grow mb-4">
                <label>Commerciale</label>
                <MultiSelect
                  :filter="true"
                  :options="usersOptions"
                  optionLabel="text"
                  optionValue="value"
                  v-model="filtro.commerciale"
                >
                </MultiSelect>
              </div>
              <Divider></Divider>
              <div class="flex flex-column flex-grow mb-4">
                <label>Data creazione</label>
                <Calendar
                  selectionMode="range"
                  :manualInput="false"
                  v-model="filtro.data_creazione"
                />
              </div>
              <div class="flex flex-column flex-grow mb-4">
                <label>Data modifica</label>
                <Calendar
                  selectionMode="range"
                  :manualInput="false"
                  v-model="filtro.data_modifica"
                />
              </div>
              <div class="flex flex-column flex-grow mb-4">
                <label>Data prossimo rinnovo</label>
                <Calendar
                  selectionMode="range"
                  :manualInput="false"
                  v-model="filtro.data_prossimo_rinnovo"
                />
              </div>
              <div class="flex flex-column flex-grow mb-4">
                <label>Data prossimo contatto</label>
                <Calendar
                  selectionMode="range"
                  v-model="filtro.data_prossimo_contatto"
                />
              </div>
              <Divider></Divider>
              <div class="flex flex-column flex-grow mb-4">
                <label>Regione</label>
                <InputText type="text" v-model="filtro.regione"></InputText>
              </div>
              <div class="flex flex-column flex-grow mb-4">
                <label>Provincia</label>
                <InputText type="text" v-model="filtro.provincia"></InputText>
              </div>
              <Divider></Divider>
              <div class="flex w-full justify-content-between">
                <div>Numero di risultati: {{ config.totalRecords }}</div>
                <div>
                  <Button
                    :loading="loading"
                    @click="resetFilter"
                    label="Resetta i filtri"
                    class="mr-2"
                  ></Button>
                  <Button
                    :loading="loading"
                    @click="getTableItemsFromFilter"
                    label="Filtra"
                  ></Button>
                </div>
              </div>
            </div>
          </AccordionTab>
        </Accordion>
      </template>
    </Card>

    <div class="w-full flex justify-content-center" v-if="loadingFilter">
      <i class="pi pi-spin pi-spinner font-size-2"> </i>
    </div>
    <div v-else>
      <div class="w-full flex justify content-end">
        <div class="w-full flex justify-content-end align-items-center mb-4">
          <div class="w-full flex justify-content-start">
            <InputText
              class="mr-2"
              placeholder="Ricerca generale..."
              v-model="filtro.fullSearch"
            ></InputText>
            <Button
              :loading="loading"
              @click="getTableItemsFromFilter"
              :label="loading ? 'Compilando i risultati' : 'Cerca'"
            ></Button>
          </div>
        </div>
        <div class="w-full flex justify-content-end align-items-center mb-4">
          <span class="mr-2">Anagrafiche da visualizzare</span>
          <InputNumber
            class="mr-2"
            type="number"
            v-model="rowsToShow"
            placeholder="Anagrafiche da visualizzare"
          ></InputNumber>
          <Button @click="getTableItems" label="Applica"></Button>
        </div>
      </div>
      <TableBuilder
        ref="TableComponent"
        @onSort="onSort($event)"
        @onPage="onPage($event)"
        @event_ShowSidebar_eye="goToCrm"
        @event_ShowSidebar_edit="showEditAnagrafica"
        @event_ShowSidebar_modifica="null"
        @event_ShowSidebar_nuovoAppuntamento="$router.push('/eventi')"
        @event_ShowSidebar_creaPratica="null"
        @event_ShowSidebar_elimina="confirmDelete"
        @event_Menubar_Inserisci="showSidebarEventi"
        :data="tableItems"
        :headersConfig="columns"
        :config="config"
        :showAzioni="true"
        :rowSelection="true"
        :rowsToShow="rowsToShow"
      >
      </TableBuilder>
    </div>
    <Sidebar
      v-model:visible="sidebarClientiVisible"
      :baseZIndex="10000"
      position="right"
      class="p-sidebar-md"
    >
      <SidebarClienti :sidebarData="sidebarClientiData"> </SidebarClienti>
    </Sidebar>

    <Sidebar
      v-model:visible="nuovaAnagraficaVisible"
      :baseZIndex="10000"
      position="right"
      class="p-sidebar-lg"
    >
      <NuovaAnagrafica
        @event_refreshList="hideEditAnagrafica"
        :sidebarData="nuovaAnagraficaData"
      >
      </NuovaAnagrafica>
    </Sidebar>

    <Sidebar
      v-model:visible="sidebarEventiVisible"
      :baseZIndex="10000"
      position="right"
      class="p-sidebar-md"
    >
      <SidebarEventi :sidebarData="sidebarEventiData"></SidebarEventi>
    </Sidebar>

    <Dialog
      header="Riassegna le anagrafiche selezionate"
      v-model:visible="riassegnaModalVisible"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
    >
      <div class="w-full">
        <div class="flex w-100 flex-column col-md-3 col-12 flex-grow mb-4">
          <label>Stato</label>
          <Dropdown
            :filter="true"
            :options="statoOptions"
            optionLabel="nome"
            optionValue="id"
            v-model="riassegna.idStato"
          >
          </Dropdown>
        </div>
        <div class="flex w-100 flex-column col-md-3 col-12 flex-grow mb-4">
          <label>Commerciale</label>
          <Dropdown
            :filter="true"
            :options="usersOptions"
            optionLabel="text"
            optionValue="value"
            v-model="riassegna.idCommerciale"
          >
          </Dropdown>
        </div>
      </div>
      <template #footer>
        <Button
          label="Annulla"
          icon="pi pi-times"
          @click="hideriassegnaModal"
          class="p-button-text"
        />
        <Button
          :disabled="riassegna.idStato == 0 || riassegna.idCommerciale == 0"
          label="Riassegna"
          icon="pi pi-check"
          @click="riassegnaAnagrafiche"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { CRM_POST } from "../../store/actions/crm";
import AxiosService from "../../axiosServices/AxiosService";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
// IMPORT COMPONENTS
import TableBuilder from "../../components/TableBuilder.vue";

// IMPORT SIDEBARS
import SidebarClienti from "../../components/sidebars/SidebarClienti.vue";
import NuovaAnagrafica from "../../components/sidebars/NuovaAnagrafica.vue";
import SidebarEventi from "../../components/sidebars/SidebarEventi.vue";
import { TableView } from "@fullcalendar/daygrid";

const route = useRoute();
const router = useRouter();
const confirm = useConfirm();
const toast = useToast();
// SET STORE UTILITIES
const store = useStore();

const loading = ref(false);
const loadingFilter = ref(false);

function setContentLoading_true() {
  store.dispatch("CONTENTLOADING_TRUE");
}
function setContentLoading_false() {
  store.dispatch("CONTENTLOADING_FALSE");
}
// SET EVENTS
// eslint-disable-next-line no-unused-vars, no-undef
const emit = defineEmits(["event_Menubar_Inserisci"]);

// SIDEBAR EVENTI
const sidebarEventiVisible = ref(false);
const sidebarEventiData = ref();
function showSidebarEventi() {
  sidebarEventiVisible.value = true;
}

// SIDEBAR NUOVA ANAGRAFICA
const nuovaAnagraficaVisible = ref(false);
const nuovaAnagraficaData = ref();
function showEditAnagrafica(event) {
  const eventMapped = {};
  eventMapped.id = event.ID;
  eventMapped.nome = event.NOME;
  eventMapped.cognome = event.COGNOME;
  eventMapped.email = event.EMAIL;
  eventMapped.codiceFiscale = event.CODICE_FISCALE;
  eventMapped.id_sesso = event.SESSO;
  eventMapped.dataNascita = event.NASCITA_DATA;
  eventMapped.cittadinanza = event.CITTADINANZA;
  eventMapped.idNazioneNascita = event.NACITA_NAZIONE_ID;
  eventMapped.idRegioneNascita = event.NASCITA_REGIONE_ID;
  eventMapped.idProvinciaNascita = event.NACITA_PROVINCIA_ID;
  eventMapped.idCittaNascita = event.NACITA_CITTA_ID;
  eventMapped.idStatoCivile = event.STATO_CIVILE;
  eventMapped.idTipoOccupazione = event.TIPO_OCCUPAZIONE;
  eventMapped.professione = event.PROFESSIONE;
  eventMapped.dataAssunzione = event.DATA_ASSUNZIONE;
  eventMapped.dataScadenzaContratto = event.DATA_SCADENZA_CONTRATTO;
  eventMapped.contrattoIndeterminato = event.CONTRATTO_INDETERMINATO;
  eventMapped.nomeAzienda = event.DENOMINAZIONE_AZIENDA;
  eventMapped.personaPoliticamenteEsposta = event.POLITICAMENTE_ESPOSTO;
  eventMapped.guidatoreAbituale = event.GUIDATORE_ABITUALE;

  nuovaAnagraficaVisible.value = true;
  nuovaAnagraficaData.value = eventMapped;
}
function hideEditAnagrafica() {
  nuovaAnagraficaData.value = {};
  nuovaAnagraficaVisible.value = false;
  getViews();
}

// SIDEBAR CLIENTI
const sidebarClientiVisible = ref(false);
const sidebarClientiData = ref();

// TABLE BUILDER

const config = ref({
  zebra: true,
  menuItems: [
    {
      label: "Inserisci",
      icon: "pi pi-fw pi-plus",
      items: [
        {
          label: "Nuova Anagrafica",
          command: () => {
            nuovaAnagraficaVisible.value = true;
          },
        },
      ],
    },
    {
      label: "Viste",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "Vista DEFAULT",
        },
        {
          separator: true,
        },
        {
          label: "Vista UNO",
        },
        {
          label: "Vista DUE",
        },
      ],
    },
    {
      label: "Modifica",
      icon: "pi pi-fw pi-pencil",
      items: [
        {
          label: "Riassegna",
          command: () => {
            riassegnaModalVisible.value = true;
          },
        },
      ],
    },
  ],
  lazy: true,
  totalRecords: 0,
  loading: false,
});

const riassegnaModalVisible = ref(false);
const riassegna = ref({
  idStato: 0,
  idCommerciale: 0,
  idAnagrafiche: [],
});

function hideriassegnaModal() {
  riassegnaModalVisible.value = false;
  riassegna.value = {
    idStato: 0,
    idCommerciale: 0,
    idAnagrafiche: [],
  };
}

const TableComponent = ref();

function riassegnaAnagrafiche() {
  loading.value = true;
  riassegna.value.idAnagrafiche.splice(0);
  let idArray = TableComponent.value.selectedProducts.map(
    (anagrafica) => anagrafica.ID
  );

  riassegna.value.idAnagrafiche = idArray;

  const service = new AxiosService("Anagrafiche/RiassegnaAnagrafiche");
  service
    .create(riassegna.value)
    .then((res) => console.log(res))
    .finally(() => {
      hideriassegnaModal();
      loading.value = false;
    });
}

// // get viste
const viste = ref([]);
async function getViews() {
  setContentLoading_true();
  const service = new AxiosService("getTableInfo");
  await service
    .readCustomEndpoint(
      "https://prestitosi-core.datarete.cloud/api/Tables/GetTableInfo/1"
    )
    .then((res) => {
      if (res) {
        console.log("🚀 ~ file: Lead.vue ~ line 140 ~ getViews ~ res", res);

        res.visualizzazioni.forEach((element) => {
          viste.value.push(element);

          // create obj to show "viste list" in the menu
          let visteForMenu = JSON.parse(JSON.stringify(viste.value));
          visteForMenu.map((x) => {
            x.label = x.nome;
            x.command = delete x.nome;
          });
          config.value.menuItems[1].items = visteForMenu;
        });
      }
    });
  getColumns();
}
// // get columns
let columns = ref([]);
let dateColumns = [];
async function getColumns(idVista) {
  const service = new AxiosService("getTableView");

  if (idVista) {
    await service
      .readCustomEndpoint(
        "https://prestitosi-core.datarete.cloud/api/Tables/GetTableView/1/" +
          idVista
      )
      .then((res) => {
        if (res) {
          dateColumns = res.colonne
            .filter((column) => column.type == "Date")
            .map((x) => x.field);
          columns.value = res.colonne;
        }
      });
  } else {
    await service
      .readCustomEndpoint(
        "https://prestitosi-core.datarete.cloud/api/Tables/GetTableView/1/" +
          viste.value[0].id
      )
      .then((res) => {
        if (res) {
          dateColumns = res.colonne
            .filter((column) => column.type == "Date")
            .map((x) => x.field);
          columns.value = res.colonne;
        }
      });
  }
  getTableItems();
  return columns.value;
}

const filtro = ref({
  cognome: "",
  nome: "",
  stato: [],
  origine: [],
  commerciale: [],
  data_creazione: "",
  data_modifica: "",
  regione: "",
  provincia: "",
  order_campo: "",
  order_type: "",
  codice_fiscale: "",
  numero_telefono: "",
  data_prossimo_rinnovo: "",
  data_prossimo_contatto: "",
  sottostato: [],
  origine_lead: "",
});

const filtroToCall = ref({
  cognome: "",
  nome: "",
  stato: [],
  origine: [],
  commerciale: [],
  data_creazione: "",
  data_modifica: "",
  regione: "",
  provincia: "",
  order_campo: "",
  order_type: "",
  codice_fiscale: "",
  numero_telefono: "",
  data_prossimo_rinnovo: "",
  data_prossimo_contatto: "",
  sottostato: [],
  origine_lead: "",
});

function resetFilter() {
  filtro.value = {
    cognome: "",
    nome: "",
    stato: [],
    origine: [],
    commerciale: [],
    data_creazione: "",
    data_modifica: "",
    regione: "",
    provincia: "",
    order_campo: "",
    order_type: "",
    codice_fiscale: "",
    numero_telefono: "",
    data_prossimo_rinnovo: "",
    data_prossimo_contatto: "",
    sottostato: [],
    origine_lead: "",
  };
}

// // get rows
let tableItems = ref([]);
function getTableItems() {
  loading.value = true;
  config.value.totalRecords = 0;
  config.value.loading = true;
  tableItems.value.splice(0);

  filtroToCall.value = { ...filtro.value };

  filtro.value.data_creazione == ""
    ? (filtroToCall.value.data_creazione = [])
    : filtroToCall.value.data_creazione;
  filtro.value.data_modifica == ""
    ? (filtroToCall.value.data_modifica = [])
    : filtroToCall.value.data_modifica;
  filtro.value.data_prossimo_rinnovo == ""
    ? (filtroToCall.value.data_prossimo_rinnovo = [])
    : filtroToCall.value.data_prossimo_rinnovo;
  filtro.value.data_prossimo_contatto == ""
    ? (filtroToCall.value.data_prossimo_contatto = [])
    : filtroToCall.value.data_prossimo_contatto;

  lazyParams.value.takeElements = rowsToShow.value;

  const service = new AxiosService(
    "Anagrafiche/RetailLight?serverPagination=true?fromIndex=" +
      lazyParams.value.fromIndex +
      "?takeElements=" +
      lazyParams.value.takeElements +
      "?type=" +
      route.name
  );

  service
    .postCustomEndpoint(
      "Anagrafiche/RetailLight?serverPagination=true&fromIndex=" +
        lazyParams.value.fromIndex +
        "&takeElements=" +
        lazyParams.value.takeElements +
        "&type=" +
        route.name,
      "",
      filtroToCall.value
    )
    .then((res) => {
      res.forEach((element) => {
        dateColumns.forEach((keyDate) => {
          if (element[keyDate]) {
            element[keyDate] = new Date(element[keyDate]);
          }
        });
      });
      tableItems.value = res;
      config.value.totalRecords = res[0].RECORDS;
    })
    .catch((err) => {
      config.value.totalRecords = 0;
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
      config.value.loading = false;
    });

  // axios.get('https://prestitosi-core.datarete.cloud/api/Anagrafiche/Retail', {
  //   params: {
  //     "serverPagination": true,
  //     "fromIndex": lazyParams.value.fromIndex,
  //     "takeElements": lazyParams.value.takeElements,
  //     "type": "lead"
  //   }
  // })
  //   .then(res => {
  //     if (res) {
  //       console.log("🚀 ~ file: Lead.vue ~ line 192 ~ getTableItems ~ res", res)
  //       res.data.forEach(element => {
  //         dateColumns.forEach(keyDate => {
  //           if (element[keyDate]) {
  //             element[keyDate] = new Date(element[keyDate])
  //           }
  //         })
  //       })
  //       tableItems.value = res.data
  //       config.value.totalRecords = 5000
  //     }
  //   })
  // .finally(() => {
  //   config.value.loading = false
  // })
  setContentLoading_false();
}

function getTableItemsFromFilter() {
  loadingFilter.value = true;
  config.value.totalRecords = 0;
  config.value.loading = true;
  tableItems.value.splice(0);

  filtroToCall.value = { ...filtro.value };

  filtro.value.data_creazione == ""
    ? (filtroToCall.value.data_creazione = [])
    : filtroToCall.value.data_creazione;
  filtro.value.data_modifica == ""
    ? (filtroToCall.value.data_modifica = [])
    : filtroToCall.value.data_modifica;
  filtro.value.data_prossimo_rinnovo == ""
    ? (filtroToCall.value.data_prossimo_rinnovo = [])
    : filtroToCall.value.data_prossimo_rinnovo;
  filtro.value.data_prossimo_contatto == ""
    ? (filtroToCall.value.data_prossimo_contatto = [])
    : filtroToCall.value.data_prossimo_contatto;

  lazyParams.value.takeElements = rowsToShow.value;

  const service = new AxiosService();

  service
    .postCustomEndpoint(
      "Anagrafiche/RetailLight?serverPagination=true&fromIndex=0&takeElements=" +
        lazyParams.value.takeElements +
        "&type=" +
        route.name,
      "",
      filtroToCall.value
    )
    .then((res) => {
      res.forEach((element) => {
        dateColumns.forEach((keyDate) => {
          if (element[keyDate]) {
            element[keyDate] = new Date(element[keyDate]);
          }
        });
      });
      tableItems.value = res;
      config.value.totalRecords = res[0].RECORDS;
    })
    .catch((err) => {
      config.value.totalRecords = 0;
      console.log(err);
    })
    .finally(() => {
      loadingFilter.value = false;
      config.value.loading = false;
    });
}

function confirmDelete(element) {
  confirm.require({
    message:
      'Sei sicuro di voler eliminare "' +
      element.NOME +
      " " +
      element.COGNOME +
      '"',
    header: "Conferma Eliminazione",
    icon: "pi pi-fw pi-trash",
    acceptClass: "p-button-danger",
    accept: () => {
      deleteRetail(element);
    },
    reject: () => {
      return;
    },
  });
}

function deleteRetail(element) {
  const serviceDELETE = new AxiosService("Anagrafiche/DeleteRetail");
  serviceDELETE
    .delete(element.id || element.ID)
    .then((res) => {
      if (res) {
        toast.add({
          severity: "success",
          summary: "Opzione Eliminata",
          detail: element.nome,
          life: 3000,
        });
        tableItems.value ? (tableItems.value.length = 0) : null;
        getTableItems();
      }
    })
    .catch((error) => {
      toast.add({
        severity: "error",
        summary: "Errore nell'eliminazione dell'opzione'",
        detail: error,
        life: 3000,
      });
      tableItems.value ? (tableItems.value.length = 0) : null;
      getTableItems();
    });
}

// // build table
function goToCrm(ev) {
  console.log(
    "🚀 ~ file: Clienti.vue ~ line 205 ~ goToCrm ~ sidebarClientiData.value",
    ev
  );
  store.dispatch(CRM_POST, ev);

  const routeData = router.resolve("/crm/" + ev.ID);
  window.open(routeData.href, "_blank");
}
const lazyParams = ref({
  fromIndex: 0,
  takeElements: 10,
});
function onPage(event) {
  console.log("🚀 ~ file: Lead.vue:279 ~ onPage ~ event", event);
  lazyParams.value.fromIndex = event.first;
  lazyParams.value.takeElements = event.rows;
  getTableItems();
}

function onSort(event) {
  filtro.value.order_campo = event.sortField;
  event.sortOrder == -1
    ? (filtro.value.order_type = "ASC")
    : (filtro.value.order_type = "DESC");
  getTableItems();
}

const origineOptions = ref();
function getOrigineOptions() {
  origineOptions.value = [];
  const service = new AxiosService("Marketing/Campaigns");
  service.read().then((res) => (origineOptions.value = res));
}

const usersOptions = ref();
function getUsersOptions() {
  usersOptions.value = [];
  const service = new AxiosService("Options/GetUsers");
  service.read().then((res) => (usersOptions.value = res));
}

const statoOptions = ref();
function getStatoOptions() {
  statoOptions.value = [];
  const service = new AxiosService("Options/StatiAnagrafiche/GetStati/0");
  service.read().then((res) => (statoOptions.value = res));
}

const sottostatoOptions = ref([]);
// function getSubStatoOptions(idPadre) {
//   sottostatoOptions.value.splice(0)
//   statoOptions.value.forEach(stato => {
//     if (stato.id == idPadre) {
//       stato.child.forEach(sottostato => {
//         sottostatoOptions.value.push(sottostato)
//       })
//     }
//   })

// }

function getSubStatoOptions() {
  sottostatoOptions.value.splice(0);
  statoOptions.value.forEach((stato) => {
    if (filtro.value.stato.includes(stato.id)) {
      sottostatoOptions.value.push(...stato.child);
    }
  });
}

const rowsToShow = ref(10);

const origineLeadOptions = ref();
function getOrigineLeadOptions() {
  const service = new AxiosService("Options/GetOrigineLead");

  service.read().then((res) => {
    origineLeadOptions.value = res;
  });
}

getOrigineLeadOptions();
getStatoOptions();
getOrigineOptions();
getUsersOptions();

getViews();
</script>
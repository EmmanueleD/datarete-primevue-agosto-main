<template>
  <div class="wrapper">
    <div class="grid">
      <div
        v-for="filiale in filialeOptions"
        class="col-12 col-md-6 col-xl-4 mb-6"
      >
        <StatisticheSede>
          <template #titolo>
            <h3>{{ filiale.nome }}</h3>
          </template>
          <template #n_risorse>
            <span class="font-bold">{{
              filiale.n_risorse ? filiale.n_risorse : 5
            }}</span>
          </template>
          <template #prod_mese>
            <span class="font-bold">
              {{ filiale.prod_mese ? filiale.prod_mese : 150 }}</span
            >
          </template>
          <template #prod_anno>
            <span class="font-bold">{{
              filiale.prod_anno ? filiale.prod_anno : 1500
            }}</span>
          </template>
          <template #da_lavorare>
            <span class="font-bold">{{
              filiale.da_lavorare ? filiale.da_lavorare : 235
            }}</span>
          </template>
          <template #grafico>
            <div class="w-100">
              <div class="w-full">
                <Chart
                  :width="380"
                  :height="200"
                  type="bar"
                  :data="{
                    labels: [
                      'Da Lavorare',
                      'In Lavorazione',
                      'Fake',
                      'DPR',
                      'Non Fattibile',
                      'Non Risponde',
                      'Da Richiamare',
                      'Non Interessato',
                      'Duplicato',
                      'Attesa Documenti',
                      'Preventivo Inviato',
                      'Preventivo Non Accettato',
                      'Preventivo Accettato',
                      'Caricata',
                      'Rinnovabile',
                      'Appuntamento',
                      'Riassegnato',
                      'Da Filtrare',
                      'Valutazione',
                      'Interessato',
                    ],
                    datasets: [
                      {
                        label: 'Marzo 2023',
                        backgroundColor: '#0e3996',
                        borderColor: '#0e3996',
                        data: [
                          Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),

                          Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),

                          Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),

                          Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),
                          Math.floor(Math.random() * 100),
                        ],
                      },
                    ],
                  }"
                  :options="barGraphOptions"
                />
              </div>
            </div>
          </template>
          <template #footer>
            <div class="w-full flex justify-content-end">
              <Button
                @click="openDettaglioStatisticaFiliale(filiale)"
                label="Apri dettaglio..."
                class="p-button-outlined"
              ></Button>
            </div>
          </template>
        </StatisticheSede>
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="dettaglioFilialeVisible"
    maximizable
    style="{min-width: '400px';, height: '100%'}"
  >
    <template #header>
      <h2>{{ currentFiliale.nome }}</h2>
    </template>
    <div class="mb-7">
      <h3 @click="leadVisible = !leadVisible" class="cursor-pointer">
        REPORTISTICA LEAD ASSEGNATI
        <i v-if="leadVisible" class="pi pi-chevron-up ml-2"></i
        ><i v-else class="pi pi-chevron-down ml-2"></i>
      </h3>

      <Card v-if="leadVisible">
        <template #content>
          <div id="filtri" class="mb-4">
            <div class="w-full flex justify-content-end mb-2">
              <Button
                class="p-button-text"
                @click="filtroLeadVisible = !filtroLeadVisible"
                :label="
                  filtroLeadVisible ? 'Nascondi i filtri' : 'Mostra filtri'
                "
              ></Button>
            </div>
            <div v-if="filtroLeadVisible" class="w-full">
              <div
                class="w-full flex justify-content-between flex-wrap gap-4 mb-4"
              >
                <div class="flex flex-column flex-grow-1">
                  <label class="mb-2">Data inizio / Data fine</label>
                  <Calendar
                    v-model="filterLead.data_creazione"
                    selectionMode="range"
                    :manualInput="false"
                  ></Calendar>
                </div>

                <div class="flex flex-column flex-grow-1">
                  <label class="mb-2">Origine</label>
                  <MultiSelect
                    v-model="filterLead.origine"
                    :options="origineOptions"
                    optionLabel="nome"
                    optionValue="id"
                    placeholder="Seleziona l'origine..."
                    :filter="true"
                  ></MultiSelect>
                </div>

                <div class="flex flex-column flex-grow-1">
                  <label class="mb-2">Filiale</label>
                  <MultiSelect
                    v-model="filterLead.filiale"
                    :options="filialeOptions"
                    optionLabel="nome"
                    optionValue="id"
                    placeholder="Seleziona la filiale..."
                    :filter="true"
                  ></MultiSelect>
                </div>

                <div class="flex flex-column flex-grow-1">
                  <label class="mb-2">Utente</label>
                  <MultiSelect
                    v-model="filterLead.utente"
                    :options="utenteOptions"
                    optionLabel="text"
                    optionValue="value"
                    placeholder="Seleziona l'utente..."
                    :filter="true"
                  ></MultiSelect>
                </div>
              </div>
              <div class="w-full flex justify-content-end">
                <Button
                  @click="resetLeadsFilter"
                  label="Resetta filtri"
                  class="mr-2"
                ></Button>
                <Button
                  @click="getLeads"
                  :loading="loadingLeads"
                  label="Applica filtri"
                ></Button>
              </div>
            </div>
          </div>
          <Divider class="my-4"></Divider>
          <div
            v-if="loadingLeads"
            class="w-full flex justify-content-center align-items-center"
          >
            <i :style="{ fontSize: '2rem' }" class="pi pi-spin pi-spinner"></i>
          </div>
          <div v-else id="contenuto" class="w-full grid mb-2 gap-8">
            <div class="col-sm-12 col-md-5 col-lg-3">
              <DataTable :value="leads">
                <Column field="nome" header="nome"></Column>
                <Column field="valore" header="Valore"></Column>
              </DataTable>
            </div>
            <div class="flex align-items-center col-sm-12 col-md-6 col-lg-8">
              <div class="w-full">
                <Chart
                  :width="825"
                  :height="500"
                  type="bar"
                  :data="leadsGraph"
                  :options="barGraphOptions"
                />
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
    <div class="mb-7">
      <h3 @click="praticheVisible = !praticheVisible" class="cursor-pointer">
        REPORT PRATICHE
        <i v-if="praticheVisible" class="pi pi-chevron-up ml-2"></i
        ><i v-else class="pi pi-chevron-down ml-2"></i>
      </h3>
      <Card v-if="praticheVisible">
        <template #content>
          <div id="filtri" class="mb-4">
            <div class="w-full flex justify-content-end mb-2">
              <Button
                class="p-button-text"
                @click="filtroPraticheVisible = !filtroPraticheVisible"
                :label="
                  filtroPraticheVisible ? 'Nascondi i filtri' : 'Mostra filtri'
                "
              ></Button>
            </div>
            <div
              v-if="filtroPraticheVisible"
              class="w-full flex justify-content-between flex-wrap gap-4"
            >
              <div
                class="w-full flex justify-content-between flex-wrap gap-4 mb-4"
              >
                <div class="flex flex-column flex-grow-1">
                  <label class="mb-2">Data inserimento</label>
                  <Calendar
                    v-model="filterPratiche.data"
                    selectionMode="range"
                    :manualInput="false"
                  ></Calendar>
                </div>

                <div class="flex flex-column flex-grow-1">
                  <label class="mb-2">Filiale</label>
                  <MultiSelect
                    v-model="filterPratiche.filiale"
                    :options="filialeOptions"
                    optionLabel="nome"
                    optionValue="id"
                    placeholder="Seleziona la filiale..."
                    :filter="true"
                  ></MultiSelect>
                </div>

                <div class="flex flex-column flex-grow-1">
                  <label class="mb-2">Utente</label>
                  <MultiSelect
                    v-model="filterPratiche.utente"
                    :options="utenteOptions"
                    optionLabel="text"
                    optionValue="value"
                    placeholder="Seleziona l'utente..."
                    :filter="true"
                  ></MultiSelect>
                </div>
              </div>
              <div class="w-full flex justify-content-end">
                <Button
                  @click="resetPraticheFilter"
                  label="Resetta filtri"
                  class="mr-2"
                ></Button>
                <Button
                  @click="getPratiche"
                  :loading="loadingPratiche"
                  label="Applica filtri"
                ></Button>
              </div>
            </div>
          </div>
          <Divider class="my-4"></Divider>
          <div
            v-if="loadingPratiche"
            class="w-full flex justify-content-center align-items-center"
          >
            <i :style="{ fontSize: '2rem' }" class="pi pi-spin pi-spinner"></i>
          </div>
          <div v-else id="contenuto" class="w-full grid mb-2 gap-8">
            <div class="col-sm-12 col-lg-5">
              <DataTable :value="pratiche.listaTabella">
                <Column field="nome" header="nome"></Column>
                <Column field="valore" header="Valore">
                  <template #body="{ data }">
                    {{
                      data.valore.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "Eur",
                      })
                    }}
                  </template>
                </Column>
              </DataTable>
            </div>
            <div class="grid col-sm-12 col-lg-5">
              <div class="flex flex-column px-2 py-4 col-sm-6 mb-4">
                <h3>Numero pratiche</h3>
                <Chart
                  :width="300"
                  :height="380"
                  type="doughnut"
                  :data="praticheGraphCount"
                  :options="pieGraphOptions"
                />
              </div>

              <div class="flex flex-column px-2 py-4 col-sm-6 mb-4">
                <h3>Valore caricato</h3>
                <Chart
                  :width="300"
                  :height="380"
                  type="doughnut"
                  :data="praticheGraphCaricato"
                  :options="pieGraphOptions"
                />
              </div>

              <div class="flex flex-column px-2 py-4 col-sm-6 mb-4">
                <h3>Valore erogato</h3>
                <Chart
                  :width="300"
                  :height="380"
                  type="doughnut"
                  :data="praticheGraphErogato"
                  :options="pieGraphOptions"
                />
              </div>

              <div class="flex flex-column px-2 py-4 col-sm-6 mb-4">
                <h3>Valore annullato</h3>
                <Chart
                  :width="300"
                  :height="380"
                  type="doughnut"
                  :data="praticheGraphAnnullato"
                  :options="pieGraphOptions"
                />
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </Dialog>
</template>

<script setup>
import AxiosService from "@/axiosServices/AxiosService"
import StatisticheSede from "@/components/StatisticheSede.vue"
import { ref } from "vue"

const barGraphOptions = {
  responsive: false,
  // maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#495057",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#495057",
      },
      grid: {
        color: "#ebedef",
      },
    },
    y: {
      ticks: {
        color: "#495057",
      },
      grid: {
        color: "#ebedef",
      },
    },
  },
}

const pieGraphOptions = ref({
  // maintainAspectRatio: false,
  responsive: false,
  plugins: {
    legend: {
      labels: {
        color: "#495057",
      },
    },
  },
})

const origineOptions = ref([])
const filialeOptions = ref([])
const utenteOptions = ref([])

// LEADS
const loadingLeads = ref(false)

const filtroLeadVisible = ref(false)
const leadVisible = ref(true)

const filterLead = ref({
  origine: [],
  filiale: [],
  utente: [],
  data: [],
})

const leads = ref([])

const leadsGraph = ref({
  labels: [],
  datasets: [
    {
      label: "Informazione leads",
      backgroundColor: "#42a5f5",
      data: [],
    },
  ],
})

function getLeads() {
  loadingLeads.value = true
  leads.value.splice(0)
  const service = new AxiosService("Dashboard/LeadAssegnati")
  service
    .create(filterLead.value)
    .then((res) => {
      leads.value = res
    })
    .finally(() => {
      loadingLeads.value = false
      populateLeadsGraph()
    })
}

function resetLeadsFilter() {
  filterLead.value.origine.splice(0)
  filterLead.value.filiale.splice(0)
  filterLead.value.utente.splice(0)
  filterLead.value.data.splice(0)
}

function populateLeadsGraph() {
  leadsGraph.value.labels.splice(0)
  leadsGraph.value.datasets[0].data.splice(0)

  leads.value.forEach((element) => {
    if (element.nome != "TOTALE") {
      leadsGraph.value.labels.push(element.nome)
      leadsGraph.value.datasets[0].data.push(element.valore)
    }
  })
}

// PRATICHE
const loadingPratiche = ref(false)

const filtroPraticheVisible = ref(false)
const praticheVisible = ref(true)

const filterPratiche = ref({
  filiale: [],
  utente: [],
  data: [],
})

const pratiche = ref()

const generalLabels = ref([])

const praticheGraphAnnullato = ref({
  labels: generalLabels,
  datasets: [
    {
      data: [],
      backgroundColor: ["#42A5F5", "#66BB6A", "#d3444e", "#8a8ac2"],
      hoverBackgroundColor: ["#64B5F6", "#81C784", "#d3444e", "#8a8ac2"],
    },
  ],
})

const praticheGraphCaricato = ref({
  labels: generalLabels,
  datasets: [
    {
      data: [],
      backgroundColor: ["#42A5F5", "#66BB6A", "#d3444e", "#8a8ac2"],
      hoverBackgroundColor: ["#64B5F6", "#81C784", "#d3444e", "#8a8ac2"],
    },
  ],
})

const praticheGraphCount = ref({
  labels: generalLabels,
  datasets: [
    {
      data: [],
      backgroundColor: ["#42A5F5", "#66BB6A", "#d3444e", "#8a8ac2"],
      hoverBackgroundColor: ["#64B5F6", "#81C784", "#d3444e", "#8a8ac2"],
    },
  ],
})
const praticheGraphErogato = ref({
  labels: generalLabels,
  datasets: [
    {
      data: [],
      backgroundColor: ["#42A5F5", "#66BB6A", "#d3444e", "#8a8ac2"],
      hoverBackgroundColor: ["#64B5F6", "#81C784", "#d3444e", "#8a8ac2"],
    },
  ],
})

function getPratiche() {
  console.log("getting pratiche data")
  loadingPratiche.value = true
  pratiche.value = {}
  const service = new AxiosService("Dashboard/ReportPraticheDash")
  service
    .create(filterPratiche.value)
    .then((res) => {
      pratiche.value = res
    })
    .finally(() => {
      populatePraticheGraphs()
      loadingPratiche.value = false
    })
}

function resetPraticheFilter() {
  filterPratiche.value.filiale.splice(0)
  filterPratiche.value.utente.splice(0)
  filterPratiche.value.data.splice(0)
}

function populatePraticheGraphs() {
  console.log("populating pratiche graphs")
  praticheGraphAnnullato.value.datasets[0].data.splice(0)
  praticheGraphCaricato.value.datasets[0].data.splice(0)
  praticheGraphCount.value.datasets[0].data.splice(0)
  praticheGraphErogato.value.datasets[0].data.splice(0)

  praticheGraphAnnullato.value.datasets[0].data =
    pratiche.value.graficoTipoProdottoAnnullato
  praticheGraphCaricato.value.datasets[0].data =
    pratiche.value.graficoTipoProdottoCaricato
  praticheGraphCount.value.datasets[0].data =
    pratiche.value.graficoTipoProdottoCount
  praticheGraphErogato.value.datasets[0].data =
    pratiche.value.graficoTipoProdottoErogato

  generalLabels.value.splice(0)
  generalLabels.value = pratiche.value.labels
}

// FILIALE
const filtroFilialeVisible = ref(false)
const filialeVisible = ref(true)

const filiale = ref([
  {
    nome: "Gennaio",
    caricatoTotale: 140808,
    previsioneFatturato: 3079,
    liquidatoTotale: 103200,
    fatturatoTotale: 1852,
  },
  {
    nome: "Febbraio",
    caricatoTotale: 178680,
    previsioneFatturato: 3846,
    liquidatoTotale: 131400,
    fatturatoTotale: 2568,
  },
])

// FILTRI GENERALI

function getOrigineOptions() {
  const service = new AxiosService("Marketing/Campaigns")
  service.read().then((res) => {
    origineOptions.value = res
  })
}

function getUtenteOptions() {
  const service = new AxiosService("Options/GetUsers")
  service.read().then((res) => {
    utenteOptions.value = res
  })
}

function getFilialeOptions() {
  const service = new AxiosService("Gestione/SediAzienda/GetSedi")
  service
    .read()
    .then((res) => {
      filialeOptions.value = res
    })
    .finally(() => {
      filialeOptions.value.forEach((filiale) => {
        getFilialeData(filiale)
      })
    })
}

function getFilialeData(filiale) {
  const service = new AxiosService(
    "Dashboard/LeadAssegnatiFiliale/" + filiale.id
  )
  service.read().then((res) => {
    filiale.data = res
  })
}

const dettaglioFilialeVisible = ref(false)
const currentFiliale = ref()
function openDettaglioStatisticaFiliale(filiale) {
  filterLead.value.filiale = [filiale.id]
  getLeads()
  currentFiliale.value = {}
  dettaglioFilialeVisible.value = true
  currentFiliale.value = filiale
}

getOrigineOptions()
getUtenteOptions()
getFilialeOptions()

getPratiche()
getLeads()
</script>

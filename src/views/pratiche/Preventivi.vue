<template>
  <div class="wrapper">
    <h1 v-if="headerVisible">{{
    pageTitle
}}</h1>

    <div v-if="searchVisible" class=" flex justify-content-between align-items-center  mb-4">

      <Card class="w-100">
        <template #content>
          <div class="w-100 flex justify-content-between align-items-center">




            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filtersObj['global'].value" placeholder="Cerca..." />
            </span>


          </div>
        </template>
      </Card>
    </div>

    <DataTable class="mb-4" :value="tableItems" :stripedRows="true" :loading="loading" :paginator="true" :rows="10"
      :globalFilterFields="globalFilters">
      <Column header="Azioni">
        <template #body="{ data }">
          <div class="w-full flex ">
            <i @click="goToPreventivatore(data)" class="pi pi-window-maximize cursor-pointer mr-4"></i>
            <i @click="generaPDF(data)" class="pi pi-print cursor-pointer mr-4"></i>
            <i class="pi pi-trash cursor-pointer"></i>
          </div>
        </template>
      </Column>
      <Column v-for="column in columns" :key="column.field" :field="column.field" :header="column.header"
        :sortable="column.sortable">
        <template #body="{ data }">
          <div v-if="(column.field == 'data_inserimento' || column.field == 'data_ultimo_stato')">
            {{ new Date(data[column.field]).toLocaleDateString('it') }}
          </div>
          <div v-else>
            {{ data[column.field] }}
          </div>
        </template>
      </Column>
      <Column field="Tipo" header="Tipo prodotto" :sortable="true">
        <template #body="{ data }">
          {{ data.tipo_preventivatore }} {{ data.tipoRapporto }}
        </template>
      </Column>
      <Column field="numeroRisultati" header="Numero Risultati" :sortable="true"></Column>
      <Column field="dataCreazione" header="Data di creazione" :sortable="true">
        <template #body="{ data }">
          {{ new Date(data.dataCreazione).toLocaleString('it', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}}
        </template>
      </Column>
    </DataTable>



    <Dialog v-model:visible="modalVisible" position="right" :breakpoints="{ '960px': '400px', '640px': '300px' }"
      :style="{ width: '400px' }"></Dialog>

    <!-- <Dialog class="mr-4" :header="tmpItem.Denominazione_istituto" v-model:visible="modalVisible" position="right"
      :breakpoints="{ '960px': '400px', '640px': '300px' }" :style="{ width: '400px' }">

      <div class="flex flex-column ">
        <span style="font-weight:bold">{{ tmpItem.Descrizione_prodotto }}</span>
        <span>{{ tmpItem.Descrizione_polizza }}</span>
      </div>
      <Divider></Divider>
      <div>
        <div class="flex justify-content-between">
          <span>Importo Rata</span>
          <span>{{ formateDivise(tmpItem.Importo_rata) }}</span>
        </div>
        <div class="flex justify-content-between">
          <span>Durata</span>
          <span>{{ tmpItem.Durata }}</span>
        </div>
        <div class="flex justify-content-between">
          <span>Importo Restituito</span>
          <span>{{ formateDivise(tmpItem.Importo_erogato) }}</span>
        </div>
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
          <span>{{ formateDivise(tmpItem.Importo_commissione || '0,00') }}</span>
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
        <div class="flex justify-content-between">
          <span>TEG</span>
          <span>{{ tmpItem.TEG }} %</span>
        </div>
      </div>
    </Dialog> -->





  </div>

</template>

<script setup>
import { ref } from 'vue'
import { FilterMatchMode } from "primevue/api";
import AxiosService from '@/axiosServices/AxiosService';
import { jsPDF } from "jspdf";
import { useRouter } from 'vue-router';

const loading = ref(false)
const router = useRouter()

// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps({
  idAnagrafica: {
    default: '0',
    type: String
  },
  headerVisible: {
    default: true,
    type: Boolean
  },
  searchVisible: {
    default: true,
    type: Boolean
  }
})

let filtersObj = ref({
  global: {
    value: '',
    matchMode: FilterMatchMode.CONTAINS
  }
})

const globalFilters = [
  'nomeCliente', 'agente', 'Tipo', 'numeroRisultati'
]

function goToPreventivatore(preventivo) {
  switch (preventivo.tipo_preventivatore) {
    case 'mutuo':
      router.push('/pratiche/preventivo-mutuo/0/' + preventivo.id)
      break
    case 'prestito':
      router.push('/pratiche/preventivo-prestito/0/' + preventivo.id)
      break
    case 'cqs':
      router.push('/pratiche/preventivo-cqs/0/' + preventivo.id)
      break
  }
}

function generaPDF(data) {
  console.log("🚀 ~ file: Preventivi.vue:127 ~ generaPDF ~ data", data)
  // data_inserimento
  // data_ultimo_stato
  // durat
  // id
  // importo_richiesto
  // nome_agente
  // nome_cliente
  // ultimo_stato

  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Preventivo numero " + data.id.toString(), 105, 20, null, null, "center");
  doc.setFontSize(16);
  doc.setFont("helvetica", "normal");
  doc.text('- PrestitoSi -', 105, 30, null, null, 'center');
  doc.line(20, 40, 190, 41)

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Nome Cliente: ", 20, 50);
  doc.setFont("helvetica", "normal");
  doc.text(data.nome_cliente, 100, 50, null, null, 'right');

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Nome Agente: ", 20, 60);
  doc.setFont("helvetica", "normal");
  doc.text(data.nome_agente, 100, 60, null, null, 'right');

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Importo richiesto: ", 20, 70);
  doc.setFont("helvetica", "normal");
  doc.text(data.importo_richiesto.toString(), 100, 70, null, null, 'right');

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Ultimo Stato: ", 20, 80);
  doc.setFont("helvetica", "normal");
  doc.text(data.ultimo_stato, 100, 80, null, null, 'right');

  doc.save("a4.pdf");
}

const columns = [
  { field: 'nomeCliente', header: "Nome Cliente", visible: true, type: 'String', order: 1, frozen: true, sortable: true },
  { field: 'agente', header: "Nome Agente", visible: true, type: 'String', order: 2, frozen: false, sortable: true },
]

const tableItems = ref([])

const filterObj = ref({
  idAgente: 0,
  idCliente: props.idAnagrafica,
  idPreventivo: 0
})

function getData() {
  loading.value = true
  // tableItems.value.splice(0)
  const service = new AxiosService('Preventivatore/GetPreventivi')
  service.create(filterObj.value)
    .then(res => {
      tableItems.value = res
    })
    .finally(() => {
      loading.value = false
    })
}

getData()

let pageTitle = ref('Preventivi')



//MODAL

const tmpItem = ref({})
const modalVisible = ref(false)
function showModal(item) {
  tmpItem.value = {}
  modalVisible.value = true
  tmpItem.value = { ...item }
}






</script>
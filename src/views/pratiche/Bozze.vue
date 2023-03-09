<template>
  <div class="wrapper">
    <h1>{{ pageTitle }}</h1>

    <DataTable
      :value="tableItems"
      stripedRows
      :paginator="true"
      :rows="10"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink "
      :resizableColumns="true"
      :scrollable="true"
      table-layout="auto"
      :loading="loading"
      dataKey="id"
      v-model:filters="filters"
      filterDisplay="menu"
      :showFilterOperator="true"
    >
      <template #loading> Caricamento in corso... </template>
      <Column field="azioni" header="Azioni">
        <template #body="{ data }">
          <i
            class="pi pi-eye ml-4 cursor-pointer"
            @click="apriDettaglioPratica(data)"
          ></i>
        </template>
      </Column>
      <Column
        v-for="column in columns"
        :key="column.order"
        :field="column.field"
        :header="column.header"
        :sortable="column.sortable"
        :dataType="column.type"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-if="
              column.field == 'Cliente' ||
              column.field == 'Agente' ||
              column.field == 'istitutoFinanziatore' ||
              column.field == 'TipoProdotto' ||
              column.field == 'Stato'
            "
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            @change="filterCallback()"
          />
          <Calendar
            v-else-if="column.field == 'dataInserimento'"
            v-model="filterModel.value"
            dateFormat="dd/mm/yy"
            @change="filterCallback()"
          ></Calendar>
          <InputNumber
            v-else-if="
              column.field == 'importo' ||
              column.field == 'importoRata' ||
              column.field == 'durata'
            "
            v-model="filterModel.value"
            @change="filterCallback()"
          ></InputNumber>
        </template>
        <template #body="{ data }">
          <div class="w-full flex justify-content-start">
            <span v-if="column.type == 'date'">{{
              new Date(data[column.field]).toLocaleDateString("it", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            }}</span>
            <span
              v-else-if="
                column.field == 'importo' || column.field == 'importoRata'
              "
              >{{
                data[column.field].toLocaleString("it", {
                  style: "currency",
                  currency: "EUR",
                })
              }}</span
            >

            <span v-else>{{ data[column.field] }}</span>
            <!-- <span>{{ column }}</span> -->
            <!-- {{ data[column.field] }} -->
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import AxiosService from "@/axiosServices/AxiosService"
import { FilterMatchMode, FilterOperator } from "primevue/api"

const router = useRouter()
const loading = ref(false)

const columns = [
  {
    field: "Cliente",
    header: "Nome Cliente",
    visible: true,
    type: "text",
    order: 1,
    frozen: true,
    sortable: true,
  },
  {
    field: "Agente",
    header: "Nome Agente",
    visible: true,
    type: "text",
    order: 2,
    frozen: false,
    sortable: true,
  },
  {
    field: "dataInserimento",
    header: "Data Inserimento",
    visible: true,
    type: "date",
    order: 3,
    frozen: false,
    sortable: true,
  },
  {
    field: "importo",
    header: "Importo Richiesto",
    visible: true,
    type: "number",
    order: 4,
    frozen: false,
    sortable: true,
  },
  {
    field: "importoRata",
    header: "Importo Rata",
    visible: true,
    type: "number",
    order: 4,
    frozen: false,
    sortable: true,
  },
  {
    field: "istitutoFinanziatore",
    header: "Istituto Finanziatore",
    visible: true,
    type: "text",
    order: 4,
    frozen: false,
    sortable: true,
  },
  {
    field: "TipoProdotto",
    header: "Tipo Prodotto",
    visible: true,
    type: "text",
    order: 4,
    frozen: false,
    sortable: true,
  },
  {
    field: "durata",
    header: "Durata",
    visible: true,
    type: "number",
    order: 5,
    frozen: false,
    sortable: true,
  },
  {
    field: "Stato",
    header: "Ultimo Stato",
    visible: true,
    type: "text",
    order: 6,
    frozen: false,
    sortable: true,
  },
]

const tempFilterDate = ref()
const tableItems = ref([])

let pageTitle = ref("Bozze")

function getData() {
  loading.value = true
  const service = new AxiosService("Pratiche/GetPraticheBozze")
  service
    .create({})
    .then((res) => {
      res.map((x) => {
        x.dataInserimento = new Date(x.dataInserimento)
      })

      tableItems.value = res
    })
    .finally(() => {
      loading.value = false
    })
}

function apriDettaglioPratica(event) {
  router.push("/pratiche/dettaglio-pratica/" + event.id)
}

const filters = ref({
  Cliente: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  Agente: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  istitutoFinanziatore: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  tipoProdotto: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  Stato: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  dataInserimento: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
  },
  importo: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  importoRata: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  durata: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
})

function initFilters() {
  filters.value = {
    Cliente: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    Agente: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    istitutoFinanziatore: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    tipoProdotto: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    Stato: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    dataInserimento: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    importo: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    importoRata: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    durata: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  }
}

getData()
</script>

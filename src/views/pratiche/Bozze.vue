<template>
  <div class="wrapper">
    <h1>{{ pageTitle }}</h1>

    <DataTable
      :value="tableItems"
      stripedRows
      :paginator="true"
      :rows="10"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink "
      :scrollable="true"
      table-layout="auto"
      :loading="loading"
      dataKey="id"
      v-model:filters="filters"
      filterDisplay="menu"
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
      >
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
          />
        </template>
        <template #body="{ data }">
          <div class="w-full">
            <span v-if="column.type == 'Date'">{{
              new Date(data[column.field]).toLocaleDateString("it", {
                year: "numeric",
                month: "short",
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
    type: "String",
    order: 1,
    frozen: true,
    sortable: true,
  },
  {
    field: "Agente",
    header: "Nome Agente",
    visible: true,
    type: "String",
    order: 2,
    frozen: false,
    sortable: false,
  },
  {
    field: "dataInserimento",
    header: "Data Inserimento",
    visible: true,
    type: "Date",
    order: 3,
    frozen: false,
    sortable: false,
  },
  {
    field: "importo",
    header: "Importo Richiesto",
    visible: true,
    type: "Number",
    order: 4,
    frozen: false,
    sortable: false,
  },
  {
    field: "importoRata",
    header: "Importo Rata",
    visible: true,
    type: "Number",
    order: 4,
    frozen: false,
    sortable: false,
  },
  {
    field: "istitutoFinanziatore",
    header: "Istituto Finanziatore",
    visible: true,
    type: "String",
    order: 4,
    frozen: false,
    sortable: false,
  },
  {
    field: "TipoProdotto",
    header: "Tipo Prodotto",
    visible: true,
    type: "String",
    order: 4,
    frozen: false,
    sortable: false,
  },
  {
    field: "durata",
    header: "Durata",
    visible: true,
    type: "Number",
    order: 5,
    frozen: false,
    sortable: false,
  },
  {
    field: "Stato",
    header: "Ultimo Stato",
    visible: true,
    type: "String",
    order: 6,
    frozen: false,
    sortable: false,
  },
]

const tableItems = ref([])

let pageTitle = ref("Bozze")

function getData() {
  loading.value = true
  const service = new AxiosService("Pratiche/GetPraticheBozze")
  service
    .create({})
    .then((res) => {
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
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  "country.name": {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  representative: { value: null, matchMode: FilterMatchMode.IN },
  date: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
  },
  balance: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  status: {
    operator: FilterOperator.OR,
    constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  },
  activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  verified: { value: null, matchMode: FilterMatchMode.EQUALS },
})

getData()
</script>

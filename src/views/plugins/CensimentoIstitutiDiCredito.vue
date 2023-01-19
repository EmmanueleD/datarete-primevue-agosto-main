<template>
  <div class="wrapper">
    <div class="mb-4 plugin-title flex justify-content-between align-items-center">
      <h1>Censimento Istituti di Credito</h1>
      <Chip icon="pi pi-star-fill" label="PlugIn" class="small-chip custom-chip"></Chip>
    </div>

    <Card>
      <template #content>
        <DataTable :value="data" :stripedRows="true" :paginator="true" :rows="10" :resizableColumns="true"
          :globalFilterFields="['nome', 'cognome', 'luogonascita', 'email', 'telefono', 'username', 'cellulare']"
          v-model:filters="filters1" filterDisplay="menu" :scrollable="true" table-layout="auto" ref="dt">
          <template #header>
            <div class="flex justify-content-between">
              <Button type="button" icon="pi pi-filter-slash" label="Pulisci i Filtri" class="p-button-outlined"
                @click="clearFilter1()" />
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters1['global'].value" placeholder="Cerca..." />
              </span>
            </div>
          </template>
          <Column field="nome" header="HEADER"></Column>
          <Column field="logo" header="LOGO"></Column>
          <Column field="attivo" header="ATTIVO">
            <template #body="{ data }">
              <i v-if="data.attivo" class="pi pi-fw pi-check-circle" style="color:darkgreen"></i>
              <i v-else class="pi pi-fw pi-times-circle" style="color:brown"></i>
            </template>
          </Column>
          <Column field="decentrato" header="DECENTRATO">
            <template #body="{ data }">
              <i v-if="data.decentrato" class="pi pi-fw pi-check-circle" style="color:darkgreen"></i>
              <i v-else class="pi pi-fw pi-times-circle" style="color:brown"></i>
            </template>
          </Column>
          <Column field="Mutui" header="MUTUI">
            <template #body="{ data }">
              <i v-if="data.Mutui" class="pi pi-fw pi-check-circle" style="color:darkgreen"></i>
              <i v-else class="pi pi-fw pi-times-circle" style="color:brown"></i>
            </template>
          </Column>
          <Column field="Prestiti" header="PRESTITI">
            <template #body="{ data }">
              <i v-if="data.Prestiti" class="pi pi-fw pi-check-circle" style="color:darkgreen"></i>
              <i v-else class="pi pi-fw pi-times-circle" style="color:brown"></i>
            </template>
          </Column>
          <Column field="CDQ" header="CDQ">
            <template #body="{ data }">
              <i v-if="data.CDQ" class="pi pi-fw pi-check-circle" style="color:darkgreen"></i>
              <i v-else class="pi pi-fw pi-times-circle" style="color:brown"></i>
            </template>
          </Column>
          <Column header="AZIONI">
            <template #body>
              <Button icon="pi pi-pencil" class="p-button-rounded mr-2"></Button>
              <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"></Button>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FilterMatchMode } from 'primevue/api';

const data = ref([
  {
    id: 1,
    nome: 'Banca di Asti',
    logo: '#',
    attivo: true,
    decentrato: true,
    Mutui: true,
    Prestiti: false,
    CDQ: false
  },
  {
    id: 2,
    nome: 'Banco Azzoaglio',
    logo: '#',
    attivo: true,
    decentrato: false,
    Mutui: true,
    Prestiti: false,
    CDQ: false
  },
  {
    id: 3,
    nome: 'Banco BPM',
    logo: '#',
    attivo: true,
    decentrato: false,
    Mutui: true,
    Prestiti: false,
    CDQ: false
  },
  {
    id: 4,
    nome: 'CheBanca!',
    logo: '#',
    attivo: true,
    decentrato: false,
    Mutui: true,
    Prestiti: false,
    CDQ: false
  },
  {
    id: 5,
    nome: 'Credit Agricole',
    logo: '#',
    attivo: true,
    decentrato: false,
    Mutui: true,
    Prestiti: false,
    CDQ: false
  },
  {
    id: 6,
    nome: 'Creval',
    logo: '#',
    attivo: false,
    decentrato: true,
    Mutui: true,
    Prestiti: false,
    CDQ: false
  },
  {
    id: 7,
    nome: 'ING',
    logo: '#',
    attivo: true,
    decentrato: false,
    Mutui: true,
    Prestiti: false,
    CDQ: false
  },
  {
    id: 8,
    nome: 'UniCredit',
    logo: '#',
    attivo: false,
    decentrato: false,
    Mutui: true,
    Prestiti: true,
    CDQ: true
  },
])

// DATATABLE AND FILTERS SETTINFG
const filters1 = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
})

function clearFilter1() {
  initFilters1()
}
function initFilters1() {
  filters1.value = {
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
  }
}
</script>
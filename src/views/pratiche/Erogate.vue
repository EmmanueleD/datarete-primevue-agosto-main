<template>
  <div class="wrapper">
    <h1>{{
    pageTitle
}}</h1>
    <TableBuilder @event_ShowSidebar_nuovoAppuntamento="$router.push('/eventi')" @event_ShowSidebar_creaPratica="null"
      @event_ShowSidebar_eye="apriDettaglioPratica(event)" @event_ShowSidebar_elimina="null" :data="tableItems"
      :headersConfig="columns" :showAzioni="true" :config="config">
    </TableBuilder>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import AxiosService from '@/axiosServices/AxiosService';

// IMPORT COMPONENTS
import TableBuilder from '../../components/TableBuilder.vue'


const columns = [
  { field: 'Cliente', header: "Nome Cliente", visible: true, type: 'String', order: 1, frozen: true, sortable: true },
  { field: 'Agente', header: "Nome Agente", visible: true, type: 'String', order: 2, frozen: false, sortable: false },
  { field: 'dataInserimento', header: "Data Inserimento", visible: true, type: 'Date', order: 3, frozen: false, sortable: false },
  { field: 'importo', header: "Importo Richiesto", visible: true, type: 'Number', order: 4, frozen: false, sortable: false },
  { field: 'importoRata', header: "Importo Rata", visible: true, type: 'Number', order: 4, frozen: false, sortable: false },
  { field: 'istitutoFinanziatore', header: "Istituto Finanziatore", visible: true, type: 'String', order: 4, frozen: false, sortable: false },
  { field: 'TipoProdotto', header: "Tipo Prodotto", visible: true, type: 'String', order: 4, frozen: false, sortable: false },
  { field: 'durata', header: "Durata", visible: true, type: 'Number', order: 5, frozen: false, sortable: false },
  { field: 'Stato', header: "Ultimo Stato", visible: true, type: 'String', order: 6, frozen: false, sortable: false },
]

const tableItems = ref([])


// TABLE BUILDER
const config = ref({
  zebra: true,
  menuItems: [
    // {
    //   label: 'Inserisci',
    //   icon: "pi pi-fw pi-plus",
    //   items: [
    //     {
    //       label: "Nuova Anagrafica",
    //       command: () => { nuovaAnagraficaVisible.value = true }
    //     },
    //   ]
    // },
    // {
    //   label: 'Viste',
    //   icon: 'pi pi-fw pi-file',
    //   items: []
    // }
  ]
})

let pageTitle = ref('Erogate')

function getData() {
  const service = new AxiosService('Pratiche/GetPraticheErogate')
  service.create({})
    .then(res => {
      tableItems.value = res
    })
}

function apriDettaglioPratica(event) {
  console.log(event)
}


getData()
</script>
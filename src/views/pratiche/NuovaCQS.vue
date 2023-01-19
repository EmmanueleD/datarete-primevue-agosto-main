<template>
  <div class="wrapper">
    <h1>Nuova pratica di Cessione del Quinto</h1>

    <Card>
      <template #content>
        <div class="grid">
          <div class="col-12 flex justify-content-between flex-wrap">

            <div v-if="!loading" class="col flex flex-column  mb-4">
              <label>Agente</label>
              <Dropdown :filter="true" :options="utentiOptions" optionLabel="text" optionValue="value"
                v-model="tmpItem.utente">
              </Dropdown>
            </div>
            <div v-if="!loading" class="col flex flex-column  mb-4">
              <label>Cliente</label>
              <InputText type="text" v-model="tmpItem.cliente">
              </InputText>
            </div>

          </div>

          <div class="col-12 flex justify-content-between flex-wrap">
            <div class="flex flex-column  mb-4 col">
              <label>Tipo</label>
              <InputText type="text" placeholder="Tipo operazione" v-model="tmpItem.tipoOperazione"></InputText>
            </div>

            <div class="flex flex-column  mb-4 col">
              <label>Prodotto</label>
              <InputText type="text" placeholder="Tipo operazione" v-model="tmpItem.prodotto"></InputText>
            </div>

            <div class="flex flex-column  mb-4 col">
              <label>Istituto</label>
              <InputText type="text" placeholder="Tipo operazione" v-model="tmpItem.istituto"></InputText>
            </div>
          </div>

          <div class="col-12 flex justify-content-between flex-wrap">
            <div class="flex col  flex-column  mb-4">
              <label>Rata</label>
              <InputText type="text" placeholder="Tipo operazione" v-model="tmpItem.rata"></InputText>
            </div>

            <div class="flex col  flex-column  mb-4">
              <label>Durata</label>
              <InputText type="text" placeholder="Tipo operazione" v-model="tmpItem.durata"></InputText>
            </div>

            <div class="flex col  flex-column  mb-4">
              <label>Montante</label>
              <InputText type="text" placeholder="Tipo operazione" v-model="tmpItem.montante"></InputText>
            </div>

            <div class="flex col  flex-column  mb-4">
              <label>TAN</label>
              <InputText type="text" placeholder="Tipo operazione" v-model="tmpItem.tan"></InputText>
            </div>
          </div>

          <div class="col-12 flex justify-content-between flex-wrap">
            <div class="flex col  flex-column  mb-4">
              <label>Data decorrenza</label>
              <Calendar v-model="tmpItem.dataDecorrenza"></Calendar>
            </div>
            <div class="flex col  flex-column  mb-4">
              <label>Data scandenza</label>
              <Calendar v-model="tmpItem.dataScadenza"></Calendar>
            </div>
            <div class="flex col  flex-column  mb-4">
              <label>Data rinnovo</label>
              <Calendar v-model="tmpItem.dataRinnovo"></Calendar>
            </div>
          </div>

          <div class="col-12 flex flex-wrap justify-content-between">
            <div class="flex col flex-column mr-4">
              <label>Erogato</label>
              <InputNumber type="number" v-model="tmpItem.erogato"></InputNumber>
            </div>
            <div class="flex col flex-column">
              <label>Importo Richiesto</label>
              <InputNumber type="number" v-model="tmpItem.importo_richiesto"></InputNumber>
            </div>
            <div class="flex col flex-column">
              <label>Valore attuale</label>
              <InputNumber type="number" v-model="tmpItem.valore_attuale"></InputNumber>
            </div>
          </div>



          <div class="flex justify-content-end mb-4 w-full">

            <Button label="Salva"></Button>

          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import AxiosService from '@/axiosServices/AxiosService';
import { ref } from 'vue'

const loading = ref(false)

const tmpItem = ref({
  tipoOperazione: 'cqs',
  prodotto: '',
  istituto: '',
  rata: '',
  durata: '',
  montante: '',
  tan: '',
  decorrenza: '',
  scadenza: '',
  rinnovo: '',
  erogato: 0,
  importo_richiesto: 0
})

const utentiOptions = ref()
function getUtenti() {
  loading.value = true
  const service = new AxiosService('Options/GetUsers')
  service.read()
    .then(res => utentiOptions.value = res)
    .finally(() => {
      loading.value = false
    })
}
getUtenti()
</script>
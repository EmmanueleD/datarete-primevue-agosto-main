<template>
  <div class="wrapper">
    <h1>Nuovo Mutuo</h1>

    <Card>
      <template #content>
        <div class="grid">
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
              <label>TAN</label>
              <InputText type="text" placeholder="Tipo operazione" v-model="tmpItem.tan"></InputText>
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
          </div>

          <div v-if="!loading" class="col flex flex-column  mb-4">
            <label>Utente</label>
            <Dropdown :filter="true" :options="utentiOptions" optionLabel="text" optionValue="value"
              v-model="tmpItem.utente">
            </Dropdown>
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
  tipoOperazione: 'Mutuo',
  prodotto: 'Younited - Mutuo Fascia A',
  istituto: 'YOUNITED SA',
  rata: '422.10',
  durata: '36',
  tan: '3.9',
  decorrenza: new Date('01/12/2022'),
  scadenza: new Date('01/12/2026'),
  rinnovo: new Date('01/12/2023'),
  erogato: 10000,
  importo_richiesto: 10000
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
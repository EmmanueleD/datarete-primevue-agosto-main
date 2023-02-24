<template>
  <Toast></Toast>
  <div class="wrapper">
    <h1>Nuova Cessione</h1>
    <Card>
      <template #content>
        <div class="grid">
          <div class="col-12 flex justify-content-between flex-wrap">
            <div class="col-12 flex justify-content-start flex-wrap pt-4">
              <div class="col-12 col-md-4 flex flex-column mb-4">
                <label>Agente</label>
                <div v-if="loadingUtentiOptions" class="w-full pt-4">
                  <Skeleton></Skeleton>
                </div>
                <Dropdown
                  v-else
                  :filter="true"
                  v-model="pratica.idAgente"
                  :options="utentiOptions"
                  optionLabel="text"
                  optionValue="value"
                ></Dropdown>
              </div>
              <div class="col-12 col-md-4 flex flex-column mb-4">
                <label>Collega</label>
                <div v-if="loadingUtentiOptions" class="w-full pt-4">
                  <Skeleton></Skeleton>
                </div>
                <Dropdown
                  v-else
                  :filter="true"
                  v-model="pratica.idAgenteCollega"
                  :options="utentiOptions"
                  optionLabel="text"
                  optionValue="value"
                ></Dropdown>
              </div>
              <div class="col-12 col-md-2 flex flex-column mb-4">
                <label>% collega</label>
                <InputNumber
                  v-model="pratica.percentualeCollega"
                  :min-fraction-digits="0"
                  :max-fraction-digits="2"
                ></InputNumber>
              </div>
            </div>
          </div>

          <div class="col-12 flex justify-content-between flex-wrap">
            <div class="flex flex-column mb-4 col">
              <label>Tipo</label>
              <InputText type="text" v-model="pratica.TipoProdotto"></InputText>
            </div>

            <div class="flex flex-column mb-4 col">
              <label>Prodotto</label>
              <InputText type="text" v-model="pratica.descrizioneProdotto">
              </InputText>
            </div>

            <div class="flex flex-column mb-4 col">
              <label>Istituto</label>
              <InputText type="text" v-model="pratica.istitutoFinanziatore">
              </InputText>
            </div>
          </div>

          <div class="col-12 flex justify-content-between flex-wrap">
            <div class="flex col flex-column mb-4">
              <label>Rata</label>
              <InputText type="text" v-model="pratica.importoRata"></InputText>
            </div>

            <div class="flex col flex-column mb-4">
              <label>Durata</label>
              <InputText type="text" v-model="pratica.durata"></InputText>
            </div>

            <div class="flex col flex-column mb-4">
              <label>Montante</label>
              <InputText type="text" v-model="pratica.montante"></InputText>
            </div>

            <div class="flex col flex-column mb-4">
              <label>TAN</label>
              <InputText type="text" v-model="pratica.tan"></InputText>
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
                v-model="pratica.importoErogato"
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
            <Button
              @click="salvaPratica"
              :loading="loading"
              label="Salva"
            ></Button>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import AxiosService from "@/axiosServices/AxiosService"
import { ref } from "vue"
import { useToast } from "primevue/usetoast"

const toast = useToast()
const pratica = ref({})
const loading = ref(false)
function salvaPratica() {
  loading.value = true
  console.log("triggere salva dettagli pratica , ", pratica.value)
  const service = new AxiosService("Pratiche/NuovaPratica/delega")

  service
    .create(pratica.value)
    .then(() => {
      toast.add({
        severity: "success",
        summary: "Pratica creata con successo",
        detail: "La puoi trovare sul menu 'GESTIONE PRATICHE/Bozze'",
        life: 10000,
      })
    })
    .finally(() => {
      loading.value = false
    })
}

const utentiOptions = ref()
const loadingUtentiOptions = ref(false)
function getUtentiOptions() {
  loadingUtentiOptions.value = true
  const service = new AxiosService("Options/GetUsers")
  service
    .read()
    .then((res) => {
      utentiOptions.value = res
    })
    .finally(() => {
      loadingUtentiOptions.value = false
    })
}

getUtentiOptions()
</script>

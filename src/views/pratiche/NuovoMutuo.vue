<template>
  <Toast></Toast>
  <div class="wrapper">
    <h1>Nuovo Mutuo</h1>

    <Card>
      <template #content>
        <div class="grid">
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

          <Divider class="my-4"></Divider>

          <div class="col-12">
            <h4>Prodotto</h4>
          </div>
          <div class="col-12 col-md-8">
            <div class="flex flex-column mb-4 col">
              <label>Prodotto</label>
              <InputText type="text" v-model="pratica.descrizioneProdotto">
              </InputText>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="flex flex-column mb-4 col">
              <label>Istituto</label>
              <InputText type="text" v-model="pratica.istitutoFinanziatore">
              </InputText>
            </div>
          </div>

          <div class="col-12 flex justify-content-between flex-wrap">
            <div class="flex col flex-column mb-4">
              <label>Motivo del finanziamento</label>
              <InputText
                type="text"
                v-model="pratica.motivoFinanzimento"
              ></InputText>
            </div>

            <div class="flex col flex-column mb-4">
              <label>Importo richiesto</label>
              <InputNumber v-model="pratica.importo"></InputNumber>
            </div>

            <div class="flex col flex-column mb-4">
              <label>Importo finanziato</label>
              <InputNumber v-model="pratica.importoErogato"></InputNumber>
            </div>

            <div class="flex col flex-column mb-4">
              <label>Tipo di Tasso</label>
              <InputText type="text" v-model="pratica.tipoTasso"></InputText>
            </div>

            <div class="flex col flex-column mb-4">
              <label>Tasso finito</label>
              <InputNumber v-model="pratica.tassoFinito"></InputNumber>
            </div>

            <div class="flex col flex-column mb-4">
              <label>Intermediazione (%)</label>
              <InputNumber
                :min-fraction-digits="0"
                :max-fraction-digits="2"
                v-model="pratica.percentualeMediazione"
              ></InputNumber>
            </div>

            <div class="flex col flex-column mb-4">
              <label>Assicurazione</label>
              <InputNumber v-model="pratica.importoPolizza"></InputNumber>
            </div>

            <div class="flex col flex-column mb-4">
              <label>LTV</label>
              <InputNumber v-model="pratica.LTV"></InputNumber>
            </div>

            <div class="flex col flex-column mb-4">
              <label>Rata</label>
              <InputText type="text" v-model="pratica.importoRata"></InputText>
            </div>

            <div class="flex col flex-column mb-4">
              <label>Durata</label>
              <InputText type="text" v-model="pratica.durata"></InputText>
            </div>
          </div>

          <Divider class="my-4"></Divider>
          <div class="col-12">
            <h4>Polizze banca</h4>
          </div>
          <div class="col-12 flex justify-content-between">
            <div class="flex">
              <Checkbox
                v-model="pratica.noPolizza"
                :binary="true"
                class="mr-2"
              ></Checkbox>
              <label>No polizza</label>
            </div>
            <div class="flex">
              <Checkbox
                v-model="pratica.polVitaUnico"
                :binary="true"
                class="mr-2"
              ></Checkbox>
              <label>Vita premio unico</label>
            </div>
            <div class="flex">
              <Checkbox
                v-model="pratica.polLavoroUnico"
                :binary="true"
                class="mr-2"
              ></Checkbox>
              <label>Lavoro premio unico</label>
            </div>
            <div class="flex">
              <Checkbox
                v-model="pratica.polVitaMensile"
                :binary="true"
                class="mr-2"
              ></Checkbox>
              <label>Vita prmensile</label>
            </div>
            <div class="flex">
              <Checkbox
                v-model="pratica.polLavoroMensile"
                :binary="true"
                class="mr-2"
              ></Checkbox>
              <label>Lavoro prmensile</label>
            </div>
          </div>

          <Divider class="my-4"></Divider>
          <div class="col-12">
            <h4>Immobile in oggetto</h4>
          </div>

          <div class="col-12 flex flex-wrap justify-content-between">
            <div class="flex flex-column col-12 col-md-4">
              <label>Tipo immobile</label>
              <InputText v-model="pratica.tipoImmobile" type="text"></InputText>
            </div>

            <div class="flex flex-column col-12 col-md-4">
              <label>Valore immobile</label>
              <InputNumber v-model="pratica.valoreImmobile"></InputNumber>
            </div>

            <div class="flex flex-column col-12 col-md-4">
              <label>Destinazione d'uso</label>
              <InputText
                v-model="pratica.destinazioneUso"
                type="text"
              ></InputText>
            </div>

            <div class="flex flex-column col-12 col-md-4">
              <label>Provenienza immobile</label>
              <InputText
                v-model="pratica.provenienzaImmobile"
                type="text"
              ></InputText>
            </div>

            <div class="flex flex-column col-12 col-md-4">
              <label>Comune</label>
              <InputText
                v-model="pratica.comuneImmobile"
                type="text"
              ></InputText>
            </div>

            <div class="flex flex-column col-12 col-md-4">
              <label>CAP</label>
              <InputText v-model="pratica.capImmobile" type="text"></InputText>
            </div>

            <div class="flex flex-column col-12 col-md-4">
              <label>Indirizzo</label>
              <InputText
                v-model="pratica.indirizzoImmobile"
                type="text"
              ></InputText>
            </div>

            <div class="flex flex-column col-12 col-md-4">
              <label>Numero civico</label>
              <InputText
                v-model="pratica.civicoImmobile"
                type="text"
              ></InputText>
            </div>

            <div class="flex align-items-center col-12 col-md-4">
              <Checkbox
                :binary="true"
                v-model="pratica.voucherMutuo"
                class="mr-4"
              ></Checkbox>
              <label>Voucher Mutuo</label>
            </div>
          </div>
          <Divider class="my-4"></Divider>
          <div class="col-12">
            <h4>S.A.L.</h4>
          </div>
          <div class="col-12 flex flex-wrap justify-content-between">
            <div class="flex align-items-center col-12 col-md-4">
              <Checkbox
                :binary="true"
                v-model="pratica.sal"
                class="mr-4"
              ></Checkbox>
              <label>Il mutuo è un SAL?</label>
            </div>
            <Message class="col-12" v-if="mutuoSal" severity="warn"
              >La gestione dei SAL è esclusivamente in WebApp</Message
            >
          </div>

          <div class="flex justify-content-end mb-4 w-full">
            <Button
              label="Formulario incompleto"
              disabled
              v-if="!formAbilitato"
            ></Button>
            <Button
              v-else
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
import { ref, computed } from "vue"
import { useToast } from "primevue/usetoast"
import { useStore } from "vuex"
const toast = useToast()
const pratica = ref({})
const store = useStore()

pratica.value.idAgente = store.getters["loggedUser"].id

pratica.value.descrizioneProdotto = "Mutuo"
const loading = ref(false)
function salvaPratica() {
  loading.value = true
  console.log("triggere salva dettagli pratica , ", pratica.value)
  const service = new AxiosService("Pratiche/NuovaPratica/mutuo")

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

const utentiOptions = ref([{ text: "Nessun utente", value: 0 }])
const loadingUtentiOptions = ref(false)
function getUtentiOptions() {
  loadingUtentiOptions.value = true
  const service = new AxiosService("Options/GetUsers")
  service
    .read()
    .then((res) => {
      utentiOptions.value.push(...res)
    })
    .finally(() => {
      loadingUtentiOptions.value = false
    })
}

const formAbilitato = computed(() => {
  if (
    pratica.value.idAgente &&
    pratica.value.descrizioneProdotto &&
    pratica.value.istitutoFinanziatore &&
    pratica.value.motivoFinanzimento &&
    pratica.value.importo &&
    pratica.value.importoErogato &&
    pratica.value.tipoTasso &&
    pratica.value.tassoFinito &&
    pratica.value.percentualeMediazione &&
    pratica.value.importoRata &&
    pratica.value.durata &&
    pratica.value.tipoImmobile &&
    pratica.value.valoreImmobile &&
    pratica.value.destinazioneUso &&
    pratica.value.provenienzaImmobile &&
    pratica.value.comuneImmobile &&
    pratica.value.capImmobile &&
    pratica.value.indirizzoImmobile &&
    pratica.value.civicoImmobile
  ) {
    return true
  } else {
    return false
  }
})

getUtentiOptions()
</script>

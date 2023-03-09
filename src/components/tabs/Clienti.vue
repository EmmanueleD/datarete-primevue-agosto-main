<template>
  <Toast></Toast>
  <ConfirmDialog></ConfirmDialog>
  <Card class="mb-4">
    <template #content>
      <div class="w-full flex justify-content-between align-items-center gap-2">
        <div>
          <Button
            @click="showElencoClienti"
            label="Elenco clienti in questa pratica"
            class="p-button-outlined"
          ></Button>
        </div>
        <div class="flex gap-2">
          <Button
            @click="showNuovaAnagrafica"
            label="Aggiungi nuovo richiedente"
            class="p-button-outlined"
          ></Button>
          <Button
            @click="showSelezionaClienteEsistente"
            label="Seleziona anagrafica richiedente"
            class="p-button-outlined"
          ></Button>
        </div>
      </div>
    </template>
  </Card>
  <Divider class="my-6"></Divider>
  <div v-if="elencoClientiVisible">
    <div
      v-for="(cliente, index) in pratica.clienti"
      :key="cliente.idAnagrafica"
      class="flex align-items-center mb-4"
    >
      <Card class="w-full mb-4">
        <template #content>
          <div
            class="flex w-full justify-content-between align-items-center mb-4"
          >
            <span class="font-bold">
              <i class="pi pi-angle-right mr-2 text-xs"></i>
              <span
                >{{ cliente.nome || cliente.NOME }}
                {{ cliente.cognome || cliente.COGNOME }}</span
              >
            </span>
            <Dropdown
              class="w-3"
              :options="tipoPartecipanteOptions"
              v-model="cliente.ruoloMutuo"
              @change="cambiaRuoloMutuo(cliente)"
            ></Dropdown>
          </div>
          <div class="w-full grid">
            <div class="col-12 col-md-6 col-lg-4 px-2">
              <div class="flex flex-column p-2 surface-100 border-round-lg">
                <label>Cellulare</label>
                <span
                  v-if="cliente.cellulare"
                  style="overflow-wrap: break-word"
                  class="font-bold"
                  >{{ cliente.cellulare }}</span
                >
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg-4 px-2">
              <div class="flex flex-column p-2 surface-100 border-round-lg">
                <label>Cittadinanza</label>
                <span
                  v-if="cliente.cittadinanza"
                  style="overflow-wrap: break-word"
                  class="font-bold"
                  >{{ cliente.cittadinanza }}</span
                >
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg-4 px-2">
              <div class="flex flex-column p-2 surface-100 border-round-lg">
                <label>Codice fiscale</label>
                <span
                  v-if="cliente.codiceFiscale"
                  style="overflow-wrap: break-word"
                  class="font-bold"
                  >{{ cliente.codiceFiscale }}</span
                >
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg-4 px-2">
              <div class="flex flex-column p-2 surface-100 border-round-lg">
                <label>Contratto di lavoro</label>
                <span
                  v-if="cliente.contrattoLavoro"
                  style="overflow-wrap: break-word"
                  class="font-bold"
                  >{{ cliente.contrattoLavoro }}</span
                >
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg-4 px-2">
              <div class="flex flex-column p-2 surface-100 border-round-lg">
                <label>Email</label>
                <span
                  v-if="cliente.email"
                  style="overflow-wrap: break-word"
                  class="font-bold"
                  >{{ cliente.email }}</span
                >
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg-4 px-2">
              <div class="flex flex-column p-2 surface-100 border-round-lg">
                <label>Residenza</label>
                <span
                  v-if="cliente.residenza"
                  style="overflow-wrap: break-word"
                  class="font-bold"
                  >{{ cliente.residenza }}</span
                >
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg-4 px-2">
              <div class="flex flex-column p-2 surface-100 border-round-lg">
                <label>Data di nascita</label>
                <span class="font-bold">{{
                  new Date(cliente.dataNascita).toLocaleDateString("it", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })
                }}</span>
              </div>
            </div>
          </div>
          <div class="w-full flex justify-content-end align-items-center">
            <Button
              @click="confirmDeleteCliente(cliente, index)"
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger"
            ></Button>
          </div>
        </template>
      </Card>
    </div>
  </div>

  <Card v-if="nuovaAnagraficaVisible">
    <template #content>
      <NuovaAnagraficaSimplified
        @event_HideNuovaAnagrafica="addNuovoClienteToPratica($event)"
      ></NuovaAnagraficaSimplified>
    </template>
  </Card>

  <Card v-if="selezionaClienteEsistenteVisible" class="mb-4">
    <template #content>
      <div class="flex justify-content-between align-items-center">
        <h4>Ricerca con uno o più filtri</h4>
        <Button
          :loading="loading"
          @click="ricerca"
          label="Ricerca"
          icon="pi pi-search"
        ></Button>
      </div>
      <div class="grid w-full">
        <div class="col-12 col-md-6 col-lg-4 px-1">
          <div class="p-2 flex flex-column border-round-lg">
            <label>Nome</label>
            <InputText v-model="filtro.nome" type="text"></InputText>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 px-1">
          <div class="p-2 flex flex-column border-round-lg">
            <label>Cognome</label>
            <InputText v-model="filtro.cognome" type="text"></InputText>
          </div>
        </div>
        <!-- <div class="col-12 col-md-6 col-lg-4 px-1 ">
          <div class="p-2 flex flex-column  border-round-lg">
            <label>Email</label>
            <InputText type="text"></InputText>
          </div>
        </div> -->
        <Divider></Divider>
        <div class="col-12 col-md-6 col-lg-4 px-1">
          <div class="p-2 flex flex-column border-round-lg">
            <label>Ricerca libera</label>
            <InputText v-model="filtro.fullSearch" type="text"></InputText>
          </div>
        </div>
      </div>
      <div>
        <div
          v-for="cliente in risultatiRicerca"
          :key="cliente.ID"
          class="flex align-items-center mb-4"
        >
          <Card class="w-full mb-4">
            <template #content>
              <div
                class="flex w-full justify-content-between align-items-center mb-4"
              >
                <span class="font-bold">
                  <i class="pi pi-angle-right mr-2 text-xs"></i>
                  <span>{{ cliente.NOME }} {{ cliente.COGNOME }}</span>
                </span>
                <Button
                  @click="addClienteToPratica(cliente)"
                  label="Aggiungi alla pratica"
                ></Button>
              </div>
              <div class="w-full grid">
                <div class="col-12 col-md-6 col-lg-4 px-2">
                  <div class="flex flex-column p-2 surface-100 border-round-lg">
                    <label>Cellulare</label>
                    <span
                      v-if="cliente.cellulare"
                      style="overflow-wrap: break-word"
                      class="font-bold"
                      >{{ cliente.cellulare }}</span
                    >
                  </div>
                </div>

                <div class="col-12 col-md-6 col-lg-4 px-2">
                  <div class="flex flex-column p-2 surface-100 border-round-lg">
                    <label>Cittadinanza</label>
                    <span
                      v-if="cliente.cittadinanza"
                      style="overflow-wrap: break-word"
                      class="font-bold"
                      >{{ cliente.cittadinanza }}</span
                    >
                  </div>
                </div>

                <div class="col-12 col-md-6 col-lg-4 px-2">
                  <div class="flex flex-column p-2 surface-100 border-round-lg">
                    <label>Codice fiscale</label>
                    <span
                      v-if="cliente.codiceFiscale"
                      style="overflow-wrap: break-word"
                      class="font-bold"
                      >{{ cliente.codiceFiscale }}</span
                    >
                  </div>
                </div>

                <div class="col-12 col-md-6 col-lg-4 px-2">
                  <div class="flex flex-column p-2 surface-100 border-round-lg">
                    <label>Contratto di lavoro</label>
                    <span
                      v-if="cliente.contrattoLavoro"
                      style="overflow-wrap: break-word"
                      class="font-bold"
                      >{{ cliente.contrattoLavoro }}</span
                    >
                  </div>
                </div>

                <div class="col-12 col-md-6 col-lg-4 px-2">
                  <div class="flex flex-column p-2 surface-100 border-round-lg">
                    <label>Email</label>
                    <span
                      v-if="cliente.email"
                      style="overflow-wrap: break-word"
                      class="font-bold"
                      >{{ cliente.email }}</span
                    >
                  </div>
                </div>

                <div class="col-12 col-md-6 col-lg-4 px-2">
                  <div class="flex flex-column p-2 surface-100 border-round-lg">
                    <label>Residenza</label>
                    <span
                      v-if="cliente.residenza"
                      style="overflow-wrap: break-word"
                      class="font-bold"
                      >{{ cliente.residenza }}</span
                    >
                  </div>
                </div>

                <div class="col-12 col-md-6 col-lg-4 px-2">
                  <div class="flex flex-column p-2 surface-100 border-round-lg">
                    <label>Data di nascita</label>
                    <span class="font-bold">{{
                      new Date(cliente.dataNascita).toLocaleDateString("it", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })
                    }}</span>
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </template>
  </Card>
  <Divider class="my-4"></Divider>
</template>

<script setup>
import AxiosService from "@/axiosServices/AxiosService"
import { ref, computed } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useToast } from "primevue/usetoast"
import { useConfirm } from "primevue/useconfirm"
import NuovaAnagraficaSimplified from "../sidebars/NuovaAnagraficaSimplified.vue"

const loading = ref(false)
const router = useRouter()
const route = useRoute()
const toast = useToast()
const confirm = useConfirm()

const nuovaAnagraficaVisible = ref(false)
const selezionaClienteEsistenteVisible = ref(false)
const elencoClientiVisible = ref(true)

const props = defineProps({
  pratica: Object,
})

const emits = defineEmits("needRefreshPratica")

const clienti = ref([])

function showNuovaAnagrafica() {
  nuovaAnagraficaVisible.value = true
  selezionaClienteEsistenteVisible.value = false
  elencoClientiVisible.value = false

  // const routeData = router.resolve(
  //   "/nuova-anagrafica/" + route.params.idPratica
  // )
  // window.open(routeData.href, "_blank")
}

function addNuovoClienteToPratica(nuovaAnagrafica) {
  const service = new AxiosService(
    "Pratiche/AddCliente/" + route.params.idPratica + "/" + nuovaAnagrafica.id
  )

  service
    .create({})
    .then(() => {
      toast.add({
        severity: "success",
        summary: "Nuovo cliente aggiunto alla pratica",
        life: 5000,
      })
    })
    .finally(() => {
      props.pratica.clienti.push(nuovaAnagrafica.anagrafica)
    })
}

function showSelezionaClienteEsistente() {
  nuovaAnagraficaVisible.value = false
  selezionaClienteEsistenteVisible.value = true
  elencoClientiVisible.value = false
}

function showElencoClienti() {
  nuovaAnagraficaVisible.value = false
  selezionaClienteEsistenteVisible.value = false
  elencoClientiVisible.value = true
}

const tipoPartecipanteOptions = ref(["Mutuatario", "Garante", "Fideussore"])

const filtro = ref({
  cognome: "",
  nome: "",
  stato: [],
  origine: [],
  commerciale: [],
  data_creazione: [],
  data_modifica: [],
  regione: "",
  provincia: "",
  order_campo: "",
  order_type: "",
  codice_fiscale: "",
  numero_telefono: "",
  data_prossimo_rinnovo: [],
  data_prossimo_contatto: [],
  sottostato: [],
  origine_lead: "",
  fullSearch: "",
})

const risultatiRicerca = ref([])
function ricerca() {
  loading.value = true
  const service = new AxiosService()
  service
    .postCustomEndpoint(
      "Anagrafiche/RetailLight?serverPagination=true&fromIndex=0&takeElements=20" +
        "&type=clienti",
      "",
      filtro.value
    )
    .then((res) => {
      risultatiRicerca.value = res
    })
    .finally(() => {
      loading.value = false
    })
}

function cambiaRuoloMutuo(cliente) {
  console.log("nuovo ruolo cliente , ", cliente)

  const service = new AxiosService(
    "Pratiche/EditCliente/" + route.params.idPratica
  )

  cliente.ID = cliente.idAnagrafica

  service.update(cliente).then((res) => {
    toast.add({
      severity: "success",
      summary: "Ruolo cliente cambiato",
      // detail: res,
      life: 2000,
    })
  })
}

function addClienteToPratica(cliente) {
  const service = new AxiosService(
    "Pratiche/AddCliente/" + route.params.idPratica + "/" + cliente.ID
  )

  service
    .create({})
    .then(() => {
      toast.add({
        severity: "success",
        summary: "Nuovo cliente aggiunto alla pratica",

        life: 3000,
      })
    })
    .finally(() => {
      props.pratica.clienti.push(cliente)
    })
}

function confirmDeleteCliente(cliente, index) {
  confirm.require({
    message:
      'Confermi di voler rimuovere "' +
      cliente.nome +
      " " +
      cliente.cognome +
      '" da questa pratica?',
    icon: "pi pi-trash",
    accept: () => deleteCliente(cliente, index),
    reject: null,
  })
}

function deleteCliente(cliente, index) {
  const service = new AxiosService(
    "Pratiche/DeleteCliente/" + route.params.idPratica
  )

  service
    .delete(cliente.idAnagrafica)
    .then((res) => {
      toast.add({
        severity: "success",
        summary: "Cliente rimosso dalla pratica",
        life: 3000,
      })
    })
    .finally(() => {
      props.pratica.clienti.splice(index, 1)
    })
}
</script>

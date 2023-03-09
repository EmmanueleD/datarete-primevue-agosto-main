<template>
  <div class="wrapper">
    <h1>Profilo personale</h1>

    <Card class="my-4">
      <template #title>
        <div class="w-full flex justify-content-start align-items-center">
          <div class="profilo-avatar mr-4">
            <img :src="tempUser.imgprofilo" alt="" />
          </div>
          <div class="flex flex-column flex-grow-1">
            <span class="font-normal">{{
              tempUser.nome + " " + tempUser.cognome
            }}</span>
            <span class="text-sm"> {{ tempUser.ruolo }} </span>
          </div>
        </div>
      </template>
      <template #content>
        <Divider></Divider>
        <div class="grid">
          <div class="col-12 col-md-6 my-4">
            <h2>Informazioni personali</h2>
            <div class="flex flex-column my-4">
              <span>Data di nascita</span>
              <span class="font-bold">{{
                new Date(tempUser.datanascita).toLocaleDateString("it", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })
              }}</span>
            </div>
            <div class="flex flex-column my-4">
              <span>Luogo di nascita</span>
              <span class="font-bold">{{ tempUser.luogonascita }}</span>
            </div>
            <div class="flex flex-column my-4">
              <span>Codice fiscale</span>
              <span class="font-bold">{{ tempUser.codicefiscale }}</span>
            </div>
            <div class="flex flex-column my-4">
              <span>Partita IVA</span>
              <span class="font-bold">{{ tempUser.partitaiva }}</span>
            </div>
          </div>
          <div class="col-12 col-md-6 my-4">
            <h2>Contatti</h2>
            <div class="flex flex-column my-4">
              <span>Email</span>
              <span class="font-bold">{{ tempUser.email }}</span>
            </div>
            <div class="flex flex-column my-4">
              <span>Telefono</span>
              <span class="font-bold">{{ tempUser.telefono }}</span>
            </div>
            <div class="flex flex-column my-4">
              <span>Cellulare</span>
              <span class="font-bold">{{ tempUser.cellulare }}</span>
            </div>
            <div class="flex flex-column my-4">
              <span>Numero VoiSpeed</span>
              <span class="font-bold">{{ tempUser.numero_voispeed }}</span>
            </div>
          </div>

          <div class="col-12 my-4">
            <h2>Informazioni di sistema</h2>
            <div
              class="flex justify-content-between align-items-start flex-wrap gap-6"
            >
              <div class="flex flex-column my-4">
                <span>Utente attivo</span>
                <span class="font-bold">{{
                  tempUser.attivo ? "Sì" : "No"
                }}</span>
              </div>
              <div class="flex flex-column my-4">
                <span class="mb-2">Livelli abilitati</span>
                <span v-if="loading.livelli"
                  ><i class="pi pi-spin pi-spinner"></i
                ></span>
                <span
                  v-else
                  v-for="livello in livelliAbilitati"
                  class="font-bold mb-2"
                  >{{ livello.text }}</span
                >
              </div>
              <div class="flex flex-column my-4">
                <span class="mb-2">Portali abilitati</span>
                <span v-if="tempUser.enabled_crm" class="font-bold mb-2"
                  >DataRete - CRM</span
                >
                <span v-if="tempUser.enabled_gestionale" class="font-bold mb-2"
                  >DataRete - Gestionale</span
                >
              </div>
              <div class="flex flex-column my-4">
                <span class="mb-2">Tipi prodotto</span>
                <span v-if="loading.tipiProdotto"
                  ><i class="pi pi-spin pi-spinner"></i
                ></span>
                <span
                  v-else
                  v-for="tipo in tipiProdotto"
                  class="font-bold mb-2"
                  >{{ tipo.text }}</span
                >
              </div>
              <div class="flex flex-column my-4">
                <span class="mb-2">Sedi azienda</span>
                <span v-if="loading.sediAzienda"
                  ><i class="pi pi-spin pi-spinner"></i
                ></span>
                <span
                  v-else
                  v-for="sede in sediAzienda"
                  class="font-bold mb-2"
                  >{{ sede.text }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import AxiosService from "@/axiosServices/AxiosService"
import { ref } from "vue"
import { useStore } from "vuex"

const loading = ref({
  livelli: false,
  tipiProdotto: false,
})

const store = useStore()

const user = store.getters["loggedUser"]
const tempUser = ref(user)

const livelliAbilitati = ref([])
function getLivelliAbilitati() {
  loading.value.livelli = true
  const service = new AxiosService("Options/GetLoginLevels")
  service
    .read()
    .then((res) => {
      tempUser.value.livelliAbilitati.forEach((idLivello) => {
        livelliAbilitati.value.push(
          res.find((livello) => idLivello == livello.value)
        )
      })
    })
    .finally(() => {
      loading.value.livelli = false
    })
}

const tipiProdotto = ref([])
function getTipiProdotto() {
  loading.value.tipiProdotto = true
  const service = new AxiosService("Options/TipiProdotto")
  service
    .read()
    .then((res) => {
      tempUser.value.tipiPrdotto.forEach((idTipo) => {
        tipiProdotto.value.push(res.find((tipo) => idTipo == tipo.value))
      })
    })
    .finally(() => {
      loading.value.tipiProdotto = false
    })
}

const sediAzienda = ref([])
function getSediAzienda() {
  loading.value.sediAzienda = true
  const service = new AxiosService("Options/Gestione/SediAzienda/GetSedi")
  service
    .read()
    .then((res) => {
      tempUser.value.sediAzienda.forEach((idSede) => {
        sediAzienda.value.push(res.find((sede) => idSede == sede.value))
      })
    })
    .finally(() => {
      loading.value.sediAzienda = false
    })
}

getLivelliAbilitati()
getTipiProdotto()
getSediAzienda()
</script>

<template>
  <div class="w-full grid-center" style="height: 20vh" v-if="loading">
    <i class="pi pi-spin pi-spinner text-xl"></i>
  </div>
  <DettaglioCQS v-else-if="tipoPratica == 'Cessione'"></DettaglioCQS>
  <DettaglioDelega v-else-if="tipoPratica == 'Delega'"></DettaglioDelega>
  <DettaglioPrestito
    v-else-if="tipoPratica == 'Prestiti Personali'"
  ></DettaglioPrestito>
  <DettaglioMutuo v-else-if="tipoPratica == 'Mutui'"></DettaglioMutuo>
</template>

<script setup>
import AxiosService from "@/axiosServices/AxiosService"
import { ref } from "vue"
import { useRoute } from "vue-router"
import { useStore } from "vuex"
// import Documenti from "@/components/Documenti.vue";
import DettaglioCQS from "./DettaglioCQS.vue"
import DettaglioPrestito from "./DettaglioPrestito.vue"
import DettaglioMutuo from "./DettaglioMutuo.vue"
import DettaglioDelega from "./DettaglioDelega.vue"

const route = useRoute()
const store = useStore()
const id_pratica = route.params.idPratica
const loading = ref(false)
const tipoPratica = ref({})

function getData() {
  loading.value = true
  tipoPratica.value = ""
  const service = new AxiosService(
    "Pratiche/GetPratica/" + route.params.idPratica
  )
  service
    .read()
    .then((res) => {
      tipoPratica.value = res.TipoProdotto
    })
    .finally(() => {
      loading.value = false
    })
}

getData()
</script>

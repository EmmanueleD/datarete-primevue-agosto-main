<template>
  <div class="grid wrapper">
    <NuovaAnagrafica
      @event_refreshList="addClienteToPratica($event)"
    ></NuovaAnagrafica>
  </div>
</template>

<script setup>
import { ref } from "vue"
import NuovaAnagrafica from "@/components/sidebars/NuovaAnagrafica.vue"
import AxiosService from "@/axiosServices/AxiosService"

import { useToast } from "primevue/usetoast"
import { useRoute } from "vue-router"

const route = useRoute()
const toast = useToast()

function addClienteToPratica(idNuovaAnagrafica) {
  const service = new AxiosService(
    "Pratiche/AddCliente/" + route.params.idPratica + "/" + idNuovaAnagrafica
  )

  service.create({}).then(() => {
    toast.add({
      severity: "success",
      summary: "Nuovo cliente aggiunto alla pratica",

      life: 5000,
    })
  })
}
</script>

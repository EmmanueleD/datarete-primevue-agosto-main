<template>
    <!-- <Card class="mb-4">
    <template #content>
      <h4 class="mb-4">Cliente e pratica</h4>
      <div class="flex flex-wrap w-full justify-content-start align-center">
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Cliente</span>
          <span class="font-bold">Nome Cognome</span>
        </div>
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">ID Cliente</span>
          <span class="font-bold">3209</span>
        </div>
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Data di nascita</span>
          <span class="font-bold">14/12/1990</span>
        </div>
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Residente a</span>
          <span class="font-bold">Napoli</span>
        </div>
        <Divider></Divider>
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Telefono cellulare</span>
          <span class="font-bold">389899899</span>
        </div>
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Email</span>
          <span class="font-bold">nome.c@acme.it</span>
        </div>
        <Divider></Divider>
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Pratica</span>
          <span class="font-bold">14121</span>
        </div>
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Istituto</span>
          <span class="font-bold">CPING</span>
        </div>
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Importo</span>
          <span class="font-bold">€ 14.121,00</span>
        </div>
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Stato</span>
          <span class="font-bold">4-OK</span>
        </div>
        <div class="w-full"></div>
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Data creazione</span>
          <span class="font-bold">11/11/2022</span>
        </div>
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Data ultima modifica</span>
          <span class="font-bold">12/02/2023</span>
        </div>
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Referente</span>
          <span class="font-bold">Oronte Gennaro</span>
        </div>
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Tipo di firma</span>
          <span class="font-bold">FEA</span>
        </div>
      </div>
    </template>
  </Card> -->

  <Card class="mb-4">
    <template #content>
      <h4 class="mb-4">Dettagli Mandato di Mediazione</h4>

      <div class="w-full  flex flex-wrap justify-content-start gap-4">

        <div class="flex flex-column">
          <label >Mediazione (%)</label>
          <InputNumber  v-model="tmpItem.mediazionePerc"></InputNumber>
        </div>

        <div class="flex flex-column">
          <label >Mediazione (€)</label>
          <InputNumber  v-model="tmpItem.mediazioneEuro"></InputNumber>
        </div>

        <div class="flex flex-column">
          <label >Fondo spesa (%)</label>
          <InputNumber  v-model="tmpItem.fondoSpesa"></InputNumber>
        </div>

        <div class="flex flex-column">
          <label >Data mandato</label>
          <Calendar v-model="tmpItem.dataMandato"></Calendar>
        </div>

      </div>
      <!-- <Message severity="info"
        >La proposta di mediazione è stata firmata, pertanto non è possibile
        modificare i dati.</Message
      >
      <div class="flex flex-wrap w-full justify-content-start align-center">
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Mediazione</span>
          <div>
            <span class="font-bold">1,80% </span><span>(1.512,00 €)</span>
          </div>
        </div>
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Fondo spesa</span>
          <span class="font-bold">0,00% </span>
        </div>
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Data Mandato</span>
          <div>
            <span class="font-bold mr-2">25/01/2023</span
            ><span>(180 giorni)</span><br /><span class="font-bold"
              >IN ESCLUSIVA</span
            >
          </div>
        </div>
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Data primo mandato</span>
          <span class="font-bold">25/05/2022</span>
        </div>
      </div> -->
    </template>
  </Card>

  <Card class="mb-4">
    <template #content>
      <h4 class="mb-4">Controllo della mediazione</h4>


     <div class="w-full flex flex-wrap justify-content-start gap-4">
      <div class="flex flex-column">
          <label >Stato pagamento</label>
          <InputText  v-model="tmpItem.statoPagamento"></InputText>
        </div>

        <div class="flex flex-column">
          <label >Importo incassato</label>
          <InputNumber  v-model="tmpItem.importoIncassato"></InputNumber>
        </div>

      <div class="flex flex-column">
          <label >Data incasso</label>
          <Calendar v-model="tmpItem.dataIncasso"></Calendar>
        </div>

        <div class="flex flex-column">
          <label >Raccomandata data invio</label>
          <Calendar v-model="tmpItem.dataRaccomandata"></Calendar>
        </div>
     </div>
      <!-- <div class="flex flex-wrap w-full justify-content-start align-center">
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Stato</span>
          <span class="font-bold">CT-L</span>
        </div>
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Data stato</span>
          <span class="font-bold">25/05/2022</span>
        </div>
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Stato pagamendo</span>
          <span class="font-bold">
            <i class="pi pi-check-circle mr-2"></i>
            Incassato
          </span>
        </div>
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Importo incassato</span>
          <span class="font-bold">1.512,00</span>
        </div>
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Data incasso</span>
          <span class="font-bold">22/07/2022</span>
        </div>
        <div class="flex flex-column m-2 p-2 shadow-1">
          <span class="font-italic">Raccomandata data invio</span>
          <span class="font-bold"></span>
        </div>
      </div> -->
    </template>
  </Card>

<Card>
  <template #content>
    <div class="d-full flex justify-content-end">
      <Button :loading="loading" @click="salvaMediazione" label="Salva"></Button>
    </div>
  </template>
</Card>
</template>

<script setup>
import {ref } from 'vue'
import { useRoute } from 'vue-router';
import AxiosService from '@/axiosServices/AxiosService'

const props = defineProps({
  pratica: Object
})

const route = useRoute()
const tmpItem = ref({

})
const loading = ref(false)

tmpItem.value = {...props.pratica}

function salvaMediazione() {
  loading.value = true
  const service = new AxiosService(
    "Pratiche/AggiornaPratica" + "/" + route.params.idPratica
  )

  const objectToPost = {...tmpItem, ...props.pratica}

  service
    .updateWithoutId(
      "Pratiche/AggiornaPratica" + "/" + route.params.idPratica,
      objectToPost
    )
    .then((res) => {
      console.log(res);
    })
    .finally(() => {
      loading.value = false
    });
}
</script>
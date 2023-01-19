<template>


  <h3>{{ sidebarData.NOME }} {{ sidebarData.COGNOME }}</h3>

  <Accordion :multiple="true" :activeIndex="[]">
    <AccordionTab>
      <template #header>
        <div class="flex flex-column ml-3">
          <h4>Anagrafica</h4>
          Dati generali dell'Anagrafica
        </div>
      </template>
      Nome: {{ sidebarData.NOME }}<br>
      Cognome: {{ sidebarData.COGNOME }}<br>
      Azienda: {{ sidebarData.DENOMINAZIONE_AZIENDA }}<br>
      Professione: {{ sidebarData.PROFESSIONE }}<br>
    </AccordionTab>
    <AccordionTab :disabled="false">
      <template #header>
        <div class="flex flex-column ml-3">
          <h4>Contatti</h4>
          Tabella con i contatti di {{ sidebarData.NOME }}
        </div>
      </template>

    </AccordionTab>
    <AccordionTab :disabled="false">
      <template #header>
        <div class="flex flex-column ml-3">
          <h4>Appuntamenti</h4>
          Tabella con i prossimi appuntamenti di {{ sidebarData.NOME }}
        </div>
      </template>
      <div class="mb-4 flex justify-content-end">
        <Button :loading="genLoading" @click="creaEvento" label="Aggiungi appuntamento"></Button>
      </div>
      <CalendarBuilder :callsToCalendar="sidebarData.callsToCalendar"
        :eventsEndpoint="'Calendar/GetEvents/' + sidebarData.ID" initialView="listYear">
      </CalendarBuilder>
    </AccordionTab>
    <AccordionTab :disabled="false">
      <template #header>
        <div class="flex flex-column ml-3">
          <h4>Pratiche</h4>
          Tabella con le pratiche relative a {{ sidebarData.NOME }}
        </div>
      </template>

    </AccordionTab>
    <AccordionTab>
      <template #header>
        <div class="flex flex-column ml-3">
          <h4>CRM</h4>
          Visualizzazione delle ultime note caricate nel CRM per {{ sidebarData.NOME }}
        </div>
      </template>
      <span>Non ci sono CRM</span>
    </AccordionTab>
  </Accordion>

  <Sidebar v-model:visible="sidebarEventiVisible" :baseZIndex="10000" position="right" class="p-sidebar-md">
    <SidebarEventi :sidebarData="sidebarEventiData"></SidebarEventi>
  </Sidebar>

</template>

<script setup>
import { ref } from 'vue'
import AxiosService from '@/axiosServices/AxiosService';
import CalendarBuilder from '../CalendarBuilder.vue';
import SidebarEventi from './SidebarEventi.vue';

// eslint-disable-next-line no-unused-vars, no-undef
const emit = defineEmits(['event_showSidebar_sidebarEventi', 'event_HideSidebarClienti'])

// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object
})

const genLoading = ref(false)

const sidebarEventiData = ref({ userOptions: [] })
const sidebarEventiVisible = ref(false)

async function creaEvento() {
  genLoading.value = true
  console.log('CREA EVENTO FROM CLIENTI')

  const serviceGET = new AxiosService('Options/GetUsers')
  await serviceGET.read()
    .then(res => {
      console.log("🚀 ~ file: SidebarEventi.vue ~ line 206 ~ getOptionsUsers ~ res", res)
      sidebarEventiData.value.userOptions = res
    })

  sidebarEventiVisible.value = true
  genLoading.value = false



}
</script>
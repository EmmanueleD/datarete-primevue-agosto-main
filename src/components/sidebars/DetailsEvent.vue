<template>
  <Toast></Toast>


  <h3 class="mb-4">Dettagli Evento</h3>
  <div class="flex  align-items-center mb-4">
    Conferma partecipazione
    <div v-if="confirmation == ''">
      <Button @click="confirmParticipation('conferma')" icon="pi pi-check"
        class="p-button-outlined p-button-rounded p-button-success ml-2" />
      <Button @click="confirmParticipation('rifiuta')" icon="pi pi-times"
        class="p-button-outlined p-button-rounded p-button-danger ml-2" />
    </div>
    <div v-if="confirmation == 'conferma'">
      <Button @click="confirmParticipation('conferma')" icon="pi pi-check"
        class=" p-button-rounded p-button-success ml-2" />
      <Button @click="confirmParticipation('rifiuta')" icon="pi pi-times"
        class="p-button-outlined p-button-rounded p-button-danger ml-2" />
    </div>
    <div v-if="confirmation == 'rifiuta'">
      <Button @click="confirmParticipation('conferma')" icon="pi pi-check"
        class="p-button-outlined p-button-rounded p-button-success ml-2" />
      <Button @click="confirmParticipation('rifiuta')" icon="pi pi-times"
        class=" p-button-rounded p-button-danger ml-2" />
    </div>
  </div>

  <Accordion :multiple="true" :activeIndex="[0]">
    <AccordionTab>
      <template #header>
        Dettagli Evento
      </template>
      <div>
        <h4>{{ sidebarData.title }}</h4>
      </div>
      <div class="grid mb-4">
        <div class="col-6">
          Dal: {{ formatDate(sidebarData.start) }} alle: {{ getTime(sidebarData.start) }}
        </div>
        <div class="col-6">
          Al: {{ formatDate(sidebarData.end) }} alle: {{ getTime(sidebarData.end) }}
        </div>
      </div>

      <h5>Partecipanti</h5>
      <div class="mb-4" v-if="sidebarData.extendedProps.partecipanti.length > 0">
        <span v-for="(partecipante, i) in sidebarData.extendedProps.partecipanti" :key="i">
          {{ partecipante.nome_cognome }}
          <span v-if="partecipante.accepted"><i class="pi pi-fw pi-check-circle"></i></span>
          <span v-else><i class="pi pi-fw pi-check-times"></i></span>
        </span>
      </div>
      <div class="mb-4" v-else>
        <i class="pi pi-fw pi-exclamation-circle mr-2"></i>
        <span>Questo evento ancora non ha partecipanti</span>
      </div>

      <h5 v-if="sidebarData.extendedProps.description">Descrizione</h5>
      <div class="mb-5">
        <span>
          {{ sidebarData.extendedProps.description }}
        </span>
      </div>
    </AccordionTab>
    <AccordionTab>
      <template #header>
        Imposta uno Stato Evento
      </template>
      <FormBuilderSimple v-model="values" :elements="elements" :config="config"></FormBuilderSimple>
    </AccordionTab>
    <AccordionTab>
      <template #header>
        Storico Stati evento
      </template>
      <div class="mb-2" v-for="log in sidebarData.extendedProps.storicoStati" :key="log.id">
        In data: {{ formatDate(log.data_stato) }}, {{ log.utente || 'nome_utente' }} ha impostato lo stato in: {{
        log.stato || 'stato_titolo'
        }}
      </div>
      <!-- {{ sidebarData.extendedProps.storicoStati }} -->
    </AccordionTab>
  </Accordion>




</template>

<script setup>
import { ref, watch } from 'vue'
import FormBuilderSimple from '../FormBuilderSimple.vue';
import AxiosService from '@/axiosServices/AxiosService';
import { useToast } from 'primevue/usetoast';
// eslint-disable-next-line no-undef
const emit = defineEmits(['event_HideDetailEvent'])
const toast = useToast()

// eslint-disable-next-line no-undef
const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object
})

// PARTECIPAZIONE ALL'EVENTO
const confirmation = ref('')
function confirmParticipation(value) {
  confirmation.value = value
  toast.add({ severity: 'info', summary: value + " partecipazione all'evento", life: 3000 });
}


// RESET AND CLOSE SIDEBAR
function resetSidebar() {
  values.value = {}
  emit('event_HideSidebarEventi')
}

// SETUP FORM BUILDER - POST STATO EVENTO
watch(() => props.sidebarData, (first, second) => {
  console.log(
    "Watch props.selected function called with args:",
    first,
    second
  );
  elements.value[0].attr.options = second.statesOptions
});

const config = {
  rowGap: "20px",
  columnGap: "18px",
};

let values = ref({
});

const elements = ref([
  {
    id: 'stato',
    label: "Stato Evento",
    type: 'Dropdown',
    attr: {
      options: [],
      optionLabel: 'text',
      // optionValue: 'id',
      placeholder: 'Seleziona uno stato...'
    },
    size: [12, 12, 12],
  },
  {
    id: 'nota',
    label: "Nota Evento",
    type: 'Textarea',
    attr: {
      rows: 5,
      cols: 30,
      'v-model': values
    },
    size: [12, 12, 12],
  },
  {
    id: "formButton",
    type: "Button",
    size: [12, 12, 12],
    align: "end",
    newLine: true,
    attr: {
      label: "Salva",
      icon: "pi pi-check",
      iconPos: "right",
    },
    events: {
      click: save,
    },
  },
])

// POST NEW STATE
const servicePOST = new AxiosService('Calendar/InsertStato')
function save() {
  const obj = {
    "id_evento": props.sidebarData.id,
    "id_utente": 99,
    "utente": "test",
    "id_stato": values.value.stato.value,
    "stato": values.value.stato.text,
    "nota": values.value.nota,
    "data_stato": new Date()
  }
  servicePOST.create(obj)
    .then(res => {
      console.log(res)
    })
}

// FORMAT DATE IN ITALIAN FORMAT
function formatDate(value) {
  if (value) {
    return new Date(value).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
  return ''
}

// GET HOUR AND MINUTES FROM DATA
function getTime(date) {
  if (date) {
    function padTo2Digits(num) {
      return String(num).padStart(2, '0');
    }
    return padTo2Digits(date.getHours()) + ':' + padTo2Digits(date.getMinutes())
  }
  return
}


</script>
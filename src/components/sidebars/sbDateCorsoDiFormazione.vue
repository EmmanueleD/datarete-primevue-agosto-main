<template>
  <div>
    <h1>Dettagli corso di Formazione</h1>
    <div class="grid mb-4 mt-4">
      <h2>Aggiungi sessione</h2>
      <div class="flex flex-column col-12 ">
        <label>Titolo</label>
        <InputText type="text" v-model="tempItem.titolo"></InputText>
      </div>

      <div class="flex flex-column col-12 ">
        <label>Descrizione</label>
        <InputText type="text" v-model="tempItem.descrizione"></InputText>
      </div>

      <div class="flex flex-column col-6 ">
        <label>Data inizio</label>
        <Calendar v-model="tempItem.data_inizio" :minDate="new Date()"></Calendar>
      </div>

      <div class="flex flex-column col-6 ">
        <label>Data fine</label>
        <Calendar v-model="tempItem.data_fine" :minDate="tempItem.data_inizio"></Calendar>
      </div>

      <div class="flex flex-column col-12">
        <label>Formatori</label>
        <Dropdown :filter="true" v-model="tempItem.formatori" :options="formatoriOptions" optionLabel="text">
        </Dropdown>
      </div>

      <div class="flex w-full justify-content-end mb-4 mt-4">
        <Button label="Aggiungi"></Button>
      </div>
    </div>
    <Divider class="mt-4 mb-4"></Divider>
    <div>
      <FullCalendar :options="options"></FullCalendar>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import '../../../node_modules/@fullcalendar/core/vdom'// solves problem with Vite
import FullCalendar from '@fullcalendar/vue3/dist/FullCalendar'
import dayGridPlugin from '../../../node_modules/@fullcalendar/daygrid'
import timeGridPlugin from '../../../node_modules/@fullcalendar/timegrid'
import interactionPlugin from '../../../node_modules/@fullcalendar/interaction'
import listPlugin from '../../../node_modules/@fullcalendar/list'
import bootstrap5Plugin from '../../../node_modules/@fullcalendar/bootstrap5';
// import CalendarSkeleton from '../../components/skeletons/CalendarSkeleton.vue'
import itLocale from '@fullcalendar/core/locales/it';


// eslint-disable-next-line no-undef
const props = defineProps({
  sidebarData: Object
})

const tempItem = ref({ ...props.sidebarData })

const formatoriOptions = ref([
  {
    value: 2,
    text: "Emmanuele Durante"
  },
  {
    value: 1,
    text: "Massimiliano Pighi"
  }
])

const options = ref({
  // datesSet: event => getEvents(event),
  plugins: [dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin, bootstrap5Plugin],
  themeSystem: "bootstrap5",
  headerToolbar: {

    right: 'dayGridMonth,timeGridWeek,timeGridDay listYear',
    center: 'title',
    left: 'prev,today,next'
  },
  lazyFetching: false,
  slotMinTime: '07:00',
  slotMaxTime: '22:00',
  slotDuration: '00:15:00',
  editable: true,
  height: 'auto',
  aspectRatio: 1,
  eventBackgroundColor: "#123123",
  eventBorderColor: "#ffffffff",
  events: [],
  initialView: 'dayGridMonth',
  eventDisplay: "auto",
  nowIndicator: true,
  locale: itLocale,

})


</script>
<script setup >
import { ref, reactive, watch } from 'vue'
import AxiosService from '@/axiosServices/AxiosService'
import { useToast } from 'primevue/usetoast'
import '../../node_modules/@fullcalendar/core/vdom'// solves problem with Vite
import FullCalendar from '@fullcalendar/vue3/dist/FullCalendar'
import dayGridPlugin from '../../node_modules/@fullcalendar/daygrid'
import timeGridPlugin from '../../node_modules/@fullcalendar/timegrid'
import interactionPlugin from '../../node_modules/@fullcalendar/interaction'
import listPlugin from '../../node_modules/@fullcalendar/list'
import bootstrap5Plugin from '../../node_modules/@fullcalendar/bootstrap5';
import CalendarSkeleton from './skeletons/CalendarSkeleton.vue';
import itLocale from '@fullcalendar/core/locales/it';
// eslint-disable-next-line no-undef
const props = defineProps({
  eventsEndpoint: String,
  initialView: String,
  callsToCalendar: Number,
  eventslist: Array,
  viewsOptions: String
})

// eslint-disable-next-line no-undef
const emit = defineEmits(['event_Calendar_ClickedEvent'])

const toast = useToast()

const clickedEventDetails = ref()

// CALENDAR OPTIONS
const calendarOptions = reactive(
  {
    plugins: [dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin, bootstrap5Plugin],
    themeSystem: "bootstrap5",
    headerToolbar: {

      // right: 'dayGridMonth,timeGridWeek,timeGridDay listYear',
      right: props.viewsOptions,
      center: 'title',
      left: 'prev,today,next'
    },
    slotMinTime: '07:00',
    slotMaxTime: '22:00',
    slotDuration: '00:15:00',
    editable: true,
    height: 'auto',
    aspectRatio: 1,
    eventBackgroundColor: "#123123",
    eventBorderColor: "#ffffffff",
    events: [],
    initialView: props.initialView,
    eventDisplay: "auto",
    nowIndicator: true,
    locale: itLocale,
    // dateClick: function (event) {
    //   console.log("event: ", event);
    // },
    eventClick: function (info) {
      clickedEventDetails.value = {};
      clickedEventDetails.value.allDay = info.event.allDay
      clickedEventDetails.value.allow = info.event.allow
      clickedEventDetails.value.backgroundColor = info.event.backgroundColor
      clickedEventDetails.value.borderColor = info.event.borderColor
      clickedEventDetails.value.classNames = info.event.classNames
      clickedEventDetails.value.constraint = info.event.constraint
      clickedEventDetails.value.display = info.event.display
      clickedEventDetails.value.durationEditable = info.event.durationEditable
      clickedEventDetails.value.end = info.event.end
      clickedEventDetails.value.endStr = info.event.endStr
      clickedEventDetails.value.extendedProps = info.event.extendedProps
      clickedEventDetails.value.groupId = info.event.groupId
      clickedEventDetails.value.id = info.event.id
      clickedEventDetails.value.overlap = info.event.overlap
      // clickedEventDetails.value.source = info.event.source
      clickedEventDetails.value.start = info.event.start
      clickedEventDetails.value.startEditable = info.event.startEditable
      clickedEventDetails.value.startStr = info.event.startStr
      clickedEventDetails.value.textColor = info.event.textColor
      clickedEventDetails.value.title = info.event.title
      clickedEventDetails.value.url = info.event.url
      emit('event_Calendar_ClickedEvent', clickedEventDetails.value)

    },
    // eventMouseEnter: function (info) {
    //   console.log("event mouse enter : ", info.event.title);
    // },
  }
)

// GET EVENTS
const serviceGET = new AxiosService(props.eventsEndpoint)
console.log("🚀 ~ file: CalendarBuilder.vue ~ line 92 ~ serviceGET", serviceGET.url)
function getEventi() {
  isLoading.value = true

  serviceGET.read()
    .then(res => {
      if (res) {
        calendarOptions.events.splice(0)
        calendarOptions.events = res

        toast.add(
          {
            severity: 'success',
            summary: 'Caricamento Eventi Completato',
            // detail: res,
            life: 3000
          }
        );
      }
    })
    .catch(error => {
      if (serviceGET.url != 'undefined/') {

        toast.add(
          {
            severity: 'error',
            summary: 'Errore nel caricamento degli Eventi',
            detail: error,
            life: 3000
          }
        );
      }

    })
    .finally(() => {
      isLoading.value = false
    })



}

watch(
  () => props.callsToCalendar,
  () => {
    getEventi()
  }
)

//MANAGE LOADING
const isLoading = ref(false)

// props.eventslist ? calendarOptions.events = props.eventslist : getEventi()

if (props.eventslist) {
  const eventList = JSON.parse(JSON.stringify(props.eventslist))
  calendarOptions.events = eventList
} else {
  getEventi()
}
</script>

<template>
  <Toast></Toast>


  <div v-if="isLoading">
    <CalendarSkeleton></CalendarSkeleton>
  </div>
  <FullCalendar v-else :options="calendarOptions"></FullCalendar>




</template>
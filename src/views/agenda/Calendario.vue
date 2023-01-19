<template>
  <Card class="mb-4">
    <template #content>
      <div class="flex justify-content-end">
        <MultiSelect :filter="true" optionLabel="text" optionValue="value" placeholder="Condividi calendario"
          :options="sidebarEventiData.userOptions" class="mr-4" v-model="userSelected"></MultiSelect>
        <Dropdown :filter="true" optionLabel="text" optionValue="value" placeholder="Visualizza condiviso"
          :options="users" class="mr-4"></Dropdown>
        <Button :loading="genLoading" @click="showSidebarEventi" label="Crea Evento"></Button>
      </div>
    </template>
  </Card>
  <Card>
    <template #content>
      <CalendarBuilder viewsOptions="dayGridMonth,timeGridWeek,timeGridDay listYear" :callsToCalendar="callsToCalendar"
        :eventsEndpoint="calendarEndpoint" initialView="dayGridMonth" @event_Calendar_ClickedEvent="showDetailsEvent">
      </CalendarBuilder>
    </template>
  </Card>
  <Sidebar v-model:visible="sidebarEventiVisible" :baseZIndex="10000" position="right" class="p-sidebar-md">
    <SidebarEventi @event_refreshEvents="refreshCalendar" :sidebarData="sidebarEventiData"></SidebarEventi>
  </Sidebar>

  <Sidebar v-model:visible="detailsEventVisible" :baseZIndex="10000" position="right" class="p-sidebar-md"
    @hide="$emit('event_HideDetailEvent')">

    <DetailsEvent :sidebarData="detailsEventData" @event_HideDetailEvent="hideDetailsEvent"></DetailsEvent>
  </Sidebar>

</template>


<script setup>
import {
  ref
} from 'vue'
import AxiosService from '@/axiosServices/AxiosService'
import CalendarBuilder from '../../components/CalendarBuilder.vue'
import SidebarEventi from '../../components/sidebars/SidebarEventi.vue'
import DetailsEvent from '../../components/sidebars/DetailsEvent.vue'
import { useStore } from 'vuex'

const store = useStore()
const id_user = store.state.user.user.id
const genLoading = ref(false)

const userSelected = ref([])

// SIDEBAR DETAILS EVENT
const detailsEventVisible = ref(false)
const detailsEventData = ref({
  statesOptions: []
})
async function showDetailsEvent(event) {

  //get states event options for SIDEBAR DETAILS EVENT
  const serviceGET_states = new AxiosService('Options/GetStatiEvento')
  await serviceGET_states.read()
    .then(res => {
      detailsEventData.value.statesOptions = res
    })

  detailsEventVisible.value = true
  detailsEventData.value = event
}
function hideDetailsEvent() {
  detailsEventVisible.value = false
}

const calendarEndpoint = ref('Calendar/GetEvents/')
function setCalendarEndpoint() {
  calendarEndpoint.value = 'Calendar/GetEvents/0/' + store.state.user.user.id
}
setCalendarEndpoint()
// SIDEBAR EDIT EVENT
const sidebarEventiVisible = ref(false)
const sidebarEventiData = ref({})
async function showSidebarEventi() {
  sidebarEventiVisible.value = true
}
function hideSidebarEventi() {
  sidebarEventiVisible.value = false
  sidebarEventiData.value = {}
}
const callsToCalendar = ref(0)
function refreshCalendar() {
  hideSidebarEventi()
  callsToCalendar.value++
}

const users = ref(null)
function getUsers() {
  const service = new AxiosService('Options/GetUsers')
  service.read()
    .then(res => {
      sidebarEventiData.value.userOptions = res
    })
}
getUsers()

// const sharedWithYouYou = ref([])
// function getsharedWithYouYou() {
//   const service = new AxiosService('Calendar/ShareWithList/' + id_user)
//   service.read()
//     .then(res => sharedWithYouYou.value = res)
// }
// getsharedWithYouYou()
// function showClickedEvent(event) {
//   sidebarEventiVisible.value = true
//   Object.assign(sidebarEventiData.value, event);
// }


</script>
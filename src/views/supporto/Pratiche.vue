<template>
  <div class="wrapper">
    <h1>Supporto Pratiche</h1>
    <Card class="mb-4">
      <template #content>
        <div class="flex justify-content-end">
          <Button @click="showPPTicket" label="Crea un nuovo Ticket"></Button>
        </div>
      </template>
    </Card>
    <Card>
      <template #content>
        <DataTable :value="data" :stripedRows="true" :paginator="true" :rows="10" :resizableColumns="true"
          :scroll="true" table-layout="auto" ref="dt">

          <Column header="DATA" field="data">
            <template #body="{ data }">
              {{ formatDate(data.data) }}
            </template>
          </Column>
          <Column header="ARGOMENTO" field="argomento_text">
            <template #body="{ data }">
              <Chip class="small-chip" :label="data.argomento_text"></Chip>
            </template>
          </Column>
          <Column header="TITOLO" field="titolo"></Column>
          <Column header="AUTORE" field="created_by_string"></Column>
          <Column header="STATO" field="status_text">
            <template #body="{ data }">
              <div class="flex flex-column align-items-center w-100">
                <i v-if="data.id_status == 0" style="color:dimgray" class="pi pi-fw pi-circle-fill"></i>
                <i v-if="data.id_status == 4" style="color:darkseagreen" class="pi pi-fw pi-circle-fill"></i>
                <i v-if="data.id_status == 3" style="color:gold" class="pi pi-fw pi-circle-fill"></i>
                <i v-if="data.id_status == 2" style="color:orangered" class="pi pi-fw pi-circle-fill"></i>
                <span style="font-size: .8rem">{{ data.status_text }}</span>
              </div>
            </template>
          </Column>
          <Column header="CHAT">
            <template #body="{ data }">
              <div class="flex flex-column align-items-center w-100">
                <i @click="showChat(data)" role="button" class="pi pi-fw pi-comment"></i>
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
  <Sidebar v-model:visible="chatVisible" :baseZIndex="10000" position="right" class="p-sidebar-md chat"
    @hide="hideSidebar">
    <template #header>

      <div class="flex justify-content-start align-items-center">
        <Avatar v-if="chatData.created_by_avatar" :image="chatData.created_by_avatar" size="large" class="mr-4">
        </Avatar>
        <Avatar v-else icon="pi pi-user" size="large" class="mr-4"></Avatar>
        <div class="flex flex-column justify-content-center">
          <h4 style="margin:0">{{ chatData.created_by_string }}</h4>
          <h5 style="margin:0">{{ chatData.titolo }}</h5>
        </div>
      </div>

    </template>
    <Chat :sidebarData="chatData"></Chat>
  </Sidebar>

  <Sidebar class="p-sidebar-md" @hide="hidePPTicket" v-model:visible="sidebarPPTicketVisible" :baseZIndex="10000"
    position="right">
    <PostPutTicket @hide_newTicket="hideNewTicket" :id_type="3"></PostPutTicket>
  </Sidebar>
</template>

<script setup>
import { ref } from 'vue';
import Chat from '@/components/sidebars/Chat.vue';
import AxiosService from '@/axiosServices/AxiosService';
import PostPutTicket from '../../components/sidebars/PostPutTicket.vue';

// SETUP AND MANAGE CHAT SIDEBAR
const chatVisible = ref(false)
const chatData = ref({})
function showChat(e) {
  chatData.value = e
  chatVisible.value = true
}
function hideSidebar() {
  data.value.splice(0)
  chatVisible.value = false
  getViewData()
}


// GET VIEW DATA
const data = ref([])
const serviceGET = new AxiosService('HelpDesk')
function getViewData() {
  data.value.splice(0)
  serviceGET.read()
    .then(res => {
      console.log("🚀 ~ file: IT.vue ~ line 78 ~ getViewData ~ res", res)
      // Supporto Pratiche - id_type == 3
      data.value = res.filter(x => x.id_type == 3)
    })
}


//POST PUT TICKET SIDEBAR
const sidebarPPTicketVisible = ref(false)

function showPPTicket() {
  sidebarPPTicketVisible.value = true
}

function hidePPTicket() {
  sidebarPPTicketVisible.value = false
}


// FORMAT DATA
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

function hideNewTicket() {
  sidebarPPTicketVisible.value = false
  getViewData()
}

getViewData()
</script>
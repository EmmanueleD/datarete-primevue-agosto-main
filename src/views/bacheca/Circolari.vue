<template>
  <ConfirmDialog></ConfirmDialog>
  <Toast></Toast>
  <div class="wrapper">
    <h1>Circolari</h1>

    <div v-if="contentLoading">
      <TableSkeleton></TableSkeleton>
    </div>

    <div v-else class="datatable-container">
      <div class="flex justify-content-between align-items-center mb-4">
        <Card v-if="inserimento" class="w-100">
          <template #content>
            <div class="w-100 flex justify-content-end align-items-center">
              <!-- <Menubar :model="config.menuItems" class="w-100">

                <template #end>
                  <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filtersObj['global'].value" placeholder="Cerca..." />
                  </span>
                </template>
              </Menubar> -->
              <Button
                @click="showNuovaCircolare"
                label="Nuova Circolare"
              ></Button>
            </div>
          </template>
        </Card>
      </div>

      <div>
        <Card>
          <template #content>
            <DataTable
              :value="data"
              :stripedRows="true"
              filterDisplay="menu"
              :paginator="true"
              :rows="10"
              :resizableColumns="true"
              :scrollable="true"
              table-layout="auto"
              ref="dt"
            >
              <template #header>
                <div style="text-align: right">
                  <Button
                    icon="pi pi-external-link"
                    label="Export"
                    @click="exportCSV($event)"
                  />
                </div>
              </template>
              <Column field="titolo" header="TITOLO">
                <template #body="{ data }">
                  {{ data.titolo }}
                </template>
              </Column>
              <Column field="argomento" header="ARGOMENTO">
                <template #body="{ data }">
                  {{ data.argomento }}
                </template>
              </Column>
              <Column field="priorita" header="PRIORITA">
                <template #body="{ data }">
                  <Tag
                    rounded
                    v-if="data.priorita == 0"
                    severity="success"
                    class="mr-2"
                    value="Bassa"
                  ></Tag>
                  <Tag
                    rounded
                    v-if="data.priorita == 1"
                    severity="info"
                    class="mr-2"
                    value="Normale"
                  ></Tag>
                  <Tag
                    rounded
                    v-if="data.priorita == 2"
                    severity="warning"
                    class="mr-2"
                    value="Alta"
                  ></Tag>
                  <Tag
                    rounded
                    v-if="data.priorita == 3"
                    severity="danger"
                    class="mr-2"
                    value="Urgente"
                  ></Tag>
                </template>
              </Column>
              <Column field="data" header="DATA">
                <template #body="{ data }">
                  {{ formatDate(data.dataPubblicazione) }}
                  {{ formatTime(data.dataPubblicazione) }}
                </template>
              </Column>
              <Column field="linkDocumento" header="DOCUMENTO">
                <template #body="{ data }">
                  <Button
                    v-if="data.urlFile.length != 0"
                    icon="pi pi-file"
                    @click="showDocumento(data)"
                    class="p-button-rounded p-button-text ml-4"
                  />
                </template>
              </Column>
              <Column field="azioni" header="AZIONI">
                <template #body="{ data }">
                  <Button
                    v-if="modifica"
                    icon="pi pi-fw pi-eye"
                    @click="showCircolari(data)"
                    class="p-button-rounded p-button-outlined"
                  ></Button>
                  <Button
                    v-if="modifica"
                    @click="showNuovaCircolare(data)"
                    icon="pi pi-fw pi-pencil"
                    class="p-button-rounded p-button-outlined ml-4"
                  ></Button>
                  <Button
                    v-if="eliminazione"
                    @click="confirmDelete(data)"
                    icon="pi pi-fw pi-trash"
                    class="p-button-rounded p-button-outlined p-button-danger ml-4"
                  ></Button>
                </template>
              </Column>
            </DataTable>
          </template>
        </Card>
      </div>
    </div>
  </div>
  <Dialog
    header="Visualizzatore documenti by ArkadiaGroup"
    v-model:visible="showDialogDocumento"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw', height: '60vh' }"
    :maximizable="true"
    :modal="true"
  >
    <iframe
      :src="currentCircolare.url"
      frameBorder="0"
      scrolling="auto"
      width="100%"
      height="95%"
    ></iframe>
    <div class="f-full flex justify-content-end">
      <Button
        @click="confermaLettura"
        :disabled="conferma.value"
        :icon="'pi ' + conferma.icon"
        label="Confermo lettura della circolare"
      ></Button>
    </div>
  </Dialog>
  <Sidebar
    v-model:visible="circolariVisible"
    :baseZIndex="10000"
    position="right"
    class="p-sidebar-md"
    @hide="$emit('event_HideCircolari')"
  >
    <CircolariViste :sidebarData="circolariData"></CircolariViste>
  </Sidebar>
  <Sidebar
    v-model:visible="nuovaCircolareVisible"
    :baseZIndex="10000"
    position="right"
    class="p-sidebar-md"
  >
    <NuovaCircolare
      @event_HideNuovaCircolare="event_HideNuovaCircolare"
      :sidebarData="nuovaCircolareData"
    >
    </NuovaCircolare>
  </Sidebar>
</template>

<script setup>
import { ref, computed } from "vue"
// import { FilterMatchMode, FilterOperator } from "primevue/api";
import { useStore } from "vuex"
import TableSkeleton from "../../components/skeletons/TableSkeleton.vue"
import CircolariViste from "@/components/sidebars/CircolariViste.vue"
import AxiosService from "@/axiosServices/AxiosService"
import NuovaCircolare from "@/components/sidebars/NuovaCircolare.vue"
import { AUTH_LOGOUT } from "@/store/actions/auth"
import { useConfirm } from "primevue/useconfirm"
import { useToast } from "primevue/usetoast"
const toast = useToast()
const confirm = useConfirm()

const store = useStore()

const visualizzazione = ref(false)
const modifica = ref(false)
const inserimento = ref(false)
const eliminazione = ref(false)

const contentLoading = computed(() => store.getters.contentLoading)

const serviceAuthPage = new AxiosService(
  "Authorizations/GetUserAuthorizationForComponent/2"
)
serviceAuthPage.read().then((res) => {
  if (res.validSession) {
    visualizzazione.value = res.visualizzazione
    modifica.value = res.modifica
    inserimento.value = res.inserimento
    eliminazione.value = res.eliminazione
  } else {
    logout()
  }
})

function logout() {
  const service = new AxiosService("Auth/Logout")
  service
    .create()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  this.$store.dispatch(AUTH_LOGOUT).then(() => {
    console.log("logout")
    this.$router.push("login")
  })
}

// GET LIST CIRCOLARI
const serviceGET = new AxiosService("Circolari/GetCircolari")
function getViewData() {
  data.value.splice(0)
  serviceGET
    .read()
    .then((res) => {
      data.value = res
    })
    .catch((err) => console.log(err))
}

// SIDEBAR NUOVA CIRCOLARE
const nuovaCircolareData = ref({})
const nuovaCircolareVisible = ref(false)
function showNuovaCircolare(event) {
  event ? (nuovaCircolareData.value = event) : null
  nuovaCircolareVisible.value = true
}

function event_HideNuovaCircolare() {
  nuovaCircolareVisible.value = false
  nuovaCircolareData.value = {}
  getViewData()
}

//SIDEBAR VISTE CIRCOLARE
const circolariVisible = ref(false)
const circolariData = ref({})
function showCircolari(event) {
  console.log(
    "🚀 ~ file: Circolari.vue ~ line 195 ~ showCircolari ~ event",
    event
  )
  circolariVisible.value = true
  circolariData.value = event
}

const dt = ref()
const exportCSV = () => {
  dt.value.exportCSV()
}

const data = ref([])

const currentCircolare = ref()
const showDialogDocumento = ref(false)
function showDocumento(circolare) {
  currentCircolare.value = { ...circolare }
  currentCircolare.value.url = ""
  currentCircolare.value.url =
    "https://prestitosi-core.datarete.cloud/" + circolare.urlFile
  showDialogDocumento.value = true
}

function formatDate(value) {
  if (value) {
    return new Date(value).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }
  return ""
}

function formatTime(value) {
  if (value) {
    return new Date(value).toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }
}

function confirmDelete(element) {
  confirm.require({
    message: 'Sei sicuro di voler eliminare "' + element.nome + '"',
    header: "Conferma Eliminazione",
    icon: "pi pi-fw pi-trash",
    acceptClass: "p-button-danger",
    accept: () => {
      deleteItem(element)
    },
    reject: () => {
      return
    },
  })
}

const serviceDELETE = new AxiosService("Circolari/DeleteCircolare")
function deleteItem(element) {
  serviceDELETE
    .delete(element.id)
    .then((res) => {
      if (res) {
        toast.add({
          severity: "success",
          summary: "Opzione Eliminata",
          detail: element.nome,
          life: 3000,
        })
        getViewData()
      }
    })
    .catch((error) => {
      toast.add({
        severity: "error",
        summary: "Errore nell'eliminazione dell'opzione'",
        detail: error,
        life: 3000,
      })
      getViewData()
    })
}

const conferma = ref({
  value: false,
  icon: "pi-eye",
})

function confermaLettura() {
  conferma.value.value = true
  conferma.value.icon = "pi-check"
  const service = new AxiosService("Circolari/LettaCircolare")
  service.update(currentCircolare.value)
}

getViewData()
</script>

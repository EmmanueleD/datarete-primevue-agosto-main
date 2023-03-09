<!-- eslint-disable vue/no-mutating-props -->
<template>
  <h4 v-if="item">Modifica Nota</h4>
  <h4 v-else>Nuova Nota</h4>
  <Accordion v-model:activeIndex="activeTab">
    <AccordionTab header="Apri Editor">
      <span
        class="flex flex-column justify-content-between align-items-center mb-4"
      >
        <FileUpload
          :disabled="files.length > 0"
          :fileLimit="1"
          @uploader="uploadFile"
          mode="basic"
          uploadIcon="pi pi-paperclip"
          name="demo[]"
          :customUpload="true"
          :previewWidth="50"
          :chooseLabel="
            files.length > 0 ? 'Documento Caricato' : 'Carica Documento'
          "
          :auto="true"
        />
      </span>
      <div class="flex flex-column mb-4">
        <label for="titolo">Titolo</label>
        <InputText id="titolo" type="text" v-model="tmpItem.oggetto" />
      </div>
      <div class="flex flex-column">
        <label for="editor">Dettaglio</label>
        <Editor
          id="editor"
          v-model="tmpItem.messaggio"
          editorStyle="height: 100px"
        >
          <template v-slot:toolbar>
            <span class="ql-formats">
              <button class="ql-bold" v-tooltip.bottom="'Bold'"></button>
              <button class="ql-italic" v-tooltip.bottom="'Italic'"></button>
              <button
                class="ql-underline"
                v-tooltip.bottom="'Underline'"
              ></button>
            </span>
          </template>
        </Editor>
      </div>

      <div class="flex justify-content-end">
        <Button
          @click="switchToView"
          class="mt-4 p-button-secondary mr-2"
          label="Annulla"
        ></Button>
        <Button
          :loading="loading"
          @click="salva"
          class="mt-4"
          label="Salva"
        ></Button>
      </div>
    </AccordionTab>
  </Accordion>
</template>

<script setup>
import { ref } from "vue"
import AxiosService from "@/axiosServices/AxiosService"
import { useRoute } from "vue-router"
import { useToast } from "primevue/usetoast"

// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({
  item: Object,
})

const activeTab = ref(null)

// eslint-disable-next-line no-undef
const emits = defineEmits(["switchToView", "reloadFeed"])

const route = useRoute()
const toast = useToast()

const tmpItem = ref({ ...props.item })

const isSending = ref(false)
const loading = ref(false)
const files = ref([])

function uploadFile(ev) {
  console.log("uploader, ", ev.files[0])
  const service = new AxiosService("files")
  if (!isSending.value) {
    isSending.value = true
    const formData = new FormData()
    formData.append("file", ev.files[0])
    service
      .postCustomEndpoint("Upload?type=" + "CRM_Note", "", formData)
      .then((res) => {
        if (res) {
          tmpItem.value.allegato = res
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        isSending.value = false
      })
  }
  return
}

const servicePOST = new AxiosService(
  "Crm/InsertCrmRecord/" + route.params.idAnagrafica
)
const servicePUT = new AxiosService("Crm/EditCrmRecord")
function salva() {
  loading.value = true
  if (tmpItem.value.id) {
    servicePUT
      .update(tmpItem.value)
      .then(() => {
        toast.add({
          severity: "success",
          summary: "Nota Modificata",
          // detail: res,
          life: 3000,
        })
      })
      .catch((err) => {
        toast.add({
          severity: "error",
          summary: "Errore nella modifica della Nota",
          detail: err,
          life: 3000,
        })
      })
      .finally(() => {
        resetForm()
        loading.value = false
        emits("reloadFeed")
        switchToView()
      })
  } else {
    tmpItem.value.data = new Date()
    tmpItem.value.id_type = 1
    servicePOST
      .create(tmpItem.value)
      .then(() => {
        toast.add({
          severity: "success",
          summary: "Nuova Nota Creata",
          // detail: res,
          life: 3000,
        })
      })
      .catch((err) => {
        toast.add({
          severity: "error",
          summary: "Errore nella creazione della Nota",
          detail: err,
          life: 3000,
        })
      })
      .finally(() => {
        resetForm()
        emits("reloadFeed")
        loading.value = false

        activeTab.value = null
      })
  }
}

function resetForm() {
  tmpItem.value = {}
}

function switchToView() {
  emits("switchToView")
}
</script>

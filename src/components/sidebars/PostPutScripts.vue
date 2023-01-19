<template>
  <Toast></Toast>
  <!-- {{ sidebarData }} -->
  <h1 v-if="tmpScript.id">Modifica opzione</h1>
  <h1 v-else>Nuova opzione</h1>

  <div class="flex flex-column mb-4">
    <label for="nome">Nome</label>
    <InputText id="nome" type="text" v-model="tmpScript.titolo"></InputText>
  </div>
  <div>
    <Editor id="editor" v-model="tmpScript.testo" editorStyle="height: 500px">
      <template v-slot:toolbar>
        <span class="ql-formats">
          <button class="ql-bold" v-tooltip.bottom="'Bold'"></button>
          <button class="ql-italic" v-tooltip.bottom="'Italic'"></button>
          <button class="ql-underline" v-tooltip.bottom="'Underline'"></button>
        </span>
      </template>
    </Editor>
  </div>


  <div class="w-100 flex justify-content-end align-items-end col-12 col-md-2">
    <Button :loading="loading" label="Salva" @click="save"></Button>
  </div>
</template>
<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import { useToast } from 'primevue/usetoast'
import AxiosService from '@/axiosServices/AxiosService';

const emits = defineEmits(['event_HidePPScripts', 'event_refreshList'])

const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object
})

const toast = useToast()

const tmpScript = ref({ ...props.sidebarData.event })

const servicePOST = new AxiosService(props.sidebarData.view.endpointPOST)
const servicePUT = new AxiosService(props.sidebarData.view.endpointPUT)

const loading = ref(false)

function save() {
  loading.value = true
  if (tmpScript.value.id) {
    servicePUT.update(tmpScript.value)
      .then(res => {
        if (res) {
          toast.add({ severity: 'success', summary: 'Script Modificato', detail: props.sidebarData.event.nome, life: 3000 });
          emits('event_refreshList')
          emits('event_HidePPScripts')
        }
      })
      .catch(error => {
        toast.add({ severity: 'error', summary: "'Errore nella modifica dello Script", detail: error, life: 3000 });
        emits('event_refreshList')
        emits('event_HidePPScripts')
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    servicePOST.create(tmpScript.value)
      .then(res => {
        if (res) {
          toast.add({ severity: 'success', summary: 'Nuovo Script Creato', detail: props.sidebarData.event.nome, life: 3000 });
          emits('event_refreshList')
          emits('event_HidePPScripts')
        }
      })
      .catch(error => {
        toast.add({ severity: 'error', summary: "'Errore nella creazione dello Script", detail: error, life: 3000 });
        emits('event_refreshList')
        emits('event_HidePPScripts')
      })
      .finally(() => {
        loading.value = false
      })
  }
}

// OPTIONALS
const serviceGETMenu = new AxiosService('GetMainMenuSet/' + props.sidebarData.event.id)
const mainMenu = ref()
function getMainMenu() {
  serviceGETMenu.read()
    .then(res => {
      mainMenu.value = res
      console.log("🚀 ~ file: OptionsManager.vue ~ line 88 ~ getMainMenu ~ res", res)
    })
}
props.sidebarData.event.optionName == 'Gestione Livelli Login' ? getMainMenu() : null
</script>
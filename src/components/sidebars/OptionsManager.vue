<template>
  <Toast></Toast>
  <!-- {{ sidebarData }} -->
  <h1 v-if="sidebarData.event.id">Modifica opzione</h1>
  <h1 v-else>Nuova opzione</h1>

  <div class="flex flex-column col-12 col-md-5">
    <label for="nome">Nome</label>
    <InputText id="nome" type="text" v-model="sidebarData.event.nome"></InputText>
  </div>
  <!-- optionals -->
  <div v-if="sidebarData.event.regionsOptions" class="flex flex-column col-12 col-md-5">
    <label for="region-filter">Nazione</label>
    <Dropdown :filter="true" id="region-filter" :showClear="true" :options="sidebarData.event.regionsOptions"
      v-model="sidebarData.event.id_regione" optionValue="id" optionLabel="nome" placeholder="Seleziona un'opzione">
    </Dropdown>
    <label for="sigla">Sigla</label>
    <InputText type="text" v-model="sidebarData.event.sigla"></InputText>
  </div>
  <div v-if="sidebarData.event.nationOptions" class="flex flex-column col-12 col-md-5">
    <label for="nation-filter">Nazione</label>
    <Dropdown :filter="true" id="nation-filter" :showClear="true" :options="sidebarData.event.nationOptions"
      v-model="sidebarData.event.id_nazione" optionValue="id" optionLabel="nome" placeholder="Seleziona un'opzione">
    </Dropdown>
  </div>
  <div class="gestione-livelli-login mt-4"
    v-if="sidebarData.event.optionName == 'Gestione Livelli Login' && sidebarData.event.id && mainMenu">
    <Accordion>
      <AccordionTab header="Gestisci l'accesso al menu">
        <MenuCheckboxes :menu="mainMenu" :id="sidebarData.event.id"></MenuCheckboxes>
      </AccordionTab>
      <AccordionTab header="Gestisci i privilegi nei componenti">
        <GestionePrivilegiComponenti @hideGestionePrivilegi="hideGestionePrivilegi" :id="sidebarData.event.id">
        </GestionePrivilegiComponenti>
      </AccordionTab>
    </Accordion>

  </div>
  <div class="w-100 flex justify-content-end align-items-end col-12 col-md-2 mt-4">
    <Button label="Salva" @click="save"></Button>
  </div>
</template>
<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import { useToast } from 'primevue/usetoast'
import AxiosService from '@/axiosServices/AxiosService';
import MenuCheckboxes from '../MenuCheckboxes.vue';
import GestionePrivilegiComponenti from '../GestionePrivilegiComponenti.vue';

const emits = defineEmits(['event_HideOptionsManager', 'event_refreshList'])

const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object
})

const toast = useToast()
const servicePOST = new AxiosService(props.sidebarData.view.endpointPOST)
const servicePUT = new AxiosService(props.sidebarData.view.endpointPUT)

function save() {
  if (props.sidebarData.event.id) {
    servicePUT.update(props.sidebarData.event)
      .then(res => {
        if (res) {
          toast.add({ severity: 'success', summary: 'Nuova Opzione Creata', detail: props.sidebarData.event.nome, life: 3000 });
          emits('event_refreshList')
          emits('event_HideOptionsManager')
        }
      })
      .catch(error => {
        toast.add({ severity: 'error', summary: "'Errore nella modifica dell'opzione", detail: error, life: 3000 });
        emits('event_refreshList')
        emits('event_HideOptionsManager')
      })
  } else {
    servicePOST.create(props.sidebarData.event)
      .then(res => {
        if (res) {
          toast.add({ severity: 'success', summary: 'Nuova Opzione Creata', detail: props.sidebarData.event.nome, life: 3000 });
          emits('event_refreshList')
          emits('event_HideOptionsManager')
        }
      })
      .catch(error => {
        toast.add({ severity: 'error', summary: "'Errore nella creazione dell'opzione", detail: error, life: 3000 });
        emits('event_refreshList')
        emits('event_HideOptionsManager')
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

function hideGestionePrivilegi() {
  emits('event_HideOptionsManager')
}
</script>
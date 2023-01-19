<template>
  <Toast></Toast>
  <!-- {{ sidebarData }} -->
  <h1 v-if="tmpItem.id">Modifica Oggetto</h1>
  <h1 v-else>Nuovo Oggetto</h1>

  <div v-if="loading">
    <SimpleFormSkeleton></SimpleFormSkeleton>
  </div>
  <div v-else>
    <div class="flex flex-column mb-4">
      <label for="nome">Nome</label>
      <InputText id="nome" type="text" v-model="tmpItem.nome"></InputText>
    </div>
    <div class="flex flex-column mb-4">
      <label>Categoria</label>
      <Dropdown :filter="true" :options="categorieOptions" optionLabel="text" optionValue="value"
        v-model="tmpItem.categoria">
      </Dropdown>
    </div>
    <div class="flex flex-column mb-4">
      <label>Codice</label>
      <InputText v-model="tmpItem.codice"></InputText>
    </div>
    <div class="flex flex-column mb-4">
      <label>Sede</label>
      <Dropdown :filter="true" :options="sediOptions" optionLabel="nome" optionValue="id" v-model="tmpItem.sede">
      </Dropdown>
    </div>
    <div class="flex flex-column mb-4">
      <label>Quantità</label>
      <InputNumber id="nome" type="number" v-model="tmpItem.n_items"></InputNumber>
    </div>
    <div class="w-100 flex justify-content-end align-items-end col-12 col-md-2">
      <Button :loading="loading" label="Salva" @click="save"></Button>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import { useToast } from 'primevue/usetoast'
import AxiosService from '@/axiosServices/AxiosService';
import SimpleFormSkeleton from '../skeletons/SimpleFormSkeleton.vue';

const emits = defineEmits(['event_HidePPinventario', 'event_refreshList'])

const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object
})

const toast = useToast()

const tmpItem = ref({ ...props.sidebarData.event })

// const servicePOST = new AxiosService(props.sidebarData.view.endpointPOST)
// const servicePUT = new AxiosService(props.sidebarData.view.endpointPUT)

const loading = ref(true)

function save() {
  // loading.value = true
  // if (tmpItem.value.id) {
  //   servicePUT.update(tmpItem.value)
  //     .then(res => {
  //       if (res) {
  //         toast.add({ severity: 'success', summary: 'Script Modificato', detail: props.sidebarData.event.nome, life: 3000 });
  //         emits('event_refreshList')
  //         emits('event_HidePPScripts')
  //       }
  //     })
  //     .catch(error => {
  //       toast.add({ severity: 'error', summary: "'Errore nella modifica dello Script", detail: error, life: 3000 });
  //       emits('event_refreshList')
  //       emits('event_HidePPScripts')
  //     })
  //     .finally(() => {
  //       loading.value = false
  //     })
  // } else {
  //   servicePOST.create(tmpItem.value)
  //     .then(res => {
  //       if (res) {
  //         toast.add({ severity: 'success', summary: 'Nuovo Script Creato', detail: props.sidebarData.event.nome, life: 3000 });
  //         emits('event_refreshList')
  //         emits('event_HidePPScripts')
  //       }
  //     })
  //     .catch(error => {
  //       toast.add({ severity: 'error', summary: "'Errore nella creazione dello Script", detail: error, life: 3000 });
  //       emits('event_refreshList')
  //       emits('event_HidePPScripts')
  //     })
  //     .finally(() => {
  //       loading.value = false
  //     })
  // }
}

const categorieOptions = ref([
  {
    text: 'informatica',
    value: 1
  },
  {
    text: 'Utili Cucina',
    value: 2
  },
  {
    text: 'Cancelleria',
    value: 3
  }
])
// function getCategorie() {
//   loading.value = true
//   const service = new AxiosService('Options/TipiProdotto')
//   service.read().then(res => categorieOptions.value = res).catch(err => console.log(err)).finally(() => loading.value = false)
// }

const sediOptions = ref([])
function getSedi() {
  loading.value = true
  const service = new AxiosService('Gestione/SediAzienda/GetSedi')
  service.read().then(res => sediOptions.value = res).catch(err => console.log(err)).finally(() => loading.value = false)
}

// getCategorie()
getSedi()
</script>
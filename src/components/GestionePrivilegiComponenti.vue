<template>
  <div>
    <div v-if="authorizations">
      <div id="componente" v-for="componente of authorizations" :key="componente.id">
        <h5 class="mb-4">{{ componente.nome_componente }}</h5>

        <div class="flex justify-content-between mr-4 mb-4">
          <Dropdown :filter="true" class="w-full mb-2" placeholder="Tipo di visualizzazione"
            :options="tipoVisualizzazioneOptions" optionLabel="text" optionValue="text"
            v-model="componente.tipo_visualizzazione"></Dropdown>

          <MultiSelect :filter="true" class="w-full ml-4 " placeholder="Tipo di accesso" :options="tipoAccessoOptions"
            optionLabel="text" optionValue="text" v-model="componente.tipo_accesso"></MultiSelect>
        </div>

      </div>
      <div class="flex justify-content-end">
        <Button :loading="loading" @click="save" label="Salva i privilegi dei componenti"></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import AxiosService from '@/axiosServices/AxiosService';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue'

// eslint-disable-next-line no-undef
const props = defineProps({
  id: Number
})
// eslint-disable-next-line no-undef
const emits = defineEmits(['hideGestionePrivilegi'])
const loading = ref(false)
const toast = useToast()

const authorizations = ref([])

const serviceGET = new AxiosService('Authorizations/GetAuthorizations/' + props.id)
function getAuthorizations() {
  serviceGET.read()
    .then(res => {
      res.map(x => {
        x.tipo_accesso
          ? x.tipo_accesso = x.tipo_accesso.split(',')
          : x.tipo_accesso = ''
      })
      authorizations.value = res
    })
}

const tipoVisualizzazioneOptions = [
  {
    value: 1,
    text: 'Completa'
  },
  {
    value: 2,
    text: 'Personale'
  },
  {
    value: 3,
    text: 'Di gruppo'
  }
]

const tipoAccessoOptions = [
  {
    value: 1,
    text: 'Visualizzazione'
  },
  {
    value: 2,
    text: 'Inserimento'
  },
  {
    value: 3,
    text: 'Modifica'
  },
  {
    value: 4,
    text: 'Eliminazione'
  }
]

function save() {
  loading.value = true
  const servicePUT = new AxiosService('Authorizations/SetAuthorizations')

  let arrayForPut = JSON.parse(JSON.stringify(authorizations.value))

  arrayForPut.map(componente => {
    componente.tipo_accesso
      ? componente.tipo_accesso = componente.tipo_accesso.join(',')
      : ''
  })

  servicePUT.updateWithoutId('Authorizations/SetAuthorizations/' + props.id, arrayForPut)
    .then(() => {
      toast.add(
        {
          severity: 'success',
          summary: 'Impostazioni salvate',
          // detail: res,
          life: 3000
        }
      );
    })
    .catch(err => {
      toast.add(
        {
          severity: 'error',
          summary: 'Errore nel salvataggio delle impostazioni',
          detail: err,
          life: 3000
        }
      );
    })
    .finally(() => {
      loading.value = false
      emits('hideGestionePrivilegi')
    })
}


getAuthorizations()
</script>
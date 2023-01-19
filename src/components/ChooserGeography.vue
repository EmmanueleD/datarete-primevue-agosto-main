<template>
  <div class="flex flex-wrap justify-content-between w-full p-3">
    <div class="flex flex-column align-items-start flex-grow " style="min-width:20%">
      <label for="nazione">Nazione</label>
      <div class="flex align-items-center w-full mr-2">
        <Dropdown :filter="true" class="w-full mr-4" @change="getRegioni(nazioneSelected.id)" id="nazione"
          v-model="nazioneSelected" :options="nazioneOptions" optionLabel="nome" placeholder="Seleziona la Nazione">
        </Dropdown>
      </div>
    </div>
    <div class="flex flex-column align-items-start flex-grow " style="min-width:20%">
      <label for="regione">Regione</label>
      <div class="flex align-items-center w-full mr-2">
        <Dropdown :filter="true" class="w-full mr-4" @change="getProvince(regioneSelected.id)" id="regione"
          v-model="regioneSelected" :options="regioneOptions" optionLabel="nome" placeholder="Seleziona la Regione">
        </Dropdown>

      </div>
    </div>
    <div class="flex flex-column align-items-start flex-grow " style="min-width:20%">
      <label for="provincia">Provincia</label>
      <div class="flex align-items-center w-full mr-2">
        <Dropdown :filter="true" class="w-full mr-4" @change="getCitta(provinciaSelected.id)" id="provincia"
          v-model="provinciaSelected" :options="provinciaOptions" optionLabel="nome"
          placeholder="Seleziona la Provincia">
        </Dropdown>

      </div>
    </div>
    <div class="flex flex-column align-items-start flex-grow " style="min-width:20%">
      <label for="citta">Città</label>
      <div class="flex align-items-center w-full mr-2">
        <Dropdown :filter="true" class="w-full mr-4" @change="emitGeoFilter" id="citta" v-model="cittaSelected"
          :options="cittaOptions" optionLabel="nome" placeholder="Seleziona la Città"></Dropdown>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AxiosService from '@/axiosServices/AxiosService';

// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({
  nazioneSelected: Number,
  regioneSelected: Number,
  provinciaSelected: Number,
  cittaSelected: Number
})


// eslint-disable-next-line no-undef
const emit = defineEmits(['event_geoFilter'])

const isSetup = ref(true)

const nazioneSelected = ref(undefined)
const nazioneOptions = ref([])

// GET NAZIONI
async function getNazioni() {

  isSetup.value ? console.log('is Setup Nat') : restartResetField('nazioni')

  const serviceGET = new AxiosService('Options/Geographic/GetNazioni')
  await serviceGET.read()
    .then(async res => {
      nazioneOptions.value = res
      isSetup.value
        ? nazioneSelected.value = nazioneOptions.value.filter(x => x.id == props.nazioneSelected)[0]
        : console.log('not isSetup')

      if (nazioneSelected.value) {
        await getRegioni(nazioneSelected.value.id)
      }
    })
    .catch(error => console.log(error))
}

// GET REGIONI
const regioneSelected = ref(undefined)
const regioneOptions = ref([])
async function getRegioni(idNazione) {

  isSetup.value ? console.log('is Setup Reg') : restartResetField('regioni')
  const serviceGET = new AxiosService('Options/Geographic/GetRegioni/' + idNazione)
  await serviceGET.read()
    .then(async res => {
      regioneOptions.value = res
      isSetup.value
        ? regioneSelected.value = regioneOptions.value.filter(x => x.id == props.regioneSelected)[0]
        : console.log('not isSetup')

      if (regioneSelected.value) {
        await getProvince(regioneSelected.value.id)
      }
    })
    .catch(error => console.log('getRegioni', error))

}

// GET PRIOVINCIA
const provinciaSelected = ref(props.provinciaSelected)
const provinciaOptions = ref([])
async function getProvince(idRegione) {

  isSetup.value ? console.log('is Setup Pro') : restartResetField('provincia')

  const serviceGET = new AxiosService('Options/Geographic/GetProvince/' + idRegione)
  await serviceGET.read()
    .then(async res => {
      provinciaOptions.value = res
      isSetup.value
        ? provinciaSelected.value = provinciaOptions.value.filter(x => x.id == props.provinciaSelected)[0]
        : console.log('not isSetup')

      if (provinciaSelected.value) {
        await getCitta(provinciaSelected.value.id)
      }
    })
    .catch(error => console.log(error))
}

const cittaSelected = ref(props.cittaSelected)
const cittaOptions = ref([])
async function getCitta(idProvincia) {
  const serviceGET = new AxiosService('Options/Geographic/GetCitta/' + idProvincia)
  await serviceGET.read()
    .then(res => {
      cittaOptions.value = res

      isSetup.value
        ? cittaSelected.value = cittaOptions.value.filter(x => x.id == props.cittaSelected)[0]
        : console.log('not isSetup')

    })
    .catch(error => console.log(error))
    .finally(() => {
      isSetup.value = false
    })
}

function emitGeoFilter() {
  emit('event_geoFilter', {
    idNazione: nazioneSelected.value ? nazioneSelected.value.id : 0,
    idRegione: regioneSelected.value ? regioneSelected.value.id : 0,
    idProvincia: provinciaSelected.value ? provinciaSelected.value.id : 0,
    idCitta: cittaSelected.value ? cittaSelected.value.id : 0,
    Regione: regioneSelected.value ? regioneSelected.value.nome : 0,
    Provincia: provinciaSelected.value ? provinciaSelected.value.nome : 0,
    Citta: cittaSelected.value ? cittaSelected.value.nome : 0
  })
}

function restartResetField(scope) {
  console.log('is reset ', scope)
  switch (scope) {
    case 'nazioni':
      nazioneOptions.value.splice(0)
      nazioneSelected.value = null
      regioneOptions.value.splice(0)
      regioneSelected.value = null
      provinciaOptions.value.splice(0)
      provinciaSelected.value = null
      cittaOptions.value.splice(0)
      cittaSelected.value = null
      emitGeoFilter()
      break
    case 'regioni':
      regioneOptions.value.splice(0)
      regioneSelected.value = null
      provinciaOptions.value.splice(0)
      provinciaSelected.value = null
      cittaOptions.value.splice(0)
      cittaSelected.value = null
      emitGeoFilter()
      break
    case 'provincia':
      provinciaOptions.value.splice(0)
      provinciaSelected.value = null
      cittaOptions.value.splice(0)
      cittaSelected.value = null
      emitGeoFilter()
      break
    case 'citta':
      cittaOptions.value.splice(0)
      cittaSelected.value = null
      emitGeoFilter()
      break
  }

}

async function setupComponent() {
  await getNazioni()
}


setupComponent()
</script>
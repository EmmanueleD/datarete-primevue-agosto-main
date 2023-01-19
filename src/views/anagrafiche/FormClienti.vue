<template>
  <div class="wrapper">
    <h1>Anagrafica Clienti</h1>
    <Card class="mb-4">
      <template #title>Dati Anagrafici</template>
      <template #content>
        <div class="grid p-input-filled form-group">

          <div class="flex flex-column col-12 col-md-4">
            <label for="first-name">Nome</label>
            <InputText id="first-name" type="text" v-model="anagraficaClienti.nome" />
          </div>
          <div class="flex flex-column col-12 col-md-4">
            <label for="last-name">Cognome</label>
            <InputText id="last-name" type="text" v-model="anagraficaClienti.cognome" />
          </div>
          <div class="flex flex-column col-12 col-md-4">
            <label for="codice-fiscale">Codice Fiscale</label>
            <InputText id="codice-fiscale" type="text" v-model="anagraficaClienti.codiceFiscale" />
          </div>
          <div class="flex flex-column col-12 col-md-4">
            <label for="sex">Sesso</label>
            <Dropdown :filter="true" id="sex" :showClear="true" :options="options.sex"
              v-model="anagraficaClienti.idSesso" optionValue="value" optionLabel="text"
              placeholder="Seleziona un'opzione"></Dropdown>
          </div>
          <div class="flex flex-column col-12 col-md-4">
            <label for="birth-date">Data di nascita</label>
            <Calendar id="birth-date" v-model="anagraficaClienti.dataNascita" dateFormat="dd-mm-yy" />
          </div>
          <div class="flex flex-column col-12 col-md-4">
            <label for="citizenship">Cittadinanza</label>
            <InputText id="citizenship" type="text" v-model="anagraficaClienti.cittadinanza" />
          </div>
          <div class="flex flex-column col-6 col-md-3">
            <label for="birth-nation">Nazione Nascita</label>
            <Dropdown :filter="true" id="birth-nation" :showClear="true" :options="options.birthNation"
              optionLabel="nome" optionValue="id" placeholder="Seleziona un'opzione"
              v-model="anagraficaClienti.idNazioneNascita" @change="getRegions(anagraficaClienti.idNazioneNascita)">
            </Dropdown>
          </div>
          <div class="flex flex-column col-6 col-md-3">
            <label for="birth-region">Regione Nascita</label>
            <Dropdown :filter="true" id="birth-nation" :showClear="true" :options="options.birthRegion"
              optionLabel="nome" optionValue="id" emptyFilterMessage="Nessuna corrispondenza trovata"
              emptyMessage="Seleziona prima una nazione..." placeholder="Seleziona un'opzione"
              v-model="anagraficaClienti.idRegioneNascita" @change="getProvinces(anagraficaClienti.idRegioneNascita)"
              :filter="true">
            </Dropdown>
          </div>
          <div class="flex flex-column col-6 col-md-3">
            <label for="birth-province">Provincia Nascita</label>
            <Dropdown :filter="true" id="birth-province" :showClear="true" :options="options.birthProvince"
              optionLabel="nome" optionValue="id" emptyFilterMessage="Nessuna corrispondenza trovata"
              emptyMessage="Seleziona prima una regione..." placeholder="Seleziona un'opzione"
              v-model="anagraficaClienti.idProvinciaNascita" @change="getCities(anagraficaClienti.idProvinciaNascita)"
              :filter="true">
            </Dropdown>
          </div>
          <div class="flex flex-column col-6 col-md-3">
            <label for="birth-city">Città Nascita</label>
            <Dropdown :filter="true" id="birth-city" :showClear="true" :options="options.birthCity" optionLabel="nome"
              optionValue="id" emptyFilterMessage="Nessuna corrispondenza trovata"
              emptyMessage="Seleziona prima una provincia..." placeholder="Seleziona un'opzione"
              v-model="anagraficaClienti.idCittaNascita" :filter="true"></Dropdown>
          </div>
          <div class="flex flex-column col-12 col-md-4">
            <label for="marital-status">Stato Civile</label>
            <Dropdown :filter="true" id="marital-status" :showClear="true" :options="options.maritalStatus"
              optionLabel="text" optionValue="value" placeholder="Seleziona un'opzione"
              v-model="anagraficaClienti.idStatoCivile">
            </Dropdown>
          </div>
          <div class="flex flex-column col-12 col-md-4">
            <label for="job-activity-type">Tipo Occupazione</label>
            <Dropdown :filter="true" id="job-activity-type" :showClear="true" :options="options.jobActivityType"
              optionLabel="text" optionValue="value" placeholder="Seleziona un'opzione"
              v-model="anagraficaClienti.idTipoOccupazione">
            </Dropdown>
          </div>
          <div class="flex flex-column col-12 col-md-4">
            <label for="job">Professione</label>
            <InputText id="job" type="text" v-model="anagraficaClienti.professione" />
          </div>
          <div class="flex flex-column col-12 col-md-4">
            <label for="contract-date">Data di assunzione</label>
            <Calendar id="contract-date" v-model="anagraficaClienti.dataAssunzione" dateFormat="dd-mm-yy" />
          </div>
          <div class="flex flex-column col-12 col-md-4">
            <label for="expiration-date">Data di scadenza contratto</label>
            <Calendar :disabled="anagraficaClienti.contrattoIndeterminato" id="expiration-date"
              v-model="anagraficaClienti.dataScadenzaContratto" dateFormat="dd-mm-yy" />
            <div class="flex align-items-center">
              <Checkbox inputId="undetermined" v-model="anagraficaClienti.contrattoIndeterminato" :binary="true"
                @change="resetExpirationDate" />
              <label for="undetermined" style="margin:  1rem">Indeterminato</label>
            </div>
          </div>
          <div class="flex flex-column col-12 col-md-4">
            <label for="enterprise-name">Nome Azienda</label>
            <InputText id="enterprise-name" type="text" v-model="anagraficaClienti.nomeAzienda" />
          </div>
          <div class="flex align-items-center col-12 col-md-4">
            <Checkbox inputId="undetermined" v-model="anagraficaClienti.personaPoliticamenteEsposta" :binary="true" />
            <label for="undetermined" style="margin:  1rem">Persona politicamente esposta</label>
          </div>
          <div class="flex align-items-center col-12 col-md-4">
            <Checkbox inputId="undetermined" v-model="anagraficaClienti.guidatoreAbituale" :binary="true" />
            <label for="undetermined" style="margin:  1rem">Guidatore abituale</label>
          </div>
        </div>



      </template>
    </Card>
    <Card class="mb-4">
      <template #title>Indirizzi</template>
      <template #content>
        <div class="flex justify-content-between " v-for="(item, index) of anagraficaClienti.indirizzi" :key="index">

          <div class="flex-grow-1  grid p-input-filled form-group" id="indirizzo">

            <div class="flex flex-column col-12 col-md-6">
              <label :for="'indirizzo-' + index">Indirizzo</label>
              <InputText :id="'indirizzo-' + index" type="text" v-model="item.indirizzo" />
            </div>
            <div class="flex flex-column col-12 col-md-6">
              <label :for="'n-civico-' + index">N. Civico</label>
              <InputText :id="'n-civico-' + index" type="text" v-model="item.numeroCivico" />
            </div>
            <div class="flex flex-column col-6 col-md-3">
              <label for="birth-nation">Nazione </label>
              <Dropdown :filter="true" id="birth-nation" :showClear="true" :options="options.birthNation"
                optionLabel="nome" optionValue="id" placeholder="Seleziona un'opzione"
                v-model="anagraficaClienti.idNazioneNascita" @change="getRegions(anagraficaClienti.idNazioneNascita)">
              </Dropdown>
            </div>
            <div class="flex flex-column col-6 col-md-3">
              <label for="birth-region">Regione </label>
              <Dropdown :filter="true" id="birth-nation" :showClear="true" :options="options.birthRegion"
                optionLabel="nome" optionValue="id" emptyFilterMessage="Nessuna corrispondenza trovata"
                emptyMessage="Seleziona prima una nazione..." placeholder="Seleziona un'opzione"
                v-model="anagraficaClienti.idRegioneNascita" @change="getProvinces(anagraficaClienti.idRegioneNascita)"
                :filter="true">
              </Dropdown>
            </div>
            <div class="flex flex-column col-6 col-md-3">
              <label for="birth-province">Provincia </label>
              <Dropdown :filter="true" id="birth-province" :showClear="true" :options="options.birthProvince"
                optionLabel="nome" optionValue="id" emptyFilterMessage="Nessuna corrispondenza trovata"
                emptyMessage="Seleziona prima una regione..." placeholder="Seleziona un'opzione"
                v-model="anagraficaClienti.idProvinciaNascita" @change="getCities(anagraficaClienti.idProvinciaNascita)"
                :filter="true">
              </Dropdown>
            </div>
            <div class="flex flex-column col-6 col-md-3">
              <label for="birth-city">Città </label>
              <Dropdown :filter="true" id="birth-city" :showClear="true" :options="options.birthCity" optionLabel="nome"
                optionValue="id" emptyFilterMessage="Nessuna corrispondenza trovata"
                emptyMessage="Seleziona prima una provincia..." placeholder="Seleziona un'opzione"
                v-model="anagraficaClienti.idCittaNascita" :filter="true"></Dropdown>
            </div>
          </div>
          <div class="  flex align-items-end justify-content-end pb-4" style="width: 50px">
            <i @click="anagraficaClienti.indirizzi.splice(index, 1)" role="button" class="pi pi-trash"
              style="font-size: 1.7rem"></i>

          </div>

        </div>
        <div class="flex justify-content-end pt-4">
          <span v-if="anagraficaClienti.indirizzi.length == 0">Inserisci un nuovo indirizzo </span><i
            @click="addRowIndirizzi" role="button" class=" pi pi-plus-circle pl-4" style="font-size: 1.7rem"></i>
        </div>
      </template>
    </Card>
    <Card class="mb-4">
      <template #title>Contatti</template>
      <template #content>
        <div class="flex justify-content-between " v-for="(item, index) of anagraficaClienti.contatti" :key="index">

          <div class="flex-grow-1  grid p-input-filled form-group" id="indirizzo">

            <div class="flex flex-column col-12 col-md-5">
              <label :for="'contatto-nome-' + index">Nome Contatto</label>
              <InputText :id="'contatto-nome-' + index" type="text" v-model="item.nome" />
            </div>
            <div class="flex flex-column col-12 col-md-5">
              <label :for="'contatto-valore-' + index">Contatto</label>
              <InputText :id="'contatto-valore-' + index" type="text" v-model="item.valore" />
            </div>
            <div class="flex justify-content-center align-items-end col-12 col-md-2">
              <Checkbox class="contatti" :disabled="item.principale" inputId="contatto-principale"
                v-model="item.principale" :binary="true" @change="checkOnlyOnePrincipale(index)" />
              <label class="ml-3" for="contatto-principale">Principale</label>
            </div>
          </div>
          <div class="  flex align-items-end justify-content-end pb-4" style="width: 50px">
            <i v-if="!item.principale" @click="anagraficaClienti.contatti.splice(index, 1)" role="button"
              class="pi pi-trash pb-1" style="font-size: 1.5rem"></i>
          </div>

        </div>
        <div class="flex justify-content-end pt-4">
          <span v-if="anagraficaClienti.contatti.length == 0">Inserisci un nuovo contatto </span>
          <i @click="addRowContatti" role="button" class=" pi pi-plus-circle pl-4" style="font-size: 1.7rem"></i>
        </div>
      </template>
    </Card>
    <Card class="mb-4">
      <template #title>Documenti</template>
      <template #content>
        <div class="flex justify-content-between " v-for="(item, index) of anagraficaClienti.documenti" :key="index">

          <div class="flex-grow-1  grid p-input-filled form-group" id="indirizzo">

            <div class="flex flex-column col-12 col-md-6">
              <label :for="'doc-numero-' + index">Numero</label>
              <InputText :id="'doc-numero-' + index" type="text" v-model="item.numero" />
            </div>
            <div class="flex flex-column col-12 col-md-6">
              <label :for="'doc-rilasciato-da-' + index">Rilasciato da</label>
              <InputText :id="'doc-rilasciato-da-' + index" type="text" v-model="item.rilasciatoDa" />
            </div>
          </div>
          <div class="  flex align-items-end justify-content-end pb-4" style="width: 50px">
            <i @click="anagraficaClienti.documenti.splice(index, 1)" role="button" class="pi pi-trash"
              style="font-size: 1.7rem"></i>

          </div>

        </div>
        <div class="flex justify-content-end pt-4">
          <span v-if="anagraficaClienti.documenti.length == 0">Inserisci un nuovo documento </span><i
            @click="addRowDocumenti" role="button" class=" pi pi-plus-circle pl-4" style="font-size: 1.7rem"></i>
        </div>
      </template>
    </Card>
    <Card>
      <template #content>
        <div class="flex justify-content-end mt-4">
          <Button label="Salva e invia" @click="SaveAndSendForm"></Button>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AxiosService from '../../axiosServices/AxiosService';

function checkOnlyOnePrincipale(index) {
  anagraficaClienti.value.contatti.forEach((element, i) => {
    if (i != index)
      element.principale = false
  })
}

function addRowDocumenti() {
  anagraficaClienti.value.documenti.push({
    id: 0,
    idTipoDocumento: 0,
    numero: null,
    rilasciatoDa: null,
    dataRilascio: null,
    dataScadenza: null,
    idProvinciaRilascio: 0,
    idCittaRilascio: 0
  })
}

function addRowContatti() {
  let object = {
    id: 0,
    idTipoContatto: 0,
    nome: null,
    valore: null,
    principale: false
  }
  if (!anagraficaClienti.value.contatti.length) {
    object.principale = true
  }
  anagraficaClienti.value.contatti.push(object)
}

function addRowIndirizzi() {
  anagraficaClienti.value.indirizzi.push({
    id: 0,
    idTipoIndirizzo: 0,
    indirizzo: "",
    numeroCivico: "",
    idNazione: 0,
    idRegione: 0,
    idProvincia: 0,
    idCitta: 0
  })
}

function SaveAndSendForm() {
  const service = new AxiosService('Anagrafiche/AddRetail')
  service.create(anagraficaClienti.value)
    .then(res => {
      if (res) {
        console.log("🚀 ~ file: Clienti.vue ~ line 141 ~ SaveAndSendForm ~ res", res)
      }
    })
}

function resetExpirationDate() {
  anagraficaClienti.value.dataScadenzaContratto = ''
}

function getSex() {
  const service = new AxiosService('GetSesso')
  service.getOptions('GetSesso')
    .then(res => {
      if (res) {
        options.value.sex.push(...res)
      }
    })
}
getSex()


function getMaritalStatus() {
  const service = new AxiosService('GetStatoCivile')
  service.getOptions('GetStatoCivile')
    .then(res => {
      if (res) {
        options.value.maritalStatus.push(...res)
      }
    })
}
getMaritalStatus()

function jobActivityType() {
  const service = new AxiosService('GetTipoOccupazione')
  service.getOptions('GetTipoOccupazione')
    .then(res => {
      if (res) {
        options.value.jobActivityType.push(...res)
      }
    })
}
jobActivityType()

function getNations() {
  const service = new AxiosService('Geographic/GetNazioni')
  service.getOptions('Geographic/GetNazioni')
    .then(res => {
      if (res) {
        options.value.birthNation.push(...res)
      }
    })
}
getNations()

function getRegions(idNation) {

  options.value.birthRegion.splice(0)
  options.value.birthProvince.splice(0)
  options.value.birthCity.splice(0)

  const service = new AxiosService('Geographic/GetProvince')
  service.getOptions('Geographic/GetRegioni/' + idNation)
    .then(res => {
      if (res) {
        options.value.birthRegion.push(...res)
      }
    })
}

function getProvinces(idRegion) {
  options.value.birthProvince.splice(0)
  options.value.birthCity.splice(0)

  const service = new AxiosService('Geographic/GetProvince')
  service.getOptions('Geographic/GetProvince/' + idRegion)
    .then(res => {
      if (res) {
        options.value.birthProvince.push(...res)
      }
    })
}

function getCities(idProvince) {
  options.value.birthCity.splice(0)

  const service = new AxiosService('Geographic/GetCitta')

  service.getOptions('Geographic/GetCitta/' + idProvince)
    .then(res => {
      if (res) {
        options.value.birthCity.push(...res)
      }
    })
}

const anagraficaClienti = ref({
  nome: '',
  cognome: '',
  codiceFiscale: '',
  idSesso: "",
  dataNascita: '',
  cittadinanza: '',
  idNazioneNascita: '',
  idRegioneNascita: '',
  idProvinciaNascita: '',
  idCittaNascita: '',
  idStatoCivile: '',
  idTipoOccupazione: '',
  professione: '',
  dataAssunzione: '',
  dataScadenzaContratto: '',
  contrattoIndeterminato: '',
  nomeAzienda: '',
  personaPoliticamenteEsposta: false,
  guidatoreAbituale: false,
  indirizzi: [],
  contatti: [],
  documenti: []
})

const options = ref({
  sex: [],
  birthNation: [],
  birthRegion: [],
  birthProvince: [],
  birthCity: [],
  maritalStatus: [],
  jobActivityType: []
})



</script>
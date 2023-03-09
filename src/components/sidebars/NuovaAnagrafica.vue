<template>
  <Toast></Toast>
  <div v-if="loading" class="grid-center w-full">
    <i class="pi pi-spin pi-spinner"></i>
  </div>
  <div v-else class="wrapper">
    <Card v-if="showAnagrafica" class="mb-4">
      <!-- <template #title>Dati Anagrafici</template> -->
      <template #content>
        <div class="grid p-input-filled form-group">
          <div class="flex flex-column col-12 col-lg-4">
            <label for="first-name">Origine</label>
            <Dropdown
              :filter="true"
              v-model="anagraficaClienti.idCampagna"
              :options="origineOptions"
              optionLabel="nome"
              optionValue="id"
            ></Dropdown>
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="first-name">Proprietario</label>
            <Dropdown
              :filter="true"
              v-model="anagraficaClienti.idProprietario"
              :options="proprietarioOptions"
              optionLabel="text"
              optionValue="value"
            >
            </Dropdown>
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="first-name">Commerciale</label>
            <Dropdown
              :filter="true"
              v-model="anagraficaClienti.idCommerciale"
              :options="commercialeOptions"
              optionLabel="text"
              optionValue="value"
            >
            </Dropdown>
          </div>
          <div class="flex flex-column col-12 col-lg-6">
            <label for="first-name">Nome</label>
            <InputText
              id="first-name"
              type="text"
              v-model="anagraficaClienti.nome"
            />
          </div>
          <div class="flex flex-column col-12 col-lg-6">
            <label for="last-name">Cognome</label>
            <InputText
              id="last-name"
              type="text"
              v-model="anagraficaClienti.cognome"
            />
          </div>
          <div class="flex flex-column col-12 col-lg-6">
            <label for="codice-fiscale">Codice Fiscale</label>
            <InputText
              id="codice-fiscale"
              type="text"
              v-model="anagraficaClienti.codiceFiscale"
            />
          </div>
          <div class="flex flex-column col-12 col-lg-6">
            <label for="email">Email</label>
            <InputText
              id="email"
              type="email"
              v-model="anagraficaClienti.email"
            />
          </div>

          <div class="flex flex-column col-12 col-lg-4">
            <label for="sex">Sesso</label>
            <Dropdown
              :filter="true"
              id="sex"
              :showClear="true"
              :options="options.sex"
              v-model="anagraficaClienti.idSesso"
              optionValue="value"
              optionLabel="text"
              placeholder="Seleziona un'opzione"
            ></Dropdown>
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="birth-date">Data di nascita</label>
            <Calendar id="birth-date" v-model="anagraficaClienti.dataNascita" />
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="citizenship">Cittadinanza</label>
            <InputText
              id="citizenship"
              type="text"
              v-model="anagraficaClienti.cittadinanza"
            />
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="citizenship">Luogo di Nascita</label>
            <InputText
              id="citizenship"
              type="text"
              v-model="anagraficaClienti.luogoNascita"
            />
          </div>

          <div class="flex flex-column col-12 col-lg-4">
            <label for="citizenship">Nazione</label>
            <InputText
              id="citizenship"
              type="text"
              v-model="anagraficaClienti.NazioneNascita"
            />
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="citizenship">Regione</label>
            <InputText
              id="citizenship"
              type="text"
              v-model="anagraficaClienti.RegioneNascita"
            />
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="citizenship">Provincia</label>
            <InputText
              id="citizenship"
              type="text"
              v-model="anagraficaClienti.ProvinciaNascita"
            />
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="citizenship">Città</label>
            <InputText
              id="citizenship"
              type="text"
              v-model="anagraficaClienti.CittaNascita"
            />
          </div>

          <!-- <ChooserGeography :nazioneSelected="anagraficaClienti.idNazioneNascita"
            :regioneSelected="anagraficaClienti.idRegioneNascita"
            :provinciaSelected="anagraficaClienti.idProvinciaNascita" :cittaSelected="anagraficaClienti.idCittaNascita"
            @event_geoFilter="populateTempItemFromGeoFilter($event, anagraficaClienti)"></ChooserGeography> -->

          <div class="flex flex-column col-12 col-lg-4">
            <label for="marital-status">Stato Civile</label>
            <Dropdown
              :filter="true"
              id="marital-status"
              :showClear="true"
              :options="options.maritalStatus"
              optionLabel="text"
              optionValue="value"
              placeholder="Seleziona un'opzione"
              v-model="anagraficaClienti.idStatoCivile"
            >
            </Dropdown>
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="job-activity-type">Tipo Occupazione</label>
            <Dropdown
              :filter="true"
              id="job-activity-type"
              :showClear="true"
              :options="options.jobActivityType"
              optionLabel="text"
              optionValue="value"
              placeholder="Seleziona un'opzione"
              v-model="anagraficaClienti.idTipoOccupazione"
            >
            </Dropdown>
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="job">Professione</label>
            <InputText
              id="job"
              type="text"
              v-model="anagraficaClienti.professione"
            />
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="contract-date">Data di assunzione</label>
            <Calendar
              id="contract-date"
              v-model="anagraficaClienti.dataAssunzione"
              dateFormat="dd-mm-yy"
            />
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="citizenship">Partita IVA</label>
            <InputText
              id="citizenship"
              type="text"
              v-model="anagraficaClienti.pIva"
            />
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="expiration-date">Data di scadenza contratto</label>
            <Calendar
              :disabled="anagraficaClienti.contrattoIndeterminato"
              id="expiration-date"
              v-model="anagraficaClienti.dataScadenzaContratto"
              dateFormat="dd-mm-yy"
            />
            <div class="flex align-items-center">
              <Checkbox
                inputId="undetermined"
                v-model="anagraficaClienti.contrattoIndeterminato"
                :binary="true"
                @change="resetExpirationDate"
              />
              <label for="undetermined" style="margin: 1rem"
                >Indeterminato</label
              >
            </div>
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="enterprise-name">Nome Azienda</label>
            <InputText
              id="enterprise-name"
              type="text"
              v-model="anagraficaClienti.nomeAzienda"
            />
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="enterprise-name">Origine Lead</label>
            <InputText
              id="enterprise-name"
              type="text"
              v-model="anagraficaClienti.ORIGINE_LEAD"
            />
          </div>
          <div class="flex align-items-center col-12 col-lg-4">
            <Checkbox
              inputId="undetermined"
              v-model="anagraficaClienti.personaPoliticamenteEsposta"
              :binary="true"
            />
            <label for="undetermined" style="margin: 1rem"
              >Persona politicamente esposta</label
            >
          </div>
          <div class="flex align-items-center col-12 col-lg-4">
            <Checkbox
              inputId="undetermined"
              v-model="anagraficaClienti.guidatoreAbituale"
              :binary="true"
            />
            <label for="undetermined" style="margin: 1rem"
              >Guidatore abituale</label
            >
          </div>

          <Divider></Divider>

          <div class="flex flex-column col-12 col-lg-4">
            <label for="enterprise-name">Importo Richiesto</label>
            <InputText
              id="enterprise-name"
              type="text"
              v-model="anagraficaClienti.importo_richiesto"
            />
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="enterprise-name">Montante</label>
            <InputText
              id="enterprise-name"
              type="text"
              v-model="anagraficaClienti.MONTANTE"
            />
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="enterprise-name">Rata</label>
            <InputText
              id="enterprise-name"
              type="text"
              v-model="anagraficaClienti.RATA"
            />
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="enterprise-name">Durata</label>
            <InputText
              id="enterprise-name"
              type="text"
              v-model="anagraficaClienti.DURATA"
            />
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="enterprise-name">Tipologia Prodotto</label>
            <InputText
              id="enterprise-name"
              type="text"
              v-model="anagraficaClienti.TIPOLOGIA_PRODOTTO"
            />
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="enterprise-name">Istituto</label>
            <InputText
              id="enterprise-name"
              type="text"
              v-model="anagraficaClienti.ISTITUTO"
            />
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="enterprise-name">Data Decorrenza</label>
            <Calendar v-model="anagraficaClienti.DATA_DECORRENZA"></Calendar>
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="enterprise-name">Data Possibile Rinnovo</label>
            <Calendar
              v-model="anagraficaClienti.DATA_POSSIBILE_RINNOVO"
            ></Calendar>
          </div>
          <div class="flex flex-column col-12 col-lg-4">
            <label for="enterprise-name">Data Prossimo Contatto</label>
            <Calendar
              v-model="anagraficaClienti.DATA_PROSSIMO_CONTATTO"
            ></Calendar>
          </div>
          <!-- <div class="flex flex-column col-12 col-lg-4">
            <label for="enterprise-name">Rata</label>
            <InputText id="enterprise-name" type="text" v-model="anagraficaClienti.importo_richiesto" />
          </div>

          <div class="flex flex-column col-12 col-lg-4">
            <label for="enterprise-name">Lorem</label>
            <InputText id="enterprise-name" type="text" v-model="anagraficaClienti.importo_richiesto" />
          </div>

          <div class="flex flex-column col-12 col-lg-4">
            <label for="enterprise-name">Lorem</label>
            <InputText id="enterprise-name" type="text" v-model="anagraficaClienti.importo_richiesto" />
          </div>

          <div class="flex flex-column col-12 col-lg-4">
            <label for="enterprise-name">Lorem</label>
            <InputText id="enterprise-name" type="text" v-model="anagraficaClienti.importo_richiesto" />
          </div>

          <div class="flex flex-column col-12 col-lg-4">
            <label for="enterprise-name">Lorem</label>
            <InputText id="enterprise-name" type="text" v-model="anagraficaClienti.importo_richiesto" />
          </div>

          <div class="flex flex-column col-12 col-lg-4">
            <label for="enterprise-name">Lorem</label>
            <InputText id="enterprise-name" type="text" v-model="anagraficaClienti.importo_richiesto" />
          </div>

          <div class="flex flex-column col-12 col-lg-4">
            <label for="enterprise-name">Lorem</label>
            <InputText id="enterprise-name" type="text" v-model="anagraficaClienti.importo_richiesto" />
          </div>

          <div class="flex flex-column col-12 col-lg-4">
            <label for="enterprise-name">Lorem</label>
            <InputText id="enterprise-name" type="text" v-model="anagraficaClienti.importo_richiesto" />
          </div>

          <div class="flex flex-column col-12 col-lg-4">
            <label for="enterprise-name">Lorem</label>
            <InputText id="enterprise-name" type="text" v-model="anagraficaClienti.importo_richiesto" />
          </div> -->
        </div>
      </template>
    </Card>
    <Card v-if="showIndirizzi" class="mb-4">
      <template #title>Indirizzi</template>
      <template #content>
        <div v-if="mode == 'edit'">
          <div
            class="flex justify-content-between"
            v-for="(item, index) of anagraficaClienti.indirizzi"
            :key="index"
          >
            <div
              class="flex-grow-1 grid p-input-filled form-group"
              id="indirizzo"
            >
              <div class="flex flex-column col-12">
                <label :for="'indirizzo-tipo-' + index">Tipo indirizzo</label>
                <Dropdown
                  :filter="true"
                  :options="tipiIndirizzoOptions"
                  optionLabel="text"
                  optionValue="value"
                  v-model="item.idTipoIndirizzo"
                ></Dropdown>
              </div>
              <div class="flex flex-column col-12 col-lg-6">
                <label :for="'indirizzo-' + index">Indirizzo</label>
                <InputText
                  :id="'indirizzo-' + index"
                  type="text"
                  v-model="item.indirizzo"
                />
              </div>
              <div class="flex flex-column col-12 col-lg-6">
                <label :for="'n-civico-' + index">N. Civico</label>
                <InputText
                  :id="'n-civico-' + index"
                  type="text"
                  v-model="item.numeroCivico"
                />
              </div>

              <div class="flex flex-column col-12 col-lg-4">
                <label for="citizenship">Nazione</label>
                <InputText
                  id="citizenship"
                  type="text"
                  v-model="item.Nazione"
                />
              </div>
              <div class="flex flex-column col-12 col-lg-4">
                <label for="citizenship">Regione</label>
                <InputText
                  id="citizenship"
                  type="text"
                  v-model="item.Regione"
                />
              </div>
              <div class="flex flex-column col-12 col-lg-4">
                <label for="citizenship">Provincia</label>
                <InputText
                  id="citizenship"
                  type="text"
                  v-model="item.Provincia"
                />
              </div>
              <div class="flex flex-column col-12 col-lg-4">
                <label for="citizenship">Città</label>
                <InputText id="citizenship" type="text" v-model="item.Citta" />
              </div>

              <!-- <ChooserGeography :nazioneSelected="item.idNazione" :regioneSelected="item.idRegione"
                :provinciaSelected="item.idProvincia" :cittaSelected="item.idCitta"
                @event_geoFilter="populateTempItemFromGeoFilter($event, item)"></ChooserGeography> -->
            </div>
            <div
              class="flex align-items-end justify-content-end pb-4"
              style="width: 50px"
            >
              <i
                @click="anagraficaClienti.indirizzi.splice(index, 1)"
                role="button"
                class="pi pi-trash"
                style="font-size: 1.7rem"
              ></i>
            </div>
          </div>
          <div class="flex justify-content-end pt-4">
            <span v-if="anagraficaClienti.indirizzi.length == 0"
              >Inserisci un nuovo indirizzo </span
            ><i
              @click="addRowIndirizzi"
              role="button"
              class="pi pi-plus-circle pl-4"
              style="font-size: 1.7rem"
            ></i>
          </div>
        </div>
        <div v-if="mode == 'view'">
          <div
            class="flex flex-column justify-content-between mb-4"
            v-for="(item, index) of anagraficaClienti.indirizzi"
            :key="index"
          >
            <p class="text-gray-400 mb-2 font-bold">{{ item.TipoIndirizzo }}</p>
            <p class="m-0">{{ item.indirizzo }} - {{ item.numeroCivico }}</p>
            <p>
              <span v-if="item.Nazione"> {{ item.Nazione }}</span>
              <span v-if="item.Regione">/ {{ item.Regione }}</span>
              <span v-if="item.Provincia">/ {{ item.Provincia }}</span>
              <span v-if="item.Citta">/ {{ item.Citta }}</span>
            </p>
          </div>
        </div>
      </template>
    </Card>
    <Card v-if="showContatti" class="mb-4">
      <template #title>Contatti</template>
      <template #content>
        <div v-if="mode == 'edit'">
          <div
            class="flex justify-content-between"
            v-for="(item, index) of anagraficaClienti.contatti"
            :key="index"
          >
            <div
              class="flex-grow-1 grid p-input-filled form-group"
              id="contatto"
            >
              <div class="flex flex-column col-12">
                <label :for="'contatto-tipo-' + index">TipoContatto </label>
                <Dropdown
                  :filter="true"
                  :options="tipiContattoOptions"
                  optionLabel="text"
                  optionValue="value"
                  v-model="item.idTipoContatto"
                ></Dropdown>
              </div>
              <div class="flex flex-column col-12 col-md-5">
                <label :for="'contatto-nome-' + index">Nome Contatto</label>
                <InputText
                  :id="'contatto-nome-' + index"
                  type="text"
                  v-model="item.nome"
                />
              </div>
              <div class="flex flex-column col-12 col-md-5">
                <label :for="'contatto-valore-' + index">Contatto</label>
                <InputText
                  :id="'contatto-valore-' + index"
                  type="text"
                  v-model="item.valore"
                />
              </div>
              <div
                class="flex justify-content-center align-items-end col-12 col-md-2"
              >
                <Checkbox
                  class="contatti"
                  :disabled="item.principale"
                  inputId="contatto-principale"
                  v-model="item.principale"
                  :binary="true"
                  @change="checkOnlyOnePrincipale(index)"
                />
                <label class="ml-3" for="contatto-principale">Principale</label>
              </div>
            </div>
            <div
              class="flex align-items-end justify-content-end pb-4"
              style="width: 50px"
            >
              <i
                v-if="!item.principale"
                @click="anagraficaClienti.contatti.splice(index, 1)"
                role="button"
                class="pi pi-trash pb-1"
                style="font-size: 1.5rem"
              ></i>
            </div>
          </div>
          <div class="flex justify-content-end pt-4">
            <span v-if="anagraficaClienti.contatti.length == 0"
              >Inserisci un nuovo contatto
            </span>
            <i
              @click="addRowContatti"
              role="button"
              class="pi pi-plus-circle pl-4"
              style="font-size: 1.7rem"
            ></i>
          </div>
        </div>
        <div v-if="mode == 'view'">
          <div
            class="flex flex-column justify-content-between mb-4"
            v-for="(item, index) of anagraficaClienti.contatti"
            :key="index"
          >
            <p class="text-gray-400 mb-2 font-bold">{{ item.TipoContatto }}</p>
            <p class="m-0">{{ item.nome }} - {{ item.valore }}</p>
          </div>
        </div>
      </template>
    </Card>
    <Card v-if="showDocumenti" class="mb-4">
      <template #title>Documenti</template>
      <template #content>
        <div v-if="mode == 'edit'">
          <div
            class="flex justify-content-between"
            v-for="(item, index) of anagraficaClienti.documenti"
            :key="index"
          >
            <div
              class="flex-grow-1 grid p-input-filled form-group"
              id="documento"
            >
              <div class="flex flex-column col-12">
                <label :for="'documento-tipo-' + index">Tipo documento</label>
                <Dropdown
                  :filter="true"
                  :options="tipidocumentoOptions"
                  optionLabel="text"
                  optionValue="value"
                  v-model="item.idTipoDocumento"
                ></Dropdown>
              </div>
              <div class="flex flex-column col-12 col-lg-6">
                <label :for="'doc-numero-' + index">Numero</label>
                <InputText
                  :id="'doc-numero-' + index"
                  type="text"
                  v-model="item.numero"
                />
              </div>
              <div class="flex flex-column col-12 col-lg-6">
                <label :for="'doc-rilasciato-da-' + index">Rilasciato da</label>
                <InputText
                  :id="'doc-rilasciato-da-' + index"
                  type="text"
                  v-model="item.rilasciatoDa"
                />
              </div>
              <div class="flex flex-column col-12 col-lg-6">
                <label>Data di Rilascio</label>
                <Calendar
                  v-model="item.dataRilascio"
                  :minDate="new Date()"
                ></Calendar>
              </div>
              <div class="flex flex-column col-12 col-lg-6">
                <label>Data di Scadenza</label>
                <Calendar
                  v-model="item.dataScadenza"
                  :minDate="new Date(item.dataRilascio) || new Date()"
                ></Calendar>
              </div>
              <div class="flex flex-column col-12">
                <FileUpload
                  @uploader="uploadFile"
                  mode="basic"
                  uploadIcon="pi pi-upload"
                  name="demo[]"
                  :customUpload="true"
                  :previewWidth="50"
                  chooseLabel="Carica Documento"
                  :auto="false"
                />
              </div>
            </div>
            <div
              class="flex align-items-end justify-content-end pb-4"
              style="width: 50px"
            >
              <i
                @click="anagraficaClienti.documenti.splice(index, 1)"
                role="button"
                class="pi pi-trash"
                style="font-size: 1.7rem"
              ></i>
            </div>
          </div>
          <div class="flex justify-content-end pt-4">
            <span v-if="anagraficaClienti.documenti.length == 0"
              >Inserisci un nuovo documento </span
            ><i
              @click="addRowDocumenti"
              role="button"
              class="pi pi-plus-circle pl-4"
              style="font-size: 1.7rem"
            ></i>
          </div>
        </div>
        <div v-if="mode == 'view'">
          <div
            class="flex flex-column justify-content-between mb-4"
            v-for="(item, index) of anagraficaClienti.documenti"
            :key="index"
          >
            <p class="text-gray-400 mb-2 font-bold">Tipo Documento</p>
            <p class="m-0">Documento numero - {{ item.numero }}</p>
          </div>
        </div>
      </template>
    </Card>
    <Card>
      <template #content>
        <div class="flex justify-content-end mt-4">
          <Button
            @click="mode = 'edit'"
            v-if="mode == 'view'"
            label="Modifica"
          ></Button>
          <Button
            v-else
            :loading="loading"
            label="Salva"
            @click="saveForm"
          ></Button>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref } from "vue"
import AxiosService from "../../axiosServices/AxiosService"
import { useToast } from "primevue/usetoast"
import { useRoute } from "vue-router"

import { isEqual, uniq, join } from "lodash"
// import ChooserGeography from '@/components/ChooserGeography.vue'
// eslint-disable-next-line no-undef
const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object,
  showAnagrafica: {
    type: Boolean,
    default: true,
  },
  showIndirizzi: {
    type: Boolean,
    default: true,
  },
  showContatti: {
    type: Boolean,
    default: true,
  },
  showDocumenti: {
    type: Boolean,
    default: true,
  },
})

// eslint-disable-next-line no-undef
const emit = defineEmits(["event_refreshList", "event_HideNuovaAnagrafica"])
const toast = useToast()
const route = useRoute()

const mode = ref("view")

const urlFile = ref()
function uploadFile(ev) {
  loading.value = true
  urlFile.value = ""
  const service = new AxiosService("files")
  for (let i = 0; i < ev.files.length; i++) {
    const formData = new FormData()
    formData.append("file", ev.files[i])
    service
      .postCustomEndpoint("Upload?type=" + "AnagraficaClienti", "", formData)
      .then((res) => {
        console.log(
          "🚀 ~ file: NuovaCircolare.vue ~ line 78 ~ uploadFile ~ res",
          res
        )
        urlFile.value = res
      })
      .finally(() => {
        const service = new AxiosService(
          "Drive/AddFile/" + props.idDrive + "/" + currentFolderId.value
        )
        service
          .create({
            nome: urlFile.value.substring(
              urlFile.value.indexOf("_") + 1,
              urlFile.value.length
            ),
            file_url: urlFile.value,
          })
          .then((res) => console.log(res))
          .finally(() => {
            breadcrumbNavigation(currentFolder.value, steps.value.length - 1)
            loading.value = false
          })
      })
  }
}

//GET SIDEBARDATA
function setupSidebar() {
  if (props.sidebarData) {
    const serviceGET = new AxiosService(
      "Anagrafiche/Retail/" + props.sidebarData.ID
    )
    serviceGET
      .read()
      .then((res) => {
        anagraficaClienti.value = res
        anagraficaClienti.value.DATA_DECORRENZA
          ? (anagraficaClienti.value.DATA_DECORRENZA = new Date(
              res.DATA_DECORRENZA
            ))
          : (anagraficaClienti.value.DATA_DECORRENZA = "")
        anagraficaClienti.value.DATA_POSSIBILE_RINNOVO
          ? (anagraficaClienti.value.DATA_POSSIBILE_RINNOVO = new Date(
              res.DATA_POSSIBILE_RINNOVO
            ))
          : (anagraficaClienti.value.DATA_POSSIBILE_RINNOVO = "")
        anagraficaClienti.value.DATA_PROSSIMO_CONTATTO
          ? (anagraficaClienti.value.DATA_PROSSIMO_CONTATTO = new Date(
              res.DATA_PROSSIMO_CONTATTO
            ))
          : (anagraficaClienti.value.DATA_PROSSIMO_CONTATTO = "")

        anagraficaClienti.value.dataNascita
          ? (anagraficaClienti.value.dataNascita = new Date(res.dataNascita))
          : (anagraficaClienti.value.dataNascita = "")

        anagraficaClienti.value.dataAssunzione
          ? (anagraficaClienti.value.dataAssunzione = new Date(
              res.dataAssunzione
            ))
          : (anagraficaClienti.value.dataAssunzione = "")
      })
      .catch((err) => console.log(err))

    // Object.assign(anagraficaClienti.value, props.sidebarData);
  }
}

//CLOSE
// function closeSidebar() {
//   anagraficaClienti.value = {
//     nome: '',
//     cognome: '',
//     codiceFiscale: '',
//     idSesso: "",
//     dataNascita: '',
//     cittadinanza: '',
//     idNazioneNascita: '',
//     idRegioneNascita: '',
//     idProvinciaNascita: '',
//     idCittaNascita: '',
//     idStatoCivile: '',
//     idTipoOccupazione: '',
//     professione: '',
//     dataAssunzione: '',
//     dataScadenzaContratto: '',
//     contrattoIndeterminato: '',
//     nomeAzienda: '',
//     personaPoliticamenteEsposta: false,
//     guidatoreAbituale: false,
//     indirizzi: [],
//     contatti: [],
//     documenti: [],
//     indirizziDelete: [],
//     contattiDelete: [],
//     documentiDelete: []
//   }
//   emit('event_HideNuovaAnagrafica')
// }

function checkOnlyOnePrincipale(index) {
  anagraficaClienti.value.contatti.forEach((element, i) => {
    if (i != index) element.principale = false
  })
}

function addRowDocumenti() {
  anagraficaClienti.value.documenti.push({
    id: 0,
    idTipoDocumento: 0,
    numero: "",
    rilasciatoDa: "",
    dataRilascio: "",
    dataScadenza: "",
    idProvinciaRilascio: 0,
    idCittaRilascio: 0,
  })
}

function addRowContatti() {
  let object = {
    id: 0,
    idTipoContatto: 0,
    nome: null,
    valore: null,
    principale: false,
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
    idCitta: 0,
  })
}
const loading = ref(false)
function saveForm() {
  loading.value = true
  const serviceGET = new AxiosService(
    "Anagrafiche/Retail/" + route.params.idAnagrafica
  )

  const servicePOST = new AxiosService("Anagrafiche/AddRetail")
  const servicePUT = new AxiosService("Anagrafiche/SaveRetail")

  const servicePostNewNota = new AxiosService(
    "Crm/InsertCrmRecord/" + route.params.idAnagrafica
  )

  let oldAnagrafica = {}
  let currentChanges = ""

  serviceGET
    .read()
    .then((res) => {
      oldAnagrafica = { ...res }
      console.log("old anagrafica", oldAnagrafica)
    })
    .finally(() => {
      let arrayDeiCambi = getUpdatedKey(oldAnagrafica, anagraficaClienti.value)
      let stringaDiCambi = []

      arrayDeiCambi.forEach((cambio) => {
        if (
          oldAnagrafica[cambio] == null &&
          anagraficaClienti.value[cambio] == ""
        ) {
          return
        } else if (
          typeof oldAnagrafica[cambio] == "string" &&
          typeof anagraficaClienti.value[cambio] == "object"
        ) {
          return
        } else if (anagraficaClienti.value[cambio] == "") {
          stringaDiCambi.push(
            cambio + " da: " + oldAnagrafica[cambio] + ' a: " "'
          )
        } else if (oldAnagrafica[cambio] == "") {
          stringaDiCambi.push(
            cambio + " da: " + '" "' + " a: " + anagraficaClienti.value[cambio]
          )
        } else {
          stringaDiCambi.push(
            cambio +
              " da: " +
              oldAnagrafica[cambio] +
              " a: " +
              anagraficaClienti.value[cambio]
          )
        }
      })

      currentChanges = join(stringaDiCambi, ", ")

      servicePostNewNota
        .create({ oggetto: "Anagrafica Modificata", messaggio: currentChanges })
        .then((res) => console.log(res))
        .finally(() => {
          if (anagraficaClienti.value.ID || anagraficaClienti.value.id) {
            servicePUT
              .update(anagraficaClienti.value)
              .then(() => {
                toast.add({
                  severity: "success",
                  summary: "Anagrafica Clienti modificata",
                  detail: anagraficaClienti.value.NOME,
                  life: 3000,
                })
              })
              .catch((error) => {
                toast.add({
                  severity: "error",
                  summary: "Errore nella modifica dell'anagrafica",
                  detail: error,
                  life: 3000,
                })
              })
              .finally(() => {
                emit("event_refreshList")
                emit("event_HideNuovaAnagrafica")
                mode.value = "view"
                loading.value = false
              })
          } else {
            servicePOST
              .create(anagraficaClienti.value)
              .then((res) => {
                if (res) {
                  console.log(
                    "🚀 ~ file: NuovaAnagrafica.vue:988 ~ .then ~ res:",
                    res
                  )
                  toast.add({
                    severity: "success",
                    summary: "Nuova Anagrafica Clienti creata",
                    detail: anagraficaClienti.value.NOME,
                    life: 3000,
                  })
                  emit("event_refreshList", res)
                  emit("event_HideNuovaAnagrafica", {
                    id: res,
                    anagrafica: anagraficaClienti.value,
                  })
                }
              })
              .catch((error) => {
                toast.add({
                  severity: "error",
                  summary: "Errore nella creazione dell'anagrafica",
                  detail: error,
                  life: 3000,
                })
                emit("event_refreshList")
                emit("event_HideNuovaAnagrafica")
              })
              .finally(() => {
                loading.value = false
              })
          }
        })
    })
}

function getUpdatedKey(oldData, newData) {
  const data = uniq([...Object.keys(oldData), ...Object.keys(newData)])
  const keys = []
  for (const key of data) {
    if (!isEqual(oldData[key], newData[key])) {
      keys.push(key)
    }
  }

  return keys
}

function toHash(array, keyName, valueName) {
  return array.reduce(function (dictionary, next) {
    dictionary[next[keyName]] = next[valueName]
    return dictionary
  }, {})
}

function resetExpirationDate() {
  anagraficaClienti.value.dataScadenzaContratto = ""
}

function getSex() {
  const service = new AxiosService("GetSesso")
  service.getOptions("GetSesso").then((res) => {
    if (res) {
      options.value.sex.push(...res)
    }
  })
}
getSex()

function getMaritalStatus() {
  const service = new AxiosService("GetStatoCivile")
  service.getOptions("GetStatoCivile").then((res) => {
    if (res) {
      options.value.maritalStatus.push(...res)
    }
  })
}
getMaritalStatus()

function jobActivityType() {
  const service = new AxiosService("GetTipoOccupazione")
  service.getOptions("GetTipoOccupazione").then((res) => {
    if (res) {
      options.value.jobActivityType.push(...res)
    }
  })
}
jobActivityType()

function getNations() {
  const service = new AxiosService("Geographic/GetNazioni")
  service.getOptions("Geographic/GetNazioni").then((res) => {
    if (res) {
      options.value.birthNation.push(...res)
    }
  })
}
getNations()

// function getRegions(idNation) {

//   options.value.birthRegion.splice(0)
//   options.value.birthProvince.splice(0)
//   options.value.birthCity.splice(0)

//   const service = new AxiosService('Geographic/GetProvince')
//   service.getOptions('Geographic/GetRegioni/' + idNation)
//     .then(res => {
//       if (res) {
//         options.value.birthRegion.push(...res)
//       }
//     })
// }

// function getProvinces(idRegion) {
//   options.value.birthProvince.splice(0)
//   options.value.birthCity.splice(0)

//   const service = new AxiosService('Geographic/GetProvince')
//   service.getOptions('Geographic/GetProvince/' + idRegion)
//     .then(res => {
//       if (res) {
//         options.value.birthProvince.push(...res)
//       }
//     })
// }

// function getCities(idProvince) {
//   options.value.birthCity.splice(0)

//   const service = new AxiosService('Geographic/GetCitta')

//   service.getOptions('Geographic/GetCitta/' + idProvince)
//     .then(res => {
//       if (res) {
//         options.value.birthCity.push(...res)
//       }
//     })
// }

const anagraficaClienti = ref({
  nome: "",
  cognome: "",
  codiceFiscale: "",
  idSesso: "",
  dataNascita: "",
  cittadinanza: "",
  idNazioneNascita: "",
  idRegioneNascita: "",
  idProvinciaNascita: "",
  idCittaNascita: "",
  idStatoCivile: "",
  idTipoOccupazione: "",
  professione: "",
  dataAssunzione: "",
  dataScadenzaContratto: "",
  contrattoIndeterminato: "",
  nomeAzienda: "",
  personaPoliticamenteEsposta: false,
  guidatoreAbituale: false,
  indirizzi: [],
  contatti: [],
  documenti: [],
  indirizziDelete: [],
  contattiDelete: [],
  documentiDelete: [],
  luogoNascita: "",
  pIva: "",
})

const options = ref({
  sex: [],
  birthNation: [],
  birthRegion: [],
  birthProvince: [],
  birthCity: [],
  maritalStatus: [],
  jobActivityType: [],
})

// function populateTempItemFromGeoFilter(event, item) {
//   console.log("🚀 ~ file: NuovaAnagrafica.vue:577 ~ populateTempItemFromGeoFilter ~ item", item)

//   console.log('che del cazzo')
//   console.log(item.idNazione)
//   item.idNazione >= 0 ? item.idNazione = event.idNazione : item.idNazioneNascita = event.idNazione
//   item.idRegione >= 0 ? item.idRegione = event.idRegione : item.idRegioneNascita = event.idRegione
//   item.idProvincia >= 0 ? item.idProvincia = event.idProvincia : item.idProvinciaNascita = event.idProvincia
//   item.idCitta >= 0 ? item.idCitta = event.idCitta : item.idCittaNascita = event.idCitta

// }

const tipiIndirizzoOptions = ref()
function getTipiIndirizzo() {
  const serviceGET = new AxiosService("Options/GetTipoIndirizzo")
  serviceGET
    .read()
    .then((res) => (tipiIndirizzoOptions.value = res))
    .catch((err) => console.log(err))
}

getTipiIndirizzo()

const tipidocumentoOptions = ref()
function getTipiDocumento() {
  const serviceGET = new AxiosService("Options/GetTipoDocumento")
  serviceGET
    .read()
    .then((res) => (tipidocumentoOptions.value = res))
    .catch((err) => console.log(err))
}

getTipiDocumento()

const tipiContattoOptions = ref()
function getTipiContatto() {
  const serviceGET = new AxiosService("Options/GetTipoContatto")
  serviceGET
    .read()
    .then((res) => (tipiContattoOptions.value = res))
    .catch((err) => console.log(err))
}

const origineOptions = ref()
function getOrigineOptions() {
  loading.value = true
  const service = new AxiosService("Marketing/Campaigns")
  service
    .read()
    .then((res) => (origineOptions.value = res))
    .finally(() => {
      loading.value = false
    })
}

const proprietarioOptions = ref()
const commercialeOptions = ref()

function getUsers() {
  loading.value = true
  const service = new AxiosService("Options/GetUsers")
  service
    .read()
    .then((res) => {
      proprietarioOptions.value = res
      commercialeOptions.value = res
    })
    .finally(() => {
      loading.value = false
    })
}

getUsers()

getOrigineOptions()

setupSidebar()

getTipiContatto()
</script>

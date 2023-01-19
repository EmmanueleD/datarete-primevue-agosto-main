<!-- eslint-disable vue/no-mutating-props -->
<template>
  <Toast></Toast>

  <!--   -->
  <h1 v-if="tmpUser.id">Modifica opzione</h1>
  <h1 v-else>Nuova opzione</h1>

  <div v-if="loading">
    <UserFormSkeleton></UserFormSkeleton>
  </div>

  <div v-else class="form-container grid">
    <div class="mb-4 flex justify-content-center w-full">
      <div class="avatar-container">
        <Avatar
          v-if="tmpUser.imgprofilo"
          :image="tmpUser.imgprofilo"
          size="xlarge"
          shape="circle"
        />

        <Avatar
          v-else
          icon="pi pi-user"
          shape="circle"
          class="mr-2"
          size="xlarge"
        />

        <label class="custom-file-input-label" for="imgprofilo">
          <i v-if="!isSending" class="pi pi-fw pi-pencil"></i>
          <i v-else class="pi pi-spin pi-spinner"></i>
          <input
            ref="file"
            @change="uploadFileAvatar"
            class="custom-file-input"
            type="file"
            id="imgprofilo"
            name="imgprofilo"
            accept="image/*"
            capture
          />
        </label>
      </div>
    </div>
    <div class="flex flex-column col-12 mb-2">
      <label for="attivo">Attivo</label>
      <Checkbox id="attivo" :binary="true" v-model="tmpUser.attivo"></Checkbox>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="nome">Nome</label>
      <InputText
        :class="{ 'red-border': saveDisabled }"
        id="nome"
        type="text"
        v-model="tmpUser.nome"
      >
      </InputText>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="cognome">Cognome</label>
      <InputText
        :class="{ 'red-border': saveDisabled }"
        id="cognome"
        type="text"
        v-model="tmpUser.cognome"
      >
      </InputText>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="email">Email</label>
      <InputText
        :class="{ 'red-border': saveDisabled }"
        id="email"
        type="email"
        v-model="tmpUser.email"
      >
      </InputText>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="email">Permalink</label>
      <InputText type="text" v-model="tmpUser.permalink"> </InputText>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="email">Numero VoiSpeed</label>
      <InputText type="text" v-model="tmpUser.numero_voispeed"> </InputText>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="telefono">Telefono</label>
      <InputText id="telefono" type="text" v-model="tmpUser.telefono">
      </InputText>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="cellulare">Cellulare</label>
      <InputText
        id="cellulare"
        type="text"
        v-model="tmpUser.cellulare"
      ></InputText>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="datanascita">Data di nascita</label>
      <Calendar
        id="datanascita"
        type="text"
        v-model="tmpUser.datanascita"
      ></Calendar>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="luogonascita">Luogo di Nascita</label>
      <InputText
        id="luogonascita"
        type="text"
        v-model="tmpUser.luogonascita"
      ></InputText>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="codicefiscale">Codice Fiscale</label>
      <InputText
        id="codicefiscale"
        type="text"
        v-model="tmpUser.codicefiscale"
      ></InputText>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="partitaiva">Partita IVA</label>
      <InputText
        id="partitaiva"
        type="text"
        v-model="tmpUser.partitaiva"
      ></InputText>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="username">Username</label>
      <InputText
        :class="{ 'red-border': saveDisabled }"
        id="username"
        type="text"
        v-model="tmpUser.username"
      >
      </InputText>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="password">Password</label>
      <InputText id="password" type="text" v-model="tmpUser.password">
      </InputText>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="livelliAbilitati">Utente Padre</label>
      <Dropdown
        :filter="true"
        id="sedi"
        v-model="tmpUser.id_padre"
        :options="usersOptions"
        optionLabel="Nome"
        optionValue="Id"
        filterPlaceholder="Cerca..."
      >
      </Dropdown>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="ruolo">Ruolo</label>
      <InputText id="ruolo" type="text" v-model="tmpUser.ruolo"> </InputText>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="livelliAbilitati">Livelli Abilitati</label>
      <MultiSelect
        :filter="true"
        :class="{ 'red-border': saveDisabled }"
        id="livelliAbilitati"
        v-model="tmpUser.livelliAbilitati"
        :options="loginLevelOptions"
        optionLabel="Nome"
        optionValue="Id"
      >
      </MultiSelect>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="livelliAbilitati">Sedi abilitate</label>
      <MultiSelect
        :filter="true"
        id="sedi"
        v-model="tmpUser.sediAzienda"
        :options="sediOptions"
        optionLabel="nome"
        optionValue="id"
      >
      </MultiSelect>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="livelliAbilitati">Prodotti Abilitati</label>
      <MultiSelect
        :filter="true"
        id="prodottiAbilitati"
        v-model="tmpUser.tipiPrdotto"
        :options="prodottiOptions"
        optionLabel="text"
        optionValue="value"
      >
      </MultiSelect>
    </div>
    <div class="flex flex-column col-12 col-md-6 mb-2">
      <label for="livelliAbilitati">Banche Abilitate</label>
      <MultiSelect
        :filter="true"
        id="prodottiAbilitati"
        v-model="tmpUser.banche_abilitate"
        :options="bancheOptions"
        optionLabel="nome"
        optionValue="id"
      >
      </MultiSelect>
    </div>
    <div class="flex align-items-center col-12">
      <div class="flex flex-column col-12 col-md-6 mb-2">
        <label>Nome Documento</label>
        <InputText type="text" v-model="titoloDocumento"></InputText>
      </div>
      <div class="flex flex-column col-12 col-md-6 mb-2">
        <FileUpload
          @uploader="uploadFileDocumento"
          mode="basic"
          uploadIcon="pi pi-upload"
          name="demo[]"
          :customUpload="true"
          :previewWidth="50"
          :maxFileSize="1000000"
          chooseLabel="Carica Documento"
          :auto="true"
        />
      </div>
    </div>
  </div>

  <div class="w-100 flex justify-content-end align-items-end col-12 col-md-2">
    <Button
      :loading="formLoading"
      :disabled="saveDisabled"
      label="Salva"
      @click="save"
    ></Button>
  </div>
</template>
<script setup>
import { ref, defineEmits, defineProps, computed } from "vue";
import { useToast } from "primevue/usetoast";
import AxiosService from "@/axiosServices/AxiosService";
import UserFormSkeleton from "../skeletons/UserFormSkeleton.vue";

const emits = defineEmits(["event_HideUsersSidebar", "event_refreshList"]);

const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object,
});

const tmpUser = ref({ ...props.sidebarData.event });
// tmpUser.value.password = 'PrestitoSi'
// tmpUser.value.livelliAbilitati = [3]
const toast = useToast();
const servicePOST = new AxiosService(props.sidebarData.view.endpointPOST);
const servicePUT = new AxiosService(props.sidebarData.view.endpointPUT);

const isSending = ref(false);
const file = ref(null);
function uploadFileAvatar() {
  console.log(
    "🚀 ~ file: UsersSidebar.vue ~ line 120 ~ uploadFile ~ ev",
    file.value.files
  );

  const service = new AxiosService("files");
  if (!isSending.value) {
    isSending.value = true;

    const formData = new FormData();
    formData.append("file", file.value.files[0]);

    service
      .postCustomEndpoint("Upload?type=" + "UserAvatars", "", formData)
      .then((res) => {
        // eslint-disable-next-line vue/no-mutating-props
        tmpUser.value.imgprofilo =
          "https://prestitosi-core.datarete.cloud/" + res;
      })
      .finally(() => {
        isSending.value = false;
      });
  }
  return;
}

const titoloDocumento = ref("");
const urlFile = ref("");
function uploadFileDocumento(ev) {
  loading.value = true;
  urlFile.value = "";
  const service = new AxiosService("files");
  for (let i = 0; i < ev.files.length; i++) {
    const formData = new FormData();
    formData.append("file", ev.files[i]);
    service
      .postCustomEndpoint("Upload?type=" + "UsersFiles", "", formData)
      .then((res) => {
        console.log(
          "🚀 ~ file: UsersSidebar.vue ~ line 203 ~ uploadFileDocumento ~ res",
          res
        );
        urlFile.value = res;
      })
      .finally(() => {
        tmpUser.value.files.push({
          nome: titoloDocumento.value,
          url: urlFile.value,
        });
        loading.value = false;
      });
  }
}

const formLoading = ref(false);
function save() {
  formLoading.value = true;
  if (tmpUser.value.id) {
    servicePUT
      .update(tmpUser.value)
      .then((res) => {
        if (res) {
          toast.add({
            severity: "success",
            summary: "Nuova Opzione Creata",
            detail: tmpUser.value.nome,
            life: 3000,
          });
          emits("event_refreshList");
          emits("event_HideUsersSidebar");
        }
      })
      .catch((error) => {
        toast.add({
          severity: "error",
          summary: "'Errore nella modifica dell'opzione",
          detail: error,
          life: 3000,
        });
        emits("event_refreshList");
        emits("event_HideUsersSidebar");
      })
      .finally(() => {
        formLoading.value = false;
      });
  } else {
    console.log("POST , ");
    servicePOST
      .create(tmpUser.value)
      .then((res) => {
        if (res) {
          toast.add({
            severity: "success",
            summary: "Nuova Opzione Creata",
            detail: tmpUser.value.nome,
            life: 3000,
          });
          emits("event_refreshList");
          emits("event_HideUsersSidebar");
        }
      })
      .catch((error) => {
        toast.add({
          severity: "error",
          summary: "'Errore nella creazione dell'opzione",
          detail: error,
          life: 3000,
        });
        emits("event_refreshList");
        emits("event_HideUsersSidebar");
      })
      .finally(() => {
        formLoading.value = false;
      });
  }
}

const serviceGETLoginLevels = new AxiosService("Options/GetLoginLevels");
const loginLevelOptions = ref([]);
const loadingLoginLevels = ref(true);
function getLoginLevels() {
  loadingLoginLevels.value = true;
  serviceGETLoginLevels
    .read()
    .then((res) => {
      loginLevelOptions.value.length > 0
        ? loginLevelOptions.value.splice(0)
        : null;
      res.map((x) => {
        x.Id = x.value;
        x.Nome = x.text;
        delete x.value;
        delete x.text;
      });
      loginLevelOptions.value = res;
    })
    .catch((err) => console.log(err))
    .finally(() => (loadingLoginLevels.value = false));
}

const serviceGETSedi = new AxiosService("Gestione/SediAzienda/GetSedi");
const sediOptions = ref([]);
const loadingSedi = ref(true);
function getSedi() {
  loadingSedi.value = true;
  serviceGETSedi
    .read()
    .then((res) => {
      sediOptions.value.length > 0 ? sediOptions.value.splice(0) : null;

      sediOptions.value = res;
    })
    .catch((err) => console.log(err))
    .finally(() => (loadingSedi.value = false));
}

const serviceGETUsers = new AxiosService("Options/GetUsers");
const usersOptions = ref([]);
const loadingUsers = ref(true);
function getUsers() {
  loadingUsers.value = true;
  serviceGETUsers
    .read()
    .then((res) => {
      usersOptions.value.length > 0 ? usersOptions.value.splice(0) : null;
      res.map((x) => {
        x.Id = x.value;
        x.Nome = x.text;
        delete x.value;
        delete x.text;
      });
      usersOptions.value = res;
    })
    .catch((err) => console.log(err))
    .finally(() => (loadingUsers.value = false));
}

const saveDisabled = computed(() => {
  if (tmpUser.value) {
    if (
      !tmpUser.value.nome ||
      !tmpUser.value.cognome ||
      // !tmpUser.value.telefono ||
      !tmpUser.value.username ||
      !tmpUser.value.livelliAbilitati
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
});

const loadingProdotti = ref(true);
const prodottiOptions = ref([]);
function getProdottiAbilitati() {
  loadingProdotti.value = true;
  const service = new AxiosService("Options/TipiProdotto");
  service
    .read()
    .then((res) => (prodottiOptions.value = res))
    .catch((err) => console.log(err))
    .finally(() => (loadingProdotti.value = false));
}

const loading = computed(() => {
  if (
    !loadingProdotti.value &&
    !loadingLoginLevels.value &&
    !loadingSedi.value &&
    !loadingUsers.value
  ) {
    return false;
  }
  return true;
});

const bancheOptions = [
  {
    id: 1,
    nome: "Banca di Asti",
    logo: "#",
    attivo: true,
    decentrato: true,
    Mutui: true,
    Prestiti: false,
    CDQ: false,
  },
  {
    id: 2,
    nome: "Banco Azzoaglio",
    logo: "#",
    attivo: true,
    decentrato: false,
    Mutui: true,
    Prestiti: false,
    CDQ: false,
  },
  {
    id: 3,
    nome: "Banco BPM",
    logo: "#",
    attivo: true,
    decentrato: false,
    Mutui: true,
    Prestiti: false,
    CDQ: false,
  },
  {
    id: 4,
    nome: "CheBanca!",
    logo: "#",
    attivo: true,
    decentrato: false,
    Mutui: true,
    Prestiti: false,
    CDQ: false,
  },
  {
    id: 5,
    nome: "Credit Agricole",
    logo: "#",
    attivo: true,
    decentrato: false,
    Mutui: true,
    Prestiti: false,
    CDQ: false,
  },
  {
    id: 6,
    nome: "Creval",
    logo: "#",
    attivo: false,
    decentrato: true,
    Mutui: true,
    Prestiti: false,
    CDQ: false,
  },
  {
    id: 7,
    nome: "ING",
    logo: "#",
    attivo: true,
    decentrato: false,
    Mutui: true,
    Prestiti: false,
    CDQ: false,
  },
  {
    id: 8,
    nome: "UniCredit",
    logo: "#",
    attivo: false,
    decentrato: false,
    Mutui: true,
    Prestiti: true,
    CDQ: true,
  },
];

getProdottiAbilitati();

getLoginLevels();

getSedi();

getUsers();
</script>
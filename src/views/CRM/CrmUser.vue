

<template>
  <div>
    <Card v-if="currentCrm" class="mb-4">
      <template #content>
        <div class="flex align-items-center mb-4">
          <Avatar icon="pi pi-user" class="mr-4" size="xlarge" />
          <h2>{{ currentCrm.nome }} {{ currentCrm.cognome }}</h2>
        </div>
        <div class="my-2" v-if="currentStatoAnagrafica">
          <p class="m-0">
            Ultimo stato:
            <span class="font-bold">{{ currentStatoAnagrafica.STATO }}</span>
          </p>
          <p
            v-if="currentStatoAnagrafica.ID_SOTTOSTATO != 0"
            class="text-gray-500 m-0"
          >
            {{ currentStatoAnagrafica.SOTTOSTATO }}
          </p>
          <p
            v-if="currentStatoAnagrafica.DATA_STATO"
            class="text-gray-500 mb-4 font-italic"
          >
            {{
              new Date(currentStatoAnagrafica.DATA_STATO).toLocaleDateString(
                "it"
              )
            }}
            {{ currentStatoAnagrafica.UTENTE_STATO }}
          </p>

          <Divider></Divider>
          <h4 class="mb-4">Contatti Rapidi</h4>

          <div
            v-for="(item, index) in currentCrm.contatti"
            :key="index"
            class="flex w-full justify-content-start gap-4 cursor-pointer mb-2"
            @click="contattoAction(item)"
          >
            <div>
              <i v-if="item.idTipoContatto == 1" class="pi pi-at"></i>
              <i
                v-if="item.idTipoContatto == 2 || item.idTipoContatto == 3"
                class="pi pi-phone"
              ></i>
            </div>
            <div>
              <a
                class="text-blue-500"
                :href="'mailto:' + item.valore"
                v-if="item.idTipoContatto == 1"
                >{{ item.valore }}</a
              >
              <span class="text-blue-500" v-else>{{ item.valore }}</span>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>

  <Sidebar
    v-model:visible="emailSidebarVisible"
    :baseZIndex="10000"
    position="right"
    class="p-sidebar-lg"
  >
    <h3>Data-mail</h3>

    <div class="grid">
      <div class="flex flex-column col-12">
        <label>Destinatario</label>
        <InputText type="text" v-model="mail.destinatario"></InputText>
      </div>

      <div class="flex flex-column col-12">
        <label>Oggetto</label>
        <InputText type="text" v-model="mail.oggetto"></InputText>
      </div>

      <div class="col-12 mb-4">
        <Editor id="editor" v-model="mail.text" editorStyle="height: 400px">
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

      <div class="col-12 mt-4">
        <div class="flex justify-content-end">
          <Button label="Invia"></Button>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script setup>
import { useStore } from "vuex";
import axios from "axios";
import { ref, watch } from "vue";
import { useToast } from "primevue/usetoast";

// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps({
  currentCrm: Object,
  currentStatoAnagrafica: Object,
});
// eslint-disable-next-line no-undef
const emits = defineEmits(["event_changeType"]);

const store = useStore();

const toast = useToast();

const ext = ref("");
store.getters.loggedUser.numero_voispeed
  ? (ext.value = store.getters.loggedUser.numero_voispeed)
  : (ext.value = " ");

console.log("🚀 ~ file: CrmUser.vue:108 ~ store", store.getters.loggedUser);

const mail = ref({
  destinatario: "",
  oggetto: "",
  text: "",
});
const emailSidebarVisible = ref(false);
function showEmailSidebar() {
  emailSidebarVisible.value = true;
}

const newItemType = ref(1);
watch(newItemType, () => {
  emits("event_changeType", newItemType.value);
});

function startVoip(valore) {
  if (store.getters["loggedUser"].numero_voispeed) {
    toast.add({
      severity: "success",
      summary: "Chiamata avviata",
      detail: props.currentCrm.nome + " " + props.currentCrm.cognome,
      life: 3000,
    });
    console.log("|| ` --**--..--** - VoIP - **--..--**-- ` ||");
    axios
      .get(
        "https://aldebaran.cluana.com/PBX/seri_endpoint.php?service=call_request&token=7dfe63ebb0e55161b31739d3ecddeb75&ext=" +
          store.getters.loggedUser.numero_voispeed +
          "&number=" +
          valore
      )
      .then((res) => res);
  } else {
    toast.add({
      severity: "warn",
      summary: "Errore: VoIP non trovato",
      life: 3000,
    });
  }
}
// const currentStatoAnagrafica = ref()
// function getCurretnStatoAnagrafica() {
//   const service = new AxiosService('Anagrafiche/GetLastStatusInfo/' + props.currentCrm.id)
//   service.read()
//     .then(res => currentStatoAnagrafica.value = res)

// }
// getCurretnStatoAnagrafica()

function contattoAction(contatto) {
  console.log(
    "🚀 ~ file: CrmUser.vue:136 ~ contattoAction ~ contatto",
    contatto
  );
  switch (contatto.idTipoContatto) {
    case 2:
      startVoip(contatto.valore);
      break;
    case 3:
      startVoip(contatto.valore);
      break;
  }
}
</script>
<template>
  <div v-if="viewMode == 'view'">
    <div class="flex">
      <div class="flex-grow-1 flex align-items-center">
        <i class="pi pi-fw pi-file mr-2 pt-2"></i>
        <h4>{{ item.oggetto }}</h4>
      </div>
      <div class="flex flex-column justify-content-end">
        <p style="font-style: italic; text-align: end" class="m-0">
          {{ formatDateTime(item.data) }}
        </p>
        <span
          ><i class="pi pi-fw pi-user mr-2 mt-2"></i>{{ item.nomeUtente }}</span
        >
      </div>
    </div>
    <div v-if="item.allegato" class="grid">
      <div class="col-12">
        <a
          :href="'https://prestitosi-core.datarete.cloud/' + item.allegato"
          target="_blank"
        >
          <i class="pi pi-paperclip"></i>
          Apri Allegato</a
        >
      </div>
    </div>
    <div class="grid mt-4">
      <div class="col-8">
        <span v-html="item.messaggio"></span>
      </div>
      <div
        v-if="store.state.user"
        class="col-4 flex justify-content-end align-items-end"
      >
        <Button
          v-if="store.state.user.user.id == item.id_utente"
          @click="switchToEditMode"
          icon="pi pi-pencil"
          class="p-button-rounded mr-2"
        ></Button>
        <Button
          v-if="store.state.user.user.id == item.id_utente"
          @click="confirmDeleteItem(item)"
          icon="pi pi-trash"
          class="p-button-rounded p-button-danger"
        ></Button>
      </div>
    </div>
  </div>
  <div v-if="viewMode == 'edit'">
    <CrmPostPutNota
      @reloadFeed="reloadFeed"
      :item="item"
      @switchToView="switchToWiew"
    ></CrmPostPutNota>
  </div>
  <!-- <Sidebar class="p-sidebar-md" @hide="hideSidebar" v-model:visible="sidebarVisible" :baseZIndex="10000"
    position="right">
    
  </Sidebar> -->
</template>

<script setup>
import { ref } from "vue";
import CrmPostPutNota from "./CrmPostPutNota.vue";
import { useStore } from "vuex";

// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({
  item: Object,
});

// eslint-disable-next-line no-undef
const emits = defineEmits(["confirmDeleteItem", "reloadFeed"]);

const store = useStore();

const viewMode = ref("view");

function switchToEditMode() {
  viewMode.value = "edit";
}

function switchToWiew() {
  viewMode.value = "view";
}

function confirmDeleteItem(element) {
  emits("confirmDeleteItem", element);
}

function reloadFeed() {
  emits("reloadFeed");
}

function formatDateTime(value) {
  if (value) {
    let dateString = "";
    dateString = new Date(value).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    let timeString = "";
    timeString = new Date(value).toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    });

    let totString = dateString + " " + timeString;
    return totString;
  }
  return "";
}
</script>
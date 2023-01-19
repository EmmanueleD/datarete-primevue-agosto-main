<template>

  <div class="flex">
    <div class=" flex-grow-1 flex align-items-center">
      <i class="pi pi-fw pi-inbox mr-2 pt-2"></i>
      <h4>{{ item.titolo }}</h4>
    </div>
    <div class=" flex flex-column justify-content-end">
      <p style="font-style: italic" class="m-0">{{ item.data.toLocaleString('it-IT') }}</p>
      <span><i class="pi pi-fw pi-user mr-2 mt-2"></i>{{ item.autore }}</span>
    </div>
  </div>
  <div class="grid mt-4">
    <div class="col-8 ">
      {{ item.dettaglio }}
    </div>
    <div class="col-4 flex justify-content-end">
      <Button @click="showSidebar(item)" icon="pi pi-pencil" class="p-button-rounded"></Button>
    </div>
  </div>

  <Sidebar class="p-sidebar-md" @hide="hideSidebar" v-model:visible="sidebarVisible" :baseZIndex="10000"
    position="right">
    <CrmPostPutPratica :item="item"></CrmPostPutPratica>
  </Sidebar>
</template>

<script setup>
import { ref } from 'vue';
import CrmPostPutPratica from './CrmPostPutPratica.vue';
// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({
  item: Object
})

// SIDEBAR MANAGEMENT
const sidebarVisible = ref(false)
const sidebarData = ref()

function showSidebar(event) {
  sidebarVisible.value = true
  sidebarData.value = event
}

function hideSidebar() {
  sidebarVisible.value = false
  sidebarData.value = {}
}
</script>
<!-- eslint-disable vue/no-mutating-props -->
<template>

  <h2>Visualizzazioni Circolari</h2>
  <div class="grid mb-4 ">
    <div class="col-6">
      <strong>Utente</strong>
    </div>
    <div class="col-3">
      <strong>Circ. Vista</strong>
    </div>
    <div class="col-3">
      <strong>Circ. Letta</strong>
    </div>
  </div>
  <div v-for="item in visioniCircolare" :key="item.id" class="grid mb-2 w-full border-bottom-1 mb-4 border-gray-300">
    <div class="col-6">
      {{ item.cognome_nome }}
    </div>
    <div class="col-3 grid-center ">
      <i v-if="item.vista" class="pi pi-fw pi-check"></i>
    </div>
    <div class="col-3 grid-center">
      <i v-if="item.letta" class="pi pi-fw pi-check"></i>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import AxiosService from '@/axiosServices/AxiosService';
// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object
})

const visioniCircolare = ref([])

function getData() {
  const service = new AxiosService('Circolari/GetVisioniCircolare/' + props.sidebarData.id)
  service.read()
    .then(res => visioniCircolare.value = res)
}

getData()
</script>
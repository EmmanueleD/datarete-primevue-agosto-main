<template>
  <div class="drive-component flex flex-column align-items-center mr-4">
    <i class="pi pi-fw" :class="item.icona"></i>
    <span class="mt-2">{{ item.nome }}</span>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps({
  item: Object
})

</script>
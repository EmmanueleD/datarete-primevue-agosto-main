<template>
  <Menubar :model="model" />
</template>

<script setup>
const props = defineProps({
  model: Object,
})
</script>

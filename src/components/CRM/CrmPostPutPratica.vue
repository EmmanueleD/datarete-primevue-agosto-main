<template>
  <h4 v-if="item">Modifica Pratica</h4>
  <h4 v-else class="mb-4">Nuova Pratica</h4>
  <div class="w-full flex flex-column align-items-start mb-4">
    <label for="title">Titolo</label>
    <InputText v-model="tmpItem.titolo" class="w-full" id="title" placeholder="titolo"></InputText>
  </div>
  <div class="w-full flex flex-column align-items-start mb-4">
    <label for="title">Descrizione</label>
    <InputText v-model="tmpItem.dettaglio" class="w-full" id="title" placeholder="descrizione"></InputText>
  </div>
  <div class="flex justify-content-end">
    <Button class="mt-4" label="Salva"></Button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({
  item: Object
})

const tmpItem = ref({ ...props.item })

console.log(tmpItem.value)
</script>
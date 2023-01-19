<template>

  <InputText v-model="address" placeholder="inserisci l'indirizzo"></InputText>

  <div class="w-full grid-center pt-4">
    <GMapMap :center="center" :zoom="7" map-type-id="terrain" style="width: 900px; height: 500px">
    </GMapMap>
  </div>

</template>

<script setup>
import { ref } from 'vue'

const center = ref({ lat: 51.093048, lng: 6.842120 })

const address = ref('')
</script>
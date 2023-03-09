<template>
  <!-- <Dashboard_2 v-if="isGest"></Dashboard_2> -->
  <!-- <Dashboard_1 v-else></Dashboard_1> -->
  <Dashboard_2></Dashboard_2>
</template>

<script setup>
import { ref } from "vue"
import Dashboard_1 from "./Dashboard_1.vue"
import Dashboard_2 from "./Dashboard_2.vue"

const CURRENT_URL = window.location.href
const isGest = ref(false)
if (CURRENT_URL.includes("prestitosi-gest")) {
  isGest.value = true
} else {
  isGest.value = false
}
</script>

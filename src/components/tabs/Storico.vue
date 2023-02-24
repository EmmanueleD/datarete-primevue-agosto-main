<template>
  <div class="wrapper">
    <div
      class="w-full flex flex-column p-2"
      style="height: 525px; overflow-y: scroll"
    >
      <div
        v-for="item in storico"
        :key="id"
        class="w-full py-2 px-3 mb-4 border-round-lg shadow-2"
      >
        <div class="w-full">
          <span
            class="font-bold"
            :class="item.idStato ? 'text-yellow-800' : 'text-green-900'"
            >{{
              item.idStato ? "Nuovo stato: " + item.Stato : "Remote Chat"
            }}</span
          >
        </div>
        <div class="w-full flex felx-wrap justify-content-between">
          <div class="grid-center">
            <i v-if="item.idStato" class="pi pi-sync ml-2 mr-4"></i>
            <i v-else class="pi pi-comments ml-2 mr-4"></i>
          </div>
          <div class="flex flex-column flex-grow-1">
            <span>{{
              new Date(item.dataEvento).toLocaleDateString("it", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            }}</span>

            <span class="text-gray-900 mt-2">{{ item.Nota }}</span>
            <span>{{ item.Agente }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  storico: Object,
})
</script>

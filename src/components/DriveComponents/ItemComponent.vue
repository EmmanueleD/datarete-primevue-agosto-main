<template>
  <!-- <Breadcrumb :home="props.item" :model="breadMenu" /> -->
  <Card>
    <template #content>
      <div v-if="selectedItem">
        <h2>{{ selectedItem.label }}</h2>
        <div class="flex" v-if="selectedItem.children">
          <div v-for="child of selectedItem.children" :key="child.key">
            <div @click="selectChild(child)" class="drive-component flex flex-column align-items-center mr-4">
              <i class="pi pi-fw" :class="child.icon"></i>
              <span class="mt-2">{{ child.label }}</span>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="selectedItem.data.slice(-3) == 'pdf'
            || selectedItem.data.includes('youtube')
          ">
            <iframe :src="selectedItem.data" frameborder="0" width="100%" height="800px"></iframe>
          </div>
          <div v-else>{{ selectedItem.data }}</div>
        </div>
      </div>
      <div v-else-if="item">
        <h2>{{ item.label }}</h2>
        <div class="flex" v-if="item.children">
          <div v-for="child of item.children" :key="child.key">
            <div @click="selectChild(child)" class="drive-component flex flex-column align-items-center mr-4">
              <i class="pi pi-fw" :class="child.icon"></i>
              <span class="mt-2">{{ child.label }}</span>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="item.data.slice(-3) == 'pdf'">
            <iframe :src="item.data" frameborder="0" width="100%" height="800px"></iframe>
          </div>
          <div v-else>{{ item.data }}</div>
        </div>
      </div>
      <div v-else> Seleziona una cartella o un documento </div>
    </template>
  </Card>
</template>

<script setup>
import { ref, watch } from 'vue';
// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({
  item: Object,
})

// const breadMenu = ref([
//   { label: props.item.label }
// ])

const selectedItem = ref()

function resetSelectedItem() {
  selectedItem.value = null
}

function selectChild(item) {
  resetSelectedItem()
  selectedItem.value = item
}

watch(
  () => props.item,
  () => {
    resetSelectedItem()
  },
  { deep: true }
)
</script>

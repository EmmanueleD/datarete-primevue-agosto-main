<template>

  <div class="mt-4" v-for="group in vModel.menu" :key="group.group">
    <!-- <h4 class="mb-4 mt-4">{{ group.group }}</h4> -->
    <Checkbox v-model="group.visible" class="mb-4" :binary="true"></Checkbox>
    <label class="mb-1 ml-3">
      <h2>{{ group.group }}</h2>
    </label>
    <div class="ml-4" v-for="(item, i) in group.items" :key="i">
      <span v-if="item.items.length == 0">
        <Checkbox v-model="item.visible" class="mb-2" :p-checkbox-icon="item.icon" :binary="true"></Checkbox>
        <label class="mb-1 ml-2">{{ item.label }}</label>
      </span>
      <div class="mb-4 mt-4" v-else>
        <Checkbox v-model="item.visible" class="mb-4" :binary="true"></Checkbox>
        <label class="mb-1 ml-2 mb-2">
          <h5>{{ item.label }}</h5>
        </label>
        <div class="ml-4" v-for="subItem in item.items" :key="subItem.label">
          <Checkbox v-model="subItem.visible" class="mb-2" :p-checkbox-icon="subItem.icon" :binary="true">
          </Checkbox>
          <label class="mb-1 ml-2">{{ subItem.label }}</label>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-content-end">
    <Button @click="save" label="Salva impostazioni del Menu"></Button>
  </div>


</template>

<script setup>
import AxiosService from '@/axiosServices/AxiosService';
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

// eslint-disable-next-line no-undef
const props = defineProps({
  menu: Object,
  id: Number
})

const vModel = ref({ ...props.menu })


const servicePUT = new AxiosService('SetMainMenuSet')

function save() {
  servicePUT.updateWithoutId('SetMainMenuSet/' + props.id, vModel.value)
    .then(res => {
      if (res) {
        toast.add({ severity: 'success', summary: 'Nuova impostazione del Menu salvata', life: 3000 });
      }
    })
    .catch(error => {
      toast.add({ severity: 'error', summary: "'Errore nelle impostazioni del Menu", detail: error, life: 3000 });
    })
}
</script>
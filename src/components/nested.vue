

<template>
  <div class="bg-white">
    <draggable class="dragArea py-4 px-2 border-2 border-dashed border-gray-300 border-round-lg" tag="ul" :list="tasks"
      :group="{ name: 'g1' }">
      <div v-for="el in tasks" :key="el.id" class="mb-4 px-4">
        <div class="flex justify-content-between align-items-center p-2">
          <div class="flex justify-content-start align-items-center ">
            <Chip v-if="el.displayLead" label="Lead" icon="pi pi-flag" class="mr-2 mb-2 custom-chip" />
            <Chip v-if="el.displayCliente" label="Cliente" icon="pi pi-users" class="mr-2 mb-2 custom-chip" />


            <span>{{ el.nome }}</span>
          </div>
          <div>
            <Button @click="showStatoAnagrafica(el)" icon="pi pi-fw pi-pencil"
              class="mr-2 p-button-rounded p-button-info"></Button>
            <Button @click="confirmDelete(el)" icon="pi pi-fw pi-trash"
              class="p-button-rounded p-button-danger"></Button>
          </div>
        </div>
        <nested-draggable v-if="(el.id_padre == 0)" :tasks="el.child" class="bg-gray-100 pl-5" />
      </div>
    </draggable>
  </div>
  <Sidebar v-model:visible="statoAnagraficaVisible" :baseZIndex="10000" position="right" class="p-sidebar-md"
    @hide="$emit('event_HideStatoAnagrafica')" @event_refreshList="hideSidebar">
    <StatoAnagrafica :sidebarData="statoAnagraficaData"></StatoAnagrafica>
  </Sidebar>
</template>
<script>
import { ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import StatoAnagrafica from './sidebars/StatoAnagrafica.vue'
export default {
  props: {
    tasks: {
      required: true,
      type: Array,
    },
  },
  components: {
    draggable: VueDraggableNext,
    StatoAnagrafica
  },
  emits: ['showSidebar', 'deleteItem'],
  name: 'nested-draggable',
  setup() {
    const statoAnagraficaData = ref()
    const statoAnagraficaVisible = ref(false)
    const showStatoAnagrafica = (event) => {
      statoAnagraficaVisible.value = true
      statoAnagraficaData.value = event
    }
    const hideSidebar = () => {
      statoAnagraficaData.value = {}
      statoAnagraficaVisible.value = false
    }

    return { showStatoAnagrafica, statoAnagraficaData, statoAnagraficaVisible, hideSidebar }
  }
}
</script>


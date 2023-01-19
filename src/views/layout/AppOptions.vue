<template>
  <div class="options-sidebar no-scrollbar">
    <div class="logo p-d-flex p-jc-center p-ai-center p-flex-column">
      <h4>Opzioni</h4>
      <h5>Dimensione menu</h5>
      <SelectButton
        v-model="isSmallSidebar"
        :options="sidebarSizes"
        dataKey="value"
      >
        <template #option="slotProps">
          <i :class="slotProps.option.icon"></i>
        </template>
      </SelectButton>
    </div>
  </div>
</template>

<script>
import SelectButton from "primevue/selectbutton";
export default {
  components: {
    SelectButton,
  },
  props: {
    modelValue: Boolean,
  },
  data() {
    return {
      sidebarSizes: [
        { icon: "pi pi-search-plus", value: false },
        { icon: "pi pi-search-minus", value: true },
      ],
    };
  },
  methods: {
    onMenuItemClick() {
      this.$emit("menuitem-click");
    },
  },
  computed: {
    isSmallSidebar: {
      get: function () {
        return { value:  this.modelValue };
      },
      set: function (newValue) {
        this.$emit("update:modelValue", newValue.value);
      },
    },
  },
};
</script>

<style>
</style>
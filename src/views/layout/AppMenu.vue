<template>
  <div class="sidebar no-scrollbar">
    <div class="sidebar-header d-flex justify-content-between align-items-center">
      <div class="logo-image"><img style="width: 172px;margin-top:15px"
          src="https://prestitosifinance.it/wp-content/uploads/2022/09/PRESTITOSI.png"></div><i
        class="double-arrow left"></i>
    </div>

    <div v-for="(group, i) of model" :key="i">
      <div class="sidebar-group-lable">{{ group.group }}</div>
      <AppSubmenu :items="group.items" class="layout-menu" :root="true" @menuitem-click="onMenuItemClick" />
    </div>
  </div>
</template>

<script>
import AppSubmenu from "./AppSubmenu";
import { mapGetters } from "vuex";
export default {
  props: {
    model: Array,
  },

  methods: {
    onMenuItemClick() {
      this.$emit("menuitem-click");
    },
    onMenuToggle(event) {
      this.$emit("menu-toggle", event);
    },
  },
  components: {
    AppSubmenu: AppSubmenu,
  },
  computed: mapGetters(["company"]),
};
</script>

<style lang="scss">
.double-arrow {
  border: solid #fbff3d;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 5px;
  position: relative;
  cursor: pointer;
  color: #fbff3d;

  &::after {
    content: "";
    position: absolute;
    padding: 5px;
    top: -6px;
    left: -6px;
    border: solid #fbff3d;
    border-width: 0 3px 3px 0;
    color: #fbff3d;
  }

  &.left {
    transform: rotate(135deg);
  }
}
</style>
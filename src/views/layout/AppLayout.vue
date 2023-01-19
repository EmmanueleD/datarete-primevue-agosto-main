<template>
  <div
    :class="[
      'wrapper',
      {
        'desktop-hidden-sidebar': desktopHideSidebar,
        'mobile-show-sidebar': mobileShowSidebar,
      },
    ]"
  >
    <AppMenu
      :model="menu"
      @menuitem-click="onMenuItemClick"
      @menu-toggle="onMenuToggle"
    />
    <AppTopbar @menu-toggle="onMenuToggle" :showHamburger="showHamburger" />
    <div class="content">
      <div class="router-view">
        <router-view></router-view>
      </div>
      <AppFooter />
    </div>
  </div>
</template>

<script>
import AppTopbar from "./AppTopbar";
import AppMenu from "./AppMenu.vue";
import AppFooter from "./AppFooter";
// import { mapGetters } from "vuex";
import AxiosService from "@/axiosServices/AxiosService";

export default {
  service: null,
  name: "App",
  components: {
    AppMenu,
    AppTopbar,
    AppFooter,
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      desktopHideSidebar: 0,
      mobileShowSidebar: 0,
      menu: [],
    };
  },
  created() {
    this.service = new AxiosService();
    this.service
      .readCustomEndpoint(
        "https://prestitosi-core.datarete.cloud/api/GetMainMenu"
      )
      .then((res) => {
        if (res) {
          this.menu = res.menu;
        }
      });
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };
  },
  methods: {
    onMenuToggle() {
      if (this.isDesktop) {
        this.desktopHideSidebar = !this.desktopHideSidebar;
      } else {
        this.mobileShowSidebar = !this.mobileShowSidebar;
      }
    },
    onMenuItemClick() {
      if (!this.isDesktop) {
        this.mobileShowSidebar = !this.mobileShowSidebar;
      }
    },
  },
  computed: {
    isDesktop() {
      return this.windowWidth > 991;
    },
    showHamburger() {
      if (this.isDesktop) {
        return this.desktopHideSidebar;
      } else {
        //return !this.mobileShowSidebar;
        return 1;
      }
    },
    // ...mapGetters(["menu"]),
  },
};
</script>

<style lang="scss">
</style>
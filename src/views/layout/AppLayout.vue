<template>
  <div
    :class="[
      'wrapper',
      {
        'desktop-hidden-sidebar':
          desktopHideSidebar || menuMode == 'prestitosi',
        'mobile-show-sidebar': mobileShowSidebar || menuMode == 'prestitosi',
      },
    ]"
  >
    <AppMenu
      v-if="menuMode == 'sidebar'"
      :model="menu"
      @menuitem-click="onMenuItemClick"
      @menu-toggle="onMenuToggle"
    />

    <AppTopbar
      v-if="menuMode == 'sidebar'"
      :model="menu"
      @menu-toggle="onMenuToggle"
      :showHamburger="showHamburger"
    />

    <AppPrestitosiTopbar
      v-if="menuMode == 'prestitosi'"
      :model="menu"
      @menu-toggle="onMenuToggle"
      :showHamburger="showHamburger"
    ></AppPrestitosiTopbar>

    <div
      class="content"
      :class="menuMode == 'prestitosi' ? 'content-prestitosi' : ''"
    >
      <div class="router-view">
        <router-view></router-view>
      </div>
      <AppFooter />
    </div>
  </div>
</template>

<script>
import AppTopbar from "./AppTopbar"
import AppPrestitosiTopbar from "./AppPrestitosiTopbar.vue"
import AppMenu from "./AppMenu.vue"
import AppFooter from "./AppFooter"
// import { mapGetters } from "vuex";
import AxiosService from "@/axiosServices/AxiosService"

export default {
  service: null,
  name: "App",
  components: {
    AppMenu,
    AppTopbar,
    AppFooter,
    AppPrestitosiTopbar,
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      desktopHideSidebar: 0,
      mobileShowSidebar: 0,
      menu: [],
      menuMode: "sidebar",
    }
  },
  created() {
    console.log("CURREN URL -- - - - --- -- -", window.location.href)

    const CURRENT_URL = window.location.href

    if (CURRENT_URL.includes("prestitosi-gest")) {
      this.menuMode = "prestitosi"
      this.service = new AxiosService()
      this.service
        .readCustomEndpoint(
          "https://prestitosi-core.datarete.cloud/api/GetMainMenu/G"
        )
        .then((res) => {
          if (res) {
            this.menu = res.menu
          }
        })
    } else {
      this.menuMode = "sidebar"
      this.service = new AxiosService()
      this.service
        .readCustomEndpoint(
          "https://prestitosi-core.datarete.cloud/api/GetMainMenu/C"
        )
        .then((res) => {
          if (res) {
            this.menu = res.menu
          }
        })
    }
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
  methods: {
    onMenuToggle() {
      if (this.isDesktop) {
        this.desktopHideSidebar = !this.desktopHideSidebar
      } else {
        this.mobileShowSidebar = !this.mobileShowSidebar
      }
    },
    onMenuItemClick() {
      if (!this.isDesktop) {
        this.mobileShowSidebar = !this.mobileShowSidebar
      }
    },
  },
  computed: {
    isDesktop() {
      return this.windowWidth > 991
    },
    showHamburger() {
      if (this.isDesktop) {
        return this.desktopHideSidebar
      } else {
        //return !this.mobileShowSidebar;
        return 1
      }
    },
    // ...mapGetters(["menu"]),
  },
}
</script>

<style lang="scss"></style>

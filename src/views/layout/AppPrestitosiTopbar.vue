<template>
  <div class="flex flex-column align-items-center prestitosi-topbar">
    <div
      class="w-full flex justify-content-end align-items-center prestitosi-top-subbar"
    >
      <span
        class="prestitosi-top-subbar-item mr-4"
        @click="$router.push({ name: 'DataDrive' })"
        ><i class="pi pi-file mr-2"></i> Documenti</span
      >
      <span class="prestitosi-top-subbar-item" @click="logout"
        ><i class="pi pi-sign-out mr-2"></i> Logout</span
      >
    </div>
    <div class="w-full flex align-items-center prestitosi-bottom-subbar">
      <span class="mr-4"
        ><img
          @click="$router.push('/')"
          :src="logoCliente"
          style="width: 172px"
      /></span>
      <div class="flex-grow-1 prestitosi-menubar">
        <AppTopMenu :model="model"></AppTopMenu>
      </div>
      <div class="ms-auto d-flex align-items-center">
        <span class="me-2"
          >Ciao,
          <strong>{{ loggedUser.id ? loggedUser.nome : "User" }}</strong>
        </span>

        <div class="grid-center">
          <Avatar
            v-if="loggedUser.imgprofilo"
            class="mr-2"
            :image="loggedUser.imgprofilo"
          ></Avatar>
          <Avatar
            v-else
            class="mr-2"
            :label="loggedUser.id ? loggedUser.nome.slice(0, 1) : 'U'"
          ></Avatar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { AUTH_LOGOUT } from "@/store/actions/auth"
import Avatar from "primevue/avatar"
import AxiosService from "@/axiosServices/AxiosService"
import { useStore } from "vuex"
import AppTopMenu from "./AppTopMenu.vue"

export default {
  props: {
    model: Object,
  },
  created() {
    const store = useStore()

    setTimeout(() => {
      this.userVoip = store.getters["loggedUser"]
      console.log("logged user in topbar, ", store.getters["loggedUser"])
    }, 1000)
  },
  data() {
    return {
      userVoip: null,
      logoCliente:
        "https://prestitosifinance.it/wp-content/uploads/2022/09/PRESTITOSI.png",
    }
  },
  methods: {
    onMenuToggle(event) {
      this.$emit("menu-toggle", event)
    },
    logout: function () {
      const service = new AxiosService("Auth/Logout")
      service
        .create()
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        console.log("logout")
        this.$router.push("login")
      })
    },
  },
  computed: mapGetters(["loggedUser"]),
  components: { Avatar, AppTopMenu },
}
</script>

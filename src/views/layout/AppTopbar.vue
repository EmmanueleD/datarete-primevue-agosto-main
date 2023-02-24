<template>
  <div class="topbar d-flex align-items-center">
    <transition name="expand">
      <div v-if="showHamburger" class="hamburger-wrapper">
        <i class="pi pi-bars hamburger-toggle" @click="onMenuToggle"></i>
      </div>
    </transition>
    <span> <span class="fw-bold">Data Rete</span></span>
    <div class="ms-auto d-flex align-items-center">
      <div class="flex mr-4" v-if="userVoip">
        <!-- <i class="pi pi-circle-fill text-green-500 mr-2"></i> -->
        <img
          style="width: 30px; height: 30px"
          src="../../assets/images/telemax.gif"
          class="mr-2"
        />
        <div class="flex flex-column">
          <span class="text-xs text-gray-800">VoIP disponibile</span>
          <span class="text-xs text-gray-800"
            >int:: {{ userVoip.numero_voispeed }}</span
          >
        </div>
      </div>
      <div class="flex mr-4" v-else>
        <!-- <i class="pi pi-phone text-red-500 mr-2"></i> -->
        <img
          style="width: 30px; height: 30px"
          src="../../assets/images/telenomaxred.gif"
          class="mr-2"
        />
        <span class="text-xs">voip non disponibile</span>
      </div>
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

      <Button class="p-button-sm p-button-secondary" @click="logout"
        >LogOut</Button
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { AUTH_LOGOUT } from "@/store/actions/auth"
import Avatar from "primevue/avatar"
import AxiosService from "@/axiosServices/AxiosService"
import { useStore } from "vuex"
export default {
  props: {
    showHamburger: Number,
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
  components: { Avatar },
}
</script>

<style>
.hamburger-wrapper {
  overflow: hidden;
  width: 1.5rem;
  height: 100%;
  display: grid;
  place-content: center left;
}

.hamburger-toggle {
  cursor: pointer;
}

.expand-enter-active,
.expand-leave-active {
  transition-property: width, height;
  transition-duration: 0.4s;
  transition-timing-function: ease-out;
}

.expand-enter-from,
.expand-leave-to {
  width: 0px;
  height: 0px;
}
</style>

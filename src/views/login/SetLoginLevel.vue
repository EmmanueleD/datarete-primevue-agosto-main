<template>
  <div class="login-wrapper">
    <form class="form-signin" @submit.prevent="enter">
      <img class="logo mb-1" :src="company.logo" />
      <h1 class="h3 mb-4 font-weight-normal">{{ company.nome }}</h1>

      <h2>Seleziona il livello di Login</h2>
      <Dropdown
        class="mb-3"
        v-model="level_selected"
        optionLabel="Nome"
        optionValue="Id"
        placeholder="Seleziona un'opzione"
        :options="level_options"
      ></Dropdown>

      <button
        @click="setLoginLevel"
        :disabled="!level_selected"
        class="btn btn-lg btn-primary btn-block"
        type="submit"
      >
        Entra
      </button>
      <Message
        v-if="accessoNonAbilitatoVisible"
        severity="error"
        @close="accessoNonAbilitatoVisible = false"
        >Accesso non abilitato</Message
      >
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import AxiosService from "@/axiosServices/AxiosService"
import { AUTH_LOGOUT } from "@/store/actions/auth"
export default {
  name: "SetLoginLevel",
  created() {
    this.level_selected = 0
    this.level_options = this.getLivelliLogin

    const CURRENT_URL = window.location.href

    if (CURRENT_URL.includes("prestitosi-gest")) {
      this.isThisGest = true
    } else {
      this.isThisCrm = true
    }

    this.$store.getters["loggedUser"].enabled_crm
      ? (this.enabled_crm = true)
      : (this.enabled_crm = false)
    this.$store.getters["loggedUser"].enabled_gestionale
      ? (this.enabled_gestionale = true)
      : (this.enabled_gestionale = false)
  },

  data() {
    return {
      level_selected: 0,
      level_options: [],
      enabled_crm: false,
      enabled_gestionale: false,
      isThisCrm: false,
      isThisGest: false,
      accessoNonAbilitatoVisible: false,
    }
  },
  service: null,
  methods: {
    setLoginLevel() {
      if (
        (this.isThisCrm && this.enabled_crm) ||
        (this.isThisGest && this.enabled_crm)
      ) {
        const service = new AxiosService("SetLoginLevel/" + this.level_selected)
        service
          .create()
          .then((res) => console.log(res))
          .catch((err) => console.log(err))
        this.$router.push("/")
      } else {
        this.accessoNonAbilitatoVisible = true
      }
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
  computed: {
    ...mapGetters(["company", "getLivelliLogin", "loggedUser"]),
  },
}
</script>

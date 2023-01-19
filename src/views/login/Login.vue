<template>
  <div class="login-wrapper">
    <div class="form-signin">
      <form @submit.prevent="login">
        <img class="logo mb-3" :src="company.logo" />
        <h1 class="mb-5">{{ company.nome }}</h1>
        <h2>DataRete Posadas</h2>
        <h3>Accesso</h3>
        <span class="w-100 p-float-label mb-5">
          <InputText
            id="username"
            class="w-100"
            type="text"
            v-model="username"
            placeholder="Nome Utente"
          />
        </span>
        <span class="w-100 p-float-label mb-5">
          <Password
            id="password"
            class="w-100"
            v-model="password"
            :feedback="false"
            placeholder="Password"
            toggleMask
          />
        </span>
        <Button label="Entra" class="w-100" type="submit" />
      </form>
      <span
        v-if="$store.getters.authStatus == 'error'"
        style="margin-top: 1rem; color: tomato"
        >Problema con l'autentizacione<br />Prova a reinserire i dati</span
      >
    </div>
  </div>
</template>

<script>
import AxiosService from "@/axiosServices/AxiosService";
import { AUTH_REQUEST } from "../../store/actions/auth";
import store from "../../store";
import { mapGetters } from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      const authObject = {
        username: this.username,
        password: this.password,
      };
      this.$store
        .dispatch(AUTH_REQUEST, authObject)
        .then((res) => {
          console.log(" STORE GETTER STATUS  ", store.getters.authStatus);
          this.authStatus = store.getters.authStatus;
          if (
            res.data.ActionRequired != null &&
            res.data.ActionRequired != ""
          ) {
            console.log("action required TRUE");
            if (res.data.ActionRequired == "ChangePassword") {
              console.log("action required CHANGE PASSWORD");
              this.$router.push("changepasswordrequest");
            }
          } else if (res.data.livelli.length > 1) {
            console.log("action required SELECT LEVEL");
            this.$router.push("setloginlevel");
          } else {
            const service = new AxiosService(
              "SetLoginLevel/" + res.data.livelli[0].Id
            );
            service
              .create()
              .then((res) => console.log("LOGIN ", res))
              .catch((err) => console.log(err));
            this.$router.push("/");
          }
        })
        .catch(() => {
          this.authStatus = store.getters.authStatus;
          console.log(" STORE GETTER STATUS  ", store.getters.authStatus);
        });
    },
  },
  beforeMount() {
    if (store.getters.isAuthenticated) {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters(["company"]),
  },
};
</script>
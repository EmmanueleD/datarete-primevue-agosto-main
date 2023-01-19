<template>
  <Suspense>
    <template #default>
      <router-view></router-view>
    </template>
    <template #fallback> Caricando... </template>
  </Suspense>

  <!-- <router-view v-if="configuration_loaded && isAuthenticated && user_loaded"></router-view>
  <login v-else-if="configuration_loaded && !isAuthenticated" class="loading-config"> Vai al login </login>
  <div v-else class="loading-config">
    <ProgressSpinner />
  </div>
  <ConfirmDialog></ConfirmDialog> -->
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { CONFIG_REQUEST } from "./store/actions/config";
import { AUTH_LOGOUT } from "./store/actions/auth";
import { USER_REQUEST } from "./store/actions/user";
import axios from "axios";
import ProgressSpinner from "primevue/progressspinner";
import Login from "./views/login/Login.vue";
import ConfirmDialog from "primevue/confirmdialog";

export default {
  name: "App",
  components: { ProgressSpinner, Login, ConfirmDialog },
  setup() {
    const store = useStore();

    // const configuration_loaded = computed(() => {
    //   return store.getters["configuration_loaded"];
    // });
    const isAuthenticated = computed(() => {
      return store.getters["isAuthenticated"];
    });
    // const user_loaded = computed(() => {
    //   return store.getters["user_loaded"];
    // });

    //Se autenticato ricarico dati utente
    if (isAuthenticated.value) {
      store.dispatch(USER_REQUEST);
    }

    // //Richiesta di configurazioni
    // store.dispatch(CONFIG_REQUEST).then(() => { });
    //Se intercetta un errore 401 esegue il logout e rimanda alla pagina di login
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          store.dispatch(AUTH_LOGOUT).then(() => {
            this.$router.push("/");
          });
        }
        throw err;
      });
    });

    return {};
  },
};
</script>

<style>
.loading-config {
  width: 100%;
  height: 100vh;
  display: grid;
  place-content: center;
}
</style>

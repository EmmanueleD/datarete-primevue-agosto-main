import { createApp } from "vue";
import App from "./App.vue";

import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.put["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.baseURL = "https://prestitosi-core.datarete.cloud/api/";
//To load existing token with a refresh
const token = localStorage.getItem("DR_P-user-token");
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
}

import router from "./router";

import store from "./store";

import firebaseMessaging from "../firebaseConfig";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./assets/scss/style.scss";

import NotificationService from "./utils/Notification.vue";

import PrimeVueConfigurator from "./utils/PrimeVueConfigurator";
import ConfirmationService from "primevue/confirmationservice";

import VueGoogleMaps from "@fawmi/vue-google-maps";

const app = createApp({
  extends: App,
  mixins: [NotificationService],
  // components: {
  //   Hello,
  //   Thing,
  // }
});

app.config.globalProperties.$messaging = firebaseMessaging;

PrimeVueConfigurator.init(app);

app.use(router);
app.use(store);
app.use(ConfirmationService);

app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBM5-j7inzSY6mzwCJV9rOjIFbI-k0olUA",
    language: "it",
  },
});

app.mount("#app");

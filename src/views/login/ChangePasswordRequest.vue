<template>
  <div class="login-wrapper">
    <div v-if="correctEmail == 'empty'">
      <form class="form-signin" @submit.prevent="request">
        <img class="logo mb-1" :src="company.logo" />
        <h1 class="h3 mb-4 font-weight-normal">{{ company.nome }}</h1>

        <h2>Richiedi il cambio password</h2>

        <div class="grid justify-content-center mb-4">

          <div class="col-12">
            <h5>Email</h5>
            <InputText class="w-full" type="email" v-model="email"></InputText>
          </div>
        </div>
        <div class="col-12 mt-4">
          <button @click="request" class="btn btn-lg btn-primary btn-block" type="submit">
            Richiedi Cambio Password
          </button>
        </div>
      </form>
    </div>
    <div v-else-if="correctEmail == 'wrong'">
      <form class="form-signin" @submit.prevent="request">
        <img class="logo mb-1" :src="company.logo" />
        <h1 class="h3 mb-4 font-weight-normal">{{ company.nome }}</h1>

        <h2>Richiedi il cambio password</h2>

        <div class="grid justify-content-center mb-4">
          <div class="col-12">
            <p style="color:white; background: tomato; border-radius: 5px; padding: 1rem 2rem">Sembra che l'indirizzo
              email inserito non
              esista.
              Prova ad inserirlo
              di nuovo</p>
          </div>
          <div class="col-12">
            <h5>Email</h5>
            <InputText class="w-full" type="email" v-model="email"></InputText>
          </div>
        </div>
        <div class="col-12 mt-4">
          <button @click="request" class="btn btn-lg btn-primary btn-block" type="submit">
            Richiedi Cambio Password
          </button>
        </div>
      </form>
    </div>
    <div v-else-if="correctEmail == 'correct'" class="flex flex-column form-signin">
      <i v-if="loading" class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
      <h2 v-if="!loading">A breve riceverai una mail con il link per cambiare la tua password</h2>

      <div class="col-12 mt-4">
        <button @click="request" class="btn btn-lg btn-primary btn-block" type="submit">
          Richiedi un altro link
        </button>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import AxiosService from "@/axiosServices/AxiosService";

export default {
  name: "ChangePassword",
  data() {
    return {
      invalid: false,
      newPassword: "",
      confirmPassword: "",
      email: "",
      correctEmail: "empty",
      loading: false,
    };
  },
  service: null,
  created() {
    this.service = new AxiosService('ChangePassword/')
  },
  methods: {
    request() {
      this.loading = true
      this.service.updateCustomEndpoint('ChangePassword/Request/' + this.email)
        .then(res => {
          res ? this.correctEmail = 'correct' : this.correctEmail = 'wrong'
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  computed: {
    ...mapGetters(["company"]),
  },
};
</script>

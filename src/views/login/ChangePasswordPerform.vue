<template>
  <div class="login-wrapper">
    <form class="form-signin" @submit.prevent="request">


      <h2>Cambia password</h2>
      <div class="grid justify-content-center mt-4">
        <div class="col-12">
          <h5>Nuova Password</h5>
          <Password v-model="newPassword" toggleMask></Password>
        </div>
        <div class="col-12">
          <h5>Conferma Password</h5>
          <Password v-model="confirmPassword" toggleMask></Password>
        </div>
        <div class="col-12 mt-4">
          <button :disabled="newPassword != confirmPassword" @click="perform" class="btn btn-lg btn-primary btn-block"
            type="submit">
            Cambia password
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import AxiosService from "@/axiosServices/AxiosService";

const router = useRouter()
const route = useRoute()

const newPassword = ref('')
const confirmPassword = ref('')
const emailCode = ref('')


const service = new AxiosService('ChangePassword/')
emailCode.value = route.params.code

function perform() {
  // const router = useRouter()
  if (newPassword.value == confirmPassword.value) {
    service.updateCustomEndpoint('ChangePassword/Perform/' + emailCode.value + '/' + newPassword.value).then(res => {
      if (res) {
        console.log('gotologin')
        router.push({ name: "Login" });
      } else {
        console.log('gotochangepassword')
        router.push({ name: "ChangePasswordRequest" });
      }
    })
  } else {
    return false
  }
}

</script>

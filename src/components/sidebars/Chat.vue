<template>


  <div class="chat-container">
    <div class="messages messages-wrapper">
      <ChatMessage v-for="message in messages" :key="message.id" :message="message"></ChatMessage>
    </div>
    <div class="new-message flex justify-content-between align-items-stretch">

      <div class="message-editor flex-grow">
        <Textarea v-model="newMessage.message"></Textarea>
      </div>
      <div class="flex flex-column justify-content-around align-items-center">
        <FileUpload @uploader="uploadFile" :disabled="newMessage.files.length > 0" :fileLimit="1" mode="basic"
          uploadIcon="pi pi-paperclip" name="demo[]" :customUpload="true" :previewWidth="50" :maxFileSize="1000000"
          :chooseLabel="newMessage.files.length.toString()" :auto='true' />

        <!-- <i role="button" style="font-size:1.5rem" class=" pi pi-fw pi-paperclip"></i> -->
        <i v-if="!isSending" @click="sendMessage" role="button" style="font-size:1.5rem" class=" pi pi-fw pi-send"></i>
        <i v-else @click="sendMessage" role="button" style="font-size:1.5rem" class="pi pi-spin pi-spinner"></i>
      </div>

    </div>
    <div class="flex justify-content-center w-full p-2">
      <Button icon="pi pi-check" label="Chiudi ticket"></Button>
    </div>
  </div>
</template>

<script setup>
import auth from '@/store/modules/auth';
import AxiosService from '@/axiosServices/AxiosService';
import { ref, defineEmits, defineProps, onMounted, nextTick } from 'vue'
import ChatMessage from '../ChatMessage.vue'
const emit = defineEmits(['event_HideChat'])
const props = defineProps({
  sidebarVisible: Boolean,
  sidebarData: Object
})

const IdUser = auth.state.IdUser

const newMessage = ref({
  data: new Date(),
  message: "",
  id_user: IdUser,
  files: [
    // {
    //   id: 0,
    //   file_url: ""
    // }
  ]
})

const messages = ref([])
const serviceGET = new AxiosService('HelpDeskChat?idTicket=')
function loadMessages() {
  serviceGET.readCustomEndpoint('HelpDeskChat?idTicket=' + props.sidebarData.id)
    .then(res => {
      messages.value = res
      isSending.value = false
      scrollDown()
    })
}


const isSending = ref(false)

function uploadFile(ev) {

  const service = new AxiosService('files')
  if (!isSending.value) {
    isSending.value = true
    let promises = [];
    for (let i = 0; i < ev.files.length; i++) {
      const formData = new FormData();
      formData.append("file", ev.files[i]);
      switch (props.sidebarData.id_type) {
        case 1:
          promises.push(service.postCustomEndpoint('Upload?type=' + 'SupportoIT', '', formData));
          break;
        case 2:
          promises.push(service.postCustomEndpoint('Upload?type=' + 'SupportoLegale', '', formData));
          break;
        case 3:
          promises.push(service.postCustomEndpoint('Upload?type=' + 'SupportoPratiche', '', formData));
          break;

        default:
          break;
      }

    }
    Promise.all(promises)
      .then((results) => {
        results.forEach((res) => {
          if (res) {
            newMessage.value.files.push({ file_url: res });
          }
        });
      })
      .finally(() => {
        isSending.value = false
      })
  }
  return
}

const servicePOST = new AxiosService('HelpDeskChat?idTicket=' + props.sidebarData.id)
function sendMessage() {
  isSending.value = true
  servicePOST.postCustomEndpoint('HelpDeskChat?idTicket=' + props.sidebarData.id, "", newMessage.value)
    .then(() => {
      resetNewMessage()
      loadMessages()
    })
    .finally(() => {
      isSending.value = false
    })
}


function resetNewMessage() {
  newMessage.value = {
    data: new Date(),
    message: "",
    id_user: IdUser,
    files: [
      // {
      //   id: 0,
      //   file_url: ""
      // }
    ]
  }
}

async function scrollDown() {
  let container = document.querySelector(".messages-wrapper");
  await nextTick()
  container.scrollTop = container.scrollHeight;
}

onMounted(() => {
  loadMessages()
})

</script>
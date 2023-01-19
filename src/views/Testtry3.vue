<template>

  <div class="grid wrapper">
    <h1>Capitoli formativi</h1>

    <div class="col-12 grid">
      <Card class="col-4">

        <template #content>

          <h4>Titolo capitolo formativo</h4>

          <iframe src="https://www.youtube.com/embed/bKR5wkYeKbM" title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>

        </template>

      </Card>

    </div>

    <div class="col-12 flex justify-content-end align-items-end">
      <SpeedDial :model="items" :radius="120" direction="up-left" type="quarter-circle"
        buttonClass="p-button-success" />
    </div>
  </div>



  <Sidebar v-model:visible="emailSidebarVisible" :baseZIndex="10000" position="right" class="p-sidebar-lg">
    <h3>Data-mail</h3>

    <div class="grid">

      <div class="flex flex-column col-12 ">
        <label>Destinatario</label>
        <InputText type="text" v-model="mail.destinatario"></InputText>
      </div>

      <div class="flex flex-column col-12 ">
        <label>Oggetto</label>
        <InputText type="text" v-model="mail.oggetto"></InputText>
      </div>

      <div class="col-12 mb-4">
        <Editor id="editor" v-model="mail.text" editorStyle="height: 400px">
          <template v-slot:toolbar>
            <span class="ql-formats">
              <button class="ql-bold" v-tooltip.bottom="'Bold'"></button>
              <button class="ql-italic" v-tooltip.bottom="'Italic'"></button>
              <button class="ql-underline" v-tooltip.bottom="'Underline'"></button>
            </span>
          </template>
        </Editor>
      </div>

      <div class="col-12 mt-4">
        <div class="flex justify-content-end ">
          <Button label="Invia"></Button>
        </div>
      </div>

    </div>
  </Sidebar>

  <Sidebar v-model:visible="smsSidebarVisible" :baseZIndex="10000" position="right" class="p-sidebar-lg">
    <h3>Data-SMS</h3>

    <div class="grid">

      <div class="flex flex-column col-12 ">
        <label>Destinatario</label>
        <InputText type="text" v-model="sms.destinatario"></InputText>
      </div>



      <div class="col-12 mb-4">
        <Textarea :rows="10"></Textarea>
      </div>

      <div class="col-12">
        <div class="flex justify-content-end ">
          <Button label="Invia"></Button>
        </div>
      </div>

    </div>

  </Sidebar>

  <Sidebar v-model:visible="waSidebarVisible" :baseZIndex="10000" position="right" class="p-sidebar-lg">
    <h3>Data-WA</h3>

    <div class="grid">

      <div class="flex flex-column col-12 ">
        <label>Destinatario</label>
        <InputText type="text" v-model="wa.destinatario"></InputText>
      </div>



      <div class="col-12">
        <Textarea></Textarea>
      </div>

      <div class="col-12">
        <div class="flex justify-content-end ">
          <Button label="Invia"></Button>
        </div>
      </div>

    </div>

  </Sidebar>
</template>

<script setup>
import { ref } from 'vue';

const emailSidebarVisible = ref(false)
function showEmailSidebar() {
  emailSidebarVisible.value = true
}

const smsSidebarVisible = ref(false)
function showSMSSidebar() {
  smsSidebarVisible.value = true
}

const waSidebarVisible = ref(false)
function showWASidebar() {
  waSidebarVisible.value = true
}


const mail = ref({
  oggetto: '',
  text: '',
  destinatario: 'mail@test.it',
})

const sms = ref({
  text: '',
  destinatario: '3436879880',
})

const wa = ref({
  text: '',
  destinatario: '3436879880',
})

const items = ref([
  {
    icon: 'pi pi-envelope',
    command: () => {
      showEmailSidebar()
    }
  },
  {
    icon: 'pi pi-comment',
    command: () => {
      showSMSSidebar()
    }
  },
  {
    icon: 'pi pi-whatsapp',
    command: () => {
      showWASidebar()
    }
  }
]);

</script>

<style>
a {
  text-decoration: none;
}
</style>
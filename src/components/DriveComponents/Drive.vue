<template>
  <div class="wrapper">
    <div
      class="mb-4 plugin-title flex justify-content-between align-items-center"
    >
      <h1>DataRete Drive</h1>
      <Chip
        icon="pi pi-star-fill"
        label="PlugIn"
        class="small-chip custom-chip"
      ></Chip>
    </div>
    <Card class="w-full flex align-items-center my-4">
      <template #content>
        <div class="flex align-items-center gap-2">
          <Button
            @click="getDriveRoot"
            icon="pi pi-home"
            class="p-button-text text-gray-900"
          />
          <div
            v-for="(step, index) in steps"
            :key="step.id"
            class="flex align-items-center"
          >
            <i class="pi pi-chevron-right"></i>
            <Button
              @click="breadcrumbNavigation(step, index)"
              :label="step.nome"
              class="p-button-text text-gray-900"
            ></Button>
          </div>
        </div>
        <div class="w-full flex justify-content-end gap-2">
          <Button
            @click="showSidebar"
            icon="pi pi-plus"
            label="Crea una Cartella"
          ></Button>
          <FileUpload
            @uploader="uploadFile"
            mode="basic"
            uploadIcon="pi pi-upload"
            name="demo[]"
            :customUpload="true"
            :previewWidth="50"
            :maxFileSize="1000000"
            chooseLabel="Carica Documento"
            :auto="true"
          />
        </div>
      </template>
    </Card>
    <Card>
      <template #content>
        <div v-if="!loading" class="py-4">
          <div
            v-if="folders.length > 0"
            class="w-full flex flex-wrap align-items-center"
          >
            <DriveFolder
              @click="openFolder(folder)"
              @contextmenu.prevent="showFolderContextMenu($event, folder)"
              v-for="folder in folders"
              :key="folder.id"
              :item="folder"
              aria-haspopup="true"
            >
            </DriveFolder>
            <ContextMenu ref="folderMenu" :model="folderContextMenu" />
          </div>
          <div
            v-if="files.length > 0"
            class="w-full flex flex-wrap align-items-center"
          >
            <DriveFile
              @click="showFile(file)"
              @contextmenu.prevent="showFilesContextMenu($event, file)"
              v-for="file in files"
              :key="file.id"
              :item="file"
              aria-haspopup="true"
            >
            </DriveFile>
            <ContextMenu ref="fileMenu" :model="filesContextMenu" />
          </div>
        </div>
        <div v-else class="w-full flex justify-content-start m-4 p-4">
          <i class="pi pi-spin pi-spinner text-4xl"></i>
        </div>
      </template>
    </Card>
  </div>
  <Sidebar
    v-model:visible="sidebarVisible"
    position="right"
    class="p-sidebar-md"
  >
    <h1 v-if="!sidebarData.id" class="mb-4">Nuova Cartella</h1>
    <h1 v-else class="mb-4">Modifica Cartella</h1>

    <div class="w-full flex flex-column mb-4">
      <label>Nome</label>
      <InputText v-model="sidebarData.nome"></InputText>
    </div>

    <h4>Seleziona l'icona della cartella</h4>
    <i
      @click="sidebarData.icona = 'pi-folder'"
      role="button"
      class="border-2 p-2 border-round-lg pi pi-folder text-5xl mx-3 my-4"
      :class="{ 'border-yellow-500': sidebarData.icona == 'pi-folder' }"
    ></i>
    <i
      @click="sidebarData.icona = 'pi-shopping-bag'"
      role="button"
      class="border-2 p-2 border-round-lg pi pi-shopping-bag text-5xl mx-3 my-4"
      :class="{ 'border-yellow-500': sidebarData.icona == 'pi-shopping-bag' }"
    ></i>
    <i
      @click="sidebarData.icona = 'pi-heart-fill'"
      role="button"
      class="border-2 p-2 border-round-lg pi pi-heart-fill text-5xl mx-3 my-4"
      :class="{ 'border-yellow-500': sidebarData.icona == 'pi-heart-fill' }"
    ></i>
    <i
      @click="sidebarData.icona = 'pi-circle'"
      role="button"
      class="border-2 p-2 border-round-lg pi pi-circle text-5xl mx-3 my-4"
      :class="{ 'border-yellow-500': sidebarData.icona == 'pi-circle' }"
    ></i>
    <i
      @click="sidebarData.icona = 'pi-circle-fill'"
      role="button"
      class="border-2 p-2 border-round-lg pi pi-circle-fill text-5xl mx-3 my-4"
      :class="{ 'border-yellow-500': sidebarData.icona == 'pi-circle-fill' }"
    ></i>
    <i
      @click="sidebarData.icona = 'pi-bolt'"
      role="button"
      class="border-2 p-2 border-round-lg pi pi-bolt text-5xl mx-3 my-4"
      :class="{ 'border-yellow-500': sidebarData.icona == 'pi-bolt' }"
    ></i>
    <i
      @click="sidebarData.icona = 'pi-box'"
      role="button"
      class="border-2 p-2 border-round-lg pi pi-box text-5xl mx-3 my-4"
      :class="{ 'border-yellow-500': sidebarData.icona == 'pi-box' }"
    ></i>
    <i
      @click="sidebarData.icona = 'pi-flag'"
      role="button"
      class="border-2 p-2 border-round-lg pi pi-flag text-5xl mx-3 my-4"
      :class="{ 'border-yellow-500': sidebarData.icona == 'pi-flag' }"
    ></i>
    <i
      @click="sidebarData.icona = 'pi-wallet'"
      role="button"
      class="border-2 p-2 border-round-lg pi pi-wallet text-5xl mx-3 my-4"
      :class="{ 'border-yellow-500': sidebarData.icona == 'pi-wallet' }"
    ></i>
    <i
      @click="sidebarData.icona = 'pi-book'"
      role="button"
      class="border-2 p-2 border-round-lg pi pi-book text-5xl mx-3 my-4"
      :class="{ 'border-yellow-500': sidebarData.icona == 'pi-book' }"
    ></i>
    <i
      @click="sidebarData.icona = 'pi-shield'"
      role="button"
      class="border-2 p-2 border-round-lg pi pi-shield text-5xl mx-3 my-4"
      :class="{ 'border-yellow-500': sidebarData.icona == 'pi-shield' }"
    ></i>
    <i
      @click="sidebarData.icona = 'pi-phone'"
      role="button"
      class="border-2 p-2 border-round-lg pi pi-phone text-5xl mx-3 my-4"
      :class="{ 'border-yellow-500': sidebarData.icona == 'pi-phone' }"
    ></i>
    <i
      @click="sidebarData.icona = 'pi-key'"
      role="button"
      class="border-2 p-2 border-round-lg pi pi-key text-5xl mx-3 my-4"
      :class="{ 'border-yellow-500': sidebarData.icona == 'pi-key' }"
    ></i>
    <i
      @click="sidebarData.icona = 'pi-envelope'"
      role="button"
      class="border-2 p-2 border-round-lg pi pi-envelope text-5xl mx-3 my-4"
      :class="{ 'border-yellow-500': sidebarData.icona == 'pi-envelope' }"
    ></i>
    <i
      @click="sidebarData.icona = 'pi-globe'"
      role="button"
      class="border-2 p-2 border-round-lg pi pi-globe text-5xl mx-3 my-4"
      :class="{ 'border-yellow-500': sidebarData.icona == 'pi-globe' }"
    ></i>
    <i
      @click="sidebarData.icona = 'pi-star-fill'"
      role="button"
      class="border-2 p-2 border-round-lg pi pi-star-fill text-5xl mx-3 my-4"
      :class="{ 'border-yellow-500': sidebarData.icona == 'pi-star-fill' }"
    ></i>
    <i
      @click="sidebarData.icona = 'pi-th-large'"
      role="button"
      class="border-2 p-2 border-round-lg pi pi-th-large text-5xl mx-3 my-4"
      :class="{ 'border-yellow-500': sidebarData.icona == 'pi-th-large' }"
    ></i>

    <div class="w-full flex justify-content-end mb-4">
      <div py-4>
        <Button
          v-if="!sidebarData.id"
          :loading="loading"
          @click="saveFolder"
          label="Crea la cartella"
        ></Button>
        <Button
          v-else
          :loading="loading"
          @click="saveFolder"
          label="Salva le modifiche alla cartella"
        ></Button>
      </div>
    </div>
  </Sidebar>
  <Dialog
    header="Visualizzatore documenti by ArkadiaGroup"
    v-model:visible="showDialogDocumento"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw', height: '60vh' }"
    :maximizable="true"
    :modal="true"
  >
    <iframe
      :src="currentFile.url"
      frameBorder="0"
      scrolling="auto"
      width="100%"
      height="95%"
    ></iframe>
  </Dialog>
  <Dialog
    header="Rinomina il file"
    v-model:visible="rinominaVisible"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
  >
    <div class="w-full flex flex-columm align-items-start">
      <label>Nome file</label><br />
      <InputText
        class="w-full"
        type="text"
        v-model="currentFile.nome"
      ></InputText>
    </div>
    <template #footer>
      <Button
        label="Annulla"
        icon="pi pi-times"
        @click="rinominaHide"
        class="p-button-text"
      />
      <Button
        label="Rinomina"
        icon="pi pi-check"
        @click="rinominaFile"
        autofocus
      />
    </template>
  </Dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import DriveFolder from "@/components/DriveComponents/DriveFolder.vue";
import DriveFile from "@/components/DriveComponents/DriveFile.vue";
import AxiosService from "@/axiosServices/AxiosService";

const loading = ref(false);

const props = defineProps({
  idDrive: Number,
});

const folders = ref([]);
const steps = ref([]);

function getDriveRoot() {
  loading.value = true;
  const service = new AxiosService("Drive/GetFolders/" + props.idDrive + "/0");
  service
    .read()
    .then((res) => {
      steps.value.splice(0);
      folders.value = res;
    })
    .finally(() => {
      loading.value = false;
      getFiles(0);
    });
}

function getFiles(idFolder) {
  loading.value = true;
  const service = new AxiosService(
    "Drive/GetFiles/" + props.idDrive + "/" + idFolder
  );
  service
    .read()
    .then((res) => (files.value = res))
    .finally(() => (loading.value = false));
}

function openFolder(folder) {
  console.log(folder);
  loading.value = true;
  const service = new AxiosService(
    "Drive/GetFolders/" + props.idDrive + "/" + folder.id
  );
  service
    .read()
    .then((res) => {
      if (steps.value[0]) {
        if (steps.value[0].id == 0) {
          steps.value.shift();
        }
      }
      steps.value.push(folder);
      folders.value = res;
    })
    .finally(() => {
      loading.value = false;
      getFiles(folder.id);
    });
}

function breadcrumbNavigation(step, index) {
  const currentStep = { ...step };
  steps.value.splice(index, steps.value.length);
  openFolder(currentStep);
}

const sidebarVisible = ref(false);
const sidebarData = ref({
  nome: "",
  icona: "pi-folder",
});
function showSidebar() {
  sidebarVisible.value = true;
}
function hideSidebar(currentStep) {
  sidebarVisible.value = false;
  sidebarData.value = {
    nome: "",
    icona: "pi-folder",
  };
  breadcrumbNavigation(currentStep, steps.value.length - 1);
}

function saveFolder() {
  loading.value = true;

  const currentStep =
    steps.value.length > 0
      ? { ...steps.value[steps.value.length - 1] }
      : { id: 0 };

  if (!sidebarData.value.id) {
    const service = new AxiosService(
      "Drive/CreateFolder/" + props.idDrive + "/" + currentStep.id
    );
    service
      .create(sidebarData.value)
      .then((res) => console.log(res))
      .finally(() => {
        loading.value = false;
        hideSidebar(currentStep);
      });
  } else {
    const service = new AxiosService("Drive/EditFolder/" + props.idDrive);
    service
      .update(sidebarData.value)
      .then((res) => console.log(res))
      .finally(() => {
        loading.value = false;
        hideSidebar(currentStep);
      });
  }
}

function deleteFolder(folder) {
  console.log(
    "🚀 ~ file: DataDrive.vue ~ line 205 ~ deleteFolder ~ folder",
    folder
  );
  loading.value = true;
  const service = new AxiosService("Drive/DeleteFolder/" + props.idDrive + "/");
  service
    .delete(folder.id)
    .then((res) => console.log(res))
    .finally(() => {
      loading.value = false;
      if (steps.value.length == 0) {
        breadcrumbNavigation(currentFolder.value, 0);
      } else {
        breadcrumbNavigation(currentFolder.value, steps.value.length - 1);
      }
    });
}

const folderMenu = ref();
const fileMenu = ref();
const folderContextMenu = ref([
  {
    label: "Apri",
    icon: "pi pi-arrow-up-right",
    command: () => openFolder(currentFolder.value),
  },
  {
    label: "Modifica",
    icon: "pi pi-pencil",
    command: () => {
      sidebarData.value = { ...toActionFolder.value };
      showSidebar();
    },
  },
  {
    label: "Elimina",
    icon: "pi pi-trash",
    command: () => deleteFolder(toActionFolder.value),
  },
]);

const filesContextMenu = ref([
  {
    label: "Apri",
    icon: "pi pi-arrow-up-right",
    command: () => showFile(currentFile.value),
  },
  {
    label: "Modifica",
    icon: "pi pi-pencil",
    command: () => {
      showRinominaFile();
    },
  },
  {
    label: "Elimina",
    icon: "pi pi-trash",
    command: () => deleteFile(currentFile.value),
  },
]);
const toActionFolder = ref();
function showFolderContextMenu(event, folder) {
  toActionFolder.value = { ...folder };
  folderMenu.value.show(event);
}

function showFilesContextMenu(event, file) {
  currentFile.value = { ...file };
  fileMenu.value.show(event);
}

const urlFile = ref();
const currentFileName = ref();
const currentFile = ref();
const files = ref();

function uploadFile(ev) {
  loading.value = true;
  urlFile.value = "";
  const service = new AxiosService("files");
  for (let i = 0; i < ev.files.length; i++) {
    const formData = new FormData();
    formData.append("file", ev.files[i]);
    service
      .postCustomEndpoint("Upload?type=" + "DataDriveFiles", "", formData)
      .then((res) => {
        console.log(
          "🚀 ~ file: NuovaCircolare.vue ~ line 78 ~ uploadFile ~ res",
          res
        );
        urlFile.value = res;
      })
      .finally(() => {
        const service = new AxiosService(
          "Drive/AddFile/" + props.idDrive + "/" + currentFolderId.value
        );
        service
          .create({
            nome: urlFile.value.substring(
              urlFile.value.indexOf("_") + 1,
              urlFile.value.length
            ),
            file_url: urlFile.value,
          })
          .then((res) => console.log(res))
          .finally(() => {
            breadcrumbNavigation(currentFolder.value, steps.value.length - 1);
            loading.value = false;
          });
      });
  }
}

function deleteFile(file) {
  console.log("🚀 ~ file: DataDrive.vue ~ line 205 ~ deleteFile ~ File", file);
  loading.value = true;
  const service = new AxiosService("Drive/DeleteFile/" + props.idDrive + "/0");
  service
    .delete(file.id)
    .then((res) => console.log(res))
    .finally(() => {
      loading.value = false;
      if (steps.value.length == 0) {
        breadcrumbNavigation({ id: 0 }, 0);
      } else {
        breadcrumbNavigation(
          steps.value[steps.value.length - 1],
          steps.value.length - 1
        );
      }
    });
}

const rinominaVisible = ref(false);
function showRinominaFile() {
  rinominaVisible.value = true;
}
function rinominaHide() {
  rinominaVisible.value = false;
}

function rinominaFile() {
  loading.value = true;
  console.log("current file : ", currentFile.value);
  const service = new AxiosService(
    "Drive/EditFile/" + props.idDrive + "/" + currentFolderId.value
  );
  // currentFile.value.nome = fileName(currentFile.value.nome)
  service
    .update(currentFile.value)
    .then((res) => console.log(res))
    .finally(() => {
      rinominaVisible.value = false;
      if (steps.value.length == 0) {
        breadcrumbNavigation(currentFolder.value, 0);
      } else {
        breadcrumbNavigation(currentFolder.value, steps.value.length - 1);
      }
      loading.value = false;
    });
}

function fileName(file) {
  const fileArr = file.replaceAll(" ", "-").split("_");
  currentFileName.value = fileArr[1];
  return fileArr[1];
}

const showDialogDocumento = ref(false);
function showFile(file) {
  currentFile.value = { ...file };
  currentFile.value.url =
    "https://prestitosi-core.datarete.cloud/" + file.file_url;
  showDialogDocumento.value = true;
}

const currentFolderId = computed(() => {
  if (steps.value.length > 0) {
    return steps.value[steps.value.length - 1].id;
  }
  return 0;
});

const currentFolder = computed(() => {
  if (steps.value.length > 0) {
    return steps.value[steps.value.length - 1];
  }
  return {
    id: 0,
  };
});
getDriveRoot();
</script>

<style>
.p-tree {
  min-height: calc(100vh - 100px);
}
</style>
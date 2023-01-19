<template>
  <div class="wrapper">
    <div class="mb-4 plugin-title flex justify-content-between align-items-center">
      <h1>DataRete Drive</h1>
      <Chip icon="pi pi-star-fill" label="PlugIn" class="small-chip custom-chip"></Chip>
    </div>

    <div class="grid" style="height:300px">
      <div class="col-3">
        <Tree @node-select="selectItem" :value=" nodes" selectionMode="single"></Tree>
      </div>
      <div class="col-9">
        <ItemComponent :item="selectedItem"></ItemComponent>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ItemComponent from '@/components/DriveComponents/ItemComponent.vue';
import AxiosService from '@/axiosServices/AxiosService';

const selectedItem = ref()
function selectItem(event) {
  selectedItem.value = event
  selectedItem.value.clickedAt = new Date()
}

const folders = ref([])
function getDriveFolders() {
  const service = new AxiosService('Drive/GetFolders/1/')
  service.read()
    .then(res => folders.value = res)
}
getDriveFolders()
const nodes =
  [{
    "key": "0",
    "label": "Documents",
    "data": "Documents Folder",
    "icon": "pi pi-fw pi-inbox",
    "children": [{
      "key": "0-0",
      "label": "Work",
      "data": "Work Folder",
      "icon": "pi pi-fw pi-cog",
      "children": [{
        "key": "0-0-0",
        "label": "Expenses.doc",
        "icon": "pi pi-fw pi-file",
        "data": "Expenses Document"
      },
      {
        "key": "0-0-1",
        "label": "Resume.doc",
        "icon": "pi pi-fw pi-file",
        "data": "https://s29.q4cdn.com/816090369/files/doc_downloads/test.pdf"
      }]
    },
    {
      "key": "0-1",
      "label": "Home",
      "data": "Home Folder",
      "icon": "pi pi-fw pi-home",
      "children": [{ "key": "0-1-0", "label": "Invoices.txt", "icon": "pi pi-fw pi-file", "data": "https://s29.q4cdn.com/816090369/files/doc_downloads/test.pdf" }]
    }]
  },
  {
    "key": "1",
    "label": "Events",
    "data": "Events Folder",
    "icon": "pi pi-fw pi-calendar",
    "children": [
      { "key": "1-0", "label": "Meeting", "icon": "pi pi-fw pi-calendar-plus", "data": "Meeting" },
      { "key": "1-1", "label": "Product Launch", "icon": "pi pi-fw pi-calendar-plus", "data": "Product Launch" },
      { "key": "1-2", "label": "Report Review", "icon": "pi pi-fw pi-calendar-plus", "data": "Report Review" }]
  },
  {
    "key": "2",
    "label": "Movies",
    "data": "Movies Folder",
    "icon": "pi pi-fw pi-star-fill",
    "children": [{
      "key": "2-0",
      "icon": "pi pi-fw pi-star-fill",
      "label": "Al Pacino",
      "data": "Pacino Movies",
      "children": [{ "key": "2-0-0", "label": "Scarface", "icon": "pi pi-fw pi-video", "data": "https://www.youtube.com/embed/y-ilcWcZZwY" }, { "key": "2-0-1", "label": "Serpico", "icon": "pi pi-fw pi-video", "data": "https://www.youtube.com/embed/0GffKEEJH8Y" }]
    },
    {
      "key": "2-1",
      "label": "Robert De Niro",
      "icon": "pi pi-fw pi-star-fill",
      "data": "De Niro Movies",
      "children": [{ "key": "2-1-0", "label": "Goodfellas", "icon": "pi pi-fw pi-video", "data": "https://www.youtube.com/embed/DFjXyZYMB80" }, { "key": "2-1-1", "label": "Untouchables", "icon": "pi pi-fw pi-video", "data": "https://www.youtube.com/embed/XMUwJPsFjh8" }]
    }]
  }]

</script>

<style>
.p-tree {
  min-height: calc(100vh - 100px);
}
</style>
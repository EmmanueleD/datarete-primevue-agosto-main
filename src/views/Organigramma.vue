<template>
  <div class="mb-4">
    <Toast />
    <h1>Organigramma</h1>
    <div class="card py-5 px-4">

      <OrganizationChart @node-select="nodeSelected" style="overflow-x:scroll" v-if="usersOrg" :value="usersOrg"
        :collapsible="true" class="company" selectionMode="single" v-model:selectionKeys="selection">
        <template #person="slotProps">
          <div class="node-header ui-corner-top">{{ slotProps.node.data.label }}</div>
          <div class="node-content">

            <Avatar v-if="slotProps.node.data.imgprofilo" :image="slotProps.node.data.imgprofilo" class="mr-2"
              shape="circle" />
            <Avatar v-else icon="pi pi-user" class="mr-2 mb-2" shape="circle" />
            <div>{{ slotProps.node.data.name }}</div>
          </div>
        </template>
        <template #default="slotProps">
          <span>{{ slotProps.node.data.label }}</span>
        </template>
      </OrganizationChart>
    </div>



    <!-- <Button label="Seleziona le persone" @click="iterateAndPaint(usersOrg)"></Button>
    <Button label="Deseleziona le persone" @click="iterateAndDePaint(usersOrg)" class="ml-4"></Button> -->
  </div>


</template>

<script setup>
import { ref } from 'vue';
import AxiosService from '@/axiosServices/AxiosService';

const serviceGET = new AxiosService('Auth/Users')
const usersOrg = ref(null)
function buildUsersOrg() {
  serviceGET.read()
    .then(res => {
      createDataTree(res)
    })
}

const createDataTree = dataset => {
  const hashTable = Object.create(null);
  dataset.forEach(aData => {

    let data = { ...aData }

    data.name = aData.nome + ' ' + aData.cognome
    data.label = aData.ruolo || 'senza ruolo'
    data.type = 'person'
    data.styleClass = 'p-person'

    hashTable[aData.id] = { children: [], key: aData.id, type: 'person', styleClass: 'p-person', data: data }

  });
  const dataTree = [];
  dataset.forEach(aData => {
    if (aData.id_padre) hashTable[aData.id_padre].children.push(hashTable[aData.id])
    else dataTree.push(hashTable[aData.id])
  });
  usersOrg.value = dataTree[0]
};

buildUsersOrg()

const selection = ref({});

// const iterateAndPaint = (obj) => {
//   Object.keys(obj).forEach(key => {

//     if (obj[key] === 'person') {
//       obj.styleClass = obj.styleClass + ' emmanuele'

//     }

//     if (typeof obj[key] === 'object' && obj[key] !== null) {
//       iterateAndPaint(obj[key])
//     }

//     if (Array.isArray(obj[key]) && obj[key] !== null) {
//       obj[key].forEach(subObj => {
//         iterateAndPaint(subObj)
//       })
//     }

//   })
// }

// const iterateAndDePaint = (obj) => {
//   Object.keys(obj).forEach(key => {

//     if (obj[key] === 'person') {
//       obj.styleClass = obj.styleClass.replace('emmanuele', '')

//     }

//     if (typeof obj[key] === 'object' && obj[key] !== null) {
//       iterateAndDePaint(obj[key])
//     }

//     if (Array.isArray(obj[key]) && obj[key] !== null) {
//       obj[key].forEach(subObj => {
//         iterateAndDePaint(subObj)
//       })
//     }

//   })
// }

function nodeSelected(event) {
  console.log("🚀 ~ file: Organigramma.vue ~ line 114 ~ nodeSelected ~ event", event.data)

}

</script>

<style scoped lang="scss">
::v-deep(.p-organizationchart) {
  .p-person {
    padding: 0;
    border: 0 none;
  }

  .node-header,
  .node-content {
    padding: .5em .7rem;
  }

  .node-header {
    background-color: #495ebb;
    color: #ffffff;
  }

  .node-content {
    text-align: center;
    border: 1px solid #495ebb;
  }

  .node-content img {
    border-radius: 50%;
  }

  .department-cfo {
    background-color: #7247bc;
    color: #ffffff;
  }

  .department-coo {
    background-color: #a534b6;
    color: #ffffff;
  }

  .department-cto {
    background-color: #e9286f;
    color: #ffffff;
  }

  .emmanuele {
    background-color: hsl(49, 100%, 70%);
  }
}
</style>
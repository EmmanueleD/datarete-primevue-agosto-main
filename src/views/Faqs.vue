<template>
  <h1 class="mb-4">Faqs</h1>
  <div class="filter-bar">
    <div class="row">
      <div class="col-lg-3">
        <span class="p-input-icon-left p-input-icon-right w-100">
          <i class="pi pi-search" />
          <InputText class="p-inputtext-sm w-100" type="text" v-model="filter" placeholder="Search" />
          <i v-show="filter" class="pi pi-times pinter" @click="filter = ''" />
        </span>
      </div>
      <div class="col">
        <Dropdown :filter="true" class="p-inputtext-sm" v-model="view_lang" :options="languages" optionLabel="text"
          optionValue="value" />
      </div>
      <div class="col text-lg-end">
        <Button class="p-button-sm" @click="showSidebar">
          <i class="pi pi-plus me-2" />
          Add question
        </Button>
      </div>
    </div>
  </div>
  <!-- <draggable :list="filteredItems" item-key="id" ghost-class="ghost">
    <template #item="{ element }">
      <div class="p-3 bg-white faq-wrapper">
        <div class="d-flex">
          <h4 :class="{ 'text-muted': !element.question[view_lang] }">
            {{ element.question[view_lang] || "No question" }}
          </h4>
          <div class="ms-auto">
            <i
              v-if="!filter"
              icon="arrows-move"
              class="pi pi-arrows-v pointer faq-handle me-2"
            />
            <i @click="showSidebar(element)" class="pi pi-cog pointer me-2" />
            <i @click="deleteConfirm" class="pi pi-trash pointer" />
          </div>
        </div>
        <p :class="{ 'text-muted': !element.question[view_lang] }">
          {{ element.answer[view_lang] || "No answer" }}
        </p>
      </div>
    </template>
  </draggable> -->
  <Sidebar v-model:visible="isSidebarVisible" :dismissable="false" @hide="resetSidebar" position="right"
    class="p-sidebar-lg">
    <div class="mx-3">
      <h3 class="mb-4">{{ tmpItem == {} ? "New" : "Edit" }} Faq</h3>
      <div class="p-fluid">
        <div class="p-field mb-4">
          <label for="question">Question</label>
          <InputText v-model="tmpItem.question[view_lang]" id="question" />
        </div>
        <div class="p-field mb-4">
          <label for="answer">Answer</label>
          <Textarea v-model="tmpItem.answer[view_lang]" rows="5" id="answer" />
        </div>
      </div>
      <Button label="Save" class="big-button" :loading="isLoading" />
    </div>
  </Sidebar>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useConfirm } from "primevue/useconfirm";
import AxiosService from "./../axiosServices/AxiosService";
// import draggable from "vuedraggable";
export default {
  name: "Faqs",
  components: { draggable },
  setup() {
    const service = new AxiosService("Faq");
    let items = ref([]);
    service.read().then((data) => (items.value = data));

    const store = useStore();
    const languages = computed(() => {
      return store.getters["languages"];
    });
    const default_lang = computed(() => {
      return store.getters["default_lang"];
    });

    let view_lang = ref(default_lang.value.value);

    let filter = ref("");
    const filteredItems = computed(() => {
      if (filter.value) {
        return items.value.filter((item) => {
          return (
            item.question[view_lang.value]
              .toLowerCase()
              .includes(filter.value.toLowerCase()) ||
            item.answer[view_lang.value]
              .toLowerCase()
              .includes(filter.value.toLowerCase())
          );
        });
      } else {
        return items.value;
      }
    });

    const cleanObject = {
      question: {},
      answer: {},
    };
    const isSidebarVisible = ref(false);
    let tmpItem = {};
    const showSidebar = (item) => {
      if (item) {
        tmpItem = JSON.parse(JSON.stringify(item));
      }
      isSidebarVisible.value = true;
    };
    const resetSidebar = () => {
      tmpItem = JSON.parse(JSON.stringify(cleanObject));
      console.log(tmpItem, cleanObject);
    };
    resetSidebar();

    const isLoading = ref(false);
    const saveItem = () => {
      console.log("salva");
    };

    const confirm = useConfirm();
    const deleteConfirm = () => {
      confirm.require({
        message: "Are you sure you want to delete this item?",
        header: "Delete confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "p-button-danger",
        accept: () => {
          console.log("cancella");
        },
      });
    };

    return {
      filteredItems,
      filter,
      view_lang,
      languages,
      default_lang,
      isSidebarVisible,
      showSidebar,
      resetSidebar,
      tmpItem,
      deleteConfirm,
      isLoading,
      saveItem,
    };
  },
};
</script>

<style lang="scss" scoped>
.filter-bar {
  background: #f8f9fa;
  color: #495057;
  border: 1px solid #e9ecef;
  border-width: 1px 0 1px 0;
  padding: 1rem 1rem;
  font-weight: 600;
}

.faq-wrapper {
  border-bottom: 1px solid #33333340;

  &:last-of-type {
    border-bottom: 0px;
  }
}

.ghost {
  opacity: 0.5;
  background: #ececec;
}
</style>
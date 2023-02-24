

<script setup>
import { ref, computed, watch } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { useStore } from "vuex";
import TableSkeleton from "./skeletons/TableSkeleton.vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  headersConfig: Array,
  data: Array,
  config: Object,
  showAzioni: Boolean,
  rowSelection: {
    type: Boolean,
    default: false,
  },
  rowsToShow: {
    type: Number,
    default: 10,
  },
});

// eslint-disable-next-line no-undef, no-unused-vars
const emit = defineEmits([
  "event_editRowItem",
  "event_ShowSidebar_eye",
  "event_ShowSidebar_elimina",
  "onPage",
  "onSort",
  "onRowSelect",
  "onRowUnselect",
]);

const store = useStore();

const contentLoading = computed(() => store.getters.contentLoading);

const currentItem = ref();

const dt = ref();
const exportCSV = () => {
  dt.value.exportCSV();
};

const menu = ref();
const items = ref([
  {
    label: "Modifica",
    icon: "pi pi-fw pi-pencil",
    event: "edit",
  },
  {
    label: "Crea Appuntamento",
    icon: "pi pi-fw pi-calendar-plus",
    event: "nuovoAppuntamento",
  },
  {
    label: "Crea Pratica",
    icon: "pi pi-fw pi-file",
    event: "creaPratica",
  },
  {
    label: "Elimina",
    icon: "pi pi-fw- pi-trash",
    event: "elimina",
  },
]);

function toggle(event, data) {
  currentItem.value = data;
  menu.value.toggle(event);
}

const top_tmenu_0 = ref();
function toggleTopMenu(event) {
  top_tmenu_0.value.toggle(event);
}

function getColDataType(colDataType) {
  if (colDataType == "String") {
    return "text";
  } else {
    return colDataType.toLowerCase();
  }
}

const headers = computed(() => {
  let finalArr = [];

  finalArr = props.headersConfig.filter((x) => x.visible == true);
  finalArr.sort((a, b) => {
    if (a.order) {
      return a.order > b.order ? 1 : -1;
    }
    return -1;
  });
  return finalArr;
});

const globalFilters = computed(() => {
  return headers.value.filter((x) => x.type != "Boolean").map((x) => x.field);
});

let filtersObj = ref({
  global: {
    value: null,
    matchMode: FilterMatchMode.CONTAINS,
  },
});

watch(() => props.headersConfig, populateFiltersObj(props.headersConfig));
function populateFiltersObj(value) {
  value.forEach((element) => {
    switch (element.type) {
      case "String":
        filtersObj.value[element.field] = {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        };
        break;
      case "Number":
        filtersObj.value[element.field] = {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        };
        break;
      case "Date":
        filtersObj.value[element.field] = {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        };
        break;
      case "Boolean":
        filtersObj.value[element.field] = {
          value: null,
          matchMode: FilterMatchMode.EQUALS,
        };
        break;
    }
  });
}

populateFiltersObj(props.headersConfig);

function formatDate(value) {
  if (value) {
    return new Date(value).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
  return "";
}

function getBadgeColor(value, colors) {
  const color = colors[value];
  if (color) {
    return {
      "background-color": color,
    };
  }
  return {
    "background-color": "grey",
  };
}

const selectedProducts = ref();

const isGenny = ref(false);

isGenny.value = store.getters["loggedUser"].id == 111 ? true : false;

defineExpose({
  selectedProducts,
});
</script>

<template>
  <div v-if="contentLoading">
    <TableSkeleton></TableSkeleton>
  </div>

  <div v-else class="datatable-container">
    <div class="flex justify-content-between align-items-center mb-4">
      <Card class="w-100">
        <template #content>
          <div class="w-100 flex justify-content-between align-items-center">
            <Menubar :model="config.menuItems" class="w-100">
              <!-- <template #end>
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText v-model="filtersObj['global'].value" placeholder="Cerca..." />
                </span>
              </template> -->
            </Menubar>
          </div>
        </template>
      </Card>
    </div>
    <div>
      <Card>
        <template #content>
          <DataTable
            v-model:selection="selectedProducts"
            @sort="$emit('onSort', $event)"
            @page="$emit('onPage', $event)"
            :value="data"
            :stripedRows="config.zebra"
            :lazy="config.lazy"
            :totalRecords="config.totalRecords"
            v-model:filters="filtersObj"
            :globalFilterFields="globalFilters"
            filterDisplay="menu"
            :paginator="true"
            :rows="rowsToShow"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink "
            :resizableColumns="false"
            :scrollable="true"
            table-layout="auto"
            ref="dt"
            dataKey="ID"
            :loading="config.loading"
          >
            <template #header>
              <div v-if="isGenny" style="text-align: right">
                <Button
                  icon="pi pi-external-link"
                  label="Export"
                  @click="exportCSV($event)"
                />
              </div>
            </template>
            <Column
              :frozen="true"
              style="min-width: 10px; max-width: 100px"
              v-if="rowSelection"
              selectionMode="multiple"
              headerStyle="width: 3em"
            ></Column>
            <Column
              v-if="showAzioni"
              header="Azioni"
              style="min-width: 10px; max-width: 100px"
              :frozen="true"
            >
              <template #body="{ data }">
                <div class="flex">
                  <i
                    role="button"
                    class="pi pi-fw pi-eye"
                    @click="$emit('event_ShowSidebar_eye', data)"
                  ></i>
                  <i
                    v-if="store.getters['loggedUser'].id == 111"
                    class="ml-2 pi pi-fw pi-trash"
                    role="button"
                    @click="$emit('event_ShowSidebar_elimina', data)"
                  ></i>
                  <!-- <i role="button" class="ml-3 pi pi-fw pi-cog" @click="toggle($event, data)" aria-haspopup="true"
                    aria-controls="overlay_tmenu"></i> -->
                </div>
                <TieredMenu
                  id="overlay_tmenu"
                  ref="menu"
                  :model="items"
                  :popup="true"
                >
                  <template #item="{ item }">
                    <div
                      @click="
                        $emit('event_ShowSidebar_' + item.event, currentItem)
                      "
                      class="tieredmenu-item"
                    >
                      <i :class="item.icon"></i>
                      <span>{{ item.label }}</span>
                    </div>
                  </template>
                </TieredMenu>
              </template>
            </Column>
            <Column
              v-for="col of headers"
              :field="col.field"
              :header="col.header"
              :key="col.field"
              :frozen="col.frozen"
              alignFrozen="true"
              :dataType="getColDataType(col.type)"
              :sortable="col.sortable"
              :showFilterMatchModes="true"
              :showFilterOperator="false"
              style="min-width: 50px"
            >
              <template #filter="{ filterModel }">
                <TriStateCheckbox
                  v-if="col.type == 'Boolean'"
                  v-model="filterModel.value"
                />

                <InputText
                  v-if="col.type == 'String'"
                  type="text"
                  v-model="filterModel.value"
                  placeholder="Cerca..."
                />

                <Calendar
                  v-if="col.type == 'Date'"
                  v-model="filterModel.value"
                  dateFormat="dd/mm/yy"
                  placeholder="dd/mm/yyyy"
                />

                <InputNumber
                  v-if="col.type == 'Number'"
                  type="number"
                  v-model="filterModel.value"
                />
              </template>

              <template #body="{ data }">
                <div v-if="contentLoading">
                  <Skeleton></Skeleton>
                </div>

                <div v-else>
                  <span
                    v-if="
                      col.type == 'Date' &&
                      (col.field == 'DATA_CREAZIONE' ||
                        col.field == 'DATA_MODIFICA')
                    "
                  >
                    {{
                      new Date(data[col.field]).toLocaleDateString("it", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }}</span
                  >

                  <span v-else-if="col.type == 'Date'">
                    {{ formatDate(data[col.field]) }}</span
                  >

                  <Badge
                    v-else-if="col.badge == true"
                    :value="data[col.field]"
                    :style="getBadgeColor(data[col.field], col.badgeColors)"
                  ></Badge>

                  <span v-else-if="col.type == 'Boolean'">
                    <i
                      v-if="data[col.field] == true"
                      class="pi pi-fw pi-check"
                    ></i>
                    <i v-else class="pi pi-fw pi-times"></i>
                  </span>
                  <template v-else>{{ data[col.field] }}</template>
                </div>
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
    </div>
  </div>
</template>
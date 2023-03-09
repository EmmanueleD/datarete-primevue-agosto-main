<template>
  <div class="wrapper">
    <h2 class="pl-4">Dashboard</h2>
    <Divider></Divider>
    <h5>
      Ciao {{ $store.getters.loggedUser.nome }}, oggi è
      {{
        new Date().toLocaleDateString("it", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        })
      }}
    </h5>
    <Divider></Divider>
    <Card class="mb-4">
      <template #content>
        <h4>Nuovo Preventivo</h4>
        <div
          class="prestitosi-buttons w-full flex justify-content-between align-items-center px-4 gap-4"
        >
          <Button
            @click="$router.push('pratiche/preventivo-prestito/0/0')"
            label="Prestito personale"
            class="p-button-lg button-prestitosi"
          ></Button>
          <Button
            @click="$router.push('pratiche/preventivo-mutuo/0/0')"
            label="Mutuo"
            class="p-button-lg button-prestitosi"
          ></Button>
          <Button
            @click="$router.push('pratiche/preventivo-cqs/0/0')"
            label="Cessione del quinto"
            class="p-button-lg button-prestitosi"
          ></Button>
          <Button
            @click="$router.push('pratiche/preventivo-delega/0/0')"
            label="Delega"
            class="p-button-lg button-prestitosi"
          ></Button>
        </div>
      </template>
    </Card>

    <div class="w-full grid">
      <div class="col-12 col-md-8">
        <Card class="mb-4">
          <template #content>
            <h4>Circolari</h4>
            <div
              v-if="loading.circolari"
              class="w-full flex justify-content-center"
            >
              <i class="pi pi-spin pi-spinner text-xl"></i>
            </div>
            <Carousel
              v-else
              :value="circolari"
              :numVisible="2"
              :numScroll="1"
              :responsiveOptions="responsiveOptions"
            >
              <template #item="slotProps">
                <div
                  v-if="loading.circolari"
                  class="w-full flex justify-content-center"
                >
                  <i class="pi pi-spin pi-spinner"></i>
                </div>
                <div
                  v-else
                  class="text-center border-round-lg py-4 px-2 shadow-1 border-1 border-200 mx-4"
                >
                  <!-- {{ truncate(slotProps.data.testo, 99) }} -->
                  <!-- {{ slotProps.data }} -->
                  <h4>{{ slotProps.data.titolo }}</h4>
                  <div
                    class="w-full flex justify-content-between align-items-center px-4"
                  >
                    <span class="text-gray-400 font-bold">{{
                      new Date(
                        slotProps.data.dataPubblicazione
                      ).toLocaleDateString("it", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })
                    }}</span>
                    <Button
                      @click="apriCircolare(slotProps.data)"
                      label="Leggi..."
                      class="p-button-text p-0"
                    ></Button>
                  </div>
                </div>
              </template>
            </Carousel>
          </template>
        </Card>

        <Card class="mb-4">
          <template #content>
            <h4>Notizie</h4>

            <div
              v-if="loading.circolari"
              class="w-full flex justify-content-center"
            >
              <i class="pi pi-spin pi-spinner text-xl"></i>
            </div>
            <Carousel
              v-else
              :value="notizie"
              :numVisible="2"
              :numScroll="1"
              :responsiveOptions="responsiveOptions"
            >
              <template #item="slotProps">
                <div class="py-2">
                  <div
                    class="text-center border-round-lg py-4 px-2 shadow-1 border-1 border-200 mx-4"
                  >
                    <div>
                      <div class="w-full flex justify-content-center px-4">
                        <img
                          v-if="slotProps.data.imgUrl"
                          class="w-full border-round-sm"
                          :src="slotProps.data.imgUrl"
                        />
                      </div>
                      <h4 class="mb-4 px-4">{{ slotProps.data.titolo }}</h4>

                      <div
                        class="w-full flex justify-content-between align-items-center px-4"
                      >
                        <span class="text-gray-400 font-bold">{{
                          new Date(slotProps.data.data).toLocaleDateString(
                            "it",
                            {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                            }
                          )
                        }}</span>
                        <Button
                          @click="apriNotizia(slotProps.data)"
                          label="Leggi..."
                          class="p-button-text p-0"
                        ></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </Carousel>
          </template>
        </Card>

        <div class="grid">
          <div class="col-12 col-md-6">
            <Card class="mb-4">
              <template #content>
                <div
                  class="cursor-pointer"
                  @click="$router.push('gestione/formazione-online/')"
                >
                  <img
                    class="w-100"
                    src="../assets/images/prestitosi-formazione.png"
                  />
                </div>
              </template>
            </Card>
          </div>
          <div class="col-12 col-md-6">
            <Card class="mb-4">
              <template #content>
                <div
                  class="cursor-pointer"
                  @click="$router.push('agenda/calendario')"
                >
                  <img
                    class="w-100"
                    src="../assets/images/prestitosi-calendario.png"
                  />
                </div>
              </template>
            </Card>
          </div>
        </div>

        <Card class="mb-4">
          <template #content>
            <iframe
              src="https://www.migliormutuo.it/tassi.asp"
              width="220"
              height="280"
              frameborder="0"
              scrolling="no"
            ></iframe>
          </template>
        </Card>
      </div>
      <div class="col-12 col-md-4 flex flex-column">
        <Card class="mb-4">
          <template #content>
            <div class="w-full ciambella-container">
              <Chart
                type="doughnut"
                :data="ciambellaData"
                :options="ciambellaOptions"
              />
              <span class="ciambella-perc font-bold text-2xl">
                {{
                  ciambellaData.datasets[0].data[0].toLocaleString("it", {
                    style: "currency",
                    currency: "EUR",
                  })
                }}</span
              >
            </div>
          </template>
        </Card>
        <Card>
          <template #content>
            <div class="w-full flex justify-content-between mb-4">
              <Button class="p-button-sm" label="Prestiti"></Button>
              <Button class="p-button-sm" label="Mutui"></Button>
              <Button class="p-button-sm" label="Cessioni"></Button>
              <Button class="p-button-sm" label="Deleghe"></Button>
            </div>
            <div class="w-full barre-container mb-6">
              <Chart
                type="bar"
                :data="barreData"
                :options="barreOptions"
              ></Chart>
            </div>
            <div>
              <DataTable :value="tableData">
                <Column field="title" header="Mese"></Column>
                <Column field="m" header="M"></Column>
                <Column field="mok" header="MOK"></Column>
                <Column field="p" header="P"></Column>
                <Column field="quattro" header="4"></Column>
                <Column field="ct" header="CT"></Column>
              </DataTable>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
  <div
    class="w-full flex justify-content-around align-items-center flex-wrap footer-dashboard_2 mt-4"
  >
    <div class="logo-dashboard">
      <img src="../assets/images/dash-logo-1.png" />
    </div>
    <div class="logo-dashboard">
      <img src="../assets/images/dash-logo-2.png" />
    </div>
    <div class="logo-dashboard">
      <img src="../assets/images/dash-logo-3.png" />
    </div>
    <div class="logo-dashboard">
      <img src="../assets/images/dash-logo-4.png" />
    </div>
  </div>
  <Dialog
    v-model:visible="currentNotiziaVisible"
    :style="{ width: '30vw', height: '100vh' }"
    maximizable
  >
    <template #header>
      <h4>{{ currentNotizia.titolo }}</h4>
    </template>
    <div v-html="currentNotizia.testo"></div>
  </Dialog>
  <Dialog
    v-model:visible="currentCircolareVisible"
    :style="{ width: '30vw', height: '100vh' }"
    maximizable
  >
    <template #header>
      <h4>{{ currentCircolare.titolo }}</h4>
    </template>
    <iframe
      :src="currentCircolare.url"
      frameBorder="0"
      scrolling="auto"
      width="100%"
      height="95%"
    ></iframe>
  </Dialog>
</template>

<script setup>
import { ref } from "vue"
import AxiosService from "@/axiosServices/AxiosService"

const loading = ref({
  circolari: false,
  notizie: false,
})

const responsiveOptions = ref([
  {
    breakpoint: "1024px",
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: "600px",
    numVisible: 2,
    numScroll: 2,
  },
  {
    breakpoint: "480px",
    numVisible: 1,
    numScroll: 1,
  },
])

const notizie = ref([])
function getNotizie() {
  console.log("ciao sono il get notizie")
  loading.value.notizie = true
  const service = new AxiosService("News/GetList")
  service
    .read()
    .then((res) => {
      notizie.value = res
    })
    .finally(() => {
      loading.value.notizie = false
    })
}
getNotizie()

function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str
}

const circolari = ref([])
function getCircolari() {
  loading.value.circolari = true
  const service = new AxiosService("Circolari/GetCircolari")
  service
    .read()
    .then((res) => {
      circolari.value = res
    })
    .finally(() => {
      loading.value.circolari = false
    })
}

getCircolari()

const ciambellaData = ref({
  labels: ["Compiuto", "Non compiuto"],
  datasets: [
    {
      data: [300000, 50000],
      backgroundColor: ["#0078e3", "#fdd87d"],
      hoverBackgroundColor: ["#0078e3", "#fdd87d"],
    },
  ],
})

const ciambellaOptions = ref({
  plugins: {
    legend: {
      labels: {
        color: "#495057",
      },
    },
  },
})

const barreData = ref({
  labels: [
    "Feb",
    "Mar",
    "Apr",
    "Mag",
    "Giu",
    "Lug",
    "Ago",
    "Set",
    "Ott",
    "Nov",
    "Dic",
    "Gen",
    "Feb",
  ],
  datasets: [
    {
      label: "M",
      data: [0, 0, 1, 1, 4, 3, 8, 22, 34, 26, 23, 24, 23],
      backgroundColor: "#0078e3",
    },
    {
      label: "MOK",
      data: [0, 0, 1, 2, 4, 3, 11, 21, 34, 23, 22, 23, 24],
      backgroundColor: "#fdd87d",
    },
  ],
})

const barreOptions = ref({
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#495057",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#495057",
      },
      grid: {
        color: "#ebedef",
      },
    },
    y: {
      ticks: {
        color: "#495057",
      },
      grid: {
        color: "#ebedef",
      },
    },
  },
})

const tableData = ref([
  {
    title: "Febbraio",
    m: 23,
    mok: 24,
    p: 35,
    quattro: 33,
    ct: 26,
  },
  {
    title: "Marzo",
    m: 24,
    mok: 23,
    p: 24,
    quattro: 23,
    ct: 24,
  },
  {
    title: "Aprile",
    m: 23,
    mok: 22,
    p: 22,
    quattro: 24,
    ct: 25,
  },
  {
    title: "Maggio",
    m: 26,
    mok: 22,
    p: 24,
    quattro: 34,
    ct: 28,
  },
  {
    title: "Giugno",
    m: 34,
    mok: 34,
    p: 34,
    quattro: 35,
    ct: 29,
  },
  {
    title: "Luglio",
    m: 22,
    mok: 21,
    p: 20,
    quattro: 16,
    ct: 17,
  },
  {
    title: "Agosto",
    m: 8,
    mok: 11,
    p: 10,
    quattro: 13,
    ct: 4,
  },
  {
    title: "Settembre",
    m: 3,
    mok: 3,
    p: 4,
    quattro: 5,
    ct: 5,
  },
  {
    title: "Ottobre",
    m: 4,
    mok: 4,
    p: 3,
    quattro: 2,
    ct: 3,
  },
  {
    title: "Novembre",
    m: 1,
    mok: 1,
    p: 1,
    quattro: 2,
    ct: 5,
  },
  {
    title: "Dicembre",
    m: 1,
    mok: 1,
    p: 1,
    quattro: 0,
    ct: 2,
  },
  {
    title: "Gennaio",
    m: 0,
    mok: 0,
    p: 0,
    quattro: 1,
    ct: 1,
  },
  {
    title: "Febbraio",
    m: 0,
    mok: 0,
    p: 0,
    quattro: 0,
    ct: 2,
  },
])

const currentCircolare = ref()
const currentCircolareVisible = ref(false)
function apriCircolare(circolare) {
  currentCircolareVisible.value = true
  currentCircolare.value = circolare
  currentCircolare.value.url =
    "https://prestitosi-core.datarete.cloud/" + circolare.urlFile
}

const currentNotizia = ref()
const currentNotiziaVisible = ref(false)
function apriNotizia(notizia) {
  currentNotiziaVisible.value = true
  currentNotizia.value = notizia
}
</script>

<style scoped lang="scss">
.ciambella-container {
  position: relative;
  .ciambella-perc {
    position: absolute;
    right: 50%;
    top: 50%;
    padding: 0;
    margin: 0;
    transform: translateX(50%) translateY(-20%);
  }
}
</style>

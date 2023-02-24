<template>
  <div class="wrapper scroller">
    <div class="mb-7">
      <h3 @click="intermediatoVisible = !intermediatoVisible" class="cursor-pointer">
        PRODUZIONE INTERMEDIATO
        <i v-if="intermediatoVisible" class="pi pi-chevron-up ml-2"></i
        ><i v-else class="pi pi-chevron-down ml-2"></i>
      </h3>

      <Card v-if="intermediatoVisible">
        <template #content>
          <div id="filtri" class="mb-4">
         
          </div>
          <Divider class="my-4"></Divider>
       
          <div id="contenuto" class="w-full grid mb-2 ">
         
            <div class="flex align-items-center col-12">
              <div class="w-full">
                <Chart
             
                  type="line"
                  :data="intermediatoGraph"
                  :options="lineGraphOptions"
                />
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div class="mb-7">
      <h3 @click="produzioneMUTVisible = !produzioneMUTVisible" class="cursor-pointer">
        PRODUZIONE TEMPORALE STATI M-OK, P, 4 e CT
        <i v-if="produzioneMUTVisible" class="pi pi-chevron-up ml-2"></i
        ><i v-else class="pi pi-chevron-down ml-2"></i>
      </h3>
      <Card v-if="produzioneMUTVisible">
        <template #content>
     
          <Divider class="my-4"></Divider>
          
          
           
            <div id="contenuto" class="grid w-full mb-2">
              <div class="flex align-items-center col-12">
                <div class="w-full">
                  <Chart
                  
                  type="bar"
                  :data="produzioneMUTGraphData"
                  :options="barGraphOptions"
                />
                </div>
              </div>
               
                
            

              
         
          </div>
        </template>
      </Card>
    </div>

    <div class="mb-7">
      <h3 @click="erogatoBancaMUTVisible = !erogatoBancaMUTVisible" class="cursor-pointer">
        EROGATO PER BANCA
        <i v-if="erogatoBancaMUTVisible" class="pi pi-chevron-up ml-2"></i
        ><i v-else class="pi pi-chevron-down ml-2"></i>
      </h3>
      <Card v-if="erogatoBancaMUTVisible">
        <template #content>
     
          <Divider class="my-4"></Divider>
          
          
           
            <div id="contenuto" class="grid w-full mb-2">
              <div class="flex align-items-center col-12">
                <div class="w-full">
                  <Chart
                  
                  type="bar"
                  :data="erogatoBancaMUTGraphData"
                  :options="lineStackedOptions"
                />
                </div>
              </div>
               
                
            

              
         
          </div>
        </template>
      </Card>
    </div>

    <div class="mb-7">
      <h3 @click="magazzinoBancaVisible = !magazzinoBancaVisible" class="cursor-pointer">
        MAGAZZINO PER BANCA
        <i v-if="magazzinoBancaVisible" class="pi pi-chevron-up ml-2"></i
        ><i v-else class="pi pi-chevron-down ml-2"></i>
      </h3>
      <Card v-if="magazzinoBancaVisible">
        <template #content>
     
          <Divider class="my-4"></Divider>
          
          
           
            <div id="contenuto" class="grid w-full mb-2">
              <div class="flex align-items-center col-12">
                <div class="w-full grid-center" >
                 <div style="width:300px; height: 300px">
                  <Chart
             
             type="pie"
             :data="magazzinoBancaGraphData"
             :options="pieGraphOptions"
           />
           </div>
                 </div>
              </div>
               
                
            

              
         
          </div>
        </template>
      </Card>
    </div>

    <div class="mb-7">
      <h3 @click="magazzinoStatoVisible = !magazzinoStatoVisible" class="cursor-pointer">
        MAGAZZINO PER STATO
        <i v-if="magazzinoStatoVisible" class="pi pi-chevron-up ml-2"></i
        ><i v-else class="pi pi-chevron-down ml-2"></i>
      </h3>
      <Card v-if="magazzinoStatoVisible">
        <template #content>
     
          <Divider class="my-4"></Divider>
          
          
           
            <div id="contenuto" class="grid w-full mb-2">
              <div class="flex align-items-center col-12">
                <div class="w-full grid-center" >
                 <div style="width:300px; height: 300px">
                  <Chart
             
             type="pie"
             :data="magazzinoStatoGraphData"
             :options="pieGraphOptions"
           />
           </div>
                 </div>
              </div>
          </div>
        </template>
      </Card>
    </div>


  </div>
</template>

<script setup>

import { ref } from "vue";


const lineStackedOptions =  {
  responsive: false,
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    },
                    legend: {
                        labels: {
                            color: '#495057'
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            color: '#ebedef'
                        }
                    },
                    y: {
                        stacked: true,
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            color: '#ebedef'
                        }
                    }
                }
            }



const lineGraphOptions =   {
  responsive: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#495057'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            color: '#ebedef'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            color: '#ebedef'
                        }
                    }
                }
            }

const barGraphOptions = {
  responsive: false,
  plugins: {
    legend: {
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
};

const pieGraphOptions = ref({
  responsive: false,
  plugins: {
    legend: {
      labels: {
        color: "#495057",
      },
    },
  },
});


const magazzinoBancaVisible = ref(true)
const magazzinoBancaGraphData = ref({
            labels: ['CHE_BANCA','CPING'],
            datasets: [
                {
                    data: [66.67, 33.33],
                    backgroundColor: ["#42A5F5","#66BB6A"],
                    hoverBackgroundColor: ["#64B5F6","#81C784"]
                }
            ]
        })

        const magazzinoStatoVisible = ref(true)
const magazzinoStatoGraphData = ref({
            labels: ['6','P', '4-OK'],
            datasets: [
                {
                    data: [33.33, 33.33, 33.33],
                    backgroundColor: ["#42A5F5","#66BB6A", "#ed561b"],
                    hoverBackgroundColor: ["#64B5F6","#81C784", "#ed561b"]
                }
            ]
        })


const erogatoBancaMUTVisible = ref(true)
const erogatoBancaMUTGraphData = ref({
  labels: ['Ago', 'Set', 'Ott', 'Nov', 'Dic', 'Gen', 'Feb'],
  datasets: [{
                type: 'bar',
                label: 'ALTRE Conv',
                backgroundColor: '#42a6d0',
                data: [0, 0, 0, 70, 50, 0, 50]
            }, {
                type: 'bar',
                label: 'CHE_BANCA',
                backgroundColor: '#7cc765',
                data: [60, 80, 75, 30, 50, 0, 0]
            }, {
                type: 'bar',
                label: 'CPING',
                backgroundColor: '#f18054',
                data: [0, 20, 25, 0, 0, 100, 50]
            },{
                type: 'bar',
                label: 'OFFLINE',
                backgroundColor: '#e5e740',
                data: [40, 0, 0, 0, 0, 0, 0]
            }
          ]
})





const intermediatoVisible = ref(true);
const intermediatoGraph = ref({
  labels: ['Gen', 'Feb', 'Mar', "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
  datasets: [
    {
      label: "2017",
      backgroundColor: "#ed561b",
      borderColor: "#ed561b",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      pointStyle: 'circle',
      radius: 4
    },

    {
      label: '2018',
      backgroundColor: '#ed561b',
      borderColor: '#ed561b',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],pointStyle: 'circle',
      radius: 4
    },

    {
      label:'2019',
      backgroundColor: '#1556e2',
      borderColor: '#1556e2',
      data: [1.86, 2.4, 2.76, 3.66, 2.77, 2.05, 3.27, 1.3, 2.8, 2.31, 2.12, 2.55],pointStyle: 'circle',
      radius: 4
    },

    {
      label:'2020',
      backgroundColor: '#ab307e',
      borderColor: '#ab307e',
      data: [2.05, 3.27, 1.3, 2.8, 2.31, 2.12, 2.55, 1.86, 2.4, 2.76, 3.66, 2.77],pointStyle: 'circle',
      radius: 4
    },
    
    {
      label: '2021',
      backgroundColor: '#f8c555',
      borderColor: '#f8c555',
      data: [0.85, 0.9, 1.92, 1.25, 1.75, 1.44, 1.15, 0, 2.04, 1.67, 1.35, 1.35],pointStyle: 'circle',
      radius: 4
    },

    {
      label: '2022',
      backgroundColor: '#50b432',
      borderColor: '#50b432',
      data: [0.6, 0.9, 1.92, 1, 1.7, 2.71, 1.82, 0, 0.5, 0.4, 0.83, 0],pointStyle: 'circle',
      radius: 4
    }
  ],
});




const produzioneMUTVisible = ref(true);




const produzioneMUTGraphData = ref({
  labels: ['Ago', 'Set', 'Ott', 'Nov', 'Dic', 'Gen', 'Feb'],
  datasets: [
  {
      label: 'Stato M-Ok',
      data: [5, 3, 4, 2, 1, 0, 0],
      backgroundColor: '#058dc7'
    },
    {
      label: 'Stato P',
      data: [3, 4, 3, 2, 1, 0, 0],
      backgroundColor: '#50b432'
    },
    {
      label: 'Stato 4',
      data: [5, 6, 2, 3, 0, 1, 0],
      backgroundColor: '#ed561b'
    },
    {
      label: 'Stato CT',
      data: [3, 6, 3, 6, 2, 1, 2],
      backgroundColor: '#dddf00'
    },
  ],
});

</script>

<style scoped lang="scss">

  canvas{
    width: 100%;
  }

</style>
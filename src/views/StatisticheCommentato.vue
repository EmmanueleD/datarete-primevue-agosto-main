<!-- <div class="mb-7">
  <h3 @click="praticheVisible = !praticheVisible" class="cursor-pointer">
    REPORT PRATICHE
    <i v-if="praticheVisible" class="pi pi-chevron-up ml-2"></i
    ><i v-else class="pi pi-chevron-down ml-2"></i>
  </h3>
  <Card v-if="praticheVisible">
    <template #content>
      <div id="filtri" class="mb-4">
        <div class="w-full flex justify-content-end mb-2">
          <Button
            class="p-button-text"
            @click="filtroPraticheVisible = !filtroPraticheVisible"
            :label="
              filtroPraticheVisible ? 'Nascondi i filtri' : 'Mostra filtri'
            "
          ></Button>
        </div>
        <div
          v-if="filtroPraticheVisible"
          class="w-full flex justify-content-between flex-wrap gap-4"
        >
          <div
            class="w-full flex justify-content-between flex-wrap gap-4 mb-4"
          >
            <div class="flex flex-column flex-grow-1">
              <label class="mb-2">Data inserimento</label>
              <Calendar
                v-model="filterPratiche.data"
                selectionMode="range"
                :manualInput="false"
              ></Calendar>
            </div>

            <div class="flex flex-column flex-grow-1">
              <label class="mb-2">Filiale</label>
              <MultiSelect
                v-model="filterPratiche.filiale"
                :options="filialeOptions"
                optionLabel="nome"
                optionValue="id"
                placeholder="Seleziona la filiale..."
                :filter="true"
              ></MultiSelect>
            </div>

            <div class="flex flex-column flex-grow-1">
              <label class="mb-2">Utente</label>
              <MultiSelect
                v-model="filterPratiche.utente"
                :options="utenteOptions"
                optionLabel="text"
                optionValue="value"
                placeholder="Seleziona l'utente..."
                :filter="true"
              ></MultiSelect>
            </div>
          </div>
          <div class="w-full flex justify-content-end">
            <Button
              @click="resetPraticheFilter"
              label="Resetta filtri"
              class="mr-2"
            ></Button>
            <Button
              @click="getPratiche"
              :loading="loadingPratiche"
              label="Applica filtri"
            ></Button>
          </div>
        </div>
      </div>
      <Divider class="my-4"></Divider>
      <div
        v-if="loadingPratiche"
        class="w-full flex justify-content-center align-items-center"
      >
        <i :style="{ fontSize: '2rem' }" class="pi pi-spin pi-spinner"></i>
      </div>
      <div v-else id="contenuto" class="w-full grid mb-2 gap-8">
        <div class="col-sm-12 col-lg-5">
          <DataTable :value="pratiche.listaTabella">
            <Column field="nome" header="nome"></Column>
            <Column field="valore" header="Valore">
              <template #body="{ data }">
                {{
                  data.valore.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "Eur",
                  })
                }}
              </template>
            </Column>
          </DataTable>
        </div>
        <div class="grid col-sm-12 col-lg-5">
          <div class="flex flex-column px-2 py-4 col-sm-6 mb-4">
            <h3>Numero pratiche</h3>
            <Chart
              :width="300"
              :height="380"
              type="doughnut"
              :data="praticheGraphCount"
              :options="pieGraphOptions"
            />
          </div>

          <div class="flex flex-column px-2 py-4 col-sm-6 mb-4">
            <h3>Valore caricato</h3>
            <Chart
              :width="300"
              :height="380"
              type="doughnut"
              :data="praticheGraphCaricato"
              :options="pieGraphOptions"
            />
          </div>

          <div class="flex flex-column px-2 py-4 col-sm-6 mb-4">
            <h3>Valore erogato</h3>
            <Chart
              :width="300"
              :height="380"
              type="doughnut"
              :data="praticheGraphErogato"
              :options="pieGraphOptions"
            />
          </div>

          <div class="flex flex-column px-2 py-4 col-sm-6 mb-4">
            <h3>Valore annullato</h3>
            <Chart
              :width="300"
              :height="380"
              type="doughnut"
              :data="praticheGraphAnnullato"
              :options="pieGraphOptions"
            />
          </div>
        </div>
      </div>
    </template>
  </Card>
</div> -->

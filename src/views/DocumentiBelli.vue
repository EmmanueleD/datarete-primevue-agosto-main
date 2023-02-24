<template>
  <div class="wrapper">
    <div v-for="item of data[tipo_prodotto]" :key="item.id">
      <h3 class="mb-4">{{ item.title }}</h3>

      <div
        class="grid mb-4 w-full"
        v-for="documento of item.documenti"
        :key="documento.id"
      >
        <div class="col-12">
          <Card>
            <template #content>
              <div class="flex justify-content-between">
                <div class="col-4">
                  <h4>{{ documento.title }}</h4>
                  <Button label="Upload File..."></Button>
                </div>

                <div class="col-8">
                  <DataTable
                    :value="documento.files"
                    :stripedRows="true"
                    :rows="10"
                    table-layout="auto"
                  >
                    <Column field="nome" header="NOME FILE"></Column>
                    <Column field="info" header="INFORMAZIONI FILE"></Column>
                    <Column header="AZIONI">
                      <template #body>
                        <Button
                          icon="pi pi-file"
                          class="p-button-rounded mr-2"
                        ></Button>
                        <Button
                          icon="pi pi-trash"
                          class="p-button-rounded p-button-danger"
                        ></Button>
                      </template>
                    </Column>
                  </DataTable>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tipo_prodotto: String,
});

const data = {
  Pretito: [
    {
      id: 1,
      title: "DOCUMENTI DI IDENTITÀ",
      documenti: [
        {
          id: 1,
          title: "Carta di Identità",
          files: [
            {
              id: 1,
              nome: "file uno",
              info: "12/03/2022 - Mario Bianchi",
            },
          ],
        },
        {
          id: 2,
          title: "Patente",
          files: [
            {
              id: 1,
              nome: "file uno",
              info: "04/05/2022 - Mario Bianchi",
            },
          ],
        },
        {
          id: 3,
          title: "Tessera sanitaria",
          files: [
            {
              id: 1,
              nome: "file uno",
              info: "12/03/2022 - Mario Bianchi",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "PRECONTRATTUALE",
      documenti: [
        {
          id: 4,
          title: "Ultima dichiarazione dei redditi",
          files: [
            {
              id: 1,
              nome: "file 1",
              info: "info",
            },
          ],
        },
        {
          id: 5,
          title: "Ricevute di presentazione",
          files: [
            {
              id: 1,
              nome: "file 1",
              info: "info",
            },
          ],
        },
        {
          id: 6,
          title: "Reversale IBAN",
          files: [
            {
              id: 1,
              nome: "file 1",
              info: "info",
            },
          ],
        },
        {
          id: 7,
          title: "Contrattualistica e privacy",
          files: [
            {
              id: 1,
              nome: "file 1",
              info: "info",
            },
          ],
        },
      ],
    },
  ],
  Mutuo: [
    {
      id: 2,
      title: "PRECONTRATTUALE",
      documenti: [
        {
          id: 4,
          title: "Ultimo modello CUD",
          files: [
            {
              id: 1,
              nome: "file 1",
              info: "info",
            },
          ],
        },
        {
          id: 5,
          title: "Attestato di servizio (Per i dipendenti)",
          files: [
            {
              id: 1,
              nome: "file 1",
              info: "info",
            },
          ],
        },
        {
          id: 6,
          title: "Ultime 3 buste paga o cedolini",
          files: [
            {
              id: 1,
              nome: "file 1",
              info: "info",
            },
          ],
        },
        {
          id: 7,
          title:
            "Ultimi 2 estratti conto trimestrale (In cui è canalizzato il reddito percepito)",
          files: [
            {
              id: 1,
              nome: "file 1",
              info: "info",
            },
          ],
        },
        {
          id: 8,
          title:
            "Lista movimenti conto corrente ad integrazione dell'estratto conto (Aggiornato alla data della domanda di mutuo)",
          files: [
            {
              id: 1,
              nome: "file 1",
              info: "info",
            },
          ],
        },
      ],
    },
  ],
  Cessione: [
    {
      id: 1,
      title: "DOCUMENTI DI IDENTITÀ",
      documenti: [
        {
          id: 1,
          title: "Documento di identità",
          files: [
            {
              id: 1,
              nome: "file uno",
              info: "12/03/2022 - Mario Bianchi",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "CONTRATTUALE",
      documenti: [
        {
          id: 2,
          title: "Reddituali",
          files: [
            {
              id: 1,
              nome: "file 1",
              info: "info",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "PRECONTRATTUALE",
      documenti: [
        {
          id: 3,
          title: "Precontrattuale bancaria",
          files: [
            {
              id: 1,
              nome: "file 1",
              info: "info",
            },
          ],
        },
        {
          id: 4,
          title: "Precontrattuale PrestitoSi",
          files: [
            {
              id: 1,
              nome: "file 1",
              info: "info",
            },
          ],
        },
      ],
    },
  ],
};
</script>
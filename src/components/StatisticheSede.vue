<template>
  <Card class="p-2">
    <template #header>
      <div class="w-full px-4 pt-3"><slot name="titolo"></slot></div>
    </template>
    <template #content>
      <div class="w-full grid">
        <div
          class="col-12 col-md-6 flex justify-content-start gap-2 align-items-center"
        >
          <span>N RISORSE</span>
          <slot name="n_risorse"></slot>
        </div>
        <div
          class="col-12 col-md-6 flex justify-content-start gap-2 align-items-center"
        >
          <span>PROD MENSILE</span>
          <slot name="prod_mese"></slot>
        </div>
        <div
          class="col-12 col-md-6 flex justify-content-start gap-2 align-items-center"
        >
          <span>PROD ANNUALE</span>
          <slot name="prod_anno"></slot>
        </div>
        <div
          class="col-12 col-md-6 flex justify-content-start gap-2 align-items-center"
        >
          <span>DA LAVORARE</span>
          <slot name="da_lavorare"></slot>
        </div>
      </div>
      <div class="w-full grid-center" style="height: 250px">
        <div>
          <slot name="grafico"></slot>
        </div>
      </div>
      <slot name="footer"></slot>
    </template>
  </Card>
</template>

<style scoped>
.p-card-body {
  padding: 0 !important;
}

.p-card-content {
  padding: 0 !important;
}
</style>

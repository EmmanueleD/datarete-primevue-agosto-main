<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: Object,
  elements: Array,
  config: Object,
});
const emit = defineEmits(["update:modelValue"]);

let rowGap = props.config.rowGap ? props.config.rowGap : "1rem";
let columnGap = props.config.columnGap
  ? "calc(" + props.config.columnGap + "/2)"
  : ".5rem";
let spacing = {
  margin: `0 ${columnGap} ${rowGap}`,
};

const localValues = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});

function getColumnClasses(el) {
  let size = el.size && el.size.length == 3 ? el.size : [12, 6, 4];
  return "col-" + size[0] + " col-md-" + size[1] + " col-lg-" + size[2] + " ";
}

function getBlockWrapperClasses(el) {
  let flexClasses = " d-flex";
  flexClasses += el.bottomLabel ? " flex-column-reverse" : " flex-column";
  let alignClasses = el.align ? " align-items-" + el.align : "";
  let customClasses = el.wrapperClass ? " " + el.wrapperClass : "";
  return flexClasses + alignClasses + customClasses;
}

function eventHandler(el) {
  if (el.events) {
    return Object.fromEntries(
      Object.entries(el.events).map(([id, fn]) => [
        id,
        (e) => fn({ id: el.id, value: (localValues.value)[el.id], event: e }),
      ])
    );
  }
  return {};
}
</script>

<template>
  <div class="row g-0 align-items-center">
    <template v-for="el in elements" :key="el.id">
      <template v-if="!el.hide">
        <div v-if="el.newLine" class="w-100"></div>
        <div :class="getColumnClasses(el)">
          <div class="block-wrapper" :class="getBlockWrapperClasses(el)" :style="spacing">
            <label>{{  el.label  }}</label>
            <div class="component-wrapper">
              <slot v-if="el.type == 'slot'" v-bind:el="el" />
              <component :is="el.type" class="flex-grow-1 mw-100" :class="el.class" :style="el.style"
                :placeholder="el.placeholder || el.label" v-bind="el.attr" v-model="localValues[el.id]"
                v-on="eventHandler(el)" />
            </div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<style>
.block-wrapper>label {
  margin-bottom: 0.4rem;
}

.block-wrapper input {
  max-width: 100% !important;
}

.block-wrapper .component-wrapper {
  display: flex;
  min-height: 41.6px;
  align-items: center;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>
<template>
  <ul v-if="items">
    <template v-for="(item, i) of items">
      <li
        v-if="visible(item)"
        :key="i"
        :class="[
          {
            active: activeIndex === i && !item.to && !item.disabled,
          },
        ]"
      >
        <span v-if="item.to" @click="onMenuItemClick($event, item, i)">
          <router-link
            :to="item.to"
            :target="item.target"
            exact
            style="position: relative"
          >
            <i class="pi" :class="item.icon" />
            <span>{{ item.label }}</span>
          </router-link>
        </span>
        <a
          v-if="!item.to"
          :href="item.url || '#'"
          @click="onMenuItemClick($event, item, i)"
          :target="item.target"
        >
          <i class="pi" :class="item.icon" />
          <span>{{ item.label }}</span>
          <i
            v-if="item.items"
            class="pi pi-chevron-down menuitem-toggle-icon"
          />
        </a>
        <transition name="submenu-animation">
          <appsubmenu
            v-show="activeIndex === i"
            :items="visible(item) && item.items"
            @menuitem-click="$emit('menuitem-click')"
            class="submenu"
          ></appsubmenu>
        </transition>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: "appsubmenu",
  props: {
    items: Array,
    root: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeIndex: null,
    };
  },
  methods: {
    onMenuItemClick(event, item, index) {
      if (item.disabled) {
        event.preventDefault();
        return;
      }
      if (!item.to && !item.url) {
        event.preventDefault();
      }
      if (item.command) {
        item.command({ originalEvent: event, item: item });
      }
      this.activeIndex = index === this.activeIndex ? null : index;
      if (item.to || item.url || item.command) {
        this.$emit("menuitem-click");
      }
    },
    visible(item) {
      return typeof item.visible === "function"
        ? item.visible()
        : item.visible !== false;
    },
  },
};
</script>

<style>
</style>
<template>
  <footer class="layout_footer d-flex align-items-center">
    <span>
      <strong>DATARETE</strong> Cloud Platform - Copyright
      &copy; 2022
    </span>
  </footer>
</template>

<script>
export default {
  methods: {
    onMenuToggle(event) {
      this.$emit("menu-toggle", event);
    },
  },
};
</script>

<style scoped>

</style>
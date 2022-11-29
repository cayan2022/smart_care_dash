<template>
  <section></section>
</template>

<script>
export default {
  name: "Logout",
  data() {
    return {};
  },
  mounted() {
    this.$auth.logout();
  },
};
</script>

<style></style>

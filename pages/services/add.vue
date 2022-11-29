<template>
  <div>
    <add-service />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "create_services",
  },

  components: {
    addService: () => import(`@/components/services/add-service`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

<template>
  <div>
    <edit-service />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "update_services",
  },
  components: {
    editService: () => import(`@/components/services/edit-service`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

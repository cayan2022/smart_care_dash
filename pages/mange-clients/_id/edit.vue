<template>
  <div>
    <edit-client />
  </div>
</template>

<script>
export default {
  layout: "home",
  meta: {
    permissions: "update_customers",
  },
  components: {
    editClient: () => import(`@/components/manage-clients/edit-client`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

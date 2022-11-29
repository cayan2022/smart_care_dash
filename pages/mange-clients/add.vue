<template>
  <div>
    <add-client />
  </div>
</template>

<script>
export default {
  layout: "home",
  meta: {
    permissions: "create_customers",
  },
  components: {
    addClient: () => import(`@/components/manage-clients/add-client`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

<template>
  <div>
    <add-client />
  </div>
</template>

<script>
export default {
  name: "EditClientPage",
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "create_profiles",
  },
  components: {
    addClient: () => import(`@/components/clients/add-client`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

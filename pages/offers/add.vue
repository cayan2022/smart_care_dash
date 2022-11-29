<template>
  <div>
    <add-offer />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "create_offers",
  },
  components: {
    addOffer: () => import(`@/components/offers/add-offer`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

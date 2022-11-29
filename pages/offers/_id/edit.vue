<template>
  <div>
    <edit-offer />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "update_offers",
  },
  components: {
    editOffer: () => import(`@/components/offers/edit-offer`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

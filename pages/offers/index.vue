<template>
  <div>
    <offer-contain :offers="offers" :meta="meta" />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  watchQuery: true,
  meta: {
    permissions: "show_offers",
  },
  async asyncData({ $axios, store }) {
    const res = await $axios.get(`dashboard/pages/offers`, {
      params: { ...store.getters["query/getQuery"] },
    });
    const { data, meta } = res.data;
    console.log(data);
    return {
      offers: data.map((offer) => ({ ...offer, dropList: false })),
      meta,
    };
  },

  components: {
    offerContain: () => import(`@/components/offers/offer-contain`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

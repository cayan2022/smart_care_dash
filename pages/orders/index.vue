<template lang="">
  <div>
    <orders-contain :orders="orders" :meta="meta" />
  </div>
</template>

<script>
export default {
  layout: "home",
  components: {
    ordersContain: () => import(`@/components/orders/orders-contain`),
  },
  scrollToTop: true,
  meta: {
    permissions: "show_orders",
  },
  async asyncData({ $axios, store }) {
    const res = await $axios.get(`dashboard/pages/orders`, {
      params: { ...store.getters["query/getQuery"] },
    });
    const { data, meta } = res.data;
    return {
      orders: data,
      meta,
    };
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

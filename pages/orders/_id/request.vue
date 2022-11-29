<template lang="">
  <div>
    <order-request :order="order" />
  </div>
</template>

<script>
export default {
  name: "OrderRequest",
  layout: "home",
  meta: {
    permissions: "follow_orders",
  },
  components: {
    orderRequest: () => import(`@/components/orders/order-request`),
  },
  async asyncData({ $axios, params }) {
    const res = await $axios.get(`dashboard/pages/orders/${params.id}`);
    const { data, meta } = res.data;
    return {
      order: data,
      meta,
    };
  },
  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

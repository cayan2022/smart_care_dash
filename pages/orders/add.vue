<template lang="">
  <div>
    <add-order />
  </div>
</template>

<script>
export default {
  layout: "home",
  meta: {
    permissions: "create_orders",
  },
  components: {
    addOrder: () => import(`@/components/orders/add-order`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

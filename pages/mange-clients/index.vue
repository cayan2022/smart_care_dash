<template>
  <div>
    <clients-contain :clients="clients" :meta="meta" />
  </div>
</template>

<script>
export default {
  layout: "home",
  meta: {
    permissions: "show_customers",
  },
  async asyncData({ $axios, store }) {
    const res = await $axios.get(`dashboard/pages/customers/all`, {
      params: { ...store.getters["query/getQuery"] },
    });
    const { data, meta } = res.data;

    return {
      clients: data.map((item) => ({ ...item, dropList: false })),
      meta,
    };
  },
  components: {
    clientsContain: () => import(`@/components/manage-clients/clients-contain`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

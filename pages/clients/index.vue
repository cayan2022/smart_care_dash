<template>
  <div>
    <clients-contain :clients="clients" :meta="meta" />
  </div>
</template>

<script>
export default {
  name: "AllClientsPage",
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "show_profiles",
  },
  async asyncData({ $axios, store }) {
    const res = await $axios.get(`dashboard/profile/all`, {
      params: { ...store.getters["query/getQuery"] },
    });
    const { data, meta } = res.data;
    return {
      clients: data.map((client) => ({ ...client, dropList: false })),
      meta,
    };
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

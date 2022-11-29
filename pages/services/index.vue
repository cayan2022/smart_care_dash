<template>
  <div>
    <LazyServicesServiceContain :services="services" :meta="meta" />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  watchQuery: true,
  meta: {
    permissions: "show_services",
  },
  async asyncData({ $axios, store }) {
    const res = await $axios.get(`dashboard/pages/services`, {
      params: { ...store.getters["query/getQuery"] },
    });
    const { data, meta } = res.data;
    return {
      services: data.map((service) => ({ ...service, dropList: false })),
      meta,
    };
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

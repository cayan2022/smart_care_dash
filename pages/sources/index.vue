<template>
  <div>
    <source-contain :sources="sources" :meta="meta" />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  watchQuery: true,
  meta: {
    permissions: "show_sources",
  },
  async asyncData({ $axios, store }) {
    const res = await $axios.get(`dashboard/pages/sources`, {
      params: { ...store.getters["query/getQuery"] },
    });
    const { data, meta } = res.data;

    return {
      sources: data.map((item) => ({ ...item, dropList: false })),
      meta,
    };
  },
  components: {
    sourceContain: () => import(`@/components/sources/source-contain`),
  },
  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

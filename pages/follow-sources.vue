<template>
  <div>
    <sources-contain :statistics="statistics" />
  </div>
</template>

<script>
export default {
  layout: `home`,
  scrollToTop: true,
  watchQuery: true,
  meta: {
    permissions: "show_sources_reports",
  },

  async asyncData({ $axios, store }) {
    const res = await $axios.get(`dashboard/reports/sources`, {
      params: { ...store.getters["query/getQuery"] },
    });
    const { data } = res.data;

    return {
      statistics: data,
    };
  },
  components: {
    sourcesContain: () => import(`@/components/follow-sources/sources-contain`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

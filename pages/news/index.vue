<template>
  <div>
    <news-contain :news="news" :meta="meta" />
  </div>
</template>

<script>
export default {
  layout: "home",
  components: {
    newsContain: () => import(`@/components/news/news-contain`),
  },
  scrollToTop: true,
  meta: {
    permissions: "show_tidings",
  },
  async asyncData({ $axios, store }) {
    const res = await $axios.get(`dashboard/pages/tidings`, {
      params: { ...store.getters["query/getQuery"] },
    });
    const { data, meta } = res.data;
    return {
      news: data.map((item) => ({ ...item, dropList: false })),
      meta,
    };
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

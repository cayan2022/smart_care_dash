<template>
  <div>
    <home-intro :statistics="data" />
  </div>
</template>

<script>
export default {
  layout: `home`,
  scrollToTop: true,
  meta: {
    permissions: "show_statuses_reports",
  },

  async asyncData({ $axios, store }) {
    const res = await $axios.get(`dashboard/reports/statuses`, {
      params: { ...store.getters["query/getQuery"] },
    });
    const { data } = res.data;

    return {
      data,
    };
  },

  components: {
    homeIntro: () => import(`@/components/home/home-intro`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

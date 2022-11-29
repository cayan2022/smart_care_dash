<template>
  <div>
    <team-contain :teams="teams" :meta="meta" />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  watchQuery: true,
  meta: {
    permissions: "show_doctors",
  },
  async asyncData({ $axios, store }) {
    const res = await $axios.get(`dashboard/pages/doctors`, {
      params: { ...store.getters["query/getQuery"] },
    });
    const { data, meta } = res.data;
    return {
      teams: data.map((team) => ({ ...team, dropList: false })),
      meta,
    };
  },
  components: {
    teamContain: () => import(`@/components/teams/team-contain`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

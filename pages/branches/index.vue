<template>
  <div>
    <branches-contain :branches="branches" :meta="meta" />
  </div>
</template>

<script>
export default {
  layout: "home",
  meta: {
    permissions: "show_branches",
  },
  async asyncData({ $axios, store }) {
    const res = await $axios.get(`dashboard/pages/branches`, {
      params: { ...store.getters["query/getQuery"] },
    });
    const { data, meta } = res.data;

    return {
      branches: data.map((item) => ({ ...item, dropList: false })),
      meta,
    };
  },
  components: {
    branchesContain: () => import(`@/components/branches/branches-contain`),
  },
  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

<template>
  <div>
    <partners-contain :partners="partners" :meta="meta" />
  </div>
</template>

<script>
export default {
  layout: "home",
  components: {
    partnersContain: () => import(`@/components/partners/partners-contain`),
  },
  scrollToTop: true,
  meta: {
    permissions: "show_partners",
  },
  async asyncData({ $axios, store }) {
    const res = await $axios.get(`dashboard/pages/partners`, {
      params: { ...store.getters["query/getQuery"] },
    });
    const { data, meta } = res.data;
    return {
      partners: data.map((item) => ({ ...item, dropList: false })),
      meta,
    };
  },
  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

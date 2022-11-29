<template lang="">
  <div>
    <testimonials-contain :testimonials="testimonials" :meta="meta" />
  </div>
</template>

<script>
export default {
  layout: "home",
  meta: {
    permissions: "show_testimonials",
  },
  components: {
    testimonialsContain: () =>
      import(`@/components/testimonials/testimonials-contain`),
  },
  scrollToTop: true,
  watchQuery: true,
  async asyncData({ $axios, store }) {
    const res = await $axios.get(`dashboard/pages/testimonials`, {
      params: { ...store.getters["query/getQuery"] },
    });
    const { data, meta } = res.data;
    console.log(data);
    return {
      testimonials: data.map((item) => ({ ...item, dropList: false })),
      meta,
    };
  },
  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

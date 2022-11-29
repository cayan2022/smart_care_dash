<template>
  <div>
    <blog-contain :blogs="blogs" :meta="meta" />
  </div>
</template>

<script>
export default {
  layout: "home",
  components: {
    blogContain: () => import(`@/components/blogs/blog-contain`),
  },
  scrollToTop: true,
  meta: {
    permissions: "show_blogs",
  },
  async asyncData({ $axios, store }) {
    const res = await $axios.get(`dashboard/pages/blogs`, {
      params: { ...store.getters["query/getQuery"] },
    });
    const { data, meta } = res.data;
    return {
      blogs: data.map((item) => ({ ...item, dropList: false })),
      meta,
    };
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

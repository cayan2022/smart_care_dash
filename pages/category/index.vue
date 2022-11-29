<template>
  <div>
    <category-contain :categories="categories" :meta="meta" />
  </div>
</template>

<script>
export default {
  name: "Categories",
  layout: "home",
  scrollToTop: true,

  meta: {
    permissions: "show_categories",
  },
  async asyncData({ $axios, store }) {
    const res = await $axios.get(`dashboard/pages/categories`, {
      params: { ...store.getters["query/getQuery"] },
    });
    const { data, meta } = res.data;
    return {
      categories: data.map((category) => ({ ...category, dropList: false })),
      meta,
    };
  },
  components: {
    categoryContain: () => import(`@/components/category/category-contain`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

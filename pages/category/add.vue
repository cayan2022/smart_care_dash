<template>
  <div>
    <add-category />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "create_categories",
  },
  components: {
    addCategory: () => import(`@/components/category/add-category`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

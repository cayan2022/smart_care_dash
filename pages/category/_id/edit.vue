<template>
  <div>
    <edit-category />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "update_categories",
  },
  components: {
    editCategory: () => import(`@/components/category/edit-category`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

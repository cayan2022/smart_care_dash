<template>
  <div>
    <AddBlogs />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "create_blogs",
  },
  components: {
    AddBlogs: () => import(`@/components/blogs/add-blogs.vue`),
  },
  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

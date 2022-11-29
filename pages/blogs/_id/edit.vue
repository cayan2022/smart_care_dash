<template>
  <div>
    <edit-blog />
  </div>
</template>

<script>
export default {
  layout: "home",
  meta: {
    permissions: "update_blogs",
  },
  components: {
    editBlog: () => import(`@/components/blogs/edit-blog`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

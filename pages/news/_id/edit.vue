<template>
  <div>
    <edit-news />
  </div>
</template>

<script>
export default {
  layout: "home",
  meta: {
    permissions: "update_tidings",
  },
  components: {
    editNews: () => import(`@/components/news/edit-news`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

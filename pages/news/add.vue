<template>
  <div>
    <add-news />
  </div>
</template>

<script>
export default {
  layout: "home",
  meta: {
    permissions: "create_tidings",
  },
  components: {
    addNews: () => import(`@/components/news/add-news`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

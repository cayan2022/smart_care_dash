<template>
  <div>
    <add-source />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "create_sources",
  },
  components: {
    addSource: () => import(`@/components/sources/add-source`),
  },
  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

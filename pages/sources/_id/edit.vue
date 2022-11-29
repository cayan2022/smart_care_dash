<template>
  <div>
    <edit-source />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "update_sources",
  },
  components: {
    editSource: () => import(`@/components/sources/edit-source`),
  },
  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

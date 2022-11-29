<template>
  <div>
    <add-branch />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "create_branches",
  },
  components: {
    addBranch: () => import(`@/components/branches/add-branch`),
  },
  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

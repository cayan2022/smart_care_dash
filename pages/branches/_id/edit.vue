<template>
  <div>
    <edit-branch />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "update_branches",
  },
  components: {
    editBranch: () => import(`@/components/branches/edit-branch`),
  },
  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

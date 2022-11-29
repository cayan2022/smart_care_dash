<template>
  <div>
    <edit-project />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "update_projects",
  },
  components: {
    editProject: () => import(`@/components/projects/edit-project`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

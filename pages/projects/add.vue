<template>
  <div>
    <add-project />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "create_projects",
  },
  components: {
    addProject: () => import(`@/components/projects/add-project`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

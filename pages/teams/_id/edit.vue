<template>
  <div>
    <edit-team />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "update_doctors",
  },
  components: {
    editTeam: () => import(`@/components/teams/edit-team`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

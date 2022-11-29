<template>
  <div>
    <add-team />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "add_doctors",
  },
  components: {
    addTeam: () => import(`@/components/teams/add-team`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

<template>
  <div>
    <edit-partner />
  </div>
</template>

<script>
export default {
  layout: "home",
  meta: {
    permissions: "update_partners",
  },
  components: {
    editPartner: () => import(`@/components/partners/edit-partner`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

<template>
  <div>
    <add-partner />
  </div>
</template>

<script>
export default {
  layout: "home",
  components: {
    addPartner: () => import(`@/components/partners/add-partner`),
  },
  meta: {
    permissions: "create_partners",
  },
  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

<template>
  <div>
    <password-client />
  </div>
</template>

<script>
export default {
  layout: `home`,
  scrollToTop: true,

  components: {
    passwordClient: () => import(`@/components/clients/password-client`),
  },

  head() { return { title: this.$t(`home.title`) } }
}
</script>

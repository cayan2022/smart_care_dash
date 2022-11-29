<template>
  <div>
    <auth-modal />
  </div>
</template>

<script>
export default {
  name: "Login",
  layout: `default`,
  middleware: ["isAuth"],
  scrollToTop: true,
  components: {
    authModal: () => import(`@/components/auth/auth-modal`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

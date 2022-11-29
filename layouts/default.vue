<template>
  <div>
    <auth-nav />

    <nuxt />

    <home-footer />
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  components: {
    authNav: () => import(`@/components/layout/auth-nav`),
    homeFooter: () => import(`@/components/layout/home-footer`),
  },
  created() {
    this.$store.dispatch("roles/getPermissions");
  },
  mounted() {
    if (process.browser) {
      Cookies.set(`_source`, this.$route.query._source);
    }
  },

  head() {
    return {
      titleTemplate: `%s - ${this.$t("app.title")}`,
      htmlAttrs: { lang: this.$i18n.locale, dir: this.$t("app.dir") },
      bodyAttrs: { class: `${this.$t("app.dir")} font-body` },
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t(`app.description`),
        },
      ],
    };
  },
};
</script>

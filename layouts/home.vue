<template>
  <div>
    <home-header />

    <home-side-header />

    <nuxt class="main-container" :nuxtChildKey="$route.path" />
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  components: {
    homeHeader: () => import(`@/components/layout/home-header`),
    homeSideHeader: () => import(`@/components/layout/home-side-header`),
  },
  middleware: "isGuest",
  created() {
    this.$store.dispatch("roles/getPermissions");
  },
  mounted() {
    if (process.browser) {
      Cookies.set(`_source`, this.$route.query._source);
    }

    // this.$store.dispatch(`home/assets`)
  },

  head() {
    return {
      titleTemplate: `%s - ${this.$t(`app.title`)}`,
      htmlAttrs: { lang: this.$i18n.locale, dir: this.$t(`app.dir`) },
      bodyAttrs: { class: `${this.$t(`app.dir`)} font-body` },
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

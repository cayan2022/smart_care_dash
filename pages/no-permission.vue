<template>
  <div>
    <v-error />
  </div>
</template>

<script>
export default {
  components: {
    vError: () => import(`@/components/v-error`),
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

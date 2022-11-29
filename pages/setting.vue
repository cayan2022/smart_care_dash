<template>
  <section class="w-full">
    <div class="container">
      <page-heading
        title="اعدادت الحساب"
        desc="قم بإدارة حسابك، وعرض حالتك، وتغيير كلمة المرور الخاصة بك"
        class="mb-10"
      />

      <div
        class="grid xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-x-5 gap-y-7"
      >
        <account-data />

        <change-pass />

        <system-logo />

        <!-- <system-lang /> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: `home`,
  scrollToTop: true,
  meta: {
    permissions: "update_settings",
  },

  components: {
    accountData: () => import(`@/components/setting/account-data`),
    changePass: () => import(`@/components/setting/change-pass`),
    systemLogo: () => import(`@/components/setting/system-logo`),
    systemLang: () => import(`@/components/setting/system-lang`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

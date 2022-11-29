<template>
  <section class="w-full account-data">
    <h1 class="text-lg font-bold text-dark mb-5">تغيير كلمة المرور</h1>

    <form
      @submit.prevent="handleSubmit"
      class="
        contain
        w-full
        lg:p-10
        md:p-5
        sm:p-5
        p-5
        bg-light
        rounded-lg
        bg-opacity-80
        flex flex-col
        justify-center
        items-center
      "
    >
      <img
        src="/img/icons/password_change.svg"
        class="w-36 h-36 object-contain mb-10"
        loading="lazy"
        :alt="$t(`app.title`)"
      />

      <form-input
        v-model="form.old_password"
        errorName="old_password"
        lableName="كلمة المرور القديمة"
        icon="lock"
        type="password"
        placeholder="كلمة المرور القديمة"
        class="mb-3"
      />

      <form-input
        v-model="form.password"
        errorName="password"
        lableName="كلمة المرور الجديدة"
        icon="lock"
        type="password"
        placeholder="كلمة المرور الجديدة"
        class="mb-3"
      />

      <form-input
        v-model="form.password_confirmation"
        errorName="password_confirmation"
        lableName="تأكيد كلمة المرور الجديدة"
        icon="lock"
        type="password"
        placeholder="تأكيد كلمة المرور الجديدة"
        class="mb-10"
      />

      <page-button
        :disabled="loading"
        name="حفظ"
        type="submit"
        btnClass="yellow"
        imgClass="hidden"
        class="ltr:ml-2 rtl:ml-3"
      />
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        user_id: "",
        old_password: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
    resetData() {
      for (const key in this.form) {
        this.form[key] = "";
      }
    },
    generateData() {
      const formData = new FormData();
      this.form.user_id = this.$auth.user.id;
      for (const key in this.form) {
        formData.append(key, this.form[key]);
      }

      return formData;
    },
    async handleSubmit() {
      try {
        this.loading = true;
        await this.$axios.post(
          `dashboard/profile/change-password`,
          this.generateData()
        );
        this.resetData();
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
.account-data .btn-contain {
  width: 300px;
}
</style>
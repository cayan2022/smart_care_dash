<template>
  <section class="w-full account-data">
    <h1 class="text-lg font-bold text-dark mb-5">بيانات الحساب</h1>

    <form
      @submit.prevent="handleUpdateProfile"
      class="contain w-full lg:p-10 md:p-5 sm:p-5 p-5 bg-light rounded-lg bg-opacity-80 flex flex-col justify-center items-center"
    >
      <upload-image
        v-model="profile.image"
        :imgUrl="profile.image"
        title="تغيير الصورة الشخصية"
        icon="camera"
        name="profile"
        class="mb-10"
        errorName="image"
      />

      <form-input
        v-model="profile.name"
        lableName="الاسم"
        icon="user"
        type="text"
        lock="hidden"
        placeholder="الاسم"
        class="mb-3"
        errorName="name"
      />

      <form-input
        v-model="profile.email"
        lableName="البريد الالكتروني"
        icon="message"
        type="email"
        lock="hidden"
        placeholder="البريد الالكتروني"
        class="mb-3"
        errorName="email"
      />

      <form-phone v-model="profile.phone" class="mb-10" errorName="phone">
        <div slot="country-code">
          <country-code v-model="profile.country_id" errorName="country_id" />
        </div>
      </form-phone>

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
  name: "AccountData",
  data() {
    return {
      loading: false,
      profile: {
        image: "",
        name: "",
        email: "",
        phone: "",
        country_id: "",
        id: "",
      },
    };
  },
  methods: {
    generateData() {
      const formData = new FormData();
      if (typeof this.profile["image"] === "string") {
        delete this.profile["image"];
      }
      for (const key in this.profile) {
        formData.append(key, this.profile[key]);
      }

      return formData;
    },
    async handleUpdateProfile() {
      this.loading = true;
      await this.$axios.post(
        `dashboard/profile/update/${this.profile.id}`,
        this.generateData()
      );
      this.$auth.fetchUser();
      this.loading = false;
    },
  },
  watch: {
    "$auth.user": {
      handler(user) {
        this.profile = { ...user };
        this.profile.country_id = user.country.id;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
.account-data .btn-contain {
  width: 300px;
}

@media (max-width: 900px) {
  .account-data .mobile-btn {
    width: 100% !important;
  }
}
</style>

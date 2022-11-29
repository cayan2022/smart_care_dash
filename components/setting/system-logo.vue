<template>
  <section class="w-full account-data">
    <h1 class="text-lg font-bold text-dark mb-5">صورة النظام</h1>

    <form
      @submit.prevent="handleUpdateProfile"
      class="contain w-full lg:p-20 md:p-5 sm:p-5 p-5 bg-light rounded-lg bg-opacity-80 flex flex-col justify-center items-center"
    >
      <upload-image
        v-model="profile.image"
        :imgUrl="profile.image"
        title="تغيير صورة النظام"
        icon="camera"
        name="system_logo"
        class="mb-10"
        errorName="image"
        @input="handleUpdateProfile"
      />
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      profile: {
        image: "",
      },
    };
  },
  methods: {
    generateData() {
      const formData = new FormData();
      formData.append("image", this.profile.image);
      return formData;
    },
    async handleUpdateProfile() {
      try {
        this.loading = true;
        await this.$axios.post(
          `dashboard/pages/settings/1/update`,
          this.generateData()
        );
        this.$store.dispatch("query/SetSystemLogo");
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    getSystemLogo: {
      handler(value) {
        if (value) {
          this.profile = { ...value };
        }
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
</style>

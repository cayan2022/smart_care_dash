<template>
  <div>
    <form class="w-full add-role" @submit.prevent="handleSubmit">
      <div class="container">
        <div
          class="flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading
            title="تعديل شريك النجاح "
            desc="قم تعديل بيانات شريك النجاح"
          />

          <div class="flex items-center bottom-action">
            <page-button
              :disable="loading"
              name="تعديل"
              type="submit"
              btnClass="yellow"
              imgClass="hidden"
              class="ltr:ml-2 rtl:ml-3"
            />

            <page-button
              name="الغاء"
              @click="$router.push(`/partners`)"
              btnClass="black"
              imgClass="hidden"
            />
          </div>
        </div>

        <div class="w-full py-10 px-7 rounded-lg bg-light">
          <upload-image
            icon="camera"
            name="userProfile"
            title="تعديل صورة الشركة"
            v-model="form.image"
            :imgUrl="form.image"
            errorName="image"
            class="mb-14"
          />

          <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5">
            <form-input
              lableName="اسم الشركة بالعربية"
              icon="service_name"
              type="text"
              lock="hidden"
              placeholder="اسم الشركة"
              v-model="form['ar[name]']"
              errorName="ar.name"
            />

            <form-input
              lableName="اسم الشركة بالانجليزية"
              icon="service_name"
              type="text"
              lock="hidden"
              placeholder="اسم الشركة"
              v-model="form['en[name]']"
              errorName="en.name"
            />

            <form-input
              lableName="رابط الشركة"
              icon="bag"
              type="text"
              lock="hidden"
              placeholder="رابط الشركة"
              v-model="form['link']"
              errorName="link"
            />
          </div>
        </div>
      </div>
    </form>

    <!-- Success Modal -->
    <success-modal v-if="showModel"> تم تعديل شريك النجاح بنجاح </success-modal>
  </div>
</template>

<script>
export default {
  name: "EditPartner",
  data() {
    return {
      showModel: false,
      loading: false,
      form: {
        "ar[name]": "",
        "en[name]": "",
        image: "",
        link: "",
      },
    };
  },
  created() {
    this.handleShow();
  },
  methods: {
    async handleShow() {
      const res = await this.$axios.get(
        `dashboard/pages/partners/${this.$route.params.id}`
      );
      const { data } = res.data;
      const { link, translations, avatar } = data;
      const arTrans = translations["ar"];
      const enTrans = translations["en"];
      this.form = {
        link,
        image: avatar,
        "ar[name]": arTrans.name,
        "en[name]": enTrans.name,
      };
    },
    generateData() {
      const formData = new FormData();
      if (typeof this.form["image"] === "string") {
        delete this.form["image"];
      }
      for (const key in this.form) {
        formData.append(key, this.form[key]);
      }
      return formData;
    },
    async handleSubmit() {
      try {
        this.loading = true;
        await this.$axios.post(
          `dashboard/pages/partners/${this.$route.params.id}`,
          this.generateData()
        );
        this.showModel = true;
        this.loading = false;
        this.$router.push(this.localePath("/partners"));
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.add-role {
  .check-box {
    min-width: 120px;
    margin-bottom: 20px;
  }
  .yellow-btn {
    border-color: transparent;
    width: 215px;
    height: 50px;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: -1;
      transition: all 0.3s linear;
      top: 0;
      background-color: var(--primary);
    }
    &:hover {
      border-color: var(--primary);
      &::after {
        height: 0px;
      }
    }
  }
}
</style>

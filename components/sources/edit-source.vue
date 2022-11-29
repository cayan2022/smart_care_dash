<template>
  <div>
    <form class="w-full add-role" @submit.prevent="handleSubmit">
      <div class="container">
        <div
          class="flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading
            title="تعديل مصدر"
            desc="قم بتعديل مصدر وتغيير بياناته"
          />

          <div class="flex items-center bottom-action">
            <page-button
              :disabled="loading"
              name="تعديل"
              type="submit"
              btnClass="yellow"
              imgClass="hidden"
              class="ltr:ml-2 rtl:ml-3"
            />

            <page-button
              name="الغاء"
              @click="$router.push(`/sources`)"
              btnClass="black"
              imgClass="hidden"
            />
          </div>
        </div>

        <div class="w-full py-10 px-7 rounded-lg bg-light">
          <upload-image
            icon="camera"
            name="userProfile"
            title="إضافة صورة للمصدر"
            class="mb-14"
            v-model="form.image"
            :imgUrl="form.image"
            errorName="image"
          />

          <div
            class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 mb-5"
          >
            <form-input
              lableName="الاسم بالعربي"
              icon="outline-hashtag"
              type="text"
              lock="hidden"
              placeholder="الاسم بالعربي"
              v-model="form['ar[name]']"
              errorName="ar.name"
            />

            <form-input
              lableName="الاسم بالانجليزي"
              icon="outline-hashtag"
              type="text"
              lock="hidden"
              placeholder="الاسم بالانجليزي"
              v-model="form['en[name]']"
              errorName="en.name"
            />

            <form-input
              lableName="الكود"
              icon="outline-edit"
              type="text"
              lock="hidden"
              placeholder="الكود"
              v-model="form['identifier']"
              errorName="identifier"
            />
          </div>

          <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5">
            <form-textArea
              lableName="وصف مختصر بالعربي"
              icon="outline-edit"
              placeholder="وصف مختصر بالعربي"
              v-model="form['ar[short_description]']"
              errorName="ar.short_description"
            />

            <form-textArea
              lableName="وصف مختصر بالانجليزي"
              icon="outline-edit"
              placeholder="وصف مختصر بالانجليزي"
              v-model="form['en[short_description]']"
              errorName="en.short_description"
            />
          </div>
        </div>
      </div>
    </form>

    <!-- Success Modal -->
    <success-modal v-if="showModel"> تم تعديل مصدر جديد بنجاح </success-modal>
  </div>
</template>

<script>
export default {
  name: "EditSource",
  data() {
    return {
      showModel: false,
      loading: false,
      form: {
        image: "",
        "ar[name]": "",
        "en[name]": "",
        "ar[short_description]": "",
        "en[short_description]": "",
        identifier: "",
      },
    };
  },
  created() {
    this.handleShow();
  },
  methods: {
    async handleShow() {
      const res = await this.$axios.get(
        `dashboard/pages/sources/${this.$route.params.id}`
      );
      const { data } = res.data;
      const { image, translations, identifier } = data;
      const arTrans = translations["ar"];
      const enTrans = translations["en"];
      this.form = {
        image,
        identifier,
        "ar[name]": arTrans.name,
        "ar[short_description]": arTrans.short_description,
        "en[name]": enTrans.name,
        "en[short_description]": enTrans.short_description,
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
          `dashboard/pages/sources/${this.$route.params.id}`,
          this.generateData()
        );
        this.showModel = true;
        this.loading = false;
        this.$router.push(this.localePath("/sources"));
      } catch (error) {
        console.log(error);
        this.loading = false;
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

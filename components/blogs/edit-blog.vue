<template>
  <div>
    <form class="w-full add-role" @submit.prevent="handleSubmit">
      <div class="container">
        <div
          class="flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading title="تعديل مقالة " desc="قم تعديل بيانات المقالة" />

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
              @click.prevent="$router.push(localePath(`/blogs`))"
              btnClass="black"
              imgClass="hidden"
            />
          </div>
        </div>

        <div class="w-full py-10 px-7 rounded-lg bg-light">
          <upload-image
            icon="camera"
            name="userProfile"
            title="تعديل صورة المقالة"
            class="mb-14"
            :imgUrl="form.image"
            v-model="form.image"
            errorName="image"
          />

          <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5">
            <form-input
              lableName="اسم مقالة بالعربية"
              icon="service_name"
              type="text"
              lock="hidden"
              placeholder="اسم مقالة"
              v-model="form['ar[title]']"
              errorName="ar.name"
            />

            <form-input
              lableName="اسم مقالة بالانجليزية"
              icon="service_name"
              type="text"
              lock="hidden"
              placeholder="اسم مقالة"
              v-model="form['en[title]']"
              errorName="en.name"
            />
            <date-picker
              type="date"
              lableName="تاريخ مقالة"
              icon="calendar"
              placeholder="تاريخ مقالة"
              class="mb-5"
              name="اختر التوقيت"
              v-model="form.date"
              errorName="date"
            />

            <form-input
              lableName="رابط المرجع"
              icon="bag"
              type="text"
              lock="hidden"
              placeholder="رابط المرجع"
              v-model="form['reference_link']"
              errorName="reference_link"
            />

            <form-textArea
              lableName="وصف مختصر بالعربية"
              icon="powers"
              type="text"
              lock="hidden"
              placeholder="وصف مختصر"
              v-model="form['ar[short_description]']"
              errorName="ar.short_description"
            />
            <form-textArea
              lableName="وصف مختصر بالانجليزية"
              icon="powers"
              type="text"
              lock="hidden"
              placeholder="وصف مختصر"
              v-model="form['en[short_description]']"
              errorName="en.short_description"
            />

            <client-only>
              <VueEditor
                placeholder="وصف كامل بالعربية"
                v-model="form['ar[long_description]']"
                errorName="ar.long_description"
              />
            </client-only>
            <client-only>
              <VueEditor
                placeholder="وصف كامل بالانجليزية"
                v-model="form['en[long_description]']"
                errorName="en.long_description"
              />
            </client-only>
          </div>
        </div>
      </div>
    </form>

    <!-- Success Modal -->
    <success-modal v-if="showModel"> تم تعديل المقالة بنجاح </success-modal>
  </div>
</template>

<script>
export default {
  name: "EditBlog",
  data() {
    return {
      showModel: false,
      loading: false,
      form: {
        image: "",
        "ar[title]": "",
        "en[title]": "",
        "ar[description]": "",
        "en[description]": "",
        "ar[short_description]": "",
        "en[short_description]": "",
        "ar[long_description]": "",
        "en[long_description]": "",
        date: "",
        reference_link: "",
        is_active: 1,
      },
    };
  },
  created() {
    this.handleShow();
  },
  methods: {
    async handleShow() {
      const res = await this.$axios.get(
        `dashboard/pages/blogs/${this.$route.params.id}`
      );
      const { data } = res.data;
      const { reference_link, date, is_active, translations, avatar } = data;
      const arTrans = translations["ar"];
      const enTrans = translations["en"];
      this.form = {
        reference_link,
        image: avatar,
        date,
        is_active,
        "ar[title]": arTrans.title,
        "ar[long_description]": arTrans.long_description,
        "ar[short_description]": arTrans.short_description,
        "en[title]": enTrans.title,
        "en[long_description]": enTrans.long_description,
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
          `dashboard/pages/blogs/${this.$route.params.id}`,
          this.generateData()
        );
        this.showModel = true;
        this.loading = false;
        this.$router.push(this.localePath("/blogs"));
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

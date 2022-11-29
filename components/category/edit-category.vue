<template>
  <div>
    <form class="w-full add-role" @submit.prevent="handleSubmit">
      <div class="container">
        <div
          class="
            flex
            items-center
            content-center
            justify-between
            mb-10
            lg:flex-row
            md:flex-row
            sm:flex-col
            flex-col
          "
        >
          <page-heading
            title="تعديل قسم "
            desc="قم بتعديل قسم وتغيير بياناتها"
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
              @click.prevent="$router.push(localePath(`/category`))"
              btnClass="black"
              imgClass="hidden"
            />
          </div>
        </div>

        <div class="w-full py-10 px-7 rounded-lg bg-light">
          <upload-image
            :imgUrl="form.image"
            v-model="form.image"
            errorName="image"
            icon="camera"
            name="userProfile"
            title="تعديل صورة القسم"
            class="mb-14"
          />

          <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5">
            <form-input
              lableName="اسم القسم بالعربية"
              icon="service_name"
              type="text"
              lock="hidden"
              placeholder="اسم القسم"
              errorName="ar.name"
              v-model="form['ar.name']"
            />

            <form-input
              lableName="اسم القسم بالانجليزية"
              icon="service_name"
              type="text"
              lock="hidden"
              placeholder="اسم القسم"
              errorName="en.name"
              v-model="form['en.name']"
            />

            <form-input
              lableName="وصف مختصر للخدمة بالعربية"
              icon="powers"
              type="text"
              lock="hidden"
              placeholder="وصف تفصيلي للخدمة"
              errorName="ar.description"
              v-model="form['ar.description']"
            />

            <form-input
              lableName="وصف مختصر للخدمة بالانجليزية"
              icon="powers"
              type="text"
              lock="hidden"
              placeholder="وصف تفصيلي للخدمة"
              errorName="en.description"
              v-model="form['en.description']"
            />
          </div>
        </div>
      </div>
    </form>

    <!-- Success Modal -->
    <success-modal v-if="success_model">
      تم تعديل قسم بنجاح
    </success-modal>
  </div>
</template>
<script>
export default {
  name: "EditCategory",

  data() {
    return {
      loading: false,
      success_model: false,
      form: {
        image: "",
        "ar.name": "",
        "en.name": "",
        "ar.description": "",
        "en.description": "",
      },
    };
  },
  mounted() {
    this.handleShowCategory();
  },
  methods: {
    generateData() {
      const formData = new FormData();
      if (typeof this.form["image"] === "string") {
        delete this.form["image"];
      }
      for (const key in this.form) {
        if (key.includes(".")) {
          const [lang, value] = key.split(".");
          formData.append(`${lang}[${value}]`, this.form[key]);
        } else {
          formData.append(key, this.form[key]);
        }
      }
      return formData;
    },
    async handleSubmit() {
      try {
        this.loading = true;
        await this.$axios.$post(
          `dashboard/pages/categories/${this.$route.params.id}`,
          this.generateData()
        );
        this.success_model = true;
        setTimeout(() => {
          this.$router.push(this.localePath("/category"));
        }, 1500);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async handleShowCategory() {
      try {
        const res = await this.$axios.$get(
          `dashboard/pages/categories/${this.$route.params.id}`
        );
        const { data } = res;
        const { translations, category, image } = data;
        this.form.image = image;

        const arTrans = translations["ar"];
        const enTrans = translations["en"];
        this.form["ar.name"] = arTrans.name;
        this.form["ar.description"] = arTrans.description;
        this.form["en.name"] = enTrans.name;
        this.form["en.description"] = enTrans.description;
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

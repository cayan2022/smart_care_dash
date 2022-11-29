<template>
  <div>
    <form class="w-full add-role" @submit.prevent="handleSubmit">
      <div class="container">
        <div
          class="flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading title="اضافة مشروع " desc="قم باضافة مشروع جديدة" />

          <div class="flex items-center bottom-action">
            <page-button
              :disable="loading"
              name="حفظ"
              type="submit"
              btnClass="yellow"
              imgClass="hidden"
              class="ltr:ml-2 rtl:ml-3"
            />

            <page-button
              name="الغاء"
              @click.prevent="$router.push(`/projects`)"
              btnClass="black"
              imgClass="hidden"
            />
          </div>
        </div>

        <div class="w-full py-10 px-7 rounded-lg bg-light">
          <upload-image
            icon="camera"
            name="userProfile"
            title="إضافة صورة المشروع"
            class="mb-14"
            v-model="form['image']"
            errorName="image"
          />

          <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5">
            <form-input
              lableName="اسم المشروع بالعربية"
              icon="service_name"
              type="text"
              lock="hidden"
              placeholder="اسم المشروع"
              v-model="form['ar[name]']"
              errorName="ar.name"
            />

            <form-input
              lableName="اسم المشروع بالانجليزية"
              icon="service_name"
              type="text"
              lock="hidden"
              placeholder="اسم المشروع"
              v-model="form['en[name]']"
              errorName="en.name"
            />

            <form-input
              lableName="تنصيف المشروع بالعربية"
              icon="bag"
              type="text"
              lock="hidden"
              placeholder="تنصيف المشروع بالعربية"
              v-model="form['ar[classification]']"
              errorName="ar.classification"
            />
            <form-input
              lableName="تنصيف المشروع الانجليزية"
              icon="bag"
              type="text"
              lock="hidden"
              placeholder="تنصيف المشروع الانجليزية"
              v-model="form['en[classification]']"
              errorName="en.classification"
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
          </div>

          <div
            class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5 mt-5"
          >
            <client-only>
              <VueEditor
                placeholder="وصف كامل بالعربية"
                v-model="form['ar[full_description]']"
                errorName="ar.full_description"
              />
            </client-only>
            <client-only>
              <VueEditor
                placeholder="وصف كامل بالانجليزية"
                v-model="form['en[full_description]']"
                errorName="en.full_description"
              />
            </client-only>
          </div>
        </div>
      </div>
    </form>

    <!-- Success Modal -->
    <success-modal v-if="showModel"> تم انشاء مشروع جديد بنجاح </success-modal>
  </div>
</template>

<script>
export default {
  name: "AddProject",
  data() {
    return {
      showModel: false,
      loading: false,
      form: {
        image: "",
        "ar[name]": "",
        "en[name]": "",
        "ar[classification]": "",
        "en[classification]": "",
        "ar[full_description]": "",
        "en[full_description]": "",
        "ar[short_description]": "",
        "en[short_description]": "",
      },
    };
  },
  methods: {
    generateData() {
      const formData = new FormData();

      for (const key in this.form) {
        formData.append(key, this.form[key]);
      }
      return formData;
    },
    async handleSubmit() {
      try {
        this.loading = true;
        await this.$axios.post(`dashboard/pages/projects`, this.generateData());
        this.showModel = true;
        this.loading = false;
        this.$router.push(this.localePath("/projects"));
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

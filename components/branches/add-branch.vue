<template>
  <div>
    <form class="w-full add-role" @submit.prevent="handleSubmit">
      <div class="container">
        <div
          class="flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading
            title="انشاء فرع جديد"
            desc="قم بتعبئة البيانات الآتية لانشاء فرع جديد"
          />

          <div class="flex items-center bottom-action">
            <page-button
              :disable="loading"
              name="اضافة"
              type="submit"
              btnClass="yellow"
              imgClass="hidden"
              class="ltr:ml-2 rtl:ml-3"
            />

            <page-button
              name="الغاء"
              @click.prevent="$router.push(`/branches`)"
              btnClass="black"
              imgClass="hidden"
            />
          </div>
        </div>

        <div class="w-full py-10 px-7 rounded-lg bg-light">
          <div
            class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5 mb-5"
          >
            <form-input
              lableName="الاسم بالعربية"
              icon="service_name"
              type="text"
              lock="hidden"
              placeholder="الاسم بالعربية"
              v-model="form['ar[name]']"
              errorName="ar.name"
            />
            <form-input
              lableName="الاسم بالانجليزية"
              icon="service_name"
              type="text"
              lock="hidden"
              placeholder="الاسم بالانجليزية"
              v-model="form['en[name]']"
              errorName="en.name"
            />

            <form-input
              lableName="المدينة بالعربية"
              icon="location"
              type="text"
              lock="hidden"
              placeholder="المدينة بالعربية"
              v-model="form['ar[city]']"
              errorName="ar.city"
            />

            <form-input
              lableName="المدينة بالانجليزي"
              icon="location"
              type="text"
              lock="hidden"
              placeholder="المدينة بالانجليزي"
              v-model="form['en[city]']"
              errorName="en.city"
            />

            <form-input
              lableName="العنوان بالعربي"
              icon="location"
              type="text"
              lock="hidden"
              placeholder="العنوان بالعربي"
              v-model="form['ar[address]']"
              errorName="ar.address"
            />

            <form-input
              lableName="العنوان بالانجليزي"
              icon="location"
              type="text"
              lock="hidden"
              placeholder="العنوان بالانجليزي"
              v-model="form['en[address]']"
              errorName="en.address"
            />
          </div>

          <div
            class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 mb-5"
          >
            <form-input
              lableName="رابط الخريطة"
              icon="location"
              type="text"
              lock="hidden"
              placeholder="رابط الخريطة"
              v-model="form['map']"
              errorName="map"
            />

            <form-input
              lableName="الواتساب"
              icon="whatsapp"
              type="number"
              lock="hidden"
              placeholder="الواتساب"
              v-model="form['whatsapp']"
              errorName="whatsapp"
            />

            <form-input
              lableName="رقم الهاتف"
              icon="phone"
              type="number"
              lock="hidden"
              placeholder="رقم الهاتف"
              v-model="form['telephone']"
              errorName="telephone"
            />
          </div>
          <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5">
            <form-textArea
              lableName="وصف تفصيلي للفرع بالعربية"
              icon="outline-edit"
              placeholder="وصف تفصيلي للفرع بالعربية"
              v-model="form['ar[full_description]']"
              errorName="ar.full_description"
            />

            <form-textArea
              lableName="وصف تفصيلي للفرع باالانجليزية"
              icon="outline-edit"
              placeholder="وصف تفصيلي للفرع باالانجليزية"
              v-model="form['en[full_description]']"
              errorName="en.full_description"
            />
          </div>
        </div>
      </div>
    </form>

    <!-- Success Modal -->
    <success-modal v-if="showModel"> تم انشاء فرع جديد بنجاح </success-modal>
  </div>
</template>

<script>
export default {
  name: "BranchAdd",
  data() {
    return {
      showModel: false,
      loading: false,
      form: {
        "ar[name]": "",
        "en[name]": "",
        "en[address]": "",
        "ar[address]": "",
        "ar[city]": "",
        "en[city]": "",
        "en[full_description]": "",
        "ar[full_description]": "",
        map: "",
        whatsapp: "",
        telephone: "",
        is_active: 1,
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
        await this.$axios.post(`dashboard/pages/branches`, this.generateData());
        this.showModel = true;
        this.loading = false;
        this.$router.push(this.localePath("/branches"));
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

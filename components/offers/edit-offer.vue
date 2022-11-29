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
            title="تعديل العرض "
            desc="قم بتعديل العرض وتغيير بياناتها"
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
              @click.prevent="$router.push(localePath(`/offers`))"
              btnClass="black"
              imgClass="hidden"
            />
          </div>
        </div>

        <div class="w-full py-10 px-7 rounded-lg bg-light">
          <upload-image
            icon="camera"
            name="userProfile"
            title="تعديل صورة العرض"
            class="mb-14"
            :imgUrl="form.image"
            v-model="form.image"
            errorName="image"
          />

          <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5">
            <form-input
              lableName="اسم العرض بالعربية"
              icon="service_name"
              type="text"
              lock="hidden"
              placeholder="اسم العرض"
              v-model="form['ar.name']"
              errorName="ar.name"
            />

            <form-input
              lableName="اسم العرض بالانجليزية"
              icon="service_name"
              type="text"
              lock="hidden"
              placeholder="اسم العرض"
              v-model="form['en.name']"
              errorName="en.name"
            />

            <form-input
              lableName="السعر"
              icon="tag"
              type="number"
              lock="hidden"
              placeholder="السعر"
              v-model="form['price']"
              errorName="price"
            />

            <form-input
              lableName="نسبة الخصم"
              icon="discount"
              type="number"
              lock="hidden"
              placeholder="نسبة الخصم"
              v-model="form['discount_percentage']"
              errorName="discount_percentage"
            />

            <form-input
              lableName="وصف مختصر بالعربية"
              icon="powers"
              type="text"
              lock="hidden"
              placeholder="وصف مختصر"
              v-model="form['ar.description']"
              errorName="ar.description"
            />

            <form-input
              lableName="وصف مختصر بالانجليزية"
              icon="powers"
              type="text"
              lock="hidden"
              placeholder="وصف مختصر"
              v-model="form['en.description']"
              errorName="en.description"
            />
          </div>

          <form-input
            class="mt-5"
            lableName="رابط العرض"
            icon="bag"
            type="text"
            lock="hidden"
            placeholder="رابط المنتج"
            v-model="form['url']"
            errorName="url"
          />
        </div>
      </div>
    </form>

    <!-- Success Modal -->
    <success-modal v-if="success_model">
      تم تعديل عرض بنجاح
    </success-modal>
  </div>
</template>

<script>
export default {
  name: "EditOffer",
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
        discount_percentage: "",
        price: "",
        url: "",
      },
    };
  },
  mounted() {
    this.handleShow();
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
          `dashboard/pages/offers/${this.$route.params.id}`,
          this.generateData()
        );
        this.success_model = true;
        setTimeout(() => {
          this.$router.push(this.localePath("/offers"));
        }, 1500);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async handleShow() {
      try {
        const res = await this.$axios.$get(
          `dashboard/pages/offers/${this.$route.params.id}`
        );
        const { data } = res;
        const { translations, image, price, discount_percentage, url } = data;
        this.form.image = image;

        const arTrans = translations["ar"];
        const enTrans = translations["en"];
        this.form.price = price;
        this.form.discount_percentage = discount_percentage;
        this.form.url = url;
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

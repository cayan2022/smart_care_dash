<template>
  <div>
    <form class="w-full add-role" @submit.prevent="handleSubmit">
      <div class="container">
        <div
          class="flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading
            title="تعديل  عميل "
            desc="قم بتعديل عميل وتغيير بياناته"
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
              @click.prevent="$router.push(localePath(`/mange-clients`))"
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
            title="تعديل صورة شخصية"
            class="mb-14"
          />

          <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5">
            <form-input
              lableName="الاسم"
              icon="user"
              type="text"
              lock="hidden"
              placeholder="الاسم"
              v-model="form.name"
              errorName="name"
            />

            <form-input
              lableName="البريد الالكتروني"
              icon="message"
              type="email"
              lock="hidden"
              placeholder="البريد الالكتروني"
              v-model="form.email"
              errorName="email"
            />

            <form-phone v-model="form.phone" errorName="phone">
              <div slot="country-code">
                <country-code
                  v-model="form.country_id"
                  errorName="country_id"
                />
              </div>
            </form-phone>

            <!-- <form-input
              lableName="المدينة"
              icon="location"
              type="text"
              lock="hidden"
              placeholder="المدينة"
            /> -->
          </div>
        </div>
      </div>
    </form>

    <success-modal v-if="showModel"> تم تعديل عميل جديد بنجاح </success-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModel: false,
      loading: false,
      form: {
        image: "",
        name: "",
        email: "",
        phone: "",
        country_id: "",
      },
    };
  },
  created() {
    this.handleShow();
  },
  methods: {
    async handleShow() {
      const res = await this.$axios.get(
        `dashboard/pages/customers/show/${this.$route.params.id}`
      );
      const { data } = res.data;
      this.form = {
        ...data,
        country_id: data.country.id,
      };

      console.log(res);
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
          `dashboard/pages/customers/update/${this.$route.params.id}`,
          this.generateData()
        );
        this.showModel = true;
        this.loading = false;
        this.$router.push(this.localePath("/mange-clients"));
      } catch (error) {
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

<template>
  <div>
    <form class="w-full add-role" @submit.prevent="handleSubmit">
      <div class="container">
        <div
          class="flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading
            title="انشاء راي عميل جديد "
            desc="قم بتعبئة البيانات الآتية لانشاء راي عميل جديد"
          />

          <div class="flex items-center bottom-action">
            <page-button
              :disabled="loading"
              name="اضافة"
              type="submit"
              btnClass="yellow"
              imgClass="hidden"
              class="ltr:ml-2 rtl:ml-3"
            />

            <page-button
              name="الغاء"
              @click.prevent="$router.push(localePath(`/testimonials`))"
              btnClass="black"
              imgClass="hidden"
            />
          </div>
        </div>

        <div class="w-full py-10 px-7 rounded-lg bg-light">
          <upload-image
            icon="camera"
            name="userProfile"
            title="إضافة صورة عميل"
            class="mb-14"
            v-model="form.image"
            errorName="image"
          />

          <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5">
            <form-input
              lableName="اسم العميل"
              icon="user"
              type="text"
              lock="hidden"
              placeholder="اسم العميل"
              v-model="form.user_name"
              errorName="user_name"
            />
            <form-input
              lableName="الوظيفة"
              icon="user"
              type="text"
              lock="hidden"
              placeholder="الوظيفة"
              v-model="form.job"
              errorName="job"
            />

            <form-textArea
              lableName="راي العميل"
              icon="powers"
              placeholder="وصف مختصر"
              v-model="form.comment"
              errorName="comment"
            />
          </div>
        </div>
      </div>
    </form>

    <!-- Success Modal -->
    <success-modal v-if="showModel">
      تم انشاء راي عميل جديد بنجاح
    </success-modal>
  </div>
</template>

<script>
export default {
  name: "AddTestimonial",
  data() {
    return {
      showModel: false,
      loading: false,
      form: {
        image: "",
        user_name: "",
        job: "",
        comment: "",
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
        await this.$axios.post(
          `dashboard/pages/testimonials`,
          this.generateData()
        );
        this.showModel = true;
        this.loading = false;
        this.$router.push(this.localePath("/testimonials"));
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

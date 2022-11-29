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
            title="تعديل فرد "
            desc="قم بتعديل فرد وتغيير بياناتها"
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
              @click.prevent="$router.push(localePath(`/teams`))"
              btnClass="black"
              imgClass="hidden"
            />
          </div>
        </div>

        <div class="w-full py-10 px-7 rounded-lg bg-light">
          <upload-image
            icon="camera"
            name="userProfile"
            title="تعديل الصورة الشخصية"
            class="mb-14"
            v-model="form.image"
            :imgUrl="form.image"
            errorName="image"
          />

          <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5">
            <form-input
              lableName="الاسم "
              icon="user"
              type="text"
              lock="hidden"
              placeholder="الاسم"
              v-model="form.name"
              errorName="name"
            />

            <!-- <form-input
              lableName="الاسم بالانجليزية"
              icon="user"
              type="text"
              lock="hidden"
              placeholder="الاسم"
            /> -->

            <form-input
              lableName="التخصص "
              icon="cat"
              type="text"
              lock="hidden"
              placeholder="التخصص"
              v-model="form.specialization"
              errorName="specialization"
            />

            <!-- <form-input
              lableName="التخصص بالانجليزية"
              icon="cat"
              type="text"
              lock="hidden"
              placeholder="التخصص"
            /> -->
          </div>
        </div>
      </div>
    </form>

    <!-- Success Modal -->
    <success-modal v-if="success_model">
      تم تعديل فرد بنجاح
    </success-modal>
  </div>
</template>

<script>
export default {
  name: "EditTeam",
  data() {
    return {
      loading: false,
      form: {
        image: "",
        name: "",
        success_model: false,
        specialization: "",
        // "ar.name": "",
        // "en.name": "",
        // "ar.description": "",
        // "en.description": "",
      },
    };
  },
  mounted() {
    this.handleShow();
  },
  methods: {
    generateData() {
      if (typeof this.form["image"] === "string") {
        delete this.form["image"];
      }
      const formData = new FormData();
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
          `dashboard/pages/doctors/${this.$route.params.id}`,
          this.generateData()
        );
        this.success_model = true;
        setTimeout(() => {
          this.$router.push(this.localePath("/teams"));
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
          `dashboard/pages/doctors/${this.$route.params.id}`
        );
        const { data } = res;

        this.form = data;
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

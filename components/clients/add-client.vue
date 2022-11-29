<template>
  <div>
    <form class="w-full" @submit.prevent="onSave">
      <div class="container">
        <div
          class="flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading
            title="انشاء موظف جديد"
            desc="قم بتعبئة البيانات الآتية لانشاء موظف جديد"
          />

          <div class="flex items-center bottom-action">
            <page-button
              name="حفظ"
              type="submit"
              btnClass="yellow"
              imgClass="hidden"
              class="ltr:ml-2 rtl:ml-3"
            />

            <page-button
              name="الغاء"
              @click.prevent="$router.push(localePath(`/clients`))"
              btnClass="black"
              imgClass="hidden"
            />
          </div>
        </div>

        <div class="w-full py-10 px-7 rounded-lg bg-light">
          <upload-image
            v-model="user.image"
            errorName="image"
            icon="camera"
            name="userProfile"
            title="إضافة صورة شخصية"
            class="mb-12"
          />

          <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5">
            <form-input
              v-model="user.name"
              lableName="الاسم بالعربية"
              icon="user"
              type="text"
              lock="hidden"
              placeholder="الاسم"
              errorName="name"
            />

            <!-- <form-input
              v-model="user.name"
              lableName="الاسم بالانجليزية"
              icon="user"
              type="text"
              lock="hidden"
              placeholder="الاسم"
              errorName="name"
            /> -->

            <form-input
              v-model="user.email"
              lableName="البريد الالكتروني"
              icon="message"
              type="email"
              lock="hidden"
              placeholder="البريد الالكتروني"
              errorName="email"
            />

            <form-phone v-model="user.phone" errorName="phone" type="number">
              <div slot="country-code">
                <country-code
                  v-model="user.country_id"
                  errorName="country_id"
                />
              </div>
            </form-phone>

            <form-select
              v-model="user.role_id"
              lableName="الصلاحيات"
              icon="powers"
              name="الصلاحيات"
              errorName="role_id"
              :options="roles"
            />

            <!-- UserPassword -->
            <form-input
              v-model="user.password"
              lableName="كلمة المرور الجديدة"
              icon="lock"
              type="password"
              placeholder="كلمة المرور الجديدة"
              errorName="password"
            />

            <form-input
              v-model="user.password_confirmation"
              lableName="تأكيد كلمة المرور الجديدة"
              icon="lock"
              type="password"
              placeholder="تأكيد كلمة المرور الجديدة"
              errorName="password"
            />
            <!-- <div class>
              <label class="text-dark text-sm font-normal block mb-4">
                الجنس
              </label>

              <div class="flex items-center content-center">
                <check-box
                  v-model="user.gender"
                  class="ltr:mr-10 rtl:ml-10"
                  id="male"
                  name="gender"
                  title="ذكر"
                  type="radio"
                  errorName="gender"
                />

                <check-box
                  v-model="user.gender"
                  id="female"
                  name="gender"
                  title="أنثى"
                  type="radio"
                  errorName="gender"
                />
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </form>

    <!-- Success Modal -->
    <success-modal v-if="modal == 'success-modal'">
      تم انشاء موظف جديد بنجاح
    </success-modal>
  </div>
</template>

<script>
export default {
  name: "AddClientForm",
  data() {
    return {
      user: {
        image: "",
        name: "",
        email: "",
        phone: "",
        country_id: "",
        // gender: "",
        role_id: "",
        password: "",
        password_confirmation: "",
      },
    };
  },

  async fetch() {
    await this.$store.dispatch("roles/getRoles");
  },

  methods: {
    onSave() {
      const data = this.$formData(this.user);
      this.$axios
        .$post("/dashboard/profile/store", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.$confirmSuccess();
        });
    },
  },

  computed: {
    modal() {
      return this.$store.state.modal;
    },
    roles() {
      return this.$store.state.roles.roles;
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>

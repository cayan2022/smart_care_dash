<template>
  <div>
    <form class="w-full" @submit.prevent="onSave">
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
            title="تعديل موظف"
            desc="قم بتعديل موظف وتغيير بياناته"
          />

          <div class="flex items-center content-center bottom-action">
            <page-button
              name="تعديل"
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
            v-model="edit.image"
            :img-url="edit.image"
            icon="camera"
            name="userProfile"
            title="تعديل صورة الشخصية"
            class="mb-12"
            errorName="image"
          />

          <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5">
            <form-input
              v-model="edit.name"
              lableName="الاسم بالعربية"
              icon="user"
              type="text"
              lock="hidden"
              placeholder="الاسم"
              :error="errorsArr['name']"
            />

            <!-- <form-input
              v-model="edit.name"
              lableName="الاسم بالانجليزية"
              icon="user"
              type="text"
              lock="hidden"
              placeholder="الاسم"
              errorName="name"
            /> -->

            <form-input
              v-model="edit.email"
              lableName="البريد الالكتروني"
              icon="message"
              type="email"
              lock="hidden"
              placeholder="البريد الالكتروني"
              errorName="email"
            />

            <form-phone v-model="edit.phone" errorName="phone">
              <div slot="country-code">
                <country-code
                  v-model="edit.country_id"
                  :country="edit.country"
                  errorName="country_code"
                />
              </div>
            </form-phone>

            <form-select
              v-model="edit.role_id"
              lableName="الصلاحيات"
              icon="powers"
              name="الصلاحيات"
              :options="roles"
              errorName="role_id"
            />
            <!-- 
            <div>
              <label class="text-dark text-sm font-normal block mb-4"
                >الجنس</label
              >

              <div class="flex items-center content-center">
                <check-box
                  v-model="edit.gender"
                  class="ltr:mr-10 rtl:ml-10"
                  id="male"
                  name="gender"
                  title="ذكر"
                  type="radio"
                  errorName="gender"
                />

                <check-box
                  v-model="edit.gender"
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
      تم تعديل الموظف بنجاح
    </success-modal>
  </div>
</template>

<script>
export default {
  name: "EditClientForm",
  props: {
    client: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  mounted() {},
  data() {
    return {
      edit: this.client,
      errorsArr: [],
    };
  },

  async fetch() {
    await this.$store.dispatch("roles/getRoles");
  },

  methods: {
    onSave() {
      if (typeof this.edit.image === "string") {
        var { image, ...newObj } = this.edit;
      } else {
        var newObj = this.edit;
      }

      const data = this.$formData(newObj);
      this.$axios
        .$post(`/dashboard/profile/update/${this.$route.params.id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.$confirmSuccess();
        })
        .catch((error) => {
          this.$errorHandler(this.errorsArr, error);
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

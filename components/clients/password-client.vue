<template>
  <div>
    <form class="w-full" @submit.prevent="onSave">
      <div class="container">
        <div
          class="flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading
            title="تغيير كلمة المرور"
            desc="سوف يتم تغيير الباسورد وإخراج المستخدم من كل الأجهزة المتصلة حاليًا، وإجباره على إدخال الباسورد الجديدة"
          />

          <div class="flex items-center content-center bottom-action">
            <page-button
              name="حفظ"
              type="submit"
              btnClass="yellow"
              imgClass="hidden"
              class="ltr:ml-2 rtl:ml-3"
            />

            <page-button
              name="الغاء"
              @click="$router.push(`/clients`)"
              btnClass="black"
              imgClass="hidden"
            />
          </div>
        </div>

        <div class="w-full py-10 px-7 rounded-lg bg-light">
          <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5">
            <form-input
              v-model="data.password"
              lableName="كلمة المرور الجديدة"
              icon="lock"
              type="password"
              placeholder="كلمة المرور الجديدة"
              :error="errorsArr['password']"
            />

            <form-input
              v-model="data.password_confirmation"
              lableName="تأكيد كلمة المرور الجديدة"
              icon="lock"
              type="password"
              placeholder="تأكيد كلمة المرور الجديدة"
              :error="errorsArr['password']"
            />
          </div>
        </div>
      </div>
    </form>

    <!-- Success Modal -->
    <success-modal v-if="modal == 'success-modal'">
      تم تغير كلمة المرور بنجاح
    </success-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        user_id: this.$route.query.id,
        password: "",
        password_confirmation: "",
      },
      errorsArr: [],
    };
  },
  methods: {
    onSave() {
      this.$axios
        .$post("/dashboard/profile/change-password", this.data)
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
  },
};
</script>

<style lang="scss" scoped>
.modal {
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s linear;

  .box {
    transform: translateY(20px);
    transition: all 0.3s linear;
  }

  &.active-modal {
    opacity: 1;
    visibility: visible;

    .box {
      transform: translateY(0px);
    }
  }
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
</style>

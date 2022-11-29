<template>
  <div>
    <form class="w-full add-role" @submit.prevent="handleSubmit">
      <div class="container">
        <div
          class="flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading
            title="تعديل صلاحية"
            desc="قم بتعديل صلاحية وتغيير بياناتها"
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
              @click.prevent="$router.push(`/roles`)"
              btnClass="black"
              imgClass="hidden"
            />
          </div>
        </div>

        <div class="w-full py-10 px-7 rounded-lg bg-light">
          <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5">
            <form-input
              lableName="اسم الصلاحية بالعربية"
              icon="role"
              type="text"
              lock="hidden"
              placeholder="اكتب اسم الصلاحية"
              v-model="form.name"
              errorName="name"
            />

            <!-- <form-input
              lableName="اسم الصلاحية بالإنجليزية"
              icon="message"
              type="role"
              lock="hidden"
              placeholder="أكتب اسم الصلاحية بالانجليزية"
            /> -->
          </div>
        </div>

        <h2 class="text-dark text-lg font-bold my-5">الصلاحيات والأدوار</h2>

        <div
          class="grid gap-5"
          :class="['lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1']"
        >
          <div
            v-for="(role, i) in roles"
            :key="i"
            class="role-box w-full pt-5 lg:px-8 md:px-5 sm:px-3 px-3 bg-light rounded-lg relative z-10"
          >
            <h1
              class="heading w-full pb-3 border-b border-solid border-semiWhite text-xl text-dark mb-5"
            >
              {{ role.name }}
            </h1>

            <ul
              class="list flex items-center content-center justify-start flex-wrap w-full"
            >
              <li
                v-for="(per, perIndex) in role.permissions"
                :key="perIndex"
                class="role-item relative z-10 text-dark text-base"
              >
                <LazyCheckBox
                  :title="per.name"
                  :id="per.id"
                  errorName="requested_permissions"
                >
                  <input
                    :id="per.id"
                    class="hidden w-full input-check"
                    type="checkbox"
                    v-model="form.requested_permissions"
                    :value="per.id"
                  />
                </LazyCheckBox>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </form>

    <!-- Success Modal -->
    <success-modal v-if="success_model">
      تم تعديل الصلاحية بنجاح
    </success-modal>
  </div>
</template>

<script>
export default {
  name: "EditRole",
  props: {
    roles: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      loading: false,
      success_model: false,
      form: {
        name: "",
        requested_permissions: [],
      },
    };
  },
  mounted() {
    this.handleShow();
  },
  methods: {
    async handleShow() {
      const res = await this.$axios.get(
        `dashboard/roles/${this.$route.params.id}`
      );
      const { data } = res.data;
      const [name, permissions] = data;
      this.form.requested_permissions = permissions.map((per) => per.id);
      this.form.name = name;
    },
    handleSubmit() {
      this.loading = true;
      this.$axios
        .$post(`dashboard/roles/${this.$route.params.id}`, {
          ...this.form,
          _method: "put",
        })
        .then(() => {
          this.success_model = true;
          setTimeout(() => {
            this.$router.push(this.localePath("/roles"));
          }, 1500);
        })
        .finally(() => {
          this.loading = false;
        });
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

<template>
  <div>
    <form class="w-full add-role">
      <div class="container">
        <div
          class="flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading
            title="انشاء طلب جديد"
            desc="قم بتعبئة البيانات الآتية لانشاء طلب جديد"
          />

          <div class="flex items-center bottom-action">
            <page-button
              :disabled="loading"
              @click.prevent="handleSubmit"
              name="حفظ"
              type="submit"
              btnClass="yellow"
              imgClass="hidden"
              class="ltr:ml-2 rtl:ml-3"
            />

            <page-button
              name="الغاء"
              @click.prevent="$router.push(localePath(`/orders`))"
              btnClass="black"
              imgClass="hidden"
            />
          </div>
        </div>

        <div class="w-full py-10 px-7 rounded-lg bg-light">
          <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5">
            <form-select
              lableName="القسم"
              icon="cat"
              class="mb-5"
              name="القسم"
              :options="categories"
              v-model="form.category_id"
              errorName="category_id"
            />

            <form-select
              lableName="العميل"
              icon="user"
              class="mb-5"
              name="العميل"
              :options="users"
              v-model="form.user_id"
              errorName="user_id"
            />

            <form-select
              lableName="المصدر"
              icon="location"
              class="mb-5"
              name="المصدر"
              :options="sources"
              v-model="form.source_id"
              errorName="source_id"
            />
            <form-select
              lableName="الفرع"
              icon="location"
              class="mb-5"
              name="الفرع"
              :options="branches"
              v-model="form.branch_id"
              errorName="branch_id"
            />

            <form-select
              lableName="حالة الطلب"
              icon="task-square"
              class="mb-5"
              name="حالة الطلب"
              v-model="form.status_id"
              errorName="status_id"
              :options="statues"
            />
          </div>
        </div>
      </div>
    </form>

    <!-- Success Modal -->
    <success-modal v-if="showModel">تم إضافة الطلب بنجاح</success-modal>
  </div>
</template>

<script>
export default {
  name: "AddOrder",
  data() {
    return {
      showModel: false,
      loading: false,
      categories: [],
      statues: [],
      sources: [],
      users: [],
      branches: [],
      form: {
        category_id: "",
        status_id: "",
        user_id: "",
        source_id: "",
        branch_id: "",
      },
    };
  },
  async fetch() {
    const [categoryRes, statusRes, sourceRes, userRes, branchRes] =
      await Promise.all([
        this.$axios.get("dashboard/pages/categories"),
        this.$axios.get("dashboard/pages/statuses"),
        this.$axios.get("dashboard/pages/sources"),
        this.$axios.get("dashboard/pages/customers/all"),
        this.$axios.get("dashboard/pages/branches"),
      ]);
    this.categories = categoryRes.data.data;
    this.statues = statusRes.data.data;
    this.sources = sourceRes.data.data;
    this.users = userRes.data.data;
    this.branches = branchRes.data.data;
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      this.$axios
        .post("dashboard/pages/orders", this.form)
        .then(() => {
          this.showModel = true;
          this.$nextTick(() => {
            setTimeout(() => {
              this.$router.push("/orders");
            }, 3000);
          });
        })
        .catch((err) => {
          console.log(err);
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

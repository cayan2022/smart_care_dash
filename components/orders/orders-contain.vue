<template>
  <div>
    <section class="orders">
      <div class="container">
        <div
          class="w-full flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading
            title="الطلبات"
            desc="الطلبات الخاصة بالنظام والمسؤلين عنها"
          />

          <div class="flex items-center content-center bottom-action">
            <page-button
              :name="currentDate"
              btnClass="date-btn"
              icon="calendar"
              @click="modalCancel = !modalCancel"
            />

            <page-button
              v-if="hasPermissions('create_orders')"
              name="إضافة طلب"
              @click.prevent="$router.push(localePath(`/orders/add`))"
              btnClass="yellow small-btn"
              icon="add-square"
              class="mx-3"
            />

            <page-button
              @click.prevent="onExport"
              name="تصدير"
              btnClass="dark small-btn"
              icon="export"
            />
          </div>
        </div>

        <div
          class="tabs grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 gap-4 mb-10"
        >
          <div
            @click.prevent="handleFilter(null)"
            class="tab-box w-full py-3 cursor-pointer rounded-lg text-center bg-primary"
          >
            <img
              src="/img/orders/menu.svg"
              class="w-6 h-6 object-contain mx-auto"
              loading="lazy"
              :alt="$t(`app.title`)"
            />

            <p class="text-dark text-sm font-normal mt-2">الكل</p>

            <p class="text-dark text-lg font-bold">
              {{ totalOrder }}
            </p>
          </div>
          <client-only>
            <div
              v-for="(status, index) in defaultStatus"
              :key="index"
              @click.prevent="handleFilter(status.name)"
              class="tab-box w-full py-3 cursor-pointer rounded-lg text-center border-1 border-solid border-transparent"
              :style="{ backgroundColor: status.color }"
              :class="`bg-[${status.color}] border-[${status.borderColor}] ${
                getQuery &&
                getQuery['status'] &&
                getQuery &&
                getQuery['status'] == status.name &&
                'active'
              }`"
            >
              <img
                :src="`/img/orders/${status.icon}.svg`"
                class="w-6 h-6 object-contain mx-auto"
                loading="lazy"
                :alt="$t(`app.title`)"
              />

              <p class="text-dark text-sm font-normal mt-2">
                {{ status.name }}
              </p>

              <p class="text-dark text-lg font-bold">
                {{ statuses[index] && statuses[index]["orders_count"] }}
              </p>
            </div>
          </client-only>
        </div>

        <div class="grid grid-col-1 gap-5">
          <nuxt-link
            v-for="(order, i) in orders"
            :key="i"
            :to="`/orders/${order.id}/request`"
            class="box block w-full p-5 bg-light rounded-lg"
          >
            <div
              class="user-data w-full flex justify-between items-start content-start mb-5"
            >
              <div
                class="user-contain flex items-center content-center justify-center"
              >
                <img
                  :src="order.user_avatar"
                  class="w-20 h-20 object-cover object-top rounded-full"
                  loading="lazy"
                  :alt="$t(`app.title`)"
                />

                <div class="contain ltr:ml-3 rtl:mr-3">
                  <h2 class="text-base text-dark font-bold mb-1">
                    {{ order.user_name }}
                  </h2>

                  <p class="text-gray text-xs font-normal">
                    {{ order.category }}
                  </p>
                </div>
              </div>

              <div
                :class="` ${
                  statusTypes[order.status.id]
                } w-fit h-fit rounded-full min-w-[80px] text-center py-2 px-5 text-light font-normal text-xs`"
              >
                {{ order.status.name }}
              </div>
            </div>

            <ul
              class="data-list flex items-center content-center flex-wrap pt-5 border-t border-solid border-[#EEEEEE]"
            >
              <li
                class="flex items-center content-center ltr:mr-16 rtl:ml-16 lg:mb-0 md:mb-3 sm:mb-3 mb-3"
              >
                <img
                  src="/img/orders/clock.svg"
                  class="w-6 h-6 object-contain"
                  loading="lazy"
                  :alt="$t(`app.title`)"
                />

                <span class="text-gray mx-2 text-sm font-normal">الوقت :</span>

                <span class="text-dark text-sm font-bold">{{
                  order.created_at
                }}</span>
              </li>

              <li
                class="flex items-center content-center ltr:mr-16 rtl:ml-16 lg:mb-0 md:mb-3 sm:mb-3 mb-3"
              >
                <img
                  :src="order.employee_avatar"
                  class="w-6 h-6 object-cover object-top rounded-full"
                  loading="lazy"
                  :alt="$t(`app.title`)"
                />

                <span class="text-gray mx-2 text-sm font-normal"
                  >الموظف المسؤول :</span
                >

                <span class="text-dark text-sm font-bold">{{
                  order.last_employee
                }}</span>
              </li>

              <li
                class="flex items-center content-center ltr:mr-16 rtl:ml-16 lg:mb-0 md:mb-3 sm:mb-3 mb-3"
              >
                <img
                  src="/img/orders/subtitle.svg"
                  class="w-6 h-6 object-contain"
                  loading="lazy"
                  :alt="$t(`app.title`)"
                />

                <span class="text-gray mx-2 text-sm font-normal">المصدر :</span>

                <span class="text-dark text-sm font-bold">{{
                  order.source
                }}</span>
              </li>

              <li
                class="flex items-center content-center lg:mb-0 md:mb-3 sm:mb-3 mb-3"
              >
                <img
                  src="/img/orders/location.svg"
                  class="w-6 h-6 object-contain"
                  loading="lazy"
                  :alt="$t(`app.title`)"
                />

                <span class="text-gray mx-2 text-sm font-normal">الفرع :</span>

                <span class="text-dark text-sm font-bold">{{
                  order.branch
                }}</span>
              </li>
            </ul>
          </nuxt-link>
        </div>
      </div>
    </section>
    <LazyCustomPagination :pagination="meta" />

    <div
      class="modal w-full h-full fixed top-0 left-0 z-50 flex items-center content-center justify-center"
      :class="[modalCancel === true ? 'active-modal' : '']"
    >
      <div
        class="overlay w-full h-full bg-dark bg-opacity-40 absolute top-0 left-0"
        @click="modalCancel = !modalCancel"
      ></div>

      <form
        class="box biger-size py-10 px-10 bg-light rounded-lg relative z-20"
      >
        <page-heading
          title="الوقت والتاريخ"
          class="page-heading mb-10 pb-5 border-b border-solid border-[#EEEEEE]"
          desc="قم بتحديد الوقت والتاريخ "
          style="width: 100% !important"
        />

        <date-picker
          lableName="التاريخ من"
          icon="time"
          class="mb-5"
          name="اختر التوقيت"
          v-model="query.start_date"
          errorName="start_date"
        />

        <date-picker
          lableName="التاريخ الي"
          icon="time"
          class="mb-5"
          name="اختر التوقيت"
          v-model="query.end_date"
          errorName="end_date"
        />

        <div class="w-full flex items-center content-center justify-center">
          <page-button
            @click.prevent="onFilter"
            name="تنفيذ"
            imgClass="hidden"
            class="ltr:ml-2 rtl:ml-3"
            btnClass="yellow half-btn"
            style="width: 50% !important"
          />

          <page-button
            name="الغاء"
            @click="handleClearFilter"
            type="button"
            imgClass="hidden"
            btnClass="black half-btn"
            style="width: 50% !important"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import GenericDateFilter from "@/components/GenericDateFilter";

export default {
  name: "OrdersContain",
  extends: GenericDateFilter,

  data() {
    return {
      modalCancel: false,
      query: {
        start_date: "",
        end_date: "",
      },
      statuses: [],
      defaultStatus: [
        { name: "جديد", color: "#E5F0FF", borderColor: "#0670FB", icon: "new" },
        {
          name: "متابعة",
          color: "#FFF6E5",
          borderColor: "#FBA706",
          icon: "timer",
        },
        {
          name: "تم الدفع",
          color: "#E9F6E7",
          borderColor: "#29A71A",
          icon: "card-tick",
        },
        {
          name: "فشل",
          color: "#FBE9E9",
          borderColor: "#D6262D",
          icon: "close-circle",
        },
      ],
      queryFilter: {},
    };
  },
  props: {
    orders: {
      type: Array,
      default: () => [],
    },
    meta: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.getStatuses();
  },
  methods: {
    handleFilter(param) {
      const query = { status: param };
      if (!param) {
        delete query.status;
      }
      this.$store.dispatch("query/setQuery", query);
      this.$nuxt.refresh();
    },
    async onExport() {
      const res = await this.$axios.get(`dashboard/pages/orders/export`, {
        params: { ...this.$route.query },
      });
      const { file_link } = res.data;
      window.open(file_link);
    },
    async getStatuses() {
      const res = await this.$axios.get("dashboard/pages/statuses");
      const { data } = res.data;
      this.statuses = data;
    },
  },
  computed: {
    totalOrder() {
      return this.statuses.reduce((acc, value) => {
        return (acc += Number(value.orders_count));
      }, 0);
    },
  },
  watch: {
    $route: {
      handler({ query }) {
        if (query["start_date"] && query["end_date"]) {
          this.query["start_date"] = query["start_date"];
          this.query["end_date"] = query["end_date"];
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.orders {
  .tab-box {
    transition: all 0.3s linear;

    &:hover,
    &.active {
      transform: translateY(-10px);

      img {
        animation: pulsecust 1s linear infinite;
      }
    }
  }

  .box {
    transition: all 0.3s linear;

    .done {
      background-color: #29a71a;
    }

    .new {
      background-color: #0670fb;
    }

    .tracking {
      background-color: #fba706;
    }

    .cancel {
      background-color: #d6262d;
    }

    &:hover {
      transform: translateY(-10px);

      h2 {
        color: var(--primary);
      }
    }
  }

  .modal {
    .page-heading {
      width: 100% !important;
    }
    .mobile-btn {
      width: 100% !important;
    }
  }
}
</style>

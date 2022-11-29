<template lang="">
  <div>
    <section class="request">
      <div class="container">
        <div
          class="w-full flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading
            title="متابعة الطلب"
            desc="يمكنك متابعة طلب العميل وتتبع حالات الطلب"
          />

          <div class="flex items-center content-center bottom-action">
            <page-button
              name="متابعة"
              btnClass="orange small-btn"
              @click="openStatusDialog('modalTracking', 2)"
              icon="timer"
            />

            <page-button
              name="تم الدفع"
              btnClass="green small-btn"
              icon="card-tick"
              @click="openStatusDialog('modalPaid', 3)"
              class="mx-3"
            />

            <page-button
              name="فشل"
              btnClass="danger small-btn"
              @click="openStatusDialog('modalCancel', 4)"
              icon="close-circle"
            />
          </div>
        </div>

        <div
          class="grid xl:grid-cols-3 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 xl:gap-5 lg:gap-10 md:gap-10 sm:gap-10 gap-10"
        >
          <div
            v-if="order.histories && order.histories.length > 0"
            class="xl:col-start-1 xl:col-end-3 box-contain w-full p-5 relative z-20 bg-light rounded-lg"
          >
            <div
              v-for="(history, index) in order.histories"
              :key="index"
              class="contain relative z-10 w-full pb-5 ltr:pl-5 rtl:pr-5 ltr:border-l rtl:border-r border-solid border-[#EEEEEE]"
            >
              <p class="time text-sm text-gray font-normal mb-5">
                {{ history.last_update }}
              </p>

              <div class="box block w-full p-5 bg-[#F9F9F9] rounded-lg">
                <div
                  class="user-data w-full flex justify-between items-start content-start mb-5"
                >
                  <div
                    class="user-contain flex items-center content-center justify-center"
                  >
                    <img
                      :src="history.employee_avatar"
                      class="w-20 h-20 object-cover object-top rounded-full"
                      loading="lazy"
                      :alt="$t(`app.title`)"
                    />

                    <div class="user-data-contain ltr:ml-3 rtl:mr-3">
                      <h2 class="text-base text-dark font-bold mb-1">
                        {{ history.employee_name }}
                      </h2>
                    </div>
                  </div>
                  <div class="flex items-center content-center">
                    <img
                      :src="subStatusTypes[history.sub_status.id]['icon']"
                      loading="lazy"
                      class="mx-2"
                      :alt="$t(`app.title`)"
                    />

                    <span
                      :style="{
                        color: subStatusTypes[history.sub_status.id]['color'],
                      }"
                      class="text-sm font-normal"
                    >
                      {{ history.sub_status && history.sub_status.name }}
                    </span>
                  </div>
                </div>

                <p
                  class="text-dark font-normal text-sm my-3 py-3 border-y border-solid border-[#EEEEEE]"
                >
                  {{ history.description }}
                </p>

                <ul class="data-list">
                  <li class="text-gray text-sm font-normal mb-2">
                    موعد المتابعة
                  </li>

                  <li class="flex items-center content-center">
                    <img
                      src="/img/orders/clock.svg"
                      class="w-6 h-6 object-contain"
                      loading="lazy"
                      :alt="$t(`app.title`)"
                    />

                    <span class="text-dark mx-2 text-sm font-normal">
                      23-8-2022 ,10:00 AM
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            class="xl:col-start-3 xl:col-end-4 mt-5 user-card w-full p-5 pt-5 bg-light relative z-10 rounded-lg h-fit"
          >
            <img
              :src="order.employee_avatar"
              class="w-20 h-20 object-cover object-top rounded-full user-img mx-auto"
              loading="lazy"
              :alt="$t(`app.title`)"
            />
            <h2 class="text-base text-dark font-bold text-center mt-3">
              {{ order.user_name }}
            </h2>

            <p class="text-gray text-xs font-normal my-2 text-center">
              {{ order.category }}
            </p>

            <div
              class="w-fit h-fit mx-auto rounded-full py-2 px-5 text-light font-normal text-xs"
              :class="statusTypes[order.status.id]"
            >
              {{ order.status.name }}
            </div>

            <ul
              class="data-list mt-5 pt-5 border-t border-solid border-[#EEEEEE]"
            >
              <li
                class="flex items-center content-center justify-between flex-wrap mb-5"
              >
                <div class="flex items-center content-center">
                  <img
                    src="/img/orders/mobile.svg"
                    class="w-6 h-6 object-contain"
                    loading="lazy"
                    :alt="$t(`app.title`)"
                  />

                  <span class="text-gray mx-2 text-sm font-normal">
                    رقم الجوال
                  </span>
                </div>

                <button @click="whatsapp(order.user_phone)" class="flex items-center content-center">
                  <span
                    class="text-dark mx-2 text-sm font-bold">
                    {{ order.user_phone }}
                  </span>

                  <img
                    src="/img/orders/whatsapp.svg"
                    class="w-6 h-6 object-contain"
                    loading="lazy"
                    :alt="$t(`app.title`)"
                  />
                </button>
              </li>

              <li
                class="flex items-center content-center justify-between flex-wrap mb-5"
              >
                <div class="flex items-center content-center">
                  <img
                    src="/img/orders/user.svg"
                    class="w-6 h-6 object-contain"
                    loading="lazy"
                    :alt="$t(`app.title`)"
                  />

                  <span class="text-gray mx-2 text-sm font-normal">
                    الموظف المسؤول
                  </span>
                </div>

                <div class="flex items-center content-center">
                  <img
                    :src="order.employee_avatar"
                    class="w-6 h-6 object-cover object-top rounded-full"
                    loading="lazy"
                    :alt="$t(`app.title`)"
                  />

                  <span class="text-dark mx-2 text-sm font-bold">
                    <template v-if="order.last_employee">
                      {{ order.last_employee | maxWord(2) }}
                    </template>
                    <template v-else>
                      <span>لم يعين بعد</span>
                    </template>
                  </span>
                </div>
              </li>

              <li
                class="flex items-center content-center justify-between flex-wrap mb-5"
              >
                <div class="flex items-center content-center">
                  <img
                    src="/img/orders/subtitle.svg"
                    class="w-6 h-6 object-contain"
                    loading="lazy"
                    :alt="$t(`app.title`)"
                  />

                  <span class="text-gray mx-2 text-sm font-normal">
                    المصدر
                  </span>
                </div>

                <span class="text-dark mx-2 text-sm font-bold">
                  {{ order.source }}
                </span>
              </li>

              <li
                class="flex items-center content-center justify-between flex-wrap"
              >
                <div class="flex items-center content-center">
                  <img
                    src="/img/orders/location.svg"
                    class="w-6 h-6 object-contain"
                    loading="lazy"
                    :alt="$t(`app.title`)"
                  />

                  <span class="text-gray mx-2 text-sm font-normal">
                    الفرع
                  </span>
                </div>

                <span class="text-dark mx-2 text-sm font-bold">
                  {{ order.branch }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <div
      class="modal w-full h-full fixed top-0 left-0 z-50 flex items-center content-center justify-center"
      :class="[modalTracking === true ? 'active-modal' : '']"
    >
      <div
        class="overlay w-full h-full bg-dark bg-opacity-40 absolute top-0 left-0"
        @click="onCloseDialog('modalTracking')"
      ></div>

      <form
        class="box biger-size py-10 px-10 bg-light rounded-lg relative z-20"
      >
        <page-heading
          title="متابعة"
          class="page-heading mb-10 pb-5 border-b border-solid border-[#EEEEEE]"
          desc="يمكنك الآن متابعة العميل  وذكر حالة العميل وتحديد وقت المتابعة"
        />

        <form-select
          lableName="حالة العميل"
          icon="user"
          class="mb-5"
          name="حالة العميل"
          :options="statuses"
          v-model="form.sub_status_id"
          errorName="sub_status_id"
        />

        <form-input
          lableName="ماذا حدث ؟"
          icon="role"
          type="text"
          lock="hidden"
          class="mb-5"
          placeholder="ماذا حدث ؟"
          v-model="form.description"
          errorName="description"
        />

        <date-picker
          lableName="اختر التوقيت"
          icon="time"
          class="mb-5"
          name="اختر التوقيت"
          v-model="duration"
          errorName="duration"
        />

        <div class="w-full flex items-center content-center justify-center">
          <page-button
            @click.prevent="handleFollowUp"
            name="حفظ"
            imgClass="hidden"
            class="ltr:ml-2 rtl:ml-3"
            btnClass="yellow half-btn"
          />

          <page-button
            name="الغاء"
            @click="onCloseDialog('modalTracking')"
            imgClass="hidden"
            type="button"
            btnClass="black half-btn"
          />
        </div>
      </form>
    </div>

    <div
      class="modal w-full h-full fixed top-0 left-0 z-50 flex items-center content-center justify-center"
      :class="[modalPaid === true ? 'active-modal' : '']"
    >
      <div
        class="overlay w-full h-full bg-dark bg-opacity-40 absolute top-0 left-0"
        @click="onCloseDialog('modalPaid')"
      ></div>

      <form
        class="box biger-size py-10 px-10 bg-light rounded-lg relative z-20"
      >
        <page-heading
          title="تم الدفع"
          class="page-heading mb-10 pb-5 border-b border-solid border-[#EEEEEE]"
          desc="تغيير الحالة الى تم الدفع "
        />

        <form-select
          lableName="حالة العميل"
          icon="user"
          class="mb-5"
          name="حالة العميل"
          :options="statuses"
          errorName="sub_status_id"
          v-model="form.sub_status_id"
        />

        <form-input
          lableName="ماذا حدث ؟"
          icon="role"
          type="text"
          lock="hidden"
          class="mb-5"
          placeholder="ماذا حدث ؟"
          v-model="form.description"
          errorName="description"
        />

        <div class="w-full flex items-center content-center justify-center">
          <page-button
            @click.prevent="handleFollowUp"
            name="حفظ"
            imgClass="hidden"
            class="ltr:ml-2 rtl:ml-3"
            btnClass="yellow half-btn"
          />

          <page-button
            name="الغاء"
            @click="onCloseDialog('modalPaid')"
            imgClass="hidden"
            type="button"
            btnClass="black half-btn"
          />
        </div>
      </form>
    </div>

    <div
      class="modal w-full h-full fixed top-0 left-0 z-50 flex items-center content-center justify-center"
      :class="[modalCancel === true ? 'active-modal' : '']"
    >
      <div
        class="overlay w-full h-full bg-dark bg-opacity-40 absolute top-0 left-0"
        @click="onCloseDialog('modalCancel')"
      ></div>

      <form
        class="box biger-size py-10 px-10 bg-light rounded-lg relative z-20"
      >
        <page-heading
          title="فشل"
          class="page-heading mb-10 pb-5 border-b border-solid border-[#EEEEEE]"
          desc="تغيير الحالة الى فشل لأي من الأسباب التالية "
        />

        <form-select
          lableName="حالة العميل"
          icon="user"
          class="mb-5"
          name="حالة العميل"
          :options="statuses"
          errorName="sub_status_id"
          v-model="form.sub_status_id"
        />

        <form-input
          lableName="ماذا حدث ؟"
          icon="role"
          type="text"
          lock="hidden"
          class="mb-5"
          placeholder="ماذا حدث ؟"
          v-model="form.description"
          errorName="description"
        />

        <div class="w-full flex items-center content-center justify-center">
          <page-button
            @click.prevent="handleFollowUp"
            name="حفظ"
            imgClass="hidden"
            class="ltr:ml-2 rtl:ml-3"
            btnClass="yellow half-btn"
          />

          <page-button
            name="الغاء"
            @click="onCloseDialog('modalCancel')"
            type="button"
            imgClass="hidden"
            btnClass="black half-btn"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderRequest",
  props: {
    order: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      modalTracking: false,
      modalPaid: false,
      modalCancel: false,
      statuses: [],
      duration: "",
      form: {
        sub_status_id: "",
        order_id: this.$route.params.id,
        description: "",
        duration: "",
      },
    };
  },

  methods: {
    onCloseDialog(modelName) {
      this[modelName] = !this[modelName];
      this.form = {
        sub_status_id: "",
        order_id: this.$route.params.id,
        description: "",
        duration: "",
      };
      this.duration = "";
    },
    openStatusDialog(modelType, statusId) {
      this[modelType] = !this[modelType];
      this.status_id = statusId;
      this.$nextTick(() => {
        this.getSubStatus(statusId);
      });
    },
    resetData() {
      this.modalTracking = false;
      this.modalPaid = false;
      this.modalCancel = false;

      this.$nuxt.refresh();
    },
    async handleFollowUp() {
      await this.$axios.post(`dashboard/pages/orders/follow-order`, this.form);
      this.resetData();
    },
    async getSubStatus(statusId) {
      const res = await this.$axios.get(
        `dashboard/pages/statuses/${statusId}/substatuses`
      );
      const { data } = res.data;
      this.statuses = data;
    },
  },
  watch: {
    duration: {
      handler(value) {
        if (value) {
          const formattedDateTime = new Date(value)
            .toISOString()
            .slice(0, 19)
            .replace(/-/g, "-")
            .replace("T", " ");

          this.form.duration = formattedDateTime;
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
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
.page-heading {
  width: 100% !important;
}

.request {
  .user-card {
    transition: all 0.3s linear;

    .user-img {
      margin-top: -40px;
      position: relative;
    }

    &:hover {
      transform: translateY(-10px);

      h2 {
        color: var(--primary);
      }
    }
  }

  .box-contain {
    &::after,
    &::before {
      content: "";
      position: absolute;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      bottom: 12px;
      right: 8.5px;
      z-index: 22;
    }

    &::after {
      background: url("/img/request/done.svg") center / contain no-repeat;
    }

    &::before {
      animation: pulse 1s linear infinite;
      background-color: var(--primary);
    }
    .contain {
      &::after,
      &::before {
        content: "";
        position: absolute;
        width: 24px;
        height: 24px;
        background-color: var(--primary);
        border-radius: 50%;
        top: 0px;
        right: -12px;
        z-index: -1;
      }

      &::before {
        animation: pulse 1s linear infinite;
      }
      .box {
        transition: all 0.3s linear;

        &:hover {
          transform: translateY(-10px);

          h2 {
            color: var(--primary);
          }
        }
      }
    }
  }
}

.mobile-btn {
  width: 100% !important;
}

@media (max-width: 999px) {
  .request {
    .user-data {
      flex-direction: column;
      justify-content: space-between !important;

      .user-contain {
        margin-bottom: 15px;
      }
    }
  }
}

@media (max-width: 375px) {
  .request {
    .user-card {
      .data-list li {
        flex-direction: column !important;
        justify-content: flex-start !important;
        align-items: flex-start !important;
        align-content: flex-start !important;

        div:first-child {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>

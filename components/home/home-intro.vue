<template>
  <div>
    <section class="sources">
      <div class="container">
        <div
          class="w-full flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading
            title="لوحة التحكم"
            desc="الاحصائيات العامة الخاصة بالنظام"
          />

          <div class="flex items-center content-center bottom-action">
            <usersFilter />

            <page-button
              :name="currentDate"
              btnClass="date-btn"
              icon="calendar"
              class="date-btn"
              @click="modalCancel = !modalCancel"
            />
          </div>
        </div>

        <div
          class="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 gap-4"
        >
          <div
            class="box w-full bg-light rounded-lg py-5 px-7 text-center"
            v-for="(statistic, i) in getStatusStatistics"
            :key="i"
          >
            <doughnut :statistic="statistic" />

            <p class="text-base text-dark font-normal my-2">
              {{ statistic.name }}
            </p>

            <h2 class="text-2xl font-bold text-dark">
              {{ statistic.orders_count }}
            </h2>
          </div>
        </div>

        <div
          class="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 gap-4 mt-5"
        >
          <div v-for="(statistic, key) in bgiStatistics" :key="key">
            <div
              v-if="
                getStatusStatistics[key] &&
                getStatusStatistics[key].orders_count
              "
              class="box w-full flex justify-between items-center content-center bg-light rounded-lg py-5 px-7"
            >
              <doughnut :statistic="getStatusStatistics[key]" />

              <div class="data">
                <h2 class="text-lg font-bold text-dark">
                  {{ statistic.name }}
                </h2>

                <div class="flex items-center content-center mt-5">
                  <p
                    class="w-fit py-2 px-3 rounded-lg bg-primary border border-solid border-primary border-opacity-10 bg-opacity-5 text-primary text-lg font-bold"
                  >
                    {{
                      getStatusStatistics[key] &&
                      getStatusStatistics[key].orders_count
                    }}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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
  name: "HomeIntro",
  extends: GenericDateFilter,
  props: {
    statistics: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      modalCancel: false,
      droplang: false,
      colors: {
        1: "#0670FB",
        2: "#FBA706",
        3: "#29A71A",
        4: "#D6262D",
      },
      users: [],
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    handleFilter(user) {
      const query = { ...this.$route.query };
      if (query["name"] && query["name"] == user.name) {
        delete query["name"];
      } else {
        query["name"] = user.name;
      }
      this.$router.push({ query });
      this.droplang = !this.droplang;
    },
    async getUsers() {
      const res = await this.$axios.get(`dashboard/profile/all`);
      const { data } = res.data;
      this.users = data;
    },
  },
  computed: {
    bgiStatistics() {
      return {
        0: {
          name: "معدل الاستجابة",
        },
        2: {
          name: "معدل المتابعة",
        },
        3: {
          name: "معدل النجاح",
        },
        4: {
          name: "معدل الفشل",
        },
      };
    },
    totalStatistics() {
      return this.statistics.reduce((acc, value) => {
        acc += value.orders_count;
        return acc;
      }, 0);
    },
    getStatusStatistics() {
      const subStatus = this.statistics.map((item) => ({
        ...item,
        colors: [this.colors[item.id], "#eee"],
        data: [item.orders_count, this.totalStatistics - item.orders_count],
        total: this.totalStatistics,
      }));
      return [
        {
          name: "الكل",
          orders_count: this.totalStatistics,
          id: 0,
          colors: subStatus.map((el) => this.colors[el.id]),
          data: subStatus.map((el) => el.orders_count),
        },
        ...subStatus,
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.sources {
  .flag {
    width: 100%;
    height: 50px;
    position: relative;
    padding: 0px 15px;
    border: 1px solid #eee;
    border-radius: 8px;

    &::after {
      content: "";
      position: absolute;
      width: 14px;
      height: 14px;
      background: url("/img/drop_arrow.svg") center / contain no-repeat;
      top: calc(50% - 8px);
      left: 10px;
      z-index: -1;
    }
  }

  .phone-drop-list {
    padding: 30px 15px;
    width: 100%;
    height: fit-content;
    box-shadow: 0px 3px 25px rgba($color: #aeaeae, $alpha: 0.12);
    overflow: hidden;
    transform: translateY(10px);
    visibility: hidden;
    transition: all 0.3s linear;
    pointer-events: none;
    top: 100%;
    max-height: 340px;
    overflow-y: scroll;

    &.active-drop {
      transform: translateY(0px);
      opacity: 1;
      visibility: visible;
      pointer-events: fill;
    }

    .phone-list li {
      padding: 15px 0px 15px;
      border-bottom: 1px solid #eee;
      cursor: pointer;

      &:last-child {
        padding-bottom: 0px;
        border-bottom: 0px;
      }

      &:first-child {
        padding-top: 0px !important;
      }

      &::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        background: url("/img/form/check_circle.svg") center / contain no-repeat;
        top: calc(50% - 10px);
        left: 0px;
        transform: scale(0);
        transition: all 0.3s linear;
        z-index: -1;
        filter: invert(80%) sepia(32%) saturate(1833%) hue-rotate(357deg)
          brightness(103%) contrast(106%);
      }

      &:hover,
      &.active {
        &::after {
          transform: scale(1);
        }
      }
    }
  }

  .box {
    transition: all 0.3s linear;

    &:hover {
      transform: translateY(-10px);
    }

    .data {
      width: calc(100% - 120px);
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

@media (max-width: 999px) {
  .sources {
    .phone-drop-list {
      top: unset !important;
      width: 100% !important;
      padding: 20px 5px !important;
    }
  }
}
</style>

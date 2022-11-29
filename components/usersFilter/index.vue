<template>
  <div class="flex items-center content-center w-fit ltr:mr-4 rtl:ml-4">
    <label
      class="text-dark text-sm font-normal ltr:mr-2 rtl:ml-2 lg:block md:block sm:hidden hidden"
    >
      فرز بواسطة
    </label>

    <div
      class="xl:w-[218px] lg:w-[218px] md:w-[160px] sm:w-[160px] w-[160px] relative z-20"
    >
      <div
        class="flag flex items-center content-center relative z-10 cursor-pointer bg-light"
        @click="droplang = !droplang"
      >
        <img
          :src="
            selectedUser ? selectedUser.image : '/img/side_nav/user_square.svg'
          "
          class="w-6 h-6 object-contain rounded-full"
          loading="lazy"
          :alt="$t(`app.title`)"
        />

        <span class="text-sm font-bold mr-2">
          {{ selectedUser ? selectedUser.name : " كل الفريق" }}
        </span>
      </div>

      <div
        class="phone-drop-list w-full absolute bottom-full left-0 z-150 bg-light rounded-lg"
        :class="[droplang === true ? 'active-drop' : '']"
      >
        <ul class="phone-list w-full relative">
          <li
            :class="
              getQuery &&
              getQuery['name'] &&
              getQuery &&
              getQuery['name'] == user.name &&
              'active'
            "
            v-for="(user, i) in users"
            :key="i"
            class="w-full flex items-start content-center relative z-0"
            @click="handleFilter(user)"
          >
            <img
              :src="user.image"
              class="w-6 h-6 object-contain rounded-full"
              loading="lazy"
              :alt="$t(`app.title`)"
            />

            <span
              class="text-sm xl:font-bold lg:font-bold md:font-normal sm:font-normal font-normal text-dark mx-2"
            >
              {{ user.name }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UsersFilter",
  data() {
    return {
      droplang: false,
      users: [],
      selectedUser: null,
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    handleFilter(user) {
      this.selectedUser = user;
      const query = { ...this.getQuery };
      if (query["name"] && query["name"] == user.value) {
        delete query["name"];
        this.selectedUser = null;
      } else {
        query["name"] = user.value;
      }
      this.$store.dispatch("query/setQuery", query);
      this.$nuxt.refresh();
      this.droplang = !this.droplang;
    },
    async getUsers() {
      const total = {
        name: "كل الفرق",
        image: "/img/side_nav/user_square.svg",
        value: "",
      };
      const res = await this.$axios.get(`dashboard/profile/all`);
      const { data } = res.data;
      this.users = [total, ...data.map((el) => ({ ...el, value: el.name }))];
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

  .box {
    transition: all 0.3s linear;

    &:hover {
      transform: translateY(-10px);
    }
  }
  .phone-drop-list {
    padding: 15px 15px;
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

    &::-webkit-scrollbar-track {
      background: transparent !important; 
    }

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
        border-bottom: 0px;
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
        filter: invert(78%) sepia(9%) saturate(1975%) hue-rotate(135deg) brightness(90%) contrast(90%) !important;
      }

      &:hover,
      &.active {
        &::after {
          transform: scale(1);
        }
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

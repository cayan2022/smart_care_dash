<template>
  <div>
    <div
      class="flag flex items-center content-center relative z-10 cursor-pointer"
      :class="[
        { '!border-red-700': serverErrors && serverErrors[$attrs.errorName] },
        { '!border-[#eee]': selected.selected },
      ]"
      @click="droplist = !droplist"
    >
      <img
        :src="selected.image"
        class="w-6 h-6 object-contain rounded-full"
        loading="lazy"
        :alt="$t(`app.title`)"
      />

      <span
        class="text-sm font-bold mr-2"
        :class="[
          { 'text-red-700': serverErrors && serverErrors[$attrs.errorName] },
          { '!text-dark': selected.selected },
        ]"
        style="direction: ltr"
      >
        {{ selected.code }}
      </span>
    </div>

    <div
      class="
        phone-drop-list
        w-full
        absolute
        top-full
        left-0
        z-50
        bg-light
        rounded-lg
      "
      :class="[droplist === true ? 'active-drop' : '']"
    >
      <form class="search-form relative z-10 rounded-xl overflow-hidden">
        <div class="form-group w-full h-full relative z-10">
          <img
            src="/img/top-nav/search-normal.svg"
            class="w-5 h-5 object-contain absolute ltr:left-8 rtl:right-8"
            loading="lazy"
            :alt="$t(`app.title`)"
          />

          <input
            v-model="search"
            type="search"
            class="
              form-contain
              text-dark
              font-medium
              text-lg
              w-full
              h-full
              ltr:pl-16
              rtl:pr-16
            "
            placeholder=".. بحث عن دولة"
          />
        </div>
      </form>

      <ul class="phone-list w-full mt-4 relative z-10">
        <li
          v-for="item in filteredCountries"
          :key="item.code"
          class="w-full flex items-start content-center relative z-0"
          :class="{ active: item.selected }"
          @click="optionSelected(item)"
        >
          <img
            :src="item.image"
            class="w-6 h-6 object-contain rounded-full"
            loading="lazy"
            :alt="$t(`app.title`)"
          />

          <span class="text-sm font-bold text-dark mx-2">
            {{ item.name }}
          </span>

          <span class="text-sm font-normal text-gray" style="direction: ltr">
            ({{ item.code }})
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CountryCode",
  props: ["value", "error", "country"],
  data() {
    return {
      droplist: false,
      search: "",
      selected: {
        id: "0",
        name: "السعودية",
        code: "+966",
        image: require(`/static/img/flag.svg`),
        selected: false,
      },
    };
  },
  mounted() {
    if (this.country) {
      this.optionSelected(this.country);
    }
  },
  async fetch() {
    await this.$store.dispatch("pages/getCountries");
  },
  computed: {
    countries() {
      const newArr = this.$store.state.pages.countries.map((country) => ({
        ...country,
        selected: false,
      }));
      return newArr;
    },
    filteredCountries() {
      return this.countries.filter((country) =>
        country.name.match(this.search)
      );
    },
  },

  methods: {
    optionSelected(option) {
      this.selected.selected = false;
      this.selected = option;
      this.droplist = false;
      option.selected = true;
      this.$emit("input", option.id);
    },
  },
};
</script>

<style lang="scss">
.form-phone {
  height: 50px;
  border-color: #eee;

  .flag {
    border-inline-end: 1px solid #eee;
    padding-inline-end: 20px;

    &::after {
      content: "";
      position: absolute;
      width: 14px;
      height: 14px;
      background: url("/img/drop_arrow.svg") center / contain no-repeat;
      top: calc(50% - 8px);
      left: 3px;
      z-index: -1;
    }
  }

  .form-control {
    width: calc(100% - 83px);
    padding-inline-start: 10px;

    &::placeholder {
      font-weight: 500;
    }
  }

  .phone-drop-list {
    padding: 30px;
    height: 0px;
    box-shadow: 0px 3px 25px rgba($color: #aeaeae, $alpha: 0.12);
    overflow-x: hidden;
    overflow-y: scroll;
    transform: translateY(10px);
    visibility: hidden;
    transition: all 0.3s linear;
    pointer-events: none;

    &.active-drop {
      height: 300px;
      transform: translateY(0px);
      opacity: 1;
      visibility: visible;
      pointer-events: fill;
    }

    .phone-list li {
      padding: 10px 0px 15px;
      border-bottom: 1px solid #eee;
      cursor: pointer;

      &:last-child {
        padding-bottom: 0px;
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

  .search-form {
    width: 100%;
    height: 50px;
    background-color: #f5f5f5;

    .form-contain {
      background-color: transparent;

      &::placeholder {
        color: var(--gray);
        font-size: 16px;
        font-weight: 500;
      }
    }

    img {
      top: calc(50% - 10px);
    }

    &:hover img {
      animation: spin 1s linear infinite;
    }
  }
}
</style>

<template>
  <div>
    <form
      class="search-form relative z-10 rounded-xl overflow-hidden"
      @submit.prevent
    >
      <div class="form-group w-full h-full relative z-10">
        <img
          src="/img/top-nav/search-normal.svg"
          class="w-5 h-5 object-contain absolute ltr:left-8 rtl:right-8"
          loading="lazy"
          :alt="$t(`app.title`)"
        />

        <input
          v-model="name"
          type="text"
          class="form-contain text-dark font-medium text-lg w-full h-full ltr:pl-16 rtl:pr-16"
          placeholder=".. بحث"
          @input="handleDebounce(onSearch)"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    onSearch() {
      let queryName = "name";
      switch (this.$route.path) {
        case "/orders":
          queryName = "user";
          break;
        case "/testimonials":
          queryName = "user_name";
          break;
        case "/blogs":
          queryName = "title";
          break;

        default:
          queryName = "name";
          break;
      }
      const query = { ...this.$route.query, [queryName]: this.name, page: 1 };
      this.$store.dispatch("query/setQuery", query);
      this.$eventBus.$emit("on-search");
      this.$nextTick(() => {
        this.$nuxt.refresh();
      });
    },
  },
  watch: {
    $route: {
      handler() {
        this.name = "";
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
.search-form {
  width: 540px;
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
</style>

<template>
  <section class="min-w-max">
    <section class="mt-10 flex justify-center">
      <!-- Pagination list -->
      <ul
        class="pagination flex w-full items-center content-center justify-center"
      >
        <li v-if="hasFirst()" class="pis-4">
          <button class="paginate" @click.prevent="changePage(1)">1</button>
        </li>
        <li v-if="hasFirst()" class="pis-4">. . .</li>
        <li v-for="page in pages" :key="page.index" class="pis-4">
          <button
            class="paginate"
            :class="{
              '!bg-primary !text-white': pagination.current_page == page,
            }"
            @click.prevent="changePage(page)"
          >
            {{ page }}
          </button>
        </li>
        <li v-if="hasLast()" class="pis-4">. . .</li>
        <li v-if="hasLast()" class="pis-4">
          <button class="paginate" @click.prevent="changePage(totalPages)">
            {{ totalPages }}
          </button>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pagination: {
      type: Object,
      default: () => ({
        current_page: 1,
        per_page: 0,
        last_page: 0,
        from: 0,
        to: 0,
        total: 0,
      }),
    },
    pageRange: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {};
  },
  computed: {
    pages() {
      const pages = [];

      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i);
      }

      return pages;
    },
    rangeStart() {
      const start = this.pagination.current_page - this.pageRange;

      return start > 0 ? start : 1;
    },
    rangeEnd() {
      const end = this.pagination.current_page + this.pageRange;

      return end < this.totalPages ? end : this.totalPages;
    },
    totalPages() {
      return Math.ceil(this.pagination.total / this.pagination.per_page);
    },
  },
  methods: {
    hasFirst() {
      return this.rangeStart !== 1;
    },
    hasLast() {
      return this.rangeEnd < this.totalPages;
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        const queries = { ...this.$route.query, ...this.getQuery, page };
        this.$store.dispatch("query/setQuery", queries);
        this.$nuxt.refresh();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
  },
  watch: {
    pagination: {
      handler(pagination) {
        if (!pagination.to) {
          this.changePage(pagination.last_page);
        }
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.paginate {
  @apply bg-semiLight rounded-lg w-10 h-10 flex items-center content-center justify-center text-base text-dark;
}
</style>

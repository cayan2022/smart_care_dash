<template>
  <section class="min-w-max">
    <section class="mt-10 flex justify-center">
      <!-- Pagination list -->
      <ul class="pagination flex w-full items-center content-center justify-center">
        <li v-if="hasFirst()" class="pis-4">
          <button class="paginate" @click.prevent="changePage(1)">1</button>
        </li>
        <li v-if="hasFirst()" class="pis-4">. . .</li>
        <li v-for="page in pages" :key="page.index" class="pis-4">
          <button
            class="paginate"
            :class="{'!bg-primary !text-white': current == page}"
            @click.prevent="changePage(page)"
          >{{ page }}</button>
        </li>
        <li v-if="hasLast()" class="pis-4">. . .</li>
        <li v-if="hasLast()" class="pis-4">
          <button class="paginate" @click.prevent="changePage(totalPages)">{{ totalPages }}</button>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    perPage: {
      type: Number,
      default: 9,
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
      const start = this.current - this.pageRange;

      return start > 0 ? start : 1;
    },
    rangeEnd() {
      const end = this.current + this.pageRange;

      return end < this.totalPages ? end : this.totalPages;
    },
    totalPages() {
      return Math.ceil(this.total / this.perPage);
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
        this.$emit("page-changed", page);
      }
    },
  },
};
</script>

<style scoped>
.paginate {
  @apply bg-semiLight rounded-lg w-10 h-10 flex items-center content-center justify-center text-base text-dark;
}
</style>
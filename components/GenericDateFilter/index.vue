<script>
export default {
  name: "GenericFilter",
  data() {
    return {
      query: {
        start_date: "",
        end_date: "",
      },
    };
  },

  methods: {
    handleClearFilter() {
      this.$store.dispatch("query/setQuery", null);

      this.modalCancel = !this.modalCancel;
      this.query = {
        start_date: "",
        end_date: "",
      };
      this.$nuxt.refresh();
    },
    onFilter() {
      if (this.query["start_date"] !== "" && this.query["end_date"] !== "") {
        const dataFormat = {};
        for (const key in this.query) {
          dataFormat[key] = this.$moment(this.query[key])
            .locale("en")
            .format("YYYY-MM-DD hh:mm:ss");
        }
        const query = { ...this.$route.query, ...dataFormat };
        this.$store.dispatch("query/setQuery", query);
        this.$nuxt.refresh();
        this.modalCancel = !this.modalCancel;
      }
    },
  },
  computed: {
    rangeDate() {
      const startDate = this.$moment(
        this.getQuery && this.getQuery["start_date"]
      )
        .locale("ar")
        .format("LL");
      const endDate = this.$moment(this.getQuery && this.getQuery["end_date"])
        .locale("ar")
        .format("LL");

      return `${startDate}- ${endDate}`;
    },
    currentDate() {
      if (
        this.getQuery &&
        this.getQuery["start_date"] &&
        this.getQuery &&
        this.getQuery["end_date"]
      ) {
        return this.rangeDate;
      } else {
        return this.$moment(new Date().toLocaleDateString())
          .locale("ar")
          .format("LL");
      }
    },
  },
};
</script>

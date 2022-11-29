export default function ({ store }) {
  if (store.getters["query/getQuery"]) {
    store.dispatch("query/removeQuery", null);
  }
}

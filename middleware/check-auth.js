export default function (context) {
  context.store.dispatch("log/initAuth", context.req);
}

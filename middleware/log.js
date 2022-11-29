export default function (context) {
  if (!context.store.getters["log/isAuthenticated"]) {
    context.redirect("/login");
  }
}

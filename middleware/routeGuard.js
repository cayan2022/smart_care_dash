export default function ({ store, route, redirect, app: { $auth } }) {
  const meta = route.meta.reduce((acc, metaData) => {
    acc = metaData;
    return acc;
  }, {});
  const permissions = store.getters["roles/getUserPermissions"];
  if (meta && meta["permissions"]) {
    if (
      $auth.loggedInt &&
      permissions &&
      !permissions.includes(meta["permissions"])
    ) {
      redirect("/no-permissions");
    }
  }
}

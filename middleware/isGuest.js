export default function ({ redirect, app: { $auth } }) {
  if (!$auth.loggedIn) {
    redirect("/login");
  }
}

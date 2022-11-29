import Vue from "vue";
export default ({ store, $axios, i18n, $auth, app, router, localePath }) => {
  $axios.onResponse((response) => {
    if (store.getters["errors/serverErrors"] !== null) {
      store.dispatch("errors/ClearServerErrors");
    }
    const { method } = response.config;

    if (method === "post" || method === "put" || method === "delete") {
      app.$toast.success(response.data.message).goAway(2000);
    }

    return response;
  });
  $axios.onRequest((config) => {
    // config.headers.common["X-locale"] = i18n.locale;
    config.headers.common["Accept-Language"] = i18n.locale;

    return config;
  });

  $axios.onError((err) => {
    if (err.response && err.response.status === 403) {
      app.$toast.error(err.response.data.error).goAway(2000);
      // $auth.logout()
    }
    if (err.response && err.response.status === 401) {
      app.$toast.error(err.response.data.error).goAway(2000);
    }
    if (err.response && err.response.status === 422) {
      app.$toast.error(err.response.data.message).goAway(2000);
    }

    if (
      err.response &&
      err.response.status === 422 &&
      err.response.data.error
    ) {
      app.$toast.success(response.data.error).goAway(2000);
    }

    if (err.response && err.response.data && err.response.data.errors) {
      store.dispatch("errors/SetServerErrors", err.response.data.errors);
    }
  });
};

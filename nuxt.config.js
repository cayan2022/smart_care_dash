const primary = "#61C5CB";
const accent = "#212D54";

export default {
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    GTM_ID: process.env.GTM_ID,
  },

  target: "static",

  loadingIndicator: {
    name: "cube-grid",
    color: "#61C5CB",
    background: "white",
  },
  buildModules: ["nuxt-font-loader", "@nuxt/postcss8", "@nuxtjs/moment"],
  moment: {
    defaultLocale: "ar",
    locales: ["ar"],
  },
  components: true,
  modules: [
    "nuxt-route-meta",
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "nuxt-i18n",
    "@nuxtjs/sitemap",
    "@nuxtjs/toast",
    "@nuxtjs/gtm",
    "vue2-editor/nuxt",
    ["vue-scrollto/nuxt", { duration: 250 }],
  ],

  plugins: [
    "@/plugins/mixins",

    // { src: "@/plugins/swiper", mode: "client" },
  ],

  css: [
    "@/assets/sass/app.scss",
    "@/assets/css/tailwind.css",
    // "@/assets/css/swiper.css",
  ],

  gtm: {
    id: process.env.GTM_ID,
    scriptDefer: true,
  },

  router: {
    middleware: ["routeGuard", "resetQuery"],
    // middleware: ["auth"],
    // middleware: ["log", "check-auth"],
    extendRoutes(routes, resolve) {
      routes.push({
        name: "Login",
        path: "/login",
        component: resolve(__dirname, "pages/auth/index.vue"),
      });
      routes.push({
        name: "Logout",
        path: "/logout",
        component: resolve(__dirname, "pages/auth/logout.vue"),
      });
    },
  },

  axios: {
    baseURL: process.env.API_URL,
    credentials: false,
    common: {
      "Access-Control-Allow-Origin": "*",
    },
  },

  auth: {
    // redirect: {
    //   login: "/login",
    //   logout: "/login",
    //   home: "/login",
    //   callback: false,
    // },
    // resetOnError: true,
    // rewriteRedirects: false,
    strategies: {
      local: {
        token: {
          property: "token",
          required: true,
          type: "Bearer",
          global: true,
        },
        user: {
          property: "data",
          autofetch: false,
        },
        endpoints: {
          login: {
            url: "auth/login",
            method: "post",
          },
          logout: {
            url: "auth/logout",
            method: "post",
          },
          user: {
            url: "auth/user",
            method: "get",
          },
        },
      },
    },
    redirect: false,
    plugins: [{ src: "~/plugins/axios", ssr: true }],
  },

  toast: { duration: 5000, keepOnHover: true },

  fontLoader: { url: "/fonts/fonts.css" },

  sitemap: {
    hostname: process.env.HOST_NAME,
    gzip: true,
    i18n: {
      defaultLocale: "ar",
      locales: ["ar", "en"],
      routesNameSeparator: "___",
    },
  },

  i18n: {
    seo: false,
    lazy: true,
    langDir: "lang/",
    defaultLocale: "ar",
    vueI18nLoader: true,
    detectBrowserLanguage: false,
    vueI18n: { fallbackLocale: "ar" },
    locales: [
      { code: "ar", name: "عربي", file: "ar.js" },
      { code: "en", name: "English", file: "en.js" },
    ],
  },

  loading: { color: primary },

  render: { http2: { push: true } },

  pwa: { manifest: { lang: "ar", theme_color: primary } },

  generate: { fallback: true },

  build: {
    splitChunks: { layouts: true, pages: true, commons: true },

    extractCSS: true,

    optimizeCSS: true,

    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.(css|vue)$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
    },

    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },

      preset: {
        features: { "focus-within-pseudo-class": false },
      },
    },
  },

  head: {
    title: 'سمارت كير',
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: 'description', name: 'description', content: 'شركة أماسي التميز الطبية متخصصة في الأجهزة الطبية وطب الاسنان نحن الأول في مجالنا في المملكة العربية السعودية'},
      { hid: "google", name: "google", content: "notranslate" },
    ],
    link: [{ rel: "icon", type: "image/png", href: "/icon.png" }],
  },
};

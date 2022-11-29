<template>
  <nav class="side-nav bg-light fixed top-0 right-0 z-40">
    <div
      class="flex items-center content-center justify-center w-full h-full bg-light"
    >
      <div
        class="hamburger"
        :class="showNav ? 'active' : ''"
        @click="showNav = !showNav"
      >
        <svg viewBox="0 0 70 70">
          <path d="M19,15 L45,15 C70,15 58,-2 49.0177126,7 L19,37"></path>
          <path d="M19,24 L45,24 C61.2371586,24 57,49 41,33 L32,24"></path>
          <path d="M45,33 L19,33 C-8,33 6,-2 22,14 L45,37"></path>
        </svg>
      </div>

      <button
        @click.prevent="$router.push(localePath('/'))"
        class="brand-name absolute top-0 left-0 z-30 w-full block px-12 py-3 mt-1 border-b border-solid"
      >
        <img
          v-if="getSystemLogo"
          :src="getSystemLogo.image"
          class="w-28 h-16 object-contain"
          loading="lazy"
          :alt="$t(`app.title`)"
        />
      </button>
    </div>

    <ul class="navbar-nav w-full pb-12" :class="showNav ? 'active-nav' : ''">
      <template v-for="(nav, i) in navLinks">
        <li
          class="w-full relative z-10"
          @click="showNav = !showNav"
          :key="i"
          v-if="userPermissions && userPermissions.includes(nav.permission)"
        >
          <nuxt-link
            prefetch
            exact-path
            :to="
              localePath({
                path: nav.link,
              })
            "
            class="link w-full flex items-center relative z-10 content-center py-5 px-12"
          >
            <img
              :src="`/img/side_nav/${nav.img}.svg`"
              class="w-6 h-6 object-contain ltr:mr-3 rtl:ml-3"
              loading="lazy"
              :alt="$t(`app.title`)"
            />

            <span class="text-base font-normal text-dark">
              {{ nav.title }}
            </span>
          </nuxt-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      system_logo: "",
      showNav: false,
      navLinks: [
        {
          link: "/",
          title: "لوحة التحكم",
          img: "chart",
          permission: "show_statuses_reports",
        },
        {
          link: "/orders",
          title: "الطلبات",
          img: "task-square",
          permission: "show_orders",
        },
        {
          link: "/follow-sources",
          title: "متابعة المصادر",
          img: "subtitle",
          permission: "show_sources_reports",
        },
        {
          link: "/comments",
          title: "متابعة الأداء",
          img: "activity",
          permission: "show_moderators_reports",
        },
        {
          link: "/services",
          title: "الخدمات",
          img: "home-hashtag",
          permission: "show_services",
        },
        {
          link: "/category",
          title: "الأقسام",
          img: "menu",
          permission: "show_categories",
        },
        {
          link: "/offers",
          title: "العروض",
          img: "offer",
          permission: "show_offers",
        },
        {
          link: "/teams",
          title: "الفريق الطبي",
          img: "user_square",
          permission: "show_doctors",
        },
        {
          link: "/mange-clients",
          title: "إدارة العملاء",
          img: "profile",
          permission: "show_customers",
        },
        {
          link: "/sources",
          title: "المصادر",
          img: "hashtag",
          permission: "show_sources",
        },
        {
          link: "/branches",
          title: "الفروع",
          img: "global-edit",
          permission: "show_branches",
        },
        // {
        //   link: "/testimonials",
        //   title: "آراء العملاء",
        //   img: "messages",
        //   permission: "show_testimonials",
        // },
        // {
        //   link: "/projects",
        //   title: "المشاريع",
        //   img: "briefcase",
        //   permission: "show_projects",
        // },
        // {
        //   link: "/news",
        //   title: "الأخبار",
        //   img: "book",
        //   permission: "show_tidings",
        // },
        // {
        //   link: "/partners",
        //   title: "شركاء النجاح",
        //   img: "user_square",
        //   permission: "show_partners",
        // },
        {
          link: "/blogs",
          title: "المدونة",
          img: "note",
          permission: "show_blogs",
        },
        {
          link: "/clients",
          title: "إدارة الموظفين",
          img: "personalcard",
          permission: "show_profiles",
        },
        {
          link: "/roles",
          title: "الأدوار والصلاحيات",
          img: "roles",
          permission: "show_roles",
        },
        {
          link: "/setting",
          title: "اعدادت الحساب",
          img: "setting",
          permission: "update_settings",
        },
      ],
    };
  },
  created() {
    // this.$eventBus.$on("on-logo-changed", this.getLogo);
    this.$store.dispatch("query/SetSystemLogo");
  },
  methods: {},
};
</script>

<style lang="scss">
.nuxt-link-exact-active {
  background-color: var(--primary) !important;

  img {
    filter: var(--light-filter) !important;
  }

  span {
    color: var(--light);
  }
}
.side-nav {
  width: 307px;
  height: 100%;
  border-inline-end: 1px solid #eeeeee;

  .brand-name {
    border-color: #eeeeee;
    margin-top: 7px;
  }

  .navbar-nav {
    height: calc(100vh - 100px);
    overflow-x: hidden;
    overflow-y: scroll;
    position: absolute;
    bottom: 0;
    left: 0;

    &::-webkit-scrollbar {
      width: 0px !important;
      height: 0px !important;
    }

    li {
      &:nth-child(5),
      &:nth-child(14) {
        padding-block-end: 20px;

        &::after {
          content: "";
          position: absolute;
          width: calc(100% - 80px);
          height: 1px;
          background-color: #eeeeee;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: -1;
        }
      }

      .link {
        &::before {
          content: "";
          position: absolute;
          width: 0%;
          height: 100%;
          top: 0;
          right: 0;
          background-color: var(--primary);
          z-index: -1;
          transition: all 0.3s linear;
        }

        img {
          filter: var(--gray-filter);
        }

        // &.nuxt-link-exact-active,
        &:hover {
          &::before {
            width: 100%;
          }

          img {
            filter: var(--light-filter);
            animation: bounce-in-fwd 0.2s ease-in-out;
          }

          span {
            color: var(--light);
          }
        }
      }
    }
  }

  .hamburger {
    display: none;
    width: 70px;
    height: 70px;

    svg {
      width: 70px;
      height: 70px;
      position: absolute;
      top: 27px;
      right: 10px;
      stroke: var(--primary);
      stroke-width: 0.2rem;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      display: block;

      path {
        transition: stroke-dasharray var(--duration, 0.85s) var(--easing, ease)
            var(--delay, 0s),
          stroke-dashoffset var(--duration, 0.85s) var(--easing, ease)
            var(--delay, 0s);
        stroke-dasharray: var(--array-1, 26px) var(--array-2, 100px);
        stroke-dashoffset: var(--offset, 126px);
        transform: translateZ(0);

        &:nth-child(2) {
          --duration: 0.7s;
          --easing: ease-in;
          --offset: 100px;
          --array-2: 74px;
        }

        &:nth-child(3) {
          --offset: 133px;
          --array-2: 107px;
        }
      }
    }

    &.active svg {
      path {
        --offset: 57px;

        &:nth-child(1),
        &:nth-child(3) {
          --delay: 0.15s;
          --easing: cubic-bezier(0.2, 0.4, 0.2, 1.1);
        }

        &:nth-child(2) {
          display: none;
        }

        &:nth-child(3) {
          --offset: 58px;
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .side-nav {
    width: 260px;
  }
}

@media (max-width: 999px) {
  .side-nav {
    width: 25% !important;
    height: 97px !important;
    background-color: #fff !important;
    border-bottom: 1px solid #eeeeee;
    border-inline-end: 0px;
    z-index: 9999 !important;

    .hamburger {
      display: block !important;
    }

    .navbar-nav {
      position: fixed;
      top: 97px;
      right: -100%;
      z-index: 9999 !important;
      background: #fff;
      height: 100vh !important;
      transition: all 0.3s linear;
      padding-bottom: 100px;

      &.active-nav {
        right: 0px !important;
      }
    }

    .brand-name {
      width: fit-content !important;
      padding: 0px !important;
      border: 0px;
      height: 100%;
      display: flex;
      align-items: center;
      margin-top: 0px !important;
    }
  }
}

@media (max-width: 600px) {
  .side-nav {
    width: 45% !important;
  }
}
</style>

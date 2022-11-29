<template>
  <div>
    <nav class="top-nav py-5 bg-light fixed top-0 left-0 z-40">
      <div class="container w-full h-full">
        <div
          class="w-full h-full flex items-center content-center lg:justify-between md:justify-between sm:justify-end justify-end"
        >
          <nav-search class="lg:block md:block sm:hidden hidden" />

          <div class="flex items-center content-center">
            <nuxt-link
              to="/dark"
              class="icon w-14 h-14 mx-3 hidden items-center content-center justify-center overflow-hidden rounded-full bg-offLight">
              <img
                src="/img/top-nav/moon.svg"
                class="w-6 h-6 object-contain"
                loading="lazy"
                :alt="$t(`app.title`)"
              />
            </nuxt-link>

            <div class="relative z-10">
              <div
                v-if="isAuthenticated"
                @click="droplang = !droplang"
                class="drop-down cursor-pointer flex items-center content-center justify-center relative z-10 ltr:pr-6 rtl:pl-6"
              >
                <img
                  :src="loggedInUser.image"
                  class="w-14 h-14 user rounded-full object-cover ltr:mr-2 rtl:ml-2"
                  loading="lazy"
                  :alt="$t(`app.title`)"
                />

                <div class="lg:block md:block sm:hidden hidden user-data">
                  <h1 class="text-sm font-bold text-dark mb-1">
                    {{ loggedInUser.name }}
                  </h1>

                  <p class="text-gray font-medium text-sm">
                    {{ loggedInUser.type }}
                  </p>
                </div>
              </div>

              <div
                class="phone-drop-list w-full absolute top-full left-0 z-50 bg-light rounded-lg"
                :class="[droplang === true ? 'active-drop' : '']"
              >
                <ul class="phone-list w-full relative z-10">
                  <li
                    class="w-full flex items-start content-center relative z-0"
                    @click="handleLogout"
                  >
                    <img
                      src="/img/icons/logout-linear.svg"
                      class="w-6 h-6 object-contain"
                      loading="lazy"
                      :alt="$t(`app.title`)"
                    />

                    <span class="text-sm font-bold text-dark mx-2">
                      تسجيل خروج
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      droplang: false,
    };
  },

  components: {
    navSearch: () => import(`@/components/core/nav-search`),
  },

  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
  methods: {
    handleLogout() {
      this.$auth.logout().then(() => {
        this.$router.push(this.localePath("/login"));
      });
    },
  },
};
</script>

<style lang="scss">
.top-nav {
  width: calc(100% - 307px);
  border-bottom: 1px solid #eeeeee;
  z-index: 9999 !important;

  .drop-down {
    &::after {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      background: url("/img/top-nav/arrow-down.svg") center / contain no-repeat;
      top: calc(50% - 10px);
      z-index: -1;
    }
  }

  .icon {
    img {
      transition: all 0.3s linear;
    }

    &:hover img {
      animation: fadeInLeft 0.3s linear;
    }
  }

  .phone-drop-list {
    padding: 15px 10px;
    width: 100%;
    min-width: 165px;
    height: fit-content;
    box-shadow: 0px 3px 25px rgba($color: #aeaeae, $alpha: 0.12);
    overflow: hidden;
    transform: translateY(10px);
    visibility: hidden;
    transition: all 0.3s linear;
    pointer-events: none;

    &.active-drop {
      transform: translateY(0px);
      opacity: 1;
      visibility: visible;
      pointer-events: fill;
    }

    .phone-list li {
      padding: 10px 0px 15px;
      border-bottom: 1px solid #eee;
      cursor: pointer;

      &:last-child {
        padding-bottom: 0px;
        border-bottom: 0px;
      }

      &:hover,
      &.active {
        img {
          animation: spin 1s linear 2;
        }

        span {
          color: #d6262d;
        }
      }
    }
  }
}

html[dir="ltr"] {
  .top-nav .drop-down::after {
    right: 0;
  }
}

html[dir="rtl"] {
  .top-nav .drop-down::after {
    left: 0;
  }
}

@media (max-width: 1200px) {
  .top-nav {
    width: calc(100% - 260px) !important;

    .search-form {
      width: 350px;
    }
  }
}

@media (max-width: 999px) {
  .top-nav {
    width: 75% !important;
    height: 97px !important;
    z-index: 9999 !important;

    .icon,
    .user {
      width: 40px;
      height: 40px;

      img {
        width: 20px;
        height: 20px;
      }
    }

    .user-data {
      display: none;
    }
  }
}

@media (max-width: 600px) {
  .top-nav {
    width: 55% !important;
  }
}
</style>

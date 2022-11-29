<template>
  <section
    class="auth w-full bg-light relative z-10 flex justify-center items-center content-center flex-col"
  >
    <div
      class="container mobile-shape lg:h-full md:w-full w-fit grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-40"
    >
      <div class="content pt-56">
        <page-heading
          class="mb-14 heading-contain"
          title="مرحبا بك من جديد"
          desc="قم بتسجيل دخولك الى النظام وتعبئة البيانات المطلوبة"
        />

        <form class="w-full" @submit.prevent="onSubmit">
          <form-input
            v-model="login.username"
            lableName="البريد الالكتروني"
            icon="message"
            type="email"
            class="mb-5"
            lock="hidden"
            placeholder="البريد الالكتروني"
          />
          <!-- errorName="username" -->
          <form-input
            v-model="login.password"
            lableName="كلمة المرور"
            class="mb-10"
            icon="lock"
            type="password"
            placeholder="كلمة المرور"
            errorName="password"
          />

          <button
            type="submit"
            class="w-full login-btn relative z-10 overflow-hidden rounded-lg flex items-center content-center justify-center bg-primary"
          >
            <span class="text-sm font-bold text-light">تسجيل الدخول</span>
          </button>
        </form>
      </div>

      <div
        class="data w-full h-full flex-col justify-center lg:flex md:hidden sm:hidden hidden"
      >
        <a href="https://smartcare.med.sa/" target="_blank">
          <img
            src="/img/side_nav/logo.svg"
            class="w-52 h-20 object-contain"
            loading="lazy"
            :alt="$t(`app.title`)"
          />
        </a>

        <h1 class="text-4xl font-bold text-primary mb-3 mt-12">
          سمارت كير 
        </h1>

        <h2 class="text-3xl font-bold text-light mb-5">
          خبراء الرعاية الصحية المنزلية
        </h2>

        <p class="text-light text-base font-normal opacity-60">
          سمارت كير خبراء الرعاية الصحية المنزلية، نوفر لك مناخ ملائم للرعاية الصحية الأمنة والذكيَّة في محل إقامتك ، تحت إشراف كوادر طبيّة مؤهلة تمنحك الشعور بالراحة والتحسن المستمر
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AuthModal",
  data() {
    return {
      login: {
        username: "",
        password: "",
      },
      errorsArr: [],
    };
  },
  methods: {
    onSubmit() {
      this.$auth
        .loginWith("local", { data: this.login })
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          this.$errorHandler(this.errorsArr, error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.auth {
  min-height: 100vh;

  &::after {
    content: "";
    position: absolute;
    width: 50%;
    height: 100%;
    background: var(--secondary) url("/img/auth/auth.webp") top right / cover no-repeat;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .heading-contain {
    width: 100% !important;
  }

  .login-btn {
    height: 50px;

    &::after,
    &::before {
      content: "";
      position: absolute;
      width: 45px;
      height: 45px;
      background: url("/img/auth/arrow.svg") center / contain no-repeat;
      filter: var(--light-filter);
      top: calc(50% - 22.5px);
      z-index: -1;
      transition: all 0.3s linear;
    }

    &::after {
      left: 5px;
    }

    &::before {
      right: -100%;
    }

    &:hover {
      &::after {
        left: -100%;
      }

      &::before {
        right: 5px;
      }
    }
  }
}

@media (max-width: 999px) {
  .auth {
    padding: 0px !important;
    height: 100vh;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;

    .mobile-shape {
      width: 100%;
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: center;
    }

    .content {
      background-color: #fff;
      padding: 30px 15px;
      height: fit-content;
      border-radius: 6px;
      box-shadow: 0px 0px 10px rgba($color: #fdd301, $alpha: 0.3);
    }

    .data {
      display: none !important;
    }
  }
}
</style>

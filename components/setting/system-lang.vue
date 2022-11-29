<template>
  <section class="w-full lang-sytem">
    <h1 class="text-lg font-bold text-dark mb-5">
      اللغة
    </h1>

    <form class="contain w-full lg:p-10 md:p-5 sm:p-5 p-5 bg-light rounded-lg bg-opacity-80 flex flex-col justify-center items-center">
      <img
        src="/img/icons/translate.svg"
        class="w-36 h-36 object-contain mb-3"
        loading="lazy"
        :alt="$t(`app.title`)" />

      <div class="w-full">
        <label class="text-dark text-sm font-normal block mb-4">
          اللغة
        </label>

        <div class="w-full relative z-10">
          <div class="flag flex items-center content-center relative z-10 cursor-pointer" @click="droplang = !droplang">
            <img
              src="/img/icons/ar.svg"
              class="w-6 h-6 object-contain rounded-full"
              loading="lazy"
              :alt="$t(`app.title`)"
            />

            <span class="text-sm font-bold mr-2" >
              العربية
            </span>
          </div>

          <div class="phone-drop-list w-full absolute bottom-full left-0 z-50 bg-light rounded-lg" :class="[droplang === true ? 'active-drop' : '']">
            <ul class="phone-list w-full relative z-10">
              <li class="w-full flex items-start content-center relative z-0" @click="droplang = !droplang">
                <img
                  src="/img/icons/ar.svg"
                  class="w-6 h-6 object-contain rounded-full"
                  loading="lazy"
                  :alt="$t(`app.title`)"
                />

                <span class="text-sm font-bold text-dark mx-2">
                  العربية
                </span>
              </li>

              <li class="w-full flex items-start content-center relative z-0" @click="droplang = !droplang">
                <img
                  src="/img/icons/en.png"
                  class="w-6 h-6 object-contain rounded-full"
                  loading="lazy"
                  :alt="$t(`app.title`)"
                />

                <span class="text-sm font-bold text-dark mx-2">
                  english
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      droplang: false,
    }
  }
}
</script>

<style lang="scss">
  .lang-sytem {
    .flag {
      width: 100%;
      height: 50px;
      position: relative;
      padding: 0px 15px;
      border: 1px solid #eee;
      border-radius: 8px;

      &::after {
        content: "";
        position: absolute;
        width: 14px;
        height: 14px;
        background: url("/img/drop_arrow.svg") center / contain no-repeat;
        top: calc(50% - 8px);
        left: 3px;
        z-index: -1;
      }
    }

    .phone-drop-list {
      padding: 30px;
      width: 100%;
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

        &::after {
          content: "";
          position: absolute;
          width: 20px;
          height: 20px;
          background: url("/img/form/check_circle.svg") center / contain no-repeat;
          top: calc(50% - 10px);
          left: 0px;
          transform: scale(0);
          transition: all 0.3s linear;
          z-index: -1;
          filter: invert(80%) sepia(32%) saturate(1833%) hue-rotate(357deg)
            brightness(103%) contrast(106%);
        }

        &:hover,
        &.active {
          &::after {
            transform: scale(1);
          }
        }
      }
    }
  }
</style>
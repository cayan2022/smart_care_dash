<template>
  <footer class="lg:w-1/2 md:w-full sm:w-full absolute px-20 bottom-6 ltr:right-0 rtl:left-0 lg:block md:block sm:hidden hidden z-50">
    <div class="container w-full flex items-center content-center justify-end">
      <div class="drop-down cursor-pointer hidden items-center content-center justify-center relative z-10 ltr:pr-6 rtl:pl-6">
        <div class="lg:block md:block sm:hidden hidden">
          <p class="text-sm font-bold text-light mb-1">
            العربية
          </p>
        </div>
      </div>

      <a href="https://cayan.co/" target="_blank" class="flex items-center content-center justify-between">
        <p class="text-sm font-normal text-light ltr:mr-3 rtl:ml-3">
          هذا المنتج مقدم من 
        </p>

        <img
          src="/img/cayan.svg"
          class="w-10 h-10 object-contain"
          loading="lazy"
          :alt="$t(`app.title`)" />
      </a>
    </div>
  </footer>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  footer {
    .drop-down {
      &::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        background: url('/img/top-nav/arrow-down.svg') center / contain no-repeat;
        top: calc(50% - 10px);
        z-index: -1;
      }
    }
  }

  

  html[dir="ltr"] {
    footer .drop-down::after {
      right: 0;
    }
  }

  html[dir="rtl"] {
    footer .drop-down::after {
      left: 0;
    }
  }
</style>
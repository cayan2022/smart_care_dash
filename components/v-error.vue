<template>
  <div v-if="errors" class="w-full h-full lg:py-20 md:py-10 sm:py-10 py-10 relative" style="color:#e92131">
    <div class="container w-full h-full flex flex-col justify-center items-center content-center text-center">
      <img
        src="/img/not_found.svg"
        class="w-full h-[280px] object-contain"
        :alt="$t(`app.title`)" />

      <h1 class="text-dark font-medium text-2xl my-10">
        لا يوجد بيانات لعرضها حالياً
      </h1>

      <page-button
        name="العودة الى الرئيسية"
        @click.prevent="$router.push(localePath(`/`))"
        btnClass="yellow"
        icon="home-hashtag"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    input: { type: String, required: true }
  }
}
</script>

<style lang="scss" scoped>
@media (max-width: 999px) {
  .mobile-btn {
    width: 200px !important;
  }
}
</style>
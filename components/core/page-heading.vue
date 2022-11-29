<template>
  <div class="lg:w-1/2 md:w-full sm:w-full w-full">
    <h1 class="text-2xl font-bold text-dark mb-2">
      {{ title }}
    </h1>

    <p class="text-gray font-normal text-base">
      {{ desc }}
    </p>
  </div>
</template>

<script>
export default {
  props: [
    'title',
    'desc'
  ]
}
</script>
<template lang="">
  <div>
    <add-testimonial />
  </div>
</template>

<script>
export default {
  layout: "home",
  meta: {
    permissions: "create_testimonials",
  },
  components: {
    addTestimonial: () => import(`@/components/testimonials/add-testimonial`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

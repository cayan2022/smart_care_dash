<template lang="">
  <div>
    <edit-testimonial />
  </div>
</template>

<script>
export default {
  layout: "home",
  meta: {
    permissions: "update_testimonials",
  },
  components: {
    editTestimonial: () => import(`@/components/testimonials/edit-testimonial`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

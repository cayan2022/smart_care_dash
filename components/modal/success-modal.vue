<template>
  <div
    class="modal w-full h-full fixed top-0 left-0 z-50 flex items-center content-center justify-center"
    :class="[open ? 'active-modal' : '']"
  >
    <div
      class="overlay w-full h-full bg-dark bg-opacity-40 absolute top-0 left-0"
      @click="close()"
    ></div>

    <div
      class="box big-size py-10 px-4 bg-light rounded-lg flex flex-col items-center content-center justify-center relative z-20"
    >
      <img
        src="/img/form/done.svg"
        class="w-16 h-16 object-contain mb-5"
        :alt="$t(`app.title`)"
      />

      <p class="text-dark font-bold text-center text-base">
        <slot />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SuccesModal",
  data() {
    return {
      open: false,
    };
  },
  created() {
    setTimeout(() => {
      this.open = true;
    }, 10);
  },
  methods: {
    close() {
      this.open = false;
      setTimeout(() => {
        this.$store.commit("closeModal");
      }, 100);
    },
  },
};
</script>

<style></style>

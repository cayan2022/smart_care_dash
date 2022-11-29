<template>
  <div class="form-group w-full">
    <label class="text-dark text-sm font-normal block mb-4">{{
      lableName
    }}</label>

    <div class="form-contain w-full relative z-10" @click="$refs.date_ref.showPicker()" style="overflow: hidden">
      <img
        @click="$refs.date_ref.showPicker()"
        style="z-index: 20"
        :src="`/img/form/${icon}.svg`"
        class="icon w-6 h-6 object-contain absolute z-0 pointer-events-none"
        :alt="$t(`app.title`)"
      />

      <input
        :max="maxDate"
        ref="date_ref"
        v-bind="$attrs"
        :type="type ? type : 'datetime-local'"
        class="form-control form-control__date-picker text-sm ltr:text-left rtl:text-right font-normal text-dark w-full h-full rounded-lg border border-solid"
        :class="{
          '!border-red-700': serverErrors && serverErrors[$attrs.errorName],
        }"
        :value="value"
        @change="$emit('input', $event.target.value)"
      />
      <div class="input-overlay"></div>
    </div>
    <span
      v-if="serverErrors && serverErrors[$attrs.errorName]"
      class="block text-red-700 text-[10px] mt-1 text-end"
    >
      {{ serverErrors[$attrs.errorName] && serverErrors[$attrs.errorName][0] }}
    </span>
  </div>
</template>

<script>
export default {
  name: "DatePicker",
  inheritAttrs: false,
  props: ["lableName", "icon", "name", "options", "value", "error", "type"],
  computed: {
    maxDate() {
      const year = new Date().getFullYear();

      const date = `${year}-12-31`;

      return this.$moment(date).locale("en").format("YYYY-MM-DD");
    },
  },
};
</script>

<style lang="scss">
.form-control {
  &__date-picker {
    padding: 0 10px !important;
  }
}
html[dir="rtl"] {
  .form-group .form-contain.select {
    &::after {
      left: 13px;
    }
  }
}

html[dir="ltr"] {
  .form-group .form-contain.select {
    &::after {
      right: 13px;
    }
  }
}
.input-overlay {
  position: absolute;
  background-color: transparent;
  width: 100%;
  left: 0;
  right: 42px;
  z-index: 6;
  height: 100%;
  top: 0;
}
</style>

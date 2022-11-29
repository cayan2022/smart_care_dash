<template>
  <div class="form-group w-full">
    <label class="text-dark text-sm font-normal block mb-4">{{
      lableName
    }}</label>

    <div class="form-contain select w-full relative z-10">
      <img
        :src="`/img/form/${icon}.svg`"
        class="icon w-6 h-6 object-contain absolute z-10"
        :alt="$t(`app.title`)"
      />

      <select
        class="
          form-control
          text-sm
          font-normal
          text-dark
          w-full
          h-full
          rounded-lg
          border border-solid
        "
        :class="{
          '!border-red-700': serverErrors && serverErrors[$attrs.errorName],
        }"
        :value="value"
        @change="$emit('input', $event.target.value)"
      >
        <option hidden value="">
          {{ name }}
        </option>
        <option v-for="option in options" :key="option.name" :value="option.id">
          {{ option.name }}
        </option>
      </select>
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
  props: ["lableName", "icon", "name", "options", "value", "error"],
};
</script>

<style lang="scss">
.form-group {
  .form-contain {
    &.select {
      select {
        appearance: none !important;
        // color: #cccccc;
        color: #000;

        option {
          color: #000;
          position: relative;
          z-index: 9;

          &::after {
            content: "";
            position: absolute;
            width: 10px;
            height: 10px;
            background-color: var(--primary);
            top: 50%;
            left: 10px;
            z-index: 9;
            transform: translateY(-50%);
          }
        }

        &:hover,
        &:focus,
        &:active,
        &::backdrop {
          background: transparent !important;

          option {
            background: transparent !important;
            outline: none !important;
            border: 0px !important;
          }
        }
      }

      &::after {
        content: "";
        position: absolute;
        width: 16px;
        height: 15px;
        background: url("/img/form/arrow_down.svg") center / contain no-repeat;
        top: calc(50% - 8px);
        z-index: 9;
        pointer-events: none;
      }
    }
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
</style>

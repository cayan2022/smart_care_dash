<template>
  <div>
    <label
      :for="`${id}`"
      class="check-icon cursor-pointer flex items-center content-center"
    >
      <input
        :type="`${type}`"
        :id="`${id}`"
        :name="`${name}`"
        :value="id"
        :checked="id === value"
        @change="$emit('input', $event.target.value)"
        class="hidden w-full input-check"
      />

      <div class="data flex items-center content-center relative z-10">
        <span
          class="text-dark font-bold text-sm"
          :class="{
            'text-red': serverErrors && serverErrors[$attrs.errorName],
          }"
          >{{ title }}</span
        >
      </div>
    </label>
    <div
      v-if="serverErrors && serverErrors[$attrs.errorName]"
      class="block text-red-700 text-[10px] mt-1 text-end"
    >
      {{ serverErrors[$attrs.errorName] && serverErrors[$attrs.errorName][0] }}
    </div>
  </div>
</template>

<script>
export default {
  name: "FormCheckbox",
  props: ["id", "name", "title", "type", "value", "error"],
};
</script>

<style lang="scss" scoped>
.check-icon {
  .data {
    padding-inline-start: 31px;

    &::after,
    &::before {
      content: "";
      position: absolute;
      width: 24px;
      height: 24px;
      top: calc(50% - 12px);
      right: 0px;
      z-index: -1;
      border-radius: 50%;
      transition: all 0.3s linear;
    }

    &::after {
      border: 1px solid #cccccc;
    }

    &::before {
      background: url("/img/form/check_circle.svg") center / contain no-repeat;
      filter: var(--yellow-filter);
      transform: scale(0);
    }
  }

  .input-check {
    &:checked {
      & ~ .data {
        &::after {
          transform: scale(0);
        }

        &::before {
          transform: scale(1);
        }
      }
    }
  }
}
</style>

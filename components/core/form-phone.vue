<template>
  <div class="w-full">
    <label class="text-dark text-sm font-normal block mb-4"> رقم الجوال </label>
    <div
      class="form-phone w-full relative z-20 px-3 border border-solid rounded-lg flex items-center content-center justify-between"
      :class="{
        '!border-red-700': serverErrors && serverErrors[$attrs.errorName],
      }"
    >
      <slot name="country-code" />
      <input
        :type="$attrs.type || 'tel'"
        maxLength="10"
        :value="value"
        @input="$emit('input', $event.target.value)"
        class="form-control text-sm font-bold text-dark h-full"
        placeholder="رقم الجوال"
      />
    </div>
    <span
      v-if="serverErrors && serverErrors[$attrs.errorName]"
      class="block text-red-700 text-[10px] mt-1 text-end"
    >
      {{
        serverErrors &&
        serverErrors[$attrs.errorName] &&
        serverErrors[$attrs.errorName][0]
      }}
    </span>
  </div>
</template>

<script>
export default {
  name: "PhoneInput",
  props: ["value", "error"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
.form-phone {
  height: 50px;
  border-color: #eee;

  .flag {
    border-inline-end: 1px solid #eee;
    padding-inline-end: 20px;

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

  .form-control {
    width: calc(100% - 83px);
    padding-inline-start: 10px;

    &::placeholder {
      font-weight: 500;
    }
  }

  .phone-drop-list {
    padding: 30px;
    height: 0px;
    box-shadow: 0px 3px 25px rgba($color: #aeaeae, $alpha: 0.12);
    overflow-x: hidden;
    overflow-y: scroll;
    transform: translateY(10px);
    visibility: hidden;
    transition: all 0.3s linear;
    pointer-events: none;

    &.active-drop {
      height: 300px;
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
        filter: var(--yellow-filter) !important;
      }

      &:hover,
      &.active {
        &::after {
          transform: scale(1);
        }
      }
    }
  }

  .search-form {
    width: 100%;
    height: 50px;
    background-color: #f5f5f5;

    .form-contain {
      background-color: transparent;

      &::placeholder {
        color: var(--gray);
        font-size: 16px;
        font-weight: 500;
      }
    }

    img {
      top: calc(50% - 10px);
    }

    &:hover img {
      animation: spin 1s linear infinite;
    }
  }
}
</style>

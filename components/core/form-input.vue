<template>
  <div class="form-group w-full">
    <label class="text-dark text-sm font-normal block mb-4">
      {{ lableName }}
    </label>

    <div class="form-contain w-full relative z-10" :class="`${textArea}`">
      <img
        :src="`/img/form/${icon}.svg`"
        class="icon w-6 h-6 object-contain absolute z-10"
        :alt="$t(`app.title`)"
      />

      <input
        :type="type == 'password' ? passType : `${type}`"
        class="
          form-control
          text-sm
          font-bold
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
        @input="$emit('input', $event.target.value)"
        :placeholder="`${placeholder}`"
      />

      <span
        v-if="serverErrors && serverErrors[$attrs.errorName]"
        class="block text-red-700 text-[10px] mt-1 text-end"
      >
        {{
          serverErrors[$attrs.errorName] && serverErrors[$attrs.errorName][0]
        }}
      </span>

      <div
        @click="toggleShow()"
        :class="`${lock} password cursor-pointer absolute align-bottom z-10`"
      >
        <img
          src="/img/form/eye.svg"
          :class="[type === 'text' ? 'active' : '']"
          class="w-6 h-6 object-contain"
          :alt="$t(`app.title`)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormInput",
  data() {
    return {
      passType: this.type == "password" ? "password" : "",
    };
  },
  props: ["lableName", "icon", "placeholder", "type", "value", "lock", "error", "textArea"],
  methods: {
    toggleShow() {
      this.passType = this.passType === "password" ? "text" : "password";
    },
  },
};
</script>

<style lang="scss">
.form-group {
  .form-contain {
    height: 50px;

    .icon {
      top: calc(50% - 12px);
      filter: var(--gray-filter);
    }

    .form-control {
      border-color: #eee;
      padding-inline-start: 44px;

      &::placeholder {
        font-size: 14px;
        font-weight: 500;
        color: #cccccc;
      }
    }

    .password {
      top: calc(50% - 12px);

      img {
        filter: var(--gray-filter);

        &:hover,
        &.active {
          filter: var(--yellow-filter) !important;
        }
      }
    }

    &:hover,
    &:focus {
      .icon {
        filter: var(--yellow-filter) !important;
      }

      .form-control {
        border-color: var(--primary);
      }
    }
  }
}

html[dir="rtl"] {
  .form-group .form-contain {
    .icon {
      right: 15px;
    }

    .password {
      left: 15px;
    }
  }
}

html[dir="ltr"] {
  .form-group .form-contain .icon {
    left: 15px;
  }

  .password {
    right: 15px;
  }
}
</style>

<template>
  <div class="mobile-btn">
    <button
      v-bind="$attrs"
      :type="`${type}`"
      v-on="$listeners"
      :class="`${btnClass} btn-contain full-width rounded-lg relative overflow-hidden outline outline-1 z-10 flex items-center content-center justify-center`"
    >
      <img
        v-if="icon"
        :src="`/img/icons/${icon}.svg`"
        :class="`${imgClass} w-6 h-6 object-contain ltr:mr-2 rtl:ml-2`"
        :alt="$t(`app.title`)"
      />

      <span class="text-sm font-bold text-light">{{ name }}</span>
    </button>
  </div>
</template>

<script>
export default {
  props: ["name", "icon", "link", "imgClass", "btnClass", "type"],
};
</script>

<style lang="scss">
.btn-contain {
  width: 215px;
  height: 50px;

  &::after,
  &::before {
    content: "";
    position: absolute;
    height: 100%;
    top: 0;
    transition: all 0.3s linear;
    z-index: -1;
  }

  &::after {
    left: 0;
  }

  &::before {
    right: 0;
  }

  &.yellow {
    outline-color: transparent;

    img {
      filter: var(--light-filter);
    }

    &::after,
    &::before {
      width: 50%;
      background-color: var(--primary);
    }

    &:hover {
      outline-color: var(--primary) !important;

      &::after,
      &::before {
        width: 0;
      }

      span {
        color: var(--primary);
      }

      img {
        filter: var(--yellow-filter);
      }
    }
  }

  &.dark {
    outline-color: transparent;

    &::after,
    &::before {
      width: 50%;
      background-color: var(--dark);
    }

    span {
      color: var(--light) !important;
    }

    &:hover {
      background-color: var(--primary);

      &::after,
      &::before {
        width: 0;
      }
    }
  }

  &.green {
    outline-color: transparent;

    &::after,
    &::before {
      width: 50%;
      background-color: #29A71A;
    }

    span {
      color: var(--light) !important;
    }

    &:hover {
      background-color: var(--primary);

      &::after,
      &::before {
        width: 0;
      }
    }
  }

  &.orange {
    outline-color: transparent;

    &::after,
    &::before {
      width: 50%;
      background-color: #FBA706;
    }

    span {
      color: var(--light) !important;
    }

    &:hover {
      background-color: var(--primary);

      &::after,
      &::before {
        width: 0;
      }
    }
  }

  &.danger {
    outline-color: transparent;

    &::after,
    &::before {
      width: 50%;
      background-color: #D6262D;
    }

    span {
      color: var(--light) !important;
    }

    &:hover {
      background-color: var(--primary);

      &::after,
      &::before {
        width: 0;
      }
    }
  }

  &.small-btn {
    width: 150px;
  }

  &.black {
    outline-color: var(--dark);

    span {
      color: var(--dark) !important;
    }

    &::after,
    &::before {
      width: 0px;
      background-color: #000;
    }

    &:hover {
      outline-color: transparent;

      span {
        color: #fff !important;
      }

      &::after,
      &::before {
        width: 50% !important;
      }
    }
  }

  &.date-btn {
    padding: 10px 15px 10px 30px;
    outline-color: transparent;
    width: unset !important;
    
    &::after {
      width: 18px !important;
      height: 18px !important;
      background: transparent url('/img/top-nav/arrow-down.svg') center / contain no-repeat !important;
      top: calc(50% - 9px) !important;
      left: 10px !important;
    }

    &::before {
      width: 100%;
      height: 100%;
      background-color: var(--light);
    }

    span {
      color: var(--dark) !important;
    }

    &:hover {
      background-color: var(--primary);

      &::before {
        width: 0px;
      }

      span {
        color: var(--light) !important;
      }

      img {
        filter: var(--light-filter);
      }

      &::after {
        filter: var(--light-filter);
      }
    }
  }

  &.half-btn {
    width: 100%;
  }

  &:hover img {
    animation: translateY 1s linear alternate infinite;
  }
}

@media (max-width: 999px) {
  .btn-contain {
    width: 140px !important;

    &.date-btn {
      outline-color: #ddd;
      min-width: unset !important;
      padding: 10px 8px;
      
      &::after {
        display: none !important;
      }

      img {
        width: 15px;
        height: 15px;
      }

      span {
        font-size: 10px !important;
      }
    }
  }
}
</style>
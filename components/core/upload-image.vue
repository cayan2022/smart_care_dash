<template>
  <label
    :for="`${name}`"
    class="upload-image w-fit mx-auto flex cursor-pointer flex-col justify-center items-center"
  >
    <input
      type="file"
      :id="`${name}`"
      class="hidden img-upload cursor-pointer w-full h-full absolute top-0 left-0"
      @change="selectedFile"
    />

    <div
      class="image-cotnent w-28 h-28 rounded-full bg-semiLight flex items-center content-center justify-center"
      :class="{ error: 'border border-solid border-red-700' }"
    >
      <img
        :src="img.url != '' ? img.url : '/img/form/avatar.svg'"
        :class="[
          img.url != ''
            ? 'w-full h-full object-cover rounded-full'
            : 'w-12 h-12 object-contain ',
        ]"
        :alt="$t(`app.title`)"
      />
    </div>

    <div class="flex items-center content-center justify-center mt-2">
      <img
        :src="`/img/form/${icon}.svg`"
        class="w-6 h-6 object-contain ltr:mr-3 rtl:ml-3"
        :alt="$t(`app.title`)"
      />

      <span class="text-primary text-base font-normal">{{ title }}</span>
    </div>

    <span
      v-if="serverErrors && serverErrors[$attrs.errorName]"
      class="block text-red-700 text-[10px] mt-1 text-end"
    >
      {{ serverErrors[$attrs.errorName] && serverErrors[$attrs.errorName][0] }}
    </span>
  </label>
</template>

<script>
export default {
  name: "UplodaImage",
  props: ["name", "icon", "title", "error", "imgUrl"],
  data() {
    return {
      img: {
        name: "",
        data: "",
        url: this.imgUrl ? this.imgUrl : "",
      },
    };
  },
  methods: {
    selectedFile(e) {
      const file = e.target.files[0];
      if (file) {
        URL.revokeObjectURL(file);
        this.img.name = file.name;
        this.img.data = file;
        this.img.url = URL.createObjectURL(file);
        URL.revokeObjectURL(file);
      }
      this.$emit("input", this.img.data);
    },
  },
  watch: {
    imgUrl: {
      handler(value) {
        if (value) {
          if (typeof value == "string") {
            this.img.url = value;
          }
        }
      },
      immediate: true,
    },
  },
};
</script>

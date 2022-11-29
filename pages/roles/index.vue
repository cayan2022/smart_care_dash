<template>
  <div>
    <roles-contain :roles="roles" />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "show_roles",
  },
  async asyncData({ $axios, store }) {
    const res = await $axios.get(`dashboard/roles`, {
      params: { ...store.getters["query/getQuery"] },
    });
    const { data, meta } = res.data;

    return {
      roles: data.map((role) => ({ ...role, dropList: false })),
      meta,
    };
  },
  components: {
    rolesContain: () => import(`@/components/roles/roles-contain`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

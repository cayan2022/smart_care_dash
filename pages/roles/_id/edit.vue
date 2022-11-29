<template>
  <div>
    <edit-role :roles="roles" />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "update_roles",
  },
  async asyncData({ $axios }) {
    const res = await $axios.get(`dashboard/permissions/types`);
    const { data } = res.data;
    const roles = Object.keys(data).map((key) => {
      return {
        name: key,
        permissions: data[key],
      };
    });
    return {
      roles,
    };
  },
  components: {
    editRole: () => import(`@/components/roles/edit-role`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

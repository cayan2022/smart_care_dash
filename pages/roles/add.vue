<template>
  <div>
    <add-role :roles="roles" />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "create_roles",
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
    addRole: () => import(`@/components/roles/add-role`),
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

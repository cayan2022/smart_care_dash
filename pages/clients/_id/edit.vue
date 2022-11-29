<template>
  <div>
    <edit-client v-if="ready" :client="client" />
  </div>
</template>

<script>
export default {
  name: "EditClientPage",
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "update_profiles",
  },
  components: {
    editClient: () => import(`@/components/clients/edit-client`),
  },

  data() {
    return {
      ready: false,
    };
  },
  async asyncData({ $axios, params }) {
    const res = await $axios.get(`dashboard/profile/show/${params.id}`);
    const { data } = res.data;
    console.log(data);

    return {
      client: data,
      ready: true,
    };
  },

  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

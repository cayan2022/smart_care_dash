<template>
  <div>
    <project-contain :projects="projects" :meta="meta" />
  </div>
</template>

<script>
export default {
  layout: "home",
  scrollToTop: true,
  meta: {
    permissions: "show_projects",
  },
  components: {
    projectContain: () => import(`@/components/projects/project-contain`),
  },
  scrollToTop: true,

  async asyncData({ $axios, store }) {
    const res = await $axios.get(`dashboard/pages/projects`, {
      params: { ...store.getters["query/getQuery"] },
    });
    const { data, meta } = res.data;
    return {
      projects: data.map((item) => ({ ...item, dropList: false })),
      meta,
    };
  },
  head() {
    return { title: this.$t(`home.title`) };
  },
};
</script>

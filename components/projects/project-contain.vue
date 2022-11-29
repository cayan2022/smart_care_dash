<template>
  <div>
    <section class="projects">
      <div class="container">
        <div
          class="w-full flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading title="المشاريع" desc="جميع المشاريع الخاصة بالنظام" />

          <div class="flex items-center content-center bottom-action">
            <div
              class="flex items-center content-center ltr:mr-5 rtl:ml-5 gird-mobile-hidden"
            >
              <p
                class="text-gray text-base font-medium ltr:mr-2 rtl:ml-2 lg:block md:block sm:hidden hidden"
              >
                طريقة العرض :
              </p>

              <div
                class="grid-view w-28 flex items-center content-center lg:bg-light md:bg-light sm:bg-semiLight bg-semiLight justify-around rounded-lg"
              >
                <button
                  class="gird-btn flex relative z-10 items-center content-center justify-center rounded-lg overflow-hidden"
                  @click="listView = false"
                  :class="[listView === false ? 'active' : '']"
                >
                  <img
                    src="/img/icons/grid-view.svg"
                    class="w-6 h-6 object-contain"
                    :alt="$t(`app.title`)"
                  />
                </button>

                <button
                  class="gird-btn flex relative z-10 items-center content-center justify-center rounded-lg overflow-hidden"
                  @click="listView = !listView"
                  :class="[listView === true ? 'active' : '']"
                >
                  <img
                    src="/img/icons/list-view.svg"
                    class="w-6 h-6 object-contain"
                    :alt="$t(`app.title`)"
                  />
                </button>
              </div>
            </div>

            <page-button
              v-if="hasPermissions('create_projects')"
              name="مشروع جديد"
              @click.prevent="$router.push(localePath(`/projects/add`))"
              btnClass="yellow"
              icon="add-square"
            />
          </div>
        </div>

        <div
          class="grid gap-5"
          :class="[
            listView === false
              ? 'lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'
              : 'lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1',
          ]"
        >
          <div
            v-for="(project, i) in projects"
            :key="i"
            class="project-box w-full bg-light rounded-lg relative flex"
            :class="[
              listView === false
                ? 'flex-col items-center content-center'
                : ' flex-row justify-between items-start content-start',
            ]"
          >
            <div
              class="image-content overflow-hidden"
              :class="[
                listView === false
                  ? 'w-full h-56 rounded-t-lg'
                  : 'w-52 h-full rounded-r-lg',
              ]"
            >
              <img
                :src="project.image"
                class="w-full h-full object-cover"
                loading="lazy"
                :alt="$t(`app.title`)"
              />

              <span
                class="py-2 px-4 absolute top-6 ltr:left-4 rtl:right-4 rounded-full bg-dark bg-opacity-60 text-light text-sm font-medium"
              >
                {{ project.classification | maxWord(3) }}
              </span>
            </div>

            <div
              class="contain w-full"
              :class="[listView === false ? 'p-6' : 'col-contain p-5']"
            >
              <h2 class="text-xl font-bold text-dark mt-3 mb-3">
                {{ project.name }}
              </h2>

              <p class="text-gray text-base font-normal">
                {{ project.short_description | maxWord(20) }}
              </p>
            </div>

            <div
              @click="project.dropList = !project.dropList"
              :class="project.dropList === true ? 'activeList' : ''"
              class="box-drop-list w-fit absolute top-5 ltr:right-4 cursor-pointer rtl:left-4"
            >
              <div
                class="w-10 h-10 rounded-full flex items-center content-center justify-center"
                :class="[
                  listView === false ? 'bg-dark bg-opacity-20 light-icon' : '',
                ]"
              >
                <img
                  src="/img/icons/dots.svg"
                  class="dots w-3 h-5 object-contain object-center"
                  loading="lazy"
                  :alt="$t(`app.title`)"
                />
              </div>

              <ul
                class="drop-down-list rounded-lg overflow-hidden px-6 py-3 bg-light"
              >
                <li
                  class="w-full py-3"
                  v-if="hasPermissions('update_projects')"
                >
                  <nuxt-link
                    :to="`/projects/${project.id}/edit`"
                    class="data-contain flex items-center content-center"
                  >
                    <img
                      src="/img/icons/edit.svg"
                      class="w-5 h-5 object-contain ltr:mr-2 rtl:ml-2"
                      loading="lazy"
                      :alt="$t(`app.title`)"
                    />

                    <span class="text-dark text-sm font-medium">تعديل</span>
                  </nuxt-link>
                </li>
                <li
                  class="w-full py-3"
                  v-if="
                    hasPermissions(
                      `${project.is_block ? 'active' : 'block'}_projects`
                    )
                  "
                >
                  <button
                    class="data-contain flex items-center content-center"
                    @click="OpenModalPlusId('modalBlock', project)"
                  >
                    <img
                      :src="[
                        !project.is_block
                          ? '/img/icons/slash.svg'
                          : '/img/icons/shield_tick.svg',
                      ]"
                      class="w-5 h-5 object-contain ltr:mr-2 rtl:ml-2"
                      loading="lazy"
                      :alt="$t(`app.title`)"
                    />

                    <span class="text-dark text-sm font-medium">
                      {{ `${!project.is_block ? "تعطيل" : "تفعيل"}` }}
                    </span>
                  </button>
                </li>
                <li
                  class="w-full py-3"
                  v-if="hasPermissions('delete_projects')"
                >
                  <button
                    class="data-contain flex items-center content-center"
                    @click="OpenModalPlusId('modalDelete', project)"
                  >
                    <img
                      src="/img/icons/delete.svg"
                      class="w-5 h-5 object-contain ltr:mr-2 rtl:ml-2"
                      loading="lazy"
                      :alt="$t(`app.title`)"
                    />

                    <span class="text-dark text-sm font-medium"> حذف </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- delete project -->
    <div
      class="modal w-full h-full fixed top-0 left-0 z-50 flex items-center content-center justify-center"
      :class="[modalDelete === true ? 'active-modal' : '']"
    >
      <div
        class="overlay w-full h-full bg-dark bg-opacity-40 absolute top-0 left-0"
        @click="modalDelete = !modalDelete"
      ></div>

      <div
        class="box big-size py-12 px-5 bg-light rounded-lg flex flex-col items-center content-center justify-center relative z-20"
      >
        <img
          src="/img/form/delete.svg"
          class="w-16 h-16 object-contain"
          loading="lazy"
          :alt="$t(`app.title`)"
        />

        <p class="text-dark font-bold text-center text-base my-5">
          هل أنت متأكد من حذف المشروع ؟
        </p>

        <div class="flex items-center content-center justify-center">
          <page-button
            name="موافق"
            imgClass="hidden"
            class="ltr:ml-2 rtl:ml-3"
            btnClass="yellow small-btn"
            @click.prevent="handleDelete"
          />

          <page-button
            name="الغاء"
            @click="modalDelete = !modalDelete"
            imgClass="hidden"
            btnClass="black small-btn"
          />
        </div>
      </div>
    </div>

    <!-- Block project -->
    <div
      class="modal w-full h-full fixed top-0 left-0 z-50 flex items-center content-center justify-center"
      :class="[modalBlock === true ? 'active-modal' : '']"
    >
      <div
        class="overlay w-full h-full bg-dark bg-opacity-40 absolute top-0 left-0"
        @click="modalBlock = !modalBlock"
      ></div>

      <div
        class="box big-size py-12 px-5 bg-light rounded-lg flex flex-col items-center content-center justify-center relative z-20"
      >
        <img
          :src="[
            !project.is_block ? '/img/form/block.svg' : '/img/form/done.svg',
          ]"
          class="w-16 h-16 object-contain"
          loading="lazy"
          :alt="$t(`app.title`)"
        />

        <p class="text-dark font-bold text-center text-base my-5">
          هل أنت متأكد من
          <span>{{ !project.is_block ? "تعطيل" : "تفعيل" }}</span> المشروع ؟
        </p>

        <div class="flex items-center content-center justify-center">
          <page-button
            name="موافق"
            imgClass="hidden"
            class="ltr:ml-2 rtl:ml-3"
            btnClass="yellow small-btn"
            @click.prevent="handleStatus"
          />

          <page-button
            name="الغاء"
            @click.prevent="modalBlock = !modalBlock"
            imgClass="hidden"
            btnClass="black small-btn"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Projects",
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
    meta: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      listView: false,
      modalDelete: false,
      modalBlock: false,
      project: {
        id: "",
        is_block: false,
      },
    };
  },
  methods: {
    handleStatus() {
      const statues = this.project.is_block ? "active" : "block";
      this.$axios
        .$post(`dashboard/pages/projects/${this.project.id}/${statues}`, {
          _method: "put",
        })
        .then(() => {
          this.modalBlock = false;
          this.$nuxt.refresh();
        });
    },
    handleDelete() {
      this.$axios
        .$post(`dashboard/pages/projects/${this.project.id}`, {
          _method: "delete",
        })
        .then(() => {
          this.modalDelete = false;
          this.$nuxt.refresh();
        });
    },
    OpenModalPlusId(state, project) {
      this.project = project;

      this[state] = !this[state];
    },
  },
};
</script>

<style lang="scss" scoped>
.projects {
  .project-box {
    .col-contain {
      width: calc(100% - 220px);
    }
    &:hover {
      h2 {
        color: var(--primary);
      }
    }
    .light-icon img {
      filter: var(--light-filter);
    }
  }
}
@media (max-width: 999px) {
  .projects {
    .gird-mobile-hidden {
      display: none;
    }
    .mobile-btn {
      width: 100% !important;
    }
  }
}
</style>

<template>
  <div>
    <section class="services">
      <div class="container">
        <div
          class="w-full flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading title="الفروع" desc="جميع الفروع الخاصة بالشركة" />

          <div class="flex items-center content-center bottom-action">
            <div class="flex items-center content-center ltr:mr-5 rtl:ml-5">
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
              v-if="hasPermissions('create_branches')"
              name="فرع جديد"
              @click="$router.push(`/branches/add`)"
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
            v-for="(branch, i) in branches"
            :key="i"
            class="service-box w-full py-6 bg-light rounded-lg relative flex"
            :class="[
              listView === false
                ? 'px-5 justify-center flex-col items-center content-center'
                : ' flex-row justify-between lg:px-8 md:px-5 sm:px-5 px-5 items-start content-start',
            ]"
          >
            <div
              class="image-content bg-gray bg-opacity-5 overflow-hidden w-20 h-20 flex justify-center items-center content-center rounded-full"
            >
              <img
                src="/img/bulk-location.svg"
                class="w-1/2 h-1/2 object-contain yellow-filter-icon"
                loading="lazy"
                :alt="$t(`app.title`)"
              />
            </div>

            <div
              class="contain w-full"
              :class="[listView === false ? 'mt-2 text-center' : 'col-contain']"
            >
              <h2 class="text-lg font-bold text-dark mb-4">
                {{ branch.name }}
              </h2>

              <p class="text-gray text-base font-normal">
                {{ branch.short_description }}
              </p>
            </div>

            <div
              @click="branch.dropList = !branch.dropList"
              :class="branch.dropList === true ? 'activeList' : ''"
              class="box-drop-list w-fit absolute top-5 ltr:right-4 cursor-pointer rtl:left-4"
            >
              <img
                src="/img/icons/dots.svg"
                class="dots w-3 h-5 object-contain object-center"
                loading="lazy"
                :alt="$t(`app.title`)"
              />

              <ul
                class="drop-down-list rounded-lg overflow-hidden px-6 py-3 bg-light"
              >
                <li
                  class="w-full py-3"
                  v-if="hasPermissions('update_branches')"
                >
                  <nuxt-link
                    :to="`/branches/${branch.id}/edit`"
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
                      `${branch.is_block ? 'active' : 'block'}_branches`
                    )
                  "
                >
                  <button
                    class="data-contain flex items-center content-center"
                    @click="OpenModalPlusId('modalBlock', branch)"
                  >
                    <img
                      :src="[
                        !branch.is_block
                          ? '/img/icons/slash.svg'
                          : '/img/icons/shield_tick.svg',
                      ]"
                      class="w-5 h-5 object-contain ltr:mr-2 rtl:ml-2"
                      loading="lazy"
                      :alt="$t(`app.title`)"
                    />

                    <span class="text-dark text-sm font-medium">
                      {{ `${!branch.is_block ? "تعطيل" : "تفعيل"}` }}
                    </span>
                  </button>
                </li>
                <li
                  class="w-full py-3"
                  v-if="hasPermissions(`delete_branches`)"
                >
                  <button
                    class="data-contain flex items-center content-center"
                    @click="OpenModalPlusId('modalDelete', branch)"
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
    <LazyCustomPagination :pagination="meta" />

    <!-- delete service -->
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
          هل أنت متأكد من حذف الفرع ؟
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

    <!-- Block service -->
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
            !branch.is_block ? '/img/form/block.svg' : '/img/form/done.svg',
          ]"
          class="w-16 h-16 object-contain"
          loading="lazy"
          :alt="$t(`app.title`)"
        />

        <p class="text-dark font-bold text-center text-base my-5">
          هل أنت متأكد من
          <span>{{ !branch.is_block ? "تعطيل" : "تفعيل" }}</span> الفرع ؟
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
            @click="modalBlock = !modalBlock"
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
  name: "BranchesContain",
  props: {
    branches: {
      type: Array,
      default: () => [],
    },
    meta: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      listView: false,
      modalDelete: false,
      modalBlock: false,
      branch: {
        id: "",
        is_block: false,
      },
    };
  },
  methods: {
    handleStatus() {
      const statues = this.branch.is_block ? "active" : "block";
      this.$axios
        .$post(`dashboard/pages/branches/${this.branch.id}/${statues}`, {
          _method: "put",
        })
        .then(() => {
          this.modalBlock = false;
          this.$nuxt.refresh();
        });
    },
    handleDelete() {
      this.$axios
        .$post(`dashboard/pages/branches/${this.branch.id}`, {
          _method: "delete",
        })
        .then(() => {
          this.modalDelete = false;
          this.$nuxt.refresh();
        });
    },
    OpenModalPlusId(state, branch) {
      this.branch = branch;

      this[state] = !this[state];
    },
  },
};
</script>

<style lang="scss">
.services {
  .service-box {
    transition: all 0.3s linear;
    .image-content {
      transition: all 0.3s linear;
    }
    .col-contain {
      width: calc(100% - 100px);
    }
    &:hover {
      .image-content {
        transform: translateY(-10px);
      }
      h2 {
        color: var(--primary);
      }
    }
  }
}
</style>

<template>
  <div>
    <section class="roles">
      <div class="container">
        <div
          class="w-full flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading
            title="الادوار والصلاحيات"
            desc="يمكنك هنا التحكم في الأدوار والصلاحيات الخاصة بالموظف"
          />

          <div class="flex items-center content-center bottom-action">
            <div class="flex items-center content-center ltr:mr-5 rtl:ml-5">
              <p
                class="text-gray text-base font-medium ltr:mr-2 rtl:ml-2 xl:block lg:hidden md:hidden sm:hidden hidden"
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
              v-if="hasPermissions(`create_roles`)"
              name="صلاحية جديدة"
              @click="$router.push(`/roles/add`)"
              btnClass="yellow"
              icon="add-square"
            />
          </div>
        </div>

        <div
          class="grid gap-5"
          :class="[
            listView === false
              ? 'xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1'
              : 'lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1',
          ]"
        >
          <div
            v-for="(role, i) in roles"
            :key="i"
            class="role-box w-full pt-5 lg:px-8 md:px-5 sm:px-3 px-3 bg-light rounded-lg relative"
          >
            <h1 class="heading w-full pb-3 text-lg text-dark mb-5">
              {{ role.name }}
            </h1>
            <!-- 
            <ul
              class="
                list
                flex
                items-center
                content-center
                justify-start
                flex-wrap
                w-full
              "
            >
              <li
                v-for="(per, i) in role.permissions"
                :key="i"
                class="role-item relative z-10 text-dark text-base"
              >
                {{ per.name }}
              </li>
            </ul> -->

            <div
              @click="role.dropList = !role.dropList"
              :class="role.dropList === true ? 'activeList' : ''"
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
                <li class="w-full py-3" v-if="hasPermissions(`update_roles`)">
                  <nuxt-link
                    :to="`roles/${role.id}/edit`"
                    class="data-contain flex items-center content-center"
                  >
                    <img
                      src="/img/icons/edit.svg"
                      class="w-5 h-5 object-contain ltr:mr-2 rtl:ml-2"
                      loading="lazy"
                      :alt="$t(`app.title`)"
                    />

                    <span class="text-dark text-sm font-medium"> تعديل </span>
                  </nuxt-link>
                </li>

                <!-- <li class="w-full py-3">
                  <button
                    class="data-contain flex items-center content-center"
                    @click="OpenModalPlusId('modalDelete', i)"
                  >
                    <img
                      src="/img/icons/delete.svg"
                      class="w-5 h-5 object-contain ltr:mr-2 rtl:ml-2"
                      loading="lazy"
                      :alt="$t(`app.title`)"
                    />

                    <span class="text-dark text-sm font-medium"> حذف </span>
                  </button>
                </li> -->
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

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
          هل أنت متأكد من اخراج موظف ؟
        </p>

        <div class="flex items-center content-center justify-center">
          <page-button
            name="موافق"
            imgClass="hidden"
            class="ltr:ml-2 rtl:ml-3"
            btnClass="yellow small-btn"
            @click="action('logout', 'modalDelete')"
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
  </div>
</template>

<script>
export default {
  name: "RolesContain",
  props: {
    roles: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      listView: false,
      modalDelete: false,
    };
  },
  methods: {
    OpenModalPlusId(state, id) {
      this.payload = id;
      this[state] = !this[state];
    },
  },
};
</script>

<style lang="scss">
.roles {
  .role-box {
    .role-item {
      padding-inline-start: 31px;
      margin-inline-end: 31px;
      margin-bottom: 20px;

      &:last-child {
        margin-inline-end: 0px;
      }

      &::after {
        content: "";
        position: absolute;
        width: 24px;
        height: 24px;
        background: url("/img/form/check_circle.svg") center / contain no-repeat;
        top: calc(50% - 12px);
        right: 0px;
        z-index: -1;
        filter: var(--yellow-filter);
      }
    }
  }
}
</style>

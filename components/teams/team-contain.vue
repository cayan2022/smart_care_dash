<template>
  <div>
    <section class="teams">
      <div class="container">
        <div
          class="w-full flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading
            title="فريق العمل"
            desc="جميع فريق العمل بتخصصاتهم في النظام"
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
              v-if="hasPermissions('create_doctors')"
              name="فرد جديد"
              @click="$router.push(`/teams/add`)"
              btnClass="yellow"
              icon="add-square"
            />
          </div>
        </div>

        <div
          class="grid gap-5"
          :class="[
            listView === false
              ? 'xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'
              : 'lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1',
          ]"
        >
          <div
            v-for="(team, i) in teams"
            :key="i"
            class="team-box w-full py-6 bg-light rounded-lg relative flex"
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
                :src="team.image"
                class="w-full h-full object-cover"
                loading="lazy"
                :alt="$t(`app.title`)"
              />
            </div>

            <div
              class="contain w-full"
              :class="[listView === false ? 'mt-2 text-center' : 'col-contain']"
            >
              <h2 class="text-lg font-bold text-dark mb-4">
                {{ team.name }}
              </h2>

              <p
                class="text-primary w-fit rounded-lg py-2 px-5 bg-primary bg-opacity-10 text-sm font-normal"
                :class="[listView === false ? ' mx-auto' : '']"
              >
                {{ team.specialization }}
              </p>
            </div>

            <div
              @click="team.dropList = !team.dropList"
              :class="team.dropList === true ? 'activeList' : ''"
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
                <li class="w-full py-3" v-if="hasPermissions('update_doctors')">
                  <nuxt-link
                    :to="`/teams/${team.id}/edit`"
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
                      `${team.is_block ? 'active' : 'block'}_doctors`
                    )
                  "
                >
                  <!-- <button
                    class="data-contain flex items-center content-center"
                    @click="modalBlock = !modalBlock"
                  >-->
                  <button
                    class="data-contain flex items-center content-center"
                    @click="OpenModalPlusId('modalBlock', team)"
                  >
                    <img
                      :src="[
                        !team.is_block
                          ? '/img/icons/slash.svg'
                          : '/img/icons/shield_tick.svg',
                      ]"
                      class="w-5 h-5 object-contain ltr:mr-2 rtl:ml-2"
                      loading="lazy"
                      :alt="$t(`app.title`)"
                    />

                    <span class="text-dark text-sm font-medium">
                      {{ `${team.is_block ? "تفعيل" : "تعطيل"}` }}
                    </span>
                  </button>
                </li>

                <li class="w-full py-3" v-if="hasPermissions('delete_doctors')">
                  <!-- <button
                    class="data-contain flex items-center content-center"
                    @click="modalDelete = !modalDelete"
                  >-->
                  <button
                    class="data-contain flex items-center content-center"
                    @click="OpenModalPlusId('modalDelete', team)"
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

    <!-- delete team -->
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
          هل أنت متأكد من حذف الفرد ؟
        </p>

        <div class="flex items-center content-center justify-center">
          <page-button
            name="موافق"
            imgClass="hidden"
            class="ltr:ml-2 rtl:ml-3"
            btnClass="yellow small-btn"
            @click="handleDeleteTeam"
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

    <!-- Block team -->
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
          :src="[!team.is_block ? '/img/form/block.svg' : '/img/form/done.svg']"
          class="w-16 h-16 object-contain"
          loading="lazy"
          :alt="$t(`app.title`)"
        />

        <p class="text-dark font-bold text-center text-base my-5">
          <template v-if="!team.is_block">
            هل أنت متأكد من تعطيل الفرد ؟
          </template>
          <template v-else> هل أنت متأكد من تفعيل الفرد ؟ </template>
        </p>

        <div class="flex items-center content-center justify-center">
          <page-button
            name="موافق"
            imgClass="hidden"
            class="ltr:ml-2 rtl:ml-3"
            btnClass="yellow small-btn"
            @click.prevent="handleTeamStatus"
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
  name: "TeamsContain",
  props: {
    teams: {
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
      team: {
        id: "",
        is_block: false,
      },
      listView: false,
      modalDelete: false,
      modalBlock: false,
    };
  },
  methods: {
    handleDeleteTeam() {
      this.$axios
        .$post(`dashboard/pages/doctors/${this.team.id}`, {
          _method: "delete",
        })
        .then(() => {
          this.modalDelete = false;
          this.$nuxt.refresh();
        });
    },
    handleTeamStatus() {
      const teamStatus = this.team.is_block ? "active" : "block";
      this.$axios
        .$post(`dashboard/pages/doctors/${this.team.id}/${teamStatus}`, {
          _method: "put",
        })
        .then(() => {
          this.modalBlock = false;
          this.$nuxt.refresh();
        });
    },
    OpenModalPlusId(state, team) {
      this.team = team;
      this[state] = !this[state];
    },
  },
};
</script>

<style lang="scss">
.teams {
  .team-box {
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

<template>
  <div>
    <section class="clients">
      <div class="container">
        <div
          class="w-full flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading
            title="ادارة الموظفين"
            desc="يمكنك هنا ادارة الموظفين من إضافة وحظر وتعديل"
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
                  @click.prevent="listView = false"
                  :class="[listView === false ? 'active' : '']"
                >
                  <img
                    src="/img/icons/grid-view.svg"
                    class="w-6 h-6 object-contain"
                    loading="lazy"
                    :alt="$t(`app.title`)"
                  />
                </button>

                <button
                  class="gird-btn flex relative z-10 items-center content-center justify-center rounded-lg overflow-hidden"
                  @click.prevent="listView = !listView"
                  :class="[listView === true ? 'active' : '']"
                >
                  <img
                    src="/img/icons/list-view.svg"
                    class="w-6 h-6 object-contain"
                    loading="lazy"
                    :alt="$t(`app.title`)"
                  />
                </button>
              </div>
            </div>

            <page-button
              v-if="hasPermissions(`create_profiles`)"
              name="موظف جديد"
              @click.prevent="$router.push(localePath(`/clients/add`))"
              btnClass="yellow"
              icon="add-square"
            />
          </div>
        </div>

        <div
          class="grid gap-6"
          :class="[
            listView === false
              ? 'xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'
              : 'lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1',
          ]"
        >
          <!-- Client Card -->
          <div
            class="box w-full py-6 bg-light rounded-lg relative flex items-center content-center"
            :class="[
              listView === false
                ? 'flex-col justify-center px-6 text-center'
                : 'flex-row lg:px-9 md:px-4 sm:px-4 px-4',
            ]"
            v-for="(client, i) in clients"
            :key="i"
          >
            <img
              :src="client.image"
              class="w-20 h-20 object-cover object-top rounded-full"
              loading="lazy"
              :alt="$t(`app.title`)"
              :onerror="`this.src='${require('~/static/img/user.png')}'`"
            />

            <div
              class="w-full flex flex-col"
              :class="[
                listView === false
                  ? 'mt-3 justify-center items-center content-center'
                  : 'items-start ltr:ml-3 rtl:mr-3',
              ]"
            >
              <h2 class="text-base font-bold text-dark">
                {{ client.name | maxWord(5) }}
              </h2>

              <button
                @click.prevent="mailto(`${client.email}`)"
                class="text-gray font-medium text-base my-2"
              >
                {{ client.email }}
              </button>

              <button
                @click.prevent="callus(`${client.phone}`)"
                class="call-btn flex relative z-10 overflow-hidden items-center content-center border-opacity-10 justify-center rounded-lg border border-solid"
              >
                <img
                  src="/img/icons/call.svg"
                  class="w-4 h-4 object-contain ltr:mr-2 rtl:ml-2"
                  loading="lazy"
                  :alt="$t(`app.title`)"
                />

                <span class="text-primary text-base font-normal">
                  {{ client.phone | truncate(10) }}
                </span>
              </button>
            </div>

            <span
              v-if="client.is_block"
              class="py-1 px-4 rounded-full bg-[#FF0045] text-light absolute top-4 right-3 text-sm font-medium"
            >
              محظور
            </span>

            <div
              @click.prevent="client.dropList = !client.dropList"
              :class="client.dropList === true ? 'activeList' : ''"
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
                  v-if="hasPermissions(`update_profiles`)"
                >
                  <nuxt-link
                    :to="localePath(`/clients/${client.id}/edit`)"
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

                <li class="w-full py-3">
                  <nuxt-link
                    :to="{
                      path: '/clients/password',
                      query: { id: client.id },
                    }"
                    class="data-contain flex items-center content-center"
                  >
                    <img
                      src="/img/icons/lock.svg"
                      class="w-5 h-5 object-contain ltr:mr-2 rtl:ml-2"
                      loading="lazy"
                      :alt="$t(`app.title`)"
                    />

                    <span class="text-dark text-sm font-medium"
                      >تغيير كلمة المرور</span
                    >
                  </nuxt-link>
                </li>

                <li class="w-full py-3">
                  <!-- <button
                    class="data-contain flex items-center content-center"
                    @click="modalDelete = !modalDelete"
                  >-->
                  <button
                    class="data-contain flex items-center content-center"
                    @click.prevent="handleLogout(client.id)"
                  >
                    <img
                      src="/img/icons/logout.svg"
                      class="w-5 h-5 object-contain ltr:mr-2 rtl:ml-2"
                      loading="lazy"
                      :alt="$t(`app.title`)"
                    />

                    <span class="text-dark text-sm font-medium"> اخراج </span>
                  </button>
                </li>

                <li class="w-full py-3">
                  <!-- <button
                    class="data-contain flex items-center content-center"
                    @click="modalBlock = !modalBlock"
                  >-->
                  <button
                    class="data-contain flex items-center content-center"
                    @click.prevent="OpenModalPlusId('modalBlock', client)"
                  >
                    <img
                      :src="`/img/icons/${
                        client.is_block ? 'shield_tick' : 'slash'
                      }.svg`"
                      class="w-5 h-5 object-contain ltr:mr-2 rtl:ml-2"
                      loading="lazy"
                      :alt="$t(`app.title`)"
                    />

                    <span class="text-dark text-sm font-medium">
                      {{ `${client.is_block ? "فك الحظر" : "حظر"}` }}
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- paginations -->
        <LazyCustomPagination :pagination="meta" />
      </div>
    </section>

    <!-- Log User Out -->
    <div
      class="modal w-full h-full fixed top-0 left-0 z-50 flex items-center content-center justify-center"
      :class="[modalDelete === true ? 'active-modal' : '']"
    >
      <div
        class="overlay w-full h-full bg-dark bg-opacity-40 absolute top-0 left-0"
        @click.prevent="modalDelete = !modalDelete"
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
            @click.prevent="action('logout', 'modalDelete')"
          />

          <page-button
            name="الغاء"
            @click.prevent="modalDelete = !modalDelete"
            imgClass="hidden"
            btnClass="black small-btn"
          />
        </div>
      </div>
    </div>

    <!-- Block user -->
    <div
      class="modal w-full h-full fixed top-0 left-0 z-50 flex items-center content-center justify-center"
      :class="[modalBlock === true ? 'active-modal' : '']"
    >
      <div
        class="overlay w-full h-full bg-dark bg-opacity-40 absolute top-0 left-0"
        @click.prevent="modalBlock = !modalBlock"
      ></div>

      <div
        class="box big-size py-12 px-5 bg-light rounded-lg flex flex-col items-center content-center justify-center relative z-20"
      >
        <img
          :src="`/img/form/${client.is_block ? 'done' : 'block'}.svg`"
          class="w-16 h-16 object-contain"
          loading="lazy"
          :alt="$t(`app.title`)"
        />

        <p class="text-dark font-bold text-center text-base my-5">
          <template v-if="!client.is_block"> هل أنت متأكد من حظر ؟ </template>
          <template v-else> هل أنت متأكد من فك الحظر ؟ </template>
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
  name: "ClientsContain",
  props: {
    clients: {
      type: Array,
      default: () => [],
    },
    meta: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    // pagination: () => import(`@/components/core/pagination`),
  },
  data() {
    return {
      listView: false,
      clientId: "",
      modalDelete: false,
      modalBlock: false,
      current: 1,
      payload: "",
      client: {
        is_block: false,
        id: "",
      },
    };
  },

  // async fetch() {
  //   await this.$store.dispatch("clients/getClients", this.current);
  // },
  methods: {
    async handleLogout(id) {
      await this.$axios.post(`dashboard/profile/logout/${id}`);
      this.$nuxt.refresh();
    },
    // async loadPerPage(page) {
    //   this.current = page;
    //   this.$fetch();
    // },
    handleStatus() {
      const offerStatus = this.client.is_block ? "active" : "block";
      this.$axios
        .$post(`dashboard/profile/${offerStatus}/${this.client.id}`)
        .then(() => {
          this.modalBlock = false;
          this.$nuxt.refresh();
        });
    },
    OpenModalPlusId(state, client) {
      this.client = client;
      this[state] = !this[state];
    },

    action(name, state) {
      this.$axios
        .$post(`/dashboard/profile/${name}/${this.payload}`)
        .then((res) => {
          this[state] = !this[state];
          this.payload = "";
        })
        .catch(() => {});
    },
  },
  // computed: {
  //   clients() {
  //     return this.$store.state.clients.clients;
  //   },
  //   meta() {
  //     return this.$store.state.clients.meta;
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.clients {
  .box {
    transition: all 0.3s linear;

    .call-btn {
      border-color: transparent;
      width: 174px;
      height: 33px;

      &::after,
      &::before {
        content: "";
        position: absolute;
        width: 50%;
        height: 100%;
        background-color: var(--primary);
        opacity: 0.12;
        top: 0;
        transition: all 0.3s linear;
        z-index: -1;
      }

      &::after {
        left: 0;
      }

      &::before {
        right: 0;
      }

      &:hover {
        border-color: var(--primary);

        &::after,
        &::before {
          width: 0px;
        }
      }
    }

    &:hover {
      h2 {
        color: var(--primary);
      }
    }
  }
}
</style>

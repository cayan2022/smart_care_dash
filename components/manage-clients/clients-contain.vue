<template>
  <div>
    <section class="clients">
      <div class="container">
        <div
          class="w-full flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading
            title="ادارة العملاء"
            desc="يمكنك هنا ادارة العملاء من إضافة وتعديل"
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
              v-if="hasPermissions('create_customers')"
              name="عميل جديد"
              @click.prevent="$router.push(localePath(`/mange-clients/add`))"
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
                {{ client.name | maxWord(4) }}
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
                  0{{ client.phone | truncate(11) }}
                </span>
              </button>
            </div>

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
                  v-if="hasPermissions('update_customers')"
                >
                  <nuxt-link
                    :to="localePath(`/mange-clients/${client.id}/edit`)"
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
                  v-if="hasPermissions('delete_customers')"
                >
                  <button
                    class="data-contain flex items-center content-center"
                    @click.prevent="OpenModalPlusId('modalDelete', client)"
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

    <!-- Block user -->
    <div
      class="modal w-full h-full fixed top-0 left-0 z-50 flex items-center content-center justify-center"
      :class="[modalDelete ? 'active-modal' : '']"
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
          هل أنت متأكد من حذف العميل ؟
        </p>

        <div class="flex items-center content-center justify-center">
          <page-button
            name="موافق"
            imgClass="hidden"
            class="ltr:ml-2 rtl:ml-3"
            btnClass="yellow small-btn"
            @click.prevent="handleDeleteClient"
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
  data() {
    return {
      listView: false,
      clientId: "",
      modalDelete: false,
      modalBlock: false,
      current: 1,
      payload: "",
      item: {
        id: "",
      },
    };
  },
  methods: {
    handleDeleteClient() {
      this.$axios
        .$post(`dashboard/pages/customers/delete/${this.item.id}`, {
          _method: "delete",
        })
        .then(() => {
          this.modalDelete = false;
          this.$nuxt.refresh();
        });
    },
    OpenModalPlusId(state, item) {
      this.item = item;
      this[state] = !this[state];
    },
  },
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

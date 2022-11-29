<template>
  <div>
    <section class="offers">
      <div class="container">
        <div
          class="w-full flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading title="العروض" desc="جميع العروض الخاصة بالنظام" />

          <div class="flex items-center content-center bottom-action">
            <div
              class="flex items-center content-center ltr:mr-5 rtl:ml-5 gird-mobile-hidden"
            >
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
              v-if="hasPermissions('create_offers')"
              name="عرض جديدة"
              @click="$router.push(`/offers/add`)"
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
              : 'xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1',
          ]"
        >
          <div
            v-for="(offer, i) in offers"
            :key="i"
            class="offer-box w-full bg-light rounded-lg relative flex"
            :class="[
              listView === false
                ? 'justify-start flex-col items-center content-center'
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
                :src="offer.image"
                class="w-full h-full object-cover"
                loading="lazy"
                :alt="$t(`app.title`)"
              />
            </div>

            <div
              class="contain w-full"
              :class="[listView === false ? 'p-6' : 'col-contain p-5']"
            >
              <span
                class="py-1 px-4 rounded-full bg-primary bg-opacity-5 text-primary text-sm font-medium"
              >
                {{ offer.discount_percentage }} %
              </span>

              <h2 class="text-lg font-bold text-dark mt-3 mb-3">
                {{ offer.name }}
              </h2>

              <p class="text-gray text-base font-normal">
                {{ offer.description | maxWord(10) }}
              </p>

              <p class="text-dark text-2xl font-bold">
                {{ offer.price }}

                <span class="text-base font-medium mx-2 mt-3"> ريال </span>
              </p>
            </div>

            <div
              @click="offer.dropList = !offer.dropList"
              :class="offer.dropList === true ? 'activeList' : ''"
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
                <li class="w-full py-3" v-if="hasPermissions('update_offers')">
                  <nuxt-link
                    :to="localePath(`/offers/${offer.id}/edit`)"
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
                      `${offer.is_block ? 'active' : 'block'}_offers`
                    )
                  "
                >
                  <!-- <button
                    class="data-contain flex items-center content-center"
                    @click="modalBlock = !modalBlock"
                  >-->
                  <button
                    class="data-contain flex items-center content-center"
                    @click="OpenModalPlusId('modalBlock', offer)"
                  >
                    <img
                      :src="`/img/icons/${
                        offer.is_block ? 'shield_tick' : 'slash'
                      }.svg`"
                      class="w-5 h-5 object-contain ltr:mr-2 rtl:ml-2"
                      loading="lazy"
                      :alt="$t(`app.title`)"
                    />

                    <span class="text-dark text-sm font-medium">
                      {{ `${offer.is_block ? "تفعيل" : "تعطيل"}` }}
                    </span>
                  </button>
                </li>

                <li class="w-full py-3">
                  <!-- <button
                    class="data-contain flex items-center content-center"
                    @click="modalDelete = !modalDelete"
                  >-->
                  <button
                    class="data-contain flex items-center content-center"
                    @click="OpenModalPlusId('modalDelete', offer)"
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

    <!-- delete offer -->
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
          هل أنت متأكد من حذف العرض ؟
        </p>

        <div class="flex items-center content-center justify-center">
          <page-button
            name="موافق"
            imgClass="hidden"
            class="ltr:ml-2 rtl:ml-3"
            btnClass="yellow small-btn"
            @click.prevent="handleDeleteOffer"
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
    <LazyCustomPagination :pagination="meta" />

    <!-- Block offer -->
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
          :src="`/img/form/${offer.is_block ? 'done' : 'block'}.svg`"
          class="w-16 h-16 object-contain"
          loading="lazy"
          :alt="$t(`app.title`)"
        />

        <p class="text-dark font-bold text-center text-base my-5">
          <template v-if="!offer.is_block">
            هل أنت متأكد من تعطيل العرض ؟
          </template>
          <template v-else> هل أنت متأكد من تفعيل العرض ؟ </template>
        </p>

        <div class="flex items-center content-center justify-center">
          <page-button
            name="موافق"
            imgClass="hidden"
            class="ltr:ml-2 rtl:ml-3"
            btnClass="yellow small-btn"
            @click="handleOfferStatus"
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
  name: "OffersContain",
  props: {
    offers: {
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
      offer: {
        id: "",
      },
    };
  },
  methods: {
    handleOfferStatus() {
      const offerStatus = this.offer.is_block ? "active" : "block";
      this.$axios
        .$post(`dashboard/pages/offers/${this.offer.id}/${offerStatus}`, {
          _method: "put",
        })
        .then(() => {
          this.modalBlock = false;
          this.$nuxt.refresh();
        });
    },
    handleDeleteOffer() {
      this.$axios
        .$post(`dashboard/pages/offers/${this.offer.id}`, {
          _method: "delete",
        })
        .then(() => {
          this.modalDelete = false;
          this.$nuxt.refresh();
        });
    },
    OpenModalPlusId(state, offer) {
      this.offer = offer;
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
};
</script>

<style lang="scss" scoped>
.offers {
  .offer-box {
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
  .offers {
    .gird-mobile-hidden {
      display: none;
    }

    .mobile-btn {
      width: 100% !important;
    }
  }
}
</style>

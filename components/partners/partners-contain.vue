<template>
  <div>
    <section class="partners">
      <div class="container">
        <div
          class="w-full flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading
            title="شركاء النجاح"
            desc="جميع شركاء النجاح الخاصة بالنظام"
          />

          <div class="flex items-center content-center bottom-action">
            <page-button
              v-if="hasPermissions('create_partners')"
              name="شريك جديد"
              @click.prevent="$router.push(localePath(`/partners/add`))"
              btnClass="yellow"
              icon="add-square"
            />
          </div>
        </div>

        <div class="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5">
          <div
            v-for="(partner, i) in partners"
            :key="i"
            class="partner-box w-full bg-light rounded-lg pt-4 relative flex"
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
                  ? 'w-full h-28 rounded-t-lg'
                  : 'w-52 h-full rounded-r-lg',
              ]"
            >
              <img
                :src="partner.avatar"
                class="w-full h-full object-contain object-center"
                loading="lazy"
                :alt="$t(`app.title`)"
              />
            </div>

            <div
              class="contain w-full"
              :class="[
                listView === false ? 'p-6 text-center' : 'col-contain p-5',
              ]"
            >
              <a
                target="_blank"
                :href="`${partner.link}`"
                class="py-1 px-4 rounded-full bg-primary bg-opacity-10 text-primary text-sm font-medium"
              >
                الرابط</a
              >

              <h2 class="text-xl font-bold text-dark mt-3">
                {{ partner.name }}
              </h2>
            </div>

            <div
              @click="partner.dropList = !partner.dropList"
              :class="partner.dropList === true ? 'activeList' : ''"
              class="box-drop-list w-fit absolute top-5 ltr:right-4 cursor-pointer rtl:left-4"
            >
              <div
                class="w-10 h-10 rounded-full flex items-center content-center justify-center"
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
                  v-if="hasPermissions('update_partners')"
                >
                  <nuxt-link
                    :to="`/partners/${partner.id}/edit`"
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
                      `${partner.is_block ? 'active' : 'block'}_partners`
                    )
                  "
                >
                  <button
                    class="data-contain flex items-center content-center"
                    @click="OpenModalPlusId('modalBlock', partner)"
                  >
                    <img
                      :src="`/img/icons/${
                        !partner.is_block ? 'slash' : 'shield_tick'
                      }.svg`"
                      class="w-5 h-5 object-contain ltr:mr-2 rtl:ml-2"
                      loading="lazy"
                      :alt="$t(`app.title`)"
                    />

                    <span class="text-dark text-sm font-medium">
                      {{ `${!partner.is_block ? "تعطيل" : "تفعيل"}` }}
                    </span>
                  </button>
                </li>

                <li
                  class="w-full py-3"
                  v-if="hasPermissions(`delete_partners`)"
                >
                  <!-- <button
                    class="data-contain flex items-center content-center"
                    @click="modalDelete = !modalDelete"
                  >-->
                  <button
                    class="data-contain flex items-center content-center"
                    @click="OpenModalPlusId('modalDelete', partner)"
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

    <!-- delete partner -->
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
          هل أنت متأكد من حذف شريك النجاح ؟
        </p>

        <div class="flex items-center content-center justify-center">
          <page-button
            name="موافق"
            imgClass="hidden"
            class="ltr:ml-2 rtl:ml-3"
            btnClass="yellow small-btn"
            @click="handleDeletePartner"
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

    <!-- Block partner -->
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
          :src="[!item.is_block ? '/img/form/block.svg' : '/img/form/done.svg']"
          class="w-16 h-16 object-contain"
          loading="lazy"
          :alt="$t(`app.title`)"
        />

        <p class="text-dark font-bold text-center text-base my-5">
          هل أنت متأكد من
          <span>{{ !item.is_block ? "تعطيل" : "تفعيل" }}</span> شريك النجاح ؟
        </p>

        <div class="flex items-center content-center justify-center">
          <page-button
            name="موافق"
            imgClass="hidden"
            class="ltr:ml-2 rtl:ml-3"
            btnClass="yellow small-btn"
            @click="handlePartnerStatus"
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
  name: "PartnersContain",
  props: {
    partners: {
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
      item: {
        is_block: false,
        id: "",
      },
    };
  },
  methods: {
    handleDeletePartner() {
      this.$axios
        .$post(`dashboard/pages/partners/${this.item.id}`, {
          _method: "delete",
        })
        .then(() => {
          this.modalDelete = false;
          this.$nuxt.refresh();
        });
    },
    handlePartnerStatus() {
      const partnerStatus = this.item.is_block ? "active" : "block";
      this.$axios
        .$post(`dashboard/pages/partners/${this.item.id}/${partnerStatus}`, {
          _method: "put",
        })
        .then(() => {
          this.modalBlock = false;
          this.$nuxt.refresh();
        });
    },
    OpenModalPlusId(state, partner) {
      this.item = partner;
      this[state] = !this[state];
    },
  },
};
</script>

<style lang="scss" scoped>
.partners {
  .partner-box {
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
  .partners {
    .gird-mobile-hidden {
      display: none;
    }
    .mobile-btn {
      width: 100% !important;
    }
  }
}
</style>

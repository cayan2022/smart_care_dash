<template>
  <div>
    <section class="testimonials">
      <div class="container">
        <div
          class="w-full flex items-center content-center justify-between mb-10 lg:flex-row md:flex-row sm:flex-col flex-col"
        >
          <page-heading
            title="آراء العملاء"
            desc="يمكنك هنا آراء العملاء من إضافة وتعديل"
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
              v-if="hasPermissions('create_testimonials')"
              name="اضافة جديد"
              @click.prevent="$router.push(localePath(`/testimonials/add`))"
              btnClass="yellow"
              icon="add-square"
            />
          </div>
        </div>

        <div
          class="grid gap-6"
          :class="[
            listView === false
              ? 'xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'
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
            v-for="(testimonial, i) in testimonials"
            :key="i"
          >
            <img
              :src="testimonial.image"
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
              <p class="text-dark text-sm font-normal">
                {{ testimonial.comment | maxWord(20) }}
              </p>

              <h2 class="text-base font-bold text-dark mt-6 mb-4">
                {{ testimonial.user_name | maxWord(5) }}
              </h2>

              <p class="text-gray text-sm font-normal">
                {{ testimonial.job }}
              </p>
            </div>

            <div
              @click.prevent="testimonial.dropList = !testimonial.dropList"
              :class="testimonial.dropList === true ? 'activeList' : ''"
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
                  v-if="hasPermissions('update_testimonials')"
                >
                  <nuxt-link
                    :to="localePath(`/testimonials/${testimonial.id}/edit`)"
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
                      `${
                        testimonial.is_block ? 'active' : 'block'
                      }_testimonials`
                    )
                  "
                >
                  <button
                    class="data-contain flex items-center content-center"
                    @click="OpenModalPlusId('modalBlock', testimonial)"
                  >
                    <img
                      :src="[
                        !testimonial.is_block
                          ? '/img/icons/slash.svg'
                          : '/img/icons/shield_tick.svg',
                      ]"
                      class="w-5 h-5 object-contain ltr:mr-2 rtl:ml-2"
                      loading="lazy"
                      :alt="$t(`app.title`)"
                    />

                    <span class="text-dark text-sm font-medium">
                      {{ `${!testimonial.is_block ? "تعطيل" : "تفعيل"}` }}
                    </span>
                  </button>
                </li>
                <li
                  class="w-full py-3"
                  v-if="hasPermissions('delete_testimonials')"
                >
                  <button
                    class="data-contain flex items-center content-center"
                    @click="OpenModalPlusId('modalDelete', testimonial)"
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
          :src="[
            !testimonial.is_block
              ? '/img/form/block.svg'
              : '/img/form/done.svg',
          ]"
          class="w-16 h-16 object-contain"
          loading="lazy"
          :alt="$t(`app.title`)"
        />

        <p class="text-dark font-bold text-center text-base my-5">
          هل أنت متأكد من
          <span>{{ !testimonial.is_block ? "تعطيل" : "تفعيل" }}</span> العميل ؟
        </p>

        <div class="flex items-center content-center justify-center">
          <page-button
            name="موافق"
            imgClass="hidden"
            class="ltr:ml-2 rtl:ml-3"
            btnClass="yellow small-btn"
            @click.prevent="handleTestimonialStatus"
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
          هل أنت متأكد من حذف رأي عميل ؟
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
  </div>
</template>

<script>
export default {
  props: {
    testimonials: {
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
      testimonial: {
        id: "",
        is_block: false,
      },
    };
  },
  methods: {
    handleDelete() {
      this.$axios
        .$post(`dashboard/pages/testimonials/${this.testimonial.id}`, {
          _method: "delete",
        })
        .then(() => {
          this.modalDelete = false;
          this.$nuxt.refresh();
        });
    },
    OpenModalPlusId(state, testimonial) {
      this.testimonial = testimonial;
      this[state] = !this[state];
    },
    handleTestimonialStatus() {
      const testimonialStatus = this.testimonial.is_block ? "active" : "block";
      this.$axios
        .$post(
          `dashboard/pages/testimonials/${this.testimonial.id}/${testimonialStatus}`,
          {
            _method: "put",
          }
        )
        .then(() => {
          this.modalBlock = false;
          this.$nuxt.refresh();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.testimonials {
  .box {
    transition: all 0.3s linear;

    &::after {
      content: "";
      position: absolute;
      width: 100px;
      height: 100px;
      background: url("/img/testimonial.svg") bottom left / contain no-repeat;
      bottom: 0;
      left: 0;
      z-index: 0;
    }

    &:hover {
      h2 {
        color: var(--primary);
      }
    }
  }
}
</style>

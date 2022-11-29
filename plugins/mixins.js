import Vue from "vue";
import { mapGetters } from "vuex";
import pageHeading from "@/components/core/page-heading";
import pageButton from "@/components/core/page-button";
import formInput from "@/components/core/form-input";
import uploadImage from "@/components/core/upload-image";
import formTextArea from "@/components/core/form-textArea";
import checkBox from "@/components/core/check-box";
import formSelect from "@/components/core/form-select";
import formPhone from "@/components/core/form-phone";
import doughnut from "@/components/core/doughnut";
import doughnutMulti from "@/components/core/doughnut-multi";
import datePicker from "@/components/core/date-picker";
import countryCode from "@/components/core/country-code";
import successModal from "@/components/modal/success-modal";
import vError from "@/components/v-error";
import usersFilter from "@/components/usersFilter";
import Cookies from "js-cookie";

const Mix = {
  install(Vue, options) {
    Vue.component("page-heading", pageHeading);
    Vue.component("usersFilter", usersFilter);
    Vue.component("page-button", pageButton);
    Vue.component("form-input", formInput);
    Vue.component("upload-image", uploadImage);
    Vue.component("form-textArea", formTextArea);
    Vue.component("check-box", checkBox);
    Vue.component("form-select", formSelect);
    Vue.component("form-phone", formPhone);
    Vue.component("doughnut", doughnut);
    Vue.component("doughnut-multi", doughnutMulti);
    Vue.component("country-code", countryCode);
    Vue.component("success-modal", successModal);
    Vue.component("date-picker", datePicker);
    Vue.component("v-error", vError);

    Vue.mixin({
      data() {
        return {
          timeStamp: null,
        };
      },
      filters: {
        truncate: (value, count = 10) => {
          let truncateValue = value && value.substring(0, count);
          if (value.length > count) {
            return `${truncateValue}...`;
          } else {
            return truncateValue;
          }
        },
        maxWord: (value, count = 10) =>
          value && value.split(" ").splice(0, count).join(" "),
      },
      computed: {
        ...mapGetters({
          isloading: "isloading",
          errors: "errors",
          serverErrors: "errors/serverErrors",
          getQuery: "query/getQuery",
          getSystemLogo: "query/getSystemLogo",
          userPermissions: "roles/getUserPermissions",
        }),
        statusTypes() {
          return {
            1: "new",
            2: "tracking",
            3: "done",
            4: "cancel",
          };
        },
        subStatusTypes() {
          return {
            1: { color: "#FBA706", icon: "/img/icons/follow.svg" },
            2: { color: "#FBA706", icon: "/img/icons/follow.svg" },
            3: { color: "#FBA706", icon: "/img/icons/follow.svg" },
            4: { color: "#29A71A", icon: "/img/request/money-time.svg" },
            5: { color: "#D6262D", icon: "/img/request/close-circle.svg" },
            6: { color: "#D6262D", icon: "/img/request/close-circle.svg" },
            7: { color: "#D6262D", icon: "/img/request/close-circle.svg" },
            8: { color: "#D6262D", icon: "/img/request/close-circle.svg" },
            9: { color: "#D6262D", icon: "/img/request/close-circle.svg" },
            10: { color: "#D6262D", icon: "/img/request/close-circle.svg" },
          };
        },

        // locale() { return this.$i18n.locale },

        isrtl() {
          return this.$t(`app.dir`) === "rtl";
        },
      },

      methods: {
        hasPermissions(permission) {
          return (
            this.userPermissions && this.userPermissions.includes(permission)
          );
        },
        convertDate(date) {
          return new Date(date)
            .toISOString()
            .slice(0, 19)
            .replace(/-/g, "-")
            .replace("T", " ");
        },
        handleDebounce(callback) {
          if (this.timStamp) {
            clearTimeout(this.timStamp);
          }
          this.timStamp = setTimeout(() => {
            callback();
          }, 700);
        },
        $closeModal() {
          this.$store.commit("closeModal");
        },
        $errorHandler(arr, err) {
          arr = [];
          if (err.response.status == 422) {
            this.errorsArr = err.response.data.errors;
          }
        },
        $confirmSuccess() {
          this.$store.commit("modal", "success-modal");
          setTimeout(() => {
            this.$store.commit("closeModal");
            this.$router.push("/clients");
          }, 2000);
        },
        $formData(data) {
          const formData = new FormData();
          Object.entries(data).forEach((entry) => {
            const [key, value] = entry;
            if (value !== null || value !== undefined) {
              formData.append(key, value);
            }
          });
          return formData;
        },

        replaceQuery() {
          const query = Object.assign({}, this.$route.query);
          query.nan = undefined;
          return this.$router.replace({ query }).catch(() => {});
        },

        register() {
          const register = new CustomEvent("event:register");
          document.dispatchEvent(register);

          Cookies.remove(`_source`);
        },

        callus(number) {
          const call = new CustomEvent("event:call");
          document.dispatchEvent(call);

          window.open(`tel:+966${number}`);
        },

        whatsapp(number) {
          const whatsapp = new CustomEvent("event:whatsapp");
          document.dispatchEvent(whatsapp);
          console.log(number);

          window.open(`https://wa.me/${number}`);
        },

        mailto(email) {
          const mailto = new CustomEvent("event:mailto");
          document.dispatchEvent(mailto);

          window.open(`mailto:${email}`);
        },

        scrollTo(element, offset = 0) {
          const to = document.querySelectorAll(element)[0];
          if (to) {
            const y = to.getBoundingClientRect().top + window.scrollY;
            window.scroll({ top: y - offset, behavior: "smooth" });
          }
        },
      },
    });
  },
};
Vue.prototype.$eventBus = new Vue();
Vue.use(Mix);

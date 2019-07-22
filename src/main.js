import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import VeeValidate from "vee-validate";
import "v-slim-dialog/dist/v-slim-dialog.css";
import SlimDialog from "v-slim-dialog";
import axios from "./backend/vue-axios";

Vue.use(VeeValidate);
Vue.use(SlimDialog);

Vue.config.productionTip = false;

new Vue({
  router,
  axios,
  store,
  render: h => h(App)
}).$mount("#app");

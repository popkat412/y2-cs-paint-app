import Vue from "vue";
import App from "@/App.vue";
import GlobalState from "@/globalState";
import '@/assets/styles.css';
import Config from "./config";
import titleCase from "./helpers/titleCase";
Vue.config.productionTip = false;

Vue.prototype.$store = Vue.observable(new GlobalState());
Vue.prototype.$config = Vue.observable(new Config());

Vue.mixin({
  methods: {
    titleCase
  }
})

new Vue({
  render: h => h(App)
}).$mount("#app");

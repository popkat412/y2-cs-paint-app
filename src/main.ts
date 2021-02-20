import Vue from "vue";
import App from "@/App.vue";
import GlobalState from "@/globalState";
import '@/assets/styles.css';
import Config from "./config";
import startCase from 'lodash/startCase';
import platform from "platform";
import EVENTS from "./models/events";

// Vue config
Vue.config.productionTip = false;

// Vue globals
Vue.prototype.$store = Vue.observable(new GlobalState());
Vue.prototype.$config = Vue.observable(new Config());

// Vue stuff
Vue.mixin({
  methods: {
    startCase
  }
});

const vm = new Vue({
  render: h => h(App)
}).$mount("#app");

// Keyboard shortcuts
window.onkeydown = (e: KeyboardEvent) => {
  const modifier = platform.os?.family == "OS X" ? e.metaKey : e.ctrlKey;
  if (modifier && e.shiftKey && e.key == "z") {
    console.log("command/ctrl shift z pressed");
    vm.$emit(EVENTS.redo);
  }
  else if (modifier && e.key == "z") {
    console.log("command/ctrl z pressed");
    vm.$emit(EVENTS.undo);
  }
};

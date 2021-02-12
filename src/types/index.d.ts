import Vue from 'vue';
import GlobalState from "@/globalState";
import Config from '@/config';

declare module "vue/types/vue" {
  interface Vue {
    $store: GlobalState;
    $config: Config;
  }
}

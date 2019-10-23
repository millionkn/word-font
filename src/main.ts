import Vue from 'vue';
import router from '@/router'
import { _store } from '@/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCompositionApi from "@vue/composition-api";
import App from "@/App/index";

Vue.config.productionTip = false
Vue.use(VueCompositionApi);

declare module '@vue/composition-api/dist/component/component' {
  interface SetupContext {
    readonly refs: { [key: string]: Vue | Element | Vue[] | Element[] };
  }
}
Vue.use(ElementUI);
new Vue({
  router,
  store: _store,
  render: h => h(App)
}).$mount('#app')

import Vue from "vue";
import router from "@/router";
import { logout, afterLogined } from '@/service';
import store from '@/store';
import { computed } from '@vue/composition-api';

export default Vue.extend({
  setup() {
    return {
      handleLogin: afterLogined,
      logout: async () => {
        await logout();
        await router.replace("/");
      },
      currentUser: computed(() => store.getters.currentUser),
    };
  }
});
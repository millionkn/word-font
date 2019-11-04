import Vue from "vue";
import router from "@/router";
import { logout, afterLogined } from '@/service';
import store from '@/store';
import { computed } from '@vue/composition-api';
// @ts-ignore
import avatar from 'vue-avatar/dist/vue-avatar.min.js';
export default Vue.extend({
  components: {
    avatar,
  },
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
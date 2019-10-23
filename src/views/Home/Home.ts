import Vue from "vue";
import { computed } from '@vue/composition-api';
import store from '@/store';

export default Vue.extend({
  setup() {
    return {
      hasSavedUser: computed(() => store.getters.currentUser)
    };
  },
  components: {
    WellCome: () => import("@/views/WellCome"),
    Panel: () => import("@/views/Panel")
  }
});
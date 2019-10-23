import Vue from "vue";
import ServiceLogin, { propMethod as propMethodLogin } from "@/App/Login";
export default Vue.extend({
  components: {
    ServiceLogin
  },
  setup() {
    return {
      propLogin: <propMethodLogin>(() => ({}))
    }
  }
});
import Vue from "vue";
import router from "@/router";

export default Vue.extend({
  setup(): { routeTo: (url: string) => void } {
    return {
      routeTo(url: string) {
        router.push(url);
      }
    };
  }
});
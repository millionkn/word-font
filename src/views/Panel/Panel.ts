import Vue from "vue";
import router from "@/router";

export default Vue.extend({
  setup() {
    return {
      images: {
        lesson: require("./lesson.jpg"),
      },
      routeTo(url: string) {
        router.push(url);
      }
    };
  }
});
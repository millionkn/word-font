import Vue from "vue";
import { ref, onUnmounted, computed } from "@vue/composition-api";
import router from "@/router";

export default Vue.extend({
  setup() {
    let data: {
      path: string;
      label: string;
    }[] = [
        {
          path: "/",
          label: "主页"
        },
        {
          path: "/lesson",
          label: "课程"
        }
      ];
    let currentPath = ref("");
    let routeChangeHandler = () => {
      let route = router.currentRoute.matched.find(r => !!r.meta.toolBar);
      currentPath.value = route ? route.meta.toolBar.path : "";
    }
    onUnmounted(router.afterEach(routeChangeHandler));
    routeChangeHandler();
    return {
      data,
      click(path: string) {
        router.push(path);
      },
      currentPath
    };
  }
});
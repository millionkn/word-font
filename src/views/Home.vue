<template>
  <div>
    <well-come v-if="wellcome"></well-come>
    <router-view v-else></router-view>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import store from "@/store";
import axios from "axios";
import { computed, watch, ref } from "@vue/composition-api";
import { Info, lessonData, lessonInfo } from "@/types";
import router from "../router";
export default Vue.extend({
  setup(props) {
    let wellcome = ref(true);
    watch(
      () => store.state.currentUser,
      async n => ((wellcome.value = !n) ? router.replace("/") : void 0)
    );
    return {
      wellcome
    };
  },
  components: {
    WellCome: () => import("@/views/Wellcome.vue")
  }
});
</script>
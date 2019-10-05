<template>
  <div>
    <panel v-if="logined"></panel>
    <well-come v-else></well-come>
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
    return {
      logined: store.getters.logined
    };
  },
  components: {
    WellCome: () => import("@/views/Wellcome.vue"),
    Panel: () => import("@/views/Panel.vue")
  }
});
</script>
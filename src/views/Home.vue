<template>
  <div>
    <well-come v-if="wellcome"></well-come>
    <my-lesson-list v-else :lessonList="lessonList"></my-lesson-list>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import store from "@/store";
import axios from "axios";
import { computed, watch, ref } from "@vue/composition-api";
import { Info, lessonData, lessonInfo } from "@/types";
export default Vue.extend({
  setup(props) {
    let lessonList = ref(undefined as
      | undefined
      | Info<lessonData & lessonInfo>[]);
    watch(
      () => store.state.currentUser,
      async n => {
        if (n) {
          lessonList.value = (await axios.get(`/currentUser/lessonList`)).data;
        } else {
          lessonList.value = undefined;
        }
      }
    );
    return {
      wellcome: computed(() => !lessonList.value),
      lessonList
    };
  },
  components: {
    WellCome: () => import("@/views/Wellcome.vue"),
    MyLessonList: () => import("@/views/MyLessonList.vue")
  }
});
</script>
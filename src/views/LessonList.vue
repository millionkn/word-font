<template>
  <el-card>
    <div class="root">
      <lesson v-for="klass in data" :key="klass.id" :data="klass" class="card"></lesson>
    </div>
  </el-card>
</template>
<style lang="less" scoped>
.root {
  display: flex;
  flex-wrap: wrap;
}
.card {
  height: 180px;
  width: 240px;
}
</style>
<script lang="ts">
import Vue from "vue";
import axios from "axios";
import LessonComponent from "@/components/Lesson.vue";
import { onMounted, ref } from "@vue/composition-api";
import { Info, lessonInfo } from "@/types";
export default Vue.extend({
  setup(prop, cont) {
    let data = ref([] as Info<lessonInfo>[]);
    onMounted(async () => {
      let res = await axios.get("/lessonInfoList");
      data.value = res.data;
    });
    return {
      data
    };
  },
  components: {
    Lesson: LessonComponent
  }
});
</script>
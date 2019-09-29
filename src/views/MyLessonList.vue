<template>
  <div>
    <el-card v-for="lesson in lessonList" :key="lesson.id">
      <div slot="header">{{lesson.info.name}}</div>
      <div class="root">
        <div class="left" v-if="lesson.info.image?true:false">
          <img :src="lesson.info.image" class="image" />
        </div>
        <div class="right">
          <div class="text">{{lesson.info.message||"没有说明"}}</div>
          <div class="buttons">
            <span class="tab" />
            <el-button type="primary" @click="click(lesson)">复习</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<style lang="less" scoped>
.root {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: stretch;
  height: 120px;
}
.image {
  width: 200px;
  height: 100%;
}
.right {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.text {
  flex: 1;
}
.buttons {
  display: flex;
}
.tab {
  flex: 1;
}
</style>
<script lang="ts">
import Vue from "vue";
import * as types from "@/types";
import router from "../router";
export default Vue.extend({
  props: ["lessonList"],
  setup(props) {
    return {
      click(lesson: types.Info<{}>) {
        try {
          router.push(`/review/${lesson.id}`);
        } catch {
          //路由被打断也属于错误
        }
      }
    };
  }
});
</script>
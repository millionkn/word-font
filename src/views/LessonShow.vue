<template>
  <el-card>
    <div slot="header" class="info">
      <img :src="lesson.info.image" class="image" v-if="hasImage" />
      <div class="flex-column">
        <div class="message">{{lesson.info.message||"没有说明"}}</div>
        <div class="button">
          <el-button v-if="subscribered" type="danger" plain @click="deleteSubscriber">退订</el-button>
          <el-button v-else type="primary" @click="subscriber">添加到我的课表</el-button>
        </div>
      </div>
    </div>
    <div>{{data.id}}</div>
  </el-card>
</template>
<style lang="less" scoped>
.el-card {
  height: 100%;
}
.info {
  display: flex;
  align-items: flex-stretch;
  height: 150px;
}
.info > .image {
  width: 200px;
}
.info > .flex-column {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.info > .flex-column > .message {
  flex: 1;
}
.button > .el-button {
  float: right;
}
</style>
<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { onMounted, ref, computed, watch } from "@vue/composition-api";
import { Info, lessonInfo, lessonData } from "@/types";
import store from "../store";
export default Vue.extend({
  props: ["data"],
  setup(props, context) {
    const lesson = props.data as Info<lessonInfo & lessonData>;
    let subscribered = ref(false);
    watch(
      () => store.state.currentUser,
      async n => {
        if (n === undefined) {
          return (subscribered.value = false);
        }
        let lessonList: Info<lessonInfo & lessonData>[] = (await axios.get(
          `/currentUser/lessonList`
        )).data;
        subscribered.value = -1 < lessonList.findIndex(l => l.id === lesson.id);
      }
    );
    return {
      lesson,
      hasImage: computed(() => lesson.info.image),
      subscribered,
      async subscriber() {
        await axios.post("/currentUser/lessonList", {
          lessonId: lesson.id
        });
        subscribered.value = true;
      },
      async deleteSubscriber() {
        let id = lesson.id;
        await axios.delete("/currentUser/lessonList", {
          data: {
            lessonId: id
          }
        });
        subscribered.value = false;
      }
    };
  }
});
</script>
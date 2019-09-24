<template>
  <el-card :body-style="{padding:'0px',height:'100%'}" class="card">
    <div slot="header">
      <span>{{name}}</span>
    </div>
    <div class="item" @click="onClick">
      <img v-if="showImage" :src="image" />
      <div v-else>
        <span>课程没有图片</span>
      </div>
    </div>
  </el-card>
</template>
<style lang="less" scoped>
.card {
  display: inline-flex;
  flex-direction: column;
}
.item {
  height: 100%;
  cursor: pointer;
}
</style>
<script lang="ts">
import Vue from "vue";
import router from "../router";
import { Info, lessonInfo } from "@/types";
import { computed } from "@vue/composition-api";
export default Vue.extend({
  props: {
    data: Object
  },
  setup: (initProps, context) => {
    let data = <Info<lessonInfo>>initProps.data;
    return {
      id: data.id,
      ...data.info,
      showImage: computed(() => !!data.info.image),
      async onClick() {
        await router.push(`/lesson/${data.id}`);
      }
    };
  }
});
</script>
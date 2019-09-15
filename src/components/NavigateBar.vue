<template>
  <el-aside width="200px">
    <el-tree
      :data="data"
      accordion
      node-key="location"
      ref="tree"
      @node-click="nodeClick"
      highlight-current
      :expand-on-click-node="false"
      :default-expanded-keys="[defaultExpandedKey]"
    ></el-tree>
  </el-aside>
</template>

<script lang="ts">
import Vue from "vue";
import { reactive, onMounted, ref, computed } from "@vue/composition-api";
import router from "../router";
import { Tree } from "element-ui";
export type node = {
  label: string;
  children?: node[];
  location?: string;
};
function getParent(node: node, location: string | undefined): node | undefined {
  if (node.children) {
    for (let child of node.children) {
      return child.location === location ? node : getParent(child, location);
    }
  }
}
export default Vue.extend({
  props: {
    navigateData: Array,
    defaultLocation: String
  },
  setup(initProps, setupContext) {
    let data = initProps.navigateData as node[];
    let defaultExpandedKey = ref({});
    let location = initProps.defaultLocation as String;
    onMounted(() => {
      let tree = setupContext.refs.tree as Tree;
      tree.setCurrentKey(location);
      if (tree.getCurrentNode()) {
        let location = (tree.getCurrentNode() as node).location;
        let temp = {
          label: "",
          children: data
        };
        let parent = getParent(temp, location);
        if (parent !== temp && parent) {
          defaultExpandedKey.value = parent;
        }
      }
    });
    return {
      data,
      defaultExpandedKey,
      nodeClick: (...args: any) => setupContext.emit("node-click", ...args)
    };
  }
});
</script>
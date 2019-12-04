import Vue from "vue";

export default Vue.extend({
  setup() {
    return {
      images: {
        _1: require("./1.png"),
        _2: require("./2.png"),
        _3: require("./3.png"),
        _4: require("./4.png"),
        _5: require("./5.png"),
      }
    }
  }
})
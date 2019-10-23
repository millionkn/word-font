import Vue from "vue";
import { reactive, computed } from "@vue/composition-api";
import store from "@/store";
import { MessageBox, Message } from "element-ui";
import { login } from "@/service";

export type propMethod = () => {
};
export default Vue.extend({
  props: ["prop"],
  setup(initProps) {
    let props = (initProps.prop as propMethod)()
    let form = reactive({
      username: "",
      password: ""
    });
    return {
      form,
      visible: computed(() => !!store.getters.loginedCallback),
      handlerClose: () => {
        if (store.getters.loginedCallback) { store.getters.loginedCallback.rej() }
      },
      submit: async () => {
        try {
          await login(form);
          if (store.getters.loginedCallback) { store.getters.loginedCallback.res() }
          let userinfo = (store.getters.currentUser as Exclude<typeof store.getters.currentUser, undefined>).info;
          Message.success(`欢迎您，${userinfo.username}`);
        } catch (e) {
          MessageBox.alert(e, "错误");
        }
      }
    };
  }
});
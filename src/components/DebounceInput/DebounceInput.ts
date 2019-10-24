import Vue from "vue";
import { ref } from "@vue/composition-api";
import { debounce } from "ts-debounce";
import { Input } from "element-ui";

export type propMethod = () => {
  time: number,
  size?: InstanceType<typeof Input>["size"],
  placeholder?: InstanceType<typeof Input>["placeholder"],
  callback: (value: string) => void,
}
export default Vue.extend({
  props: ["prop"],
  setup(propsInit) {
    let props = (propsInit.prop as propMethod)();
    let time = (props.time || 0) as number;
    let text = ref("");
    let last = text.value;
    return {
      text,
      placeholder: props.placeholder,
      size: props.size,
      inputHandler: debounce((str: string) => {
        if (last === text.value) {
          return;
        }
        props.callback(last = text.value);
      }, time)
    };
  }
});
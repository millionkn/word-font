import Vue from "vue";
import { Word, Component } from '@/types';
import WordSelector, {
  propMethod as propWordSelector
} from "@/components/ComponentEditor/WordSelector";
import { reactive } from '@vue/composition-api';
export type propMethod = () => {
  info: Component["info"],
  words: Word[],
};
export default Vue.extend({
  components: {
    WordSelector
  },
  props: ["prop"],
  setup(propsInit) {
    let props = (propsInit.prop as propMethod)();
    return {
      info: reactive(props.info),
      propWordSelector: <propWordSelector>(() => ({
        selectedWords: props.words,
      }))
    };
  }
})
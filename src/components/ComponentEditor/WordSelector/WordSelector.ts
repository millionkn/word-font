import Vue from "vue";
import { Word } from '@/types';
import { ref } from "@vue/composition-api";
import DebounceInput, { propMethod as propDebounceInput } from "@/components/DebounceInput";
import { searchWordByDescribe } from '@/service';

export type propMethod = () => {
  selectedWords: Word[],
  height?: number
};
export default Vue.extend({
  components: {
    DebounceInput
  },
  props: ["prop"],
  setup(propsInit) {
    let props = (propsInit.prop as propMethod)()
    let selected = ref(props.selectedWords);
    let showing = ref(props.selectedWords);
    let indexOf = (word: Word) => selected.value.findIndex((w) => w.id === word.id)
    return {
      showing,
      indexOf,
      height: props.height || 300,
      addToList: (word: Word) => selected.value.push(word),
      deleteFromList: (word: Word) => {
        let index = indexOf(word);
        if (index < 0) { return; }
        selected.value.splice(index, 1);
      },
      propDebounceInput: (): ReturnType<propDebounceInput> => ({
        time: 400,
        size: "mini",
        placeholder: "输入关键字搜索",
        callback: async (describe: string | undefined) => {
          if (describe === undefined || describe === "") {
            showing.value = selected.value;
          } else {
            showing.value = await searchWordByDescribe(describe)
          }
        }
      })
    };
  }
});
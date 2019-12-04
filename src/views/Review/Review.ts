import Vue from "vue";
import vm from "@/vm";
import { onMounted, ref } from "@vue/composition-api";
import { Lesson, Word, Support } from "@/types";
import { getLessonContent, getWordCollection, getComponentFile } from '@/service';
import Axios from 'axios';

type vueOption = typeof Vue.extend extends (opt: infer O) => any ? O : false;
type vueConstroctor = ReturnType<typeof Vue.extend>;
const random = (() => {
  let last: Support;
  return (arr: Support[]) => {
    if (arr.length == 0) { throw new Error("数组长度为0"); }
    arr = arr.filter(support => support !== last);
    if (arr.length == 0) { return last }
    return last = arr[Math.floor(Math.random() * arr.length)];
  }
})();
async function initScript(componentId: string) {
  let script = await getComponentFile(componentId);
  return await new Promise<vueOption>(res =>
    vm({
      window, Math,
      Axios: Axios.create(),
      VueSetup: <O extends vueOption>(vueOption: O) => res(vueOption)
    })(script)
  )
}

export type propMethod = () => {
  lesson: Lesson
}
export default Vue.extend({
  props: ["prop"],
  setup(propsInit) {
    let props = (propsInit.prop as propMethod)();
    let lesson = props.lesson;
    let components = {} as {
      [key: string]: vueConstroctor;
    };
    let words = {} as {
      [id: string]: Word;
    };
    let supports = [] as Support[];
    let currentComponent = ref(Vue.extend({ render: h => h("div") }));
    let currentWord = ref({} as Word);
    let switchWord = () => {
      let support = random(supports)
      currentWord.value = words[support.wordId];
      currentComponent.value = components[support.componentId];
    };
    onMounted(async () => {
      supports = await getLessonContent(lesson);
      let component = new Array(...new Set(supports.map(support => support.componentId)));
      let word = new Array(...new Set(supports.map(support => support.wordId)));
      let wordArray = await getWordCollection(word);
      wordArray.forEach(word => words[word.id] = word)
      await Promise.all(component.map((id) => initScript(id).then(opt => components[id] = Vue.extend(opt))));
      switchWord();
    });
    return {
      getResult: (result: boolean) => {
        alert(result);
        switchWord();
      },
      switchWord,
      currentWord,
      currentComponent
    };
  }
});
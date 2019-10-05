<template>
  <div ref="customn_target" style="display:flex;border:4px">
    <keep-alive>
      <component :is="currentComponent" :word="currentWord.data" @result="getResult"></component>
    </keep-alive>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import vm from "@/vm";
import Axios from "axios";
import { onMounted, ref, watch } from "@vue/composition-api";
import { Info, lessonInfo, lessonData, word, component } from "@/types";
import { Loading } from "element-ui";
type vueOption = typeof Vue.extend extends (opt: infer O) => any ? O : false;
type vueConstroctor = ReturnType<typeof Vue.extend>;
type vueInstance = InstanceType<vueConstroctor>;
function random<T>(arr: T[], except?: T) {
  return arr[Math.floor(Math.random() * arr.length)];
}
export default Vue.extend({
  props: ["lesson"],
  setup(props, context) {
    const lesson = props.lesson as Info<lessonInfo & lessonData>;
    let components = {} as {
      [key: string]: vueConstroctor;
    };
    let words = {} as {
      [id: string]: word;
    };
    let currentComponent = ref(Vue.extend({ render: h => h("div") }));
    let currentWord = ref({} as word);
    let switchWord = () => {
      let wordInfo = random(
        lesson.data.filter(
          lesson.data.length < 2
            ? () => true
            : word => word.wordId != currentWord.value.id
        )
      );
      let componentId = random(wordInfo.component) || "default";
      currentWord.value = words[wordInfo.wordId];
      currentComponent.value = components[componentId];
    };
    onMounted(async () => {
      await Promise.all([
        Axios.post("/get/wordCollection", lesson.data.map(x => x.wordId)).then(
          res => {
            let wordCollection = res.data as word[];
            wordCollection.forEach(w => (words[w.id] = w));
          }
        ),
        Promise.all(
          [
            ...new Set(
              ([] as string[]).concat(
                ...lesson.data.map(wordInfo =>
                  wordInfo.component.length === 0
                    ? ["default"]
                    : wordInfo.component
                )
              )
            )
          ].map(async (componentId: string) => {
            let componentInfo = (await Axios.get(`/component/${componentId}`))
              .data as component & { url: string };

            let script: string = (await Axios.get(componentInfo.url, {
              responseType: "text"
            })).data;
            await new Promise(res =>
              vm({
                Axios: Axios.create(),
                VueSetup: <O extends vueOption>(vueOption: O) => {
                  components[componentId] = Vue.extend(vueOption);
                  res();
                }
              })(script)
            );
          })
        )
      ]);
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
</script>
import Vue from "vue";
import { Support, Word, Component } from '@/types';
import { ref, computed, onMounted, reactive } from '@vue/composition-api';
import { getWordCollection, getComponentCollection, searchWordByDescribe, searchComponentByName, getComponentSupportWord, getSupportByComponent } from '@/service';
import { debounce } from 'ts-debounce';

export type propMethod = () => {
  support: Support[],
}
export default Vue.extend({
  props: ["prop"],
  setup(propsInit) {
    let props = (propsInit.prop as propMethod)();
    let support = props.support;
    let words = reactive([] as Word[]);
    let components = ref([] as Component[]);
    let data = reactive({
      component: {} as { [k: string]: Component & { support: Support[] } },
      word: {} as { [k: string]: Word }
    });
    let searchWordResults = ref([] as Word[]);
    let wordWillBeAdded = ref(undefined as undefined | Word);
    let isSearchingWord = ref(false);
    let searchComponentResults = ref([] as Component[]);
    let componentWillBeAdded = ref(undefined as undefined | Component);
    let isSearchingComponent = ref(false);
    onMounted(async () => {
      let _words = await getWordCollection(Array(...new Set(support.map(s => s.wordId))));
      let _components = await getComponentCollection(Array(...new Set(support.map(s => s.componentId))));
      await Promise.all(
        _components.map(async component => {
          data.component[component.id] = Object.assign({}, component, {
            support: await getSupportByComponent(component),
            __ob__: undefined,
          })
        }
        )
      );
      _words.forEach(w => data.word[w.id] = w)
      words.splice(0, words.length, ..._words);
      components.value = _components;
    });
    const _data = (component: Component) => {
      return data.component[component.id].support
        .filter(s => words.findIndex(w => w.id === s.wordId) >= 0)
        .map(support => ({
          support,
          word: words.find(w => w.id === support.wordId),
        }));
    }
    return {
      data: _data,
      words,
      components,
      isSearchingWord,
      wordWillBeAdded,
      wordWillBeAddedOption: computed(() => searchWordResults.value.filter(word => words.findIndex(w => w.id === word.id) < 0)),
      addWord: () => {
        if (wordWillBeAdded.value === undefined) { return }
        words.push(wordWillBeAdded.value);
        wordWillBeAdded.value = undefined;
      },
      searchWord: ((searchWord) => {
        return async (describe: string) => {
          if (describe === "") { return; }
          isSearchingWord.value = true;
          await searchWord(describe);
        }
      })(debounce(async (describe: string) => {
        searchWordResults.value = await searchWordByDescribe(describe);
        isSearchingWord.value = false;
      }, 400)),
      isSearchingComponent,
      componentWillBeAdded,
      componentWillBeAddedOption: computed(() => searchComponentResults.value.filter(component => components.value.findIndex(c => c.id === component.id) < 0)),
      addComponent: async () => {
        if (componentWillBeAdded.value === undefined) { return }
        let c = componentWillBeAdded.value;
        data.component[c.id] = Object.assign({}, c, {
          support: await getSupportByComponent(c),
          __ob__: undefined,
        });
        components.value.push(c);
        componentWillBeAdded.value = undefined;
      },
      searchComponent: ((searchComponent) => {
        return async (describe: string) => {
          if (describe === "") { return; }
          isSearchingComponent.value = true;
          await searchComponent(describe);
        }
      })(debounce(async (name: string) => {
        searchComponentResults.value = await searchComponentByName(name);
        isSearchingComponent.value = false;
      }, 400)),

      handleSelectionChange: (val: typeof _data extends (...r: any[]) => (infer X)[] ? X[] : never, component: Component) => {
        support.splice(0, support.length, ...support.filter(s => s.componentId !== component.id), ...val.map(v => v.support));
      },
      handleDeleteWord(index: number) {
        let word = words[index];
        words.splice(index, 1);
        support.splice(0, support.length, ...support.filter(s => s.wordId !== word.id))
      }
    };
  },
});
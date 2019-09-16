import Vue from 'vue'
import Vuex, { Store,StoreOptions } from 'vuex'

Vue.use(Vuex)

let opt = (<S, K>(opt: StoreOptions<S> & K): K => opt)({
  state: {

  },
  mutations: {

  },
  actions: {

  }
})
let store = new Vuex.Store(opt);
export default <{
  dispatch: <K extends keyof typeof opt.actions>(name: K, ...option: typeof opt.actions[typeof name] extends (a: any, ...b: infer X) => any ? X : never) => (ReturnType<typeof opt.actions[typeof name]> extends Promise<number> ? ReturnType<typeof opt.actions[typeof name]> : Promise<ReturnType<typeof opt.actions[typeof name]>>),
  commit: <K extends keyof typeof opt.mutations>(name: K, ...option: typeof opt.mutations[typeof name] extends (a: any, ...b: infer X) => any ? X : never) => (ReturnType<typeof opt.mutations[typeof name]>)
}&(Omit<typeof store,"dispatch"|"commit">)>store;
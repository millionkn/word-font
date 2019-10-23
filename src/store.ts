import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { UserData } from '@/types';
type LoginedCallback = {
  res: () => void,
  rej: () => void
};
Vue.use(Vuex);
let opt = (<S, K>(opt: StoreOptions<S> & K): K => opt)({
  state: {
    currentUser: undefined as UserData | undefined,
    loginedCallback: undefined as undefined | LoginedCallback,
  },
  mutations: {
    setCurrentUser(cont, user: UserData | undefined) {
      cont.currentUser = user;
    },
    setLoginedCallback(cont, obj: undefined | LoginedCallback) {
      cont.loginedCallback = obj;
    }
  },
  getters: {
    currentUser: (state) => state.currentUser,
    loginedCallback: (state) => state.loginedCallback,
  },
  actions: {

  }
})
export const _store = new Vuex.Store(opt);
let store = <{
  getters: { [
    key in keyof typeof opt.getters
    ]: ReturnType<typeof opt.getters[key]> },
  dispatch: <K extends keyof typeof opt.actions>(name: K, ...option: typeof opt.actions[typeof name] extends (a: any, ...b: infer X) => any ? X : never) => (ReturnType<typeof opt.actions[typeof name]> extends Promise<any> ? ReturnType<typeof opt.actions[typeof name]> : Promise<ReturnType<typeof opt.actions[typeof name]>>),
  commit: <K extends keyof typeof opt.mutations>(name: K, ...option: typeof opt.mutations[typeof name] extends (a: any, ...b: infer X) => any ? X : never) => (ReturnType<typeof opt.mutations[typeof name]>)
} & (Omit<typeof _store, "dispatch" | "commit" | "state" | "getters">)>_store;
export default store;
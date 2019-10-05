import Vue from 'vue'
import Vuex, { Store, StoreOptions } from 'vuex'
import _axios from "axios";
import * as types from "@/types";
import interceptors from "@/interceptors";
Vue.use(Vuex)
let axios = _axios.create();
// axios.interceptors.response.eject(interceptors.needLogin);
let opt = (<S, K>(opt: StoreOptions<S> & K): K => opt)({
  state: {
    currentUser: undefined as types.currentUser | undefined
  },
  mutations: {
    setCurrentUser(cont, user: types.currentUser | undefined) {
      cont.currentUser = user;
    },
  },
  getters: {
    logined: (state) => !!state.currentUser,
  },
  actions: {
    async reloadCurrentUser(cont) {
      try {
        await axios.head("/currentUser")
        if (!store.state.currentUser) {
          store.commit("setCurrentUser", (await axios.get("/currentUser")).data)
        }
      } catch{
        if (store.state.currentUser) {
          store.commit("setCurrentUser", undefined);
        }
      }
    },
    async login(cont, form: {
      username: string,
      password: string,
    }) {
      let data = (await axios.post("/login", form)).data;
      if (data.err) { throw data.err }
      await store.dispatch("reloadCurrentUser");
      let user = cont.state.currentUser;
      return <Exclude<typeof user, undefined>>user;
    },
    async logout(cont) {
      await axios.post("/logout").catch().finally(async () => {
        await store.dispatch("reloadCurrentUser");
      });
    }
  }
})
let _store = new Vuex.Store(opt);
let store = <{
  getters: { [key in keyof typeof opt.getters]: typeof opt.getters[key] },
  dispatch: <K extends keyof typeof opt.actions>(name: K, ...option: typeof opt.actions[typeof name] extends (a: any, ...b: infer X) => any ? X : never) => (ReturnType<typeof opt.actions[typeof name]> extends Promise<any> ? ReturnType<typeof opt.actions[typeof name]> : Promise<ReturnType<typeof opt.actions[typeof name]>>),
  commit: <K extends keyof typeof opt.mutations>(name: K, ...option: typeof opt.mutations[typeof name] extends (a: any, ...b: infer X) => any ? X : never) => (ReturnType<typeof opt.mutations[typeof name]>)
} & (Omit<typeof _store, "dispatch" | "commit" | "getters">)>_store;
export default store
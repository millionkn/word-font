import Vue from 'vue'
import Vuex, { Store, StoreOptions } from 'vuex'
import axios from "axios";

Vue.use(Vuex)

let state = {
  currentUser: undefined as {
    username: string
  } | undefined
}
let opt = (<S, K>(opt: StoreOptions<S> & K): K => opt)({
  state,
  getters: {
    currentUser: (cont) => cont.currentUser,
  },
  mutations: {
    setCurrentUser(cont, user: typeof state.currentUser) {
      cont.currentUser = user;
    }
  },
  actions: {
    async login(cont, form: {
      username: string,
      password: string,
    }) {
      let data = (await axios.post("/login", form)).data;
      if (data.err) { throw data.err }
      cont.commit("setCurrentUser", (await axios.get("/currentUser")).data)
      let user = cont.state.currentUser
      return <Exclude<typeof user, undefined>>user;
    },
    async logout(cont) {
      await axios.post("/logout").finally(() => {
        cont.commit("setCurrentUser", undefined);
      })
    }
  }
})
let _store = new Vuex.Store(opt);
let store = <{
  dispatch: <K extends keyof typeof opt.actions>(name: K, ...option: typeof opt.actions[typeof name] extends (a: any, ...b: infer X) => any ? X : never) => (ReturnType<typeof opt.actions[typeof name]> extends Promise<number> ? ReturnType<typeof opt.actions[typeof name]> : Promise<ReturnType<typeof opt.actions[typeof name]>>),
  commit: <K extends keyof typeof opt.mutations>(name: K, ...option: typeof opt.mutations[typeof name] extends (a: any, ...b: infer X) => any ? X : never) => (ReturnType<typeof opt.mutations[typeof name]>)
} & (Omit<typeof _store, "dispatch" | "commit">)>_store;
(async () => {
  try {
    let res = await axios.get("/currentUser");
    store.commit("setCurrentUser", res.data);
  } catch{

  }

})()
export default store
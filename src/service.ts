import _axios from "axios";
import { UserData, Lesson, Component, UploadReturnType, Word, Support } from "@/types";
import Axios from 'axios';
import store from './store';
//@vue/composition-api的bug，Object.keys(被监听的对象)有"__ob__"

const withOutOb = (() => {
  const _withOutOb = (obj: any): any => {
    if (typeof obj !== "object") { return obj; }
    return new Proxy(obj, {
      get: (target, prop) => _withOutOb(target[prop]),
      "ownKeys": obj => Object.keys(obj).filter(k => k != "__ob__")
    })
  }
  return (...obj: any[]): any[] => obj.map(o => JSON.parse(JSON.stringify(_withOutOb(o))))
})();

const axios = _axios.create({
  baseURL: "/",
});

export async function syncCurrentUser() {
  try {
    await _axios.head("/currentUser")
    if (!store.getters.currentUser) {
      store.commit("setCurrentUser", {
        info: (await _axios.get("/currentUser")).data,
        lesson: await getCurrentUserLesson(),
        component: await getCurrentUserComponent(),
      });
    }
  } catch (error) {
    if (error.response.status === 401) {
      return store.commit("setCurrentUser", undefined);
    }
    throw error;
  }
}
export async function afterLogined() {
  await syncCurrentUser();
  let user = store.getters.currentUser
  if (user) { return user; }
  try {
    await new Promise((res, rej) => store.commit("setLoginedCallback", { res, rej }));
    return store.getters.currentUser as Exclude<typeof user, undefined>;
  } catch (e) {
    throw e;
  } finally {
    store.commit("setLoginedCallback", undefined);
  }
}
export async function login(form: {
  username: string,
  password: string,
}) {
  [form] = withOutOb(form);
  let data = (await _axios.post("/login", form)).data;
  if (data.err) {
    throw data.err
  }
  await syncCurrentUser();
}

export async function logout() {
  await _axios.post("/logout").catch(() => { });
  store.commit("setCurrentUser", undefined);
}

//文件
export async function upload(formData: FormData, option: typeof axios.post extends (a: any, b: any, c: infer T) => any ? T : never) {
  [option] = withOutOb(Object.assign({}, option, { headers: { "Content-Type": "multipart/form-data" } }));
  return (await axios.post("/upload", formData, option)).data as UploadReturnType
}
export async function getComponentFile(componentId: string) {
  return (await axios.get(`/file/component/${componentId}`)).data as string;
}
//lesson
export async function getLessonList() {
  return (await axios.get("/lesson")).data as Lesson[];
}
async function getCurrentUserLesson() {
  return (await axios.get("/lesson/currentUser")).data as Lesson[];
}
export async function getLessonById(lessonId: string) {
  return (await axios.get(`/lesson/${lessonId}`)).data as Lesson;
}
export async function createLesson(lesson: Omit<Lesson, "id" | "owner">, support: Support[]) {
  [lesson, support] = withOutOb(lesson, support);
  let user = await afterLogined();
  await axios.post("/lesson", { lesson, support: support.map(s => s.id) });
  user.lesson.splice(0, user.lesson.length, ...await getCurrentUserLesson());
}
export async function deleteLesson(lesson: Lesson) {
  [lesson] = withOutOb(lesson);
  let user = await afterLogined();
  await axios.delete(`/lesson/${lesson.id}`);
  user.lesson.splice(0, user.lesson.length, ...await getCurrentUserLesson());
}
export async function syncLesson(lesson: Lesson, support: Support[]) {
  [lesson, support] = withOutOb(lesson, support);
  await axios.put(`/lesson/${lesson.id}`, {
    info: lesson.info,
    showing: lesson.showing,
    support: support.map(s => s.id)
  })
}
//word
export async function searchWordByDescribe(describe: string) {
  return (await axios.get(`/word/search/${describe}`)).data as Word[];
}
export async function getComponentSupportWord(component: Component) {
  [component] = withOutOb(component);
  return (await axios.get(`/word/component/${component.id}`)).data as Word[];
}
export async function getWordCollection(wordId: string[]) {
  return (await axios.post(`/word`, wordId)).data as Word[];
}

//component
async function getCurrentUserComponent() {
  return (await axios.get("/component/currentUser/")).data.map((v: Component) => new Component(v));
}
export async function deleteComponent(component: Component) {
  [component] = withOutOb(component);
  let user = await afterLogined();
  await axios.delete(`/component/${component.id}`);
  user.component.splice(0, user.component.length, ...await getCurrentUserComponent());
}
export async function createComponent(componentInfo: Component["info"], word: Word[], upload: UploadReturnType) {
  [componentInfo] = withOutOb(componentInfo);
  let user = await afterLogined();
  await axios.post(`/component?code=${upload.code}`,
    {
      info: componentInfo,
      word: word.map(w => w.id)
    });
  user.component.splice(0, user.component.length, ...await getCurrentUserComponent());
}
export async function syncComponent(component: Component, extra?: {
  word?: Word[],
  upload?: UploadReturnType,
}) {
  [component, extra] = withOutOb(component, extra);
  let data: any = { info: component.info };
  let params: any = {};
  if (extra) {
    if (extra.word) {
      Object.assign(data, { word: extra.word.map(w => w.id) })
    }
    if (extra.upload) {
      Object.assign(params, { code: extra.upload.code })
    }
  }
  await axios.put(`/component/${component.id}`, data, params)
}
export async function searchComponentByName(name: string) {
  return (await axios.get(`/component/search/${name}`)).data as Component[];
}
export async function getComponentCollection(componentId: string[]) {
  return await Promise.all(
    componentId.map(cId => axios.get(`/component/${cId}`).then(res => res.data as Component))
  )
}
//support
export async function getLessonContent(lesson: Lesson) {
  [lesson] = withOutOb(lesson);
  return (await Axios.get(`/support/lesson/${lesson.id}`)).data as Support[]
}
export async function getSupportByWord(word: Word) {
  return (await Axios.get(`/support/word/${word.id}`)).data as Support[]
}
export async function getSupportByComponent(component: Component) {
  return (await Axios.get(`/support/component/${component.id}`)).data as Support[]
}
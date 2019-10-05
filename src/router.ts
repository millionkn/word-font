import Vue from 'vue'
import Router from 'vue-router'
import PageContainer from '@/components/PageContainer.vue';
import axios from 'axios';
import Empty from "@/components/Empty.vue";
import store from './store';

Vue.use(Router)
let data: any;
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Empty.extend({
        beforeRouteEnter: async (to, from, next) => next(void (await store.dispatch("reloadCurrentUser"))),
        beforeRouteUpdate: async (to, from, next) => next(void (await store.dispatch("reloadCurrentUser"))),
      }),
      children: [{
        path: "/",
        component: PageContainer,
        children: [
          {
            path: "/login",
            name: "login",
            beforeEnter: (to, from, next) => next(void (data = from.path)),
            component: () => import("@/views/Login.vue"),
            props: () => ({
              currentPath: data,
            })
          },
          {
            path: "/",
            component: Empty,
            children: [
              {
                path: "lesson/:id",
                component: () => import("@/views/LessonShow.vue"),
                beforeEnter: async (to, from, next) => next(void (data = (await axios.get(`/lesson/${to.params.id}`)).data)),
                props: (route) => ({ data })
              },
              {
                path: "lesson",
                component: () => import("@/views/LessonList.vue"),
              },
              {
                path: "/",
                component: () => import("@/views/Home.vue"),
              },
              {
                path: "",
                component: Empty.extend({
                  beforeRouteEnter: (to, from, next) => next(store.state.currentUser ? undefined : { name: "login" }),
                  beforeRouteUpdate: (to, from, next) => next(store.state.currentUser ? undefined : { name: "login" }),
                }),
                children: [
                  {
                    path: "review/:id",
                    component: () => import("@/views/Review.vue"),
                    beforeEnter: async (to, from, next) => next(void (data = (await axios.get(`/lesson/${to.params.id}`)).data)),
                    props: () => ({
                      lesson: data,
                    })
                  },
                  {
                    path: "myLesson",
                    component: () => import("@/views/MyLessonList.vue"),
                    beforeEnter: async (to, from, next) => next(void (data = (await axios.get(`/currentUser/lessonList`)).data)),
                    props: (route) => ({ lessonList: data }),
                  },
                  {
                    path: "myComponent/upload",
                    component: () => import("@/views/CreateComponent.vue"),
                  },
                  {
                    path: "myComponent",
                    component: () => import("@/views/MyComponentList.vue"),
                    beforeEnter: async (to, from, next) => next(void (data = (await axios.get("/currentUser/component")).data)),
                    props: () => ({ componentList: data })
                  },
                ],
              },
            ]
          }
        ]
      }
      ]
    },
  ]
})
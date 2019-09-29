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
      component: Empty,
      async beforeEnter(to, from, next) {
        await store.dispatch("reloadCurrentUser")
        next();
      },
      children: [{
        path: "/",
        component: PageContainer,
        children: [
          {
            path: "/login",
            name: "login",
            beforeEnter(to, from, next) {
              data = from.path;
              next();
            },
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
                path: "review/:id",
                component: () => import("@/views/Review.vue"),
                async beforeEnter(to, from, next) {
                  if (!store.state.currentUser) {
                    return next({ name: "login" })
                  }
                  data = (await axios.get(`/lesson/${to.params.id}`)).data;
                  next()
                },
                props: () => ({
                  lesson: data,
                })
              },
              {
                path: "lesson/:id",
                component: () => import("@/views/LessonShow.vue"),
                beforeEnter: async (to, from, next) => {
                  data = (await axios.get(`/lesson/${to.params.id}`)).data;
                  next();
                },
                props: (route) => ({ data })
              },
              {
                path: "lesson",
                component: () => import("@/views/LessonList.vue"),
              },
              {
                path: "/",
                name: "home",
                component: () => import("@/views/Home.vue"),
                children: [
                  {
                    path: "myLesson",
                    component: () => import("@/views/MyLessonList.vue"),
                    beforeEnter: async (to, from, next) => {
                      data = (await axios.get(`/currentUser/lessonList`)).data;
                      next();
                    },
                    props: (route) => ({ lessonList: data }),
                  },
                  {
                    path: "",
                    component: () => import("@/views/Panel.vue"),
                  },
                ]
              },

            ]
          }
        ]
      }
      ]
    },
  ]
})
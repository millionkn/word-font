import Vue from 'vue'
import Router, { Route, RouteConfig, Location } from 'vue-router';
import PageContainer from '@/components/PageContainer';
import { getLessonById, getLessonList, syncCurrentUser, afterLogined } from "@/service";
import Empty from "@/components/Empty";
import store from '@/store';
import { propMethod as propLessonInstanceShow } from "@/views/LessonInstanceShow"
import { propMethod as propLessonList } from "@/views/LessonList"
import { propMethod as propReview } from "@/views/Review";
import { propMethod as propMyLessonList } from "@/views/MyLessonList";
import { propMethod as propMyComponentList } from "@/views/MyComponentList";
import { propMethod as propCreateComponent } from "@/views/CreateComponent";
import { propMethod as propCreateLesson } from "@/views/CreateLesson";
function asyncProp<T extends () => {}>(
  callback: (to: Route, from: Route) => Promise<ReturnType<T>>
) {
  let getter: () => ReturnType<T>;
  return {
    beforeEnter: <RouteConfig['beforeEnter']>(async (to, from, next) => {
      let data = await callback(to, from);
      getter = () => data;
      next();
    }),
    props: () => {
      return ({
        prop: getter
      })
    }
  }
};
Vue.use(Router);
let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Empty.extend({
        beforeRouteEnter: async (to, from, next) => next(void (await syncCurrentUser())),
        beforeRouteUpdate: async (to, from, next) => next(void (await syncCurrentUser())),
      }),
      children: [{
        path: "/",
        component: PageContainer,
        children: [
          {
            path: "lesson",
            component: Empty,
            meta: {
              toolBar: {
                path: "/lesson"
              }
            },
            children: [
              {
                path: ":id",
                component: () => import("@/views/LessonInstanceShow"),
                ...asyncProp<propLessonInstanceShow>(async (to, from) => ({
                  lesson: await getLessonById(to.params.id),
                  lessonList: store.getters.currentUser ? store.getters.currentUser.lesson : [],
                }))
              },
              {
                path: "",
                component: () => import("@/views/LessonList"),
                ...asyncProp<propLessonList>(async (to, from) => ({
                  lesson: await getLessonList()
                }))
              },
            ],
          },

          {
            path: "/",
            meta: {
              toolBar: {
                path: "/",
              },
            },
            component: () => import("@/views/Home"),
          },
          {
            path: "review/:id",
            component: () => import("@/views/Review"),
            ...asyncProp<propReview>(async (to, from) => {
              await afterLogined();
              return {
                lesson: await getLessonById(to.params.id),
              }
            }),
          },
          {
            path: "myLesson/create",
            component: () => import("@/views/CreateLesson"),
            ...asyncProp<propCreateLesson>(async () => ({
              lesson: (await afterLogined()).lesson,
            }))
          },
          {
            path: "myLesson",
            component: () => import("@/views/MyLessonList"),
            ...asyncProp<propMyLessonList>(async (to, from) => ({
              lessonList: (await afterLogined()).lesson
            })),
          },
          {
            path: "myComponent/create",
            component: () => import("@/views/CreateComponent"),
            ...asyncProp<propCreateComponent>(async () => ({
              component: (await afterLogined()).component
            }))
          },
          {
            path: "myComponent",
            component: () => import("@/views/MyComponentList"),
            ...asyncProp<propMyComponentList>(async () => ({
              component: (await afterLogined()).component
            })),
          },
        ]
      }
      ]
    },
  ]
});
export default router;
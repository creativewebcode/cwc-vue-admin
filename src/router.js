import Vue from "vue";
import Router from "vue-router";
import Meta from "vue-meta";

Vue.use(Router);

Vue.use(Meta, {
  keyName: "metaInfo",
  attribute: "data-vue-meta",
  ssrAttribute: "data-vue-meta-server-rendered",
  tagIDKeyName: "vmid",
  refreshOnceOnNavigation: true
});

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("@/view/layout/Layout"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/view/pages/Dashboard.vue")
        },
        {
          path: "/tree-menu",
          name: "tree-menu",
          component: () => import("@/view/pages/tree-menu/TreeMenu.vue"),
          children: [
            {
              path: "menu-v",
              name: "menu-v",
              component: () => import("@/view/pages/tree-menu/MenuV.vue")
            },
            {
              path: "last-v",
              name: "last-v",
              component: () => import("@/view/pages/tree-menu/LastV.vue")
            }
          ]
        },
        {
          path: "/wizard",
          name: "wizard",
          component: () => import("@/view/pages/wizard/Wizard.vue")
        }
      ]
    },
    {
      path: "/error",
      name: "error",
      component: () => import("@/view/pages/error/Error.vue")
    },
    {
      path: "/",
      component: () => import("@/view/pages/auth/Auth"),
      children: [
        {
          name: "login",
          path: "/login",
          component: () => import("@/view/pages/auth/Login")
        },
        {
          name: "register",
          path: "/register",
          component: () => import("@/view/pages/auth/Register")
        },
        {
          name: "forgotPassword",
          path: "/forgot-password",
          component: () => import("@/view/pages/auth/ForgotPassword")
        }
      ]
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      // the 404 route, when none of the above matches
      path: "/404",
      name: "404",
      component: () => import("@/view/pages/error/Error.vue")
    }
  ]
});

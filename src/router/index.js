/*
  `isShow` is online link route, if key = true jump to routers, default `false`
  `icon`: 'el-icon-menu', default `...`
*/
import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

const Layout = () => import("@/views/layout");
const Index = () => import("@/views/index");
const EditConfig = () => import("@/views/edit-config/index");
const Error = () => import("@/views/error");

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home
  // },
  {
    path: "/",
    name: "home",
    component: Index,
    redirect: "/index"
  },

  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
  {
    path: "/layout",
    name: "layout",
    component: Layout
  },

  {
    path: "/index",
    name: "首页",
    component: Layout,
    isShow: true,
    children: [
      {
        path: "/index",
        name: "首页",
        component: Index,
        isShow: true
      }
    ]
  },
  {
    // 博客增删改查内容
    path: "/edit-config",
    name: "编辑",
    component: Layout,
    isShow: true,
    children: [
      {
        path: "/edit-config",
        name: "博客配置",
        // component: _import('@/views/edit-config/index'),
        component: EditConfig,
        isShow: true
      }
    ]
  },

  {
    // 404 页面重定向
    path: "*",
    name: "error",
    alias: "404",
    // redirect: '/404', 重定向与否都可以
    component: Error
  }
];

const router = new VueRouter({
  routes
});

export default router;

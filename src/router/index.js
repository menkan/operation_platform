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
  {
    path: "/",
    name: "home",
    component: Index,
    redirect: "/index"
  },
  {
    path: "/layout",
    name: "layout",
    component: Layout
  },

  {
    path: "/index",
    component: Layout,
    isShow: true,
    children: [
      {
        path: "",
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
        path: "index",
        name: "博客配置",
        // component: _import('@/views/edit-config/index'),
        component: EditConfig,
        isShow: true
      }
    ]
  },

  {
    // 博客增删改查内容
    path: "/text1",
    name: "测试1",
    component: Layout,
    isShow: true,
    children: [
      {
        path: "index",
        name: "测试1-1",
        component: () => import("@/views/test/test1"),
        isShow: true
      },
      {
        path: "index2",
        name: "测试1-2",
        component: () => import("@/views/test/test2"),
        isShow: true
      },
      {
        path: "index3",
        name: "测试1-3",
        component: () => import("@/views/test/test3"),
        isShow: true
      }
    ]
  },

  {
    // 404 页面重定向
    path: "*",
    name: "error",
    alias: "/404",
    // redirect: '/404', 重定向与否都可以
    component: Error
  }
];

const router = new VueRouter({
  routes
});

export default router;

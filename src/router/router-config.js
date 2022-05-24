import VueRouter from "vue-router";

const routeConfig = [
  { path: "/", redirect: "/hello" },
  {
    name: "hello",
    path: "/hello",
    component: () => import("../components/HelloWorld"),
  },
  {
    name: "element-test",
    path: "/element-test",
    component: () => import("../components/ElementTest"),
  },
];

const router = new VueRouter({
  mode: "history", //默认hash
  routes: routeConfig,
});

export default router;

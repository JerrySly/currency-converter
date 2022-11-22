import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Converter",
    component: () => import("@/views/ConverterView.vue"),
  },
  {
    path: "/currencies",
    name: "Сurrencies",
    component: () => import("@/views/СurrenciesView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/document",
      name: "document",
      component: () => import("../views/DocumentView.vue"),
    },
    {
      path: "/config",
      name: "config",
      component: () => import("../views/ConfigView.vue"),
    },
    {
      path: "/pdf_edit",
      name: "pdf_edit",
      component: () => import("../views/PdfEditView.vue"),
    },
  ],
});

export default router;

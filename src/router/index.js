import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
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
      children: [
        {
          path: "signs",
          name: "signs",
          component: () => import("../views/ConfigView_Signs.vue"),
        },
        {
          path: "tags",
          name: "tags",
          component: () => import("../views/ConfigView_Tags.vue"),
        },
      ],
    },
    {
      path: "/pdf_edit",
      name: "pdf_edit",
      component: () => import("../views/PdfEditView.vue"),
    },
  ],
});

export default router;

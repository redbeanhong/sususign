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
      path: "/pdf_edit/:pdfId",
      name: "pdf_edit",
      props: true,
      component: () => import("../views/PdfEditView.vue"),
    },
    {
      path: "/pdf_download/:pdfId",
      name: "pdf_download",
      props: true,
      component: () => import("../views/DownloadView.vue"),
    },
  ],
});

export default router;

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "index",
        component: () => import("pages/Index.vue"),
        meta: {
          title: "主页"
        }
      },
      {
        path: "login",
        name: "login",
        component: () => import("pages/Login.vue"),
        meta: {
          title: "登录"
        }
      },
      {
        path: "*",
        component: () => import("pages/Error404.vue"),
        meta: {
          title: "页面不存在"
        }
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;

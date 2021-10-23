module.exports = {
  router: {
    // 自定义路由表规则
    extendRoutes(routes, resolve) {
      // 清除Nuxt.js基于pages目录生成的路由表规则
      routes.splice(0);
      routes.push(
        ...[
          {
            path: "/",
            component: resolve(__dirname, "pages/layout"),
            children: [
              {
                path: "", // 默认子路由
                name: "home",
                component: resolve(__dirname, "pages/Home"),
              },
              {
                path: "/login",
                name: "login",
                component: resolve(__dirname, "pages/login"),
              },
              {
                path: "/register",
                name: "register",
                component: resolve(__dirname, "pages/login"),
              },
              {
                path: "/profile/:username",
                name: "profile",
                component: resolve(__dirname, "pages/profile/"),
              },
              {
                path: "/settings",
                name: "settings",
                component: resolve(__dirname, "pages/settings/"),
              },
              {
                path: "/editor/:slug?",
                name: "editor",
                component: resolve(__dirname, "pages/editor/"),
              },
              {
                path: "/article/:slug",
                name: "article",
                component: resolve(__dirname, "pages/article/"),
              },
            ],
          },
        ]
      );
    },
  },
  plugins: [
    "~/plugins/request.js", // 波浪线开头表示从根路径触发
    "~/plugins/dayjs.js",
  ],
  server: {
    host: "0.0.0.0", // 监听所有外网地址。在生产环境服务器上外网环境就能访问到了，在本地的话，局域网都能访问到了
    port: 3000,
  },
  head: {
    title: "realworld-demo案例",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "my website description",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
};

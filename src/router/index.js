import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function(/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });
  const defaultTitle = "CodingFirst | 一码当先";
  Router.beforeEach((to, from, next) => {
    if (to.meta.title) {
      if (to.name === "Submit") {
        to.meta.title = "题目 - " + to.query.pid;
      } else if (to.name === "VJSubmit") {
        to.meta.title = "VJudge题目 " + to.query.OJId + "-" + to.query.ProbNum;
      } else if (to.name === "Contest") {
        var name = "";
        if (to.query.kind === "0") {
          name = "练习";
        } else if (to.query.kind === "1") {
          name = "积分";
        } else if (to.query.kind === "2") {
          name = "趣味";
        } else if (to.query.kind === "3") {
          name = "正式";
        } else if (to.query.kind === "5") {
          name = "自定义";
        }
        to.meta.title = "比赛 - " + name;
      }
      document.title = to.meta.title;
    } else {
      document.title = defaultTitle;
    }
    document.title = to.meta.title
      ? "CodingFirst | " + to.meta.title
      : defaultTitle;
    next();
  });
  return Router;
}

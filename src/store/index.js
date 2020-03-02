import Vue from "vue";
import Vuex from "vuex";

import global from "./global";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      global
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  /*
    如果我们需要一些HMR魔术，我们会处理
    下面的热点更新。 注意我们实现这个
    用“process.env.DEV”代码 - 所以这不会
    进入我们的生产版本（也不应该）。
  */
  if (process.env.DEV && module.hot) {
    module.hot.accept(["./global"], () => {
      const newGlobal = require("./global").default;
      Store.hotUpdate({
        modules: {
          global: newGlobal
        }
      });
    });
  }
  return Store;
}

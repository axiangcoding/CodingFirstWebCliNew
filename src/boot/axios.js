import Vue from "vue";
import axios from "axios";
import { Notify, Dialog } from "quasar";
import router from "vue-router";
import store from "../store/index";

axios.defaults.baseURL = process.env.API;
axios.defaults.timeout = 15000;
axios.defaults.headers.common["token"] = store().state.global.token;

axios.interceptors.response.use(
  res => {
    if (res.data.code === 10001) {
      Notify.create({
        message: "资源不存在",
        caption: "请求的资源不存在",
        color: "negative",
        icon: "error"
      });
    } else if (res.data.code === 20001) {
      Notify.create({
        message: "未登录",
        caption: "您未登录，请登录后查看",
        color: "negative",
        icon: "error"
      });
    } else if (res.data.code === 20002) {
      Notify.create({
        message: "权限不足",
        caption: "权限不足，请联系管理员",
        color: "negative",
        icon: "error"
      });
    } else if (res.data.code === 20003) {
      Dialog.create({
        title: "认证过期",
        message:
          "您的认证已过期，可能已在其他地方登录，如果您有疑问，请联系管理员",
        color: "negative",
        icon: "error",
        ok: {
          label: "重新登录"
        },
        persistent: true
      }).onOk(() => {
        store.commit("global/logout");
        window.location.href = "/login?relogin=true";
        // router.push("/register");
      });
      // TODO: 弹出对话框
    } else if (res.data.code === 30001) {
      Notify.create({
        message: "系统问题",
        caption: "业务执行失败，系统可能出现了问题，请稍后重试",
        color: "negative",
        icon: "error"
      });
    } else if (res.data.code === 30002) {
      Notify.create({
        message: "服务端异常",
        caption: res.data.msg,
        color: "negative",
        icon: "error"
      });
    } else {
      return res;
    }
    return res;
  },
  error => {
    console.log(error);
    if (
      String(error)
        .toLowerCase()
        .indexOf("error") !== -1
    ) {
      Notify.create({
        message: "服务端异常",
        caption: "服务器繁忙，请稍后重试！",
        color: "negative",
        icon: "error"
      });
    } else if (error.response.status === 404) {
      Notify.create({
        message: "服务端异常",
        caption: "服务器好像挂了，要不等等试试",
        color: "negative",
        icon: "error"
      });
    } else if (error.response.status === 500) {
      Notify.create({
        message: "服务端异常",
        caption: "服务器好像出现了问题：" + error.response.data.msg,
        color: "negative",
        icon: "error"
      });
    } else {
      Notify.create({
        message: "服务端异常",
        caption: error,
        color: "negative",
        icon: "error"
      });
    }
    return Promise.reject(error);
  }
);

var http = {
  /** get 请求
   * @param  {接口地址} url
   * @param  {请求参数} params
   */
  get: function(url, params) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: url,
        params: params
      })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /** post 请求
   * @param  {接口地址} url
   * @param  {请求参数} params
   */
  post: function(url, params) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: url,
        // 放在请求体内
        data: params
      })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  uploadFile: function(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: url,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

Vue.prototype.$axios = http;

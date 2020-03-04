<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="bg-primary">
        <span class="text-h6 text-white">Bug反馈</span>
      </q-card-section>
      <q-form @submit="onSubmit()">
        <q-card-section class="q-gutter-y-md">
          <q-input disable filled v-model="data.username" label="登录账号" />
          <q-input disable filled v-model="data.currentPath" label="当前所在页面" />
          <q-select
            filled
            v-model="data.bugType"
            :options="bugTypeOptions"
            emit-value
            map-options
            label="Bug类型"
            :rules="[ val => val!=='' || '你想报告哪种类型的BUG？' ]"
          />
          <q-input
            ref="title"
            filled
            v-model="data.title"
            label="BUG标题"
            :rules="[val => !!val && val.length > 0 || '至少写个标题吧']"
          />
          <q-input type="textarea" filled v-model="data.text" label="BUG内容" />
          <q-toggle :disable="disableAnonymous" v-model="data.anonymous" label="匿名（如果未登录默认为匿名）" />
        </q-card-section>
        <!-- 按钮示例 -->
        <q-card-actions align="right">
          <q-btn color="negative" label="取消" @click="onCancelClick" />
          <q-btn type="submit" color="primary" label="提交BUG" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { date } from "quasar";
export default {
  props: {
    // ...你自定义的属性
  },
  data() {
    return {
      data: {
        username: this.$store.getters["global/getUsername"],
        currentPath: this.$route.path,
        // 初始化bug类型需要传对象
        bugType: "",
        title: "",
        text: "",
        anonymous: false
      },
      disableAnonymous: false,
      bugTypeOptions: []
    };
  },
  mounted() {
    this.getBugTypeOptions();
    if (!this.$store.getters["global/getIsLogin"]) {
      this.data.anonymous = true;
      this.disableAnonymous = true;
    }
  },
  methods: {
    onSubmit() {
      // this.$refs.title.validate();
      // if (this.$refs.title.hasError) {
      //   this.formHasError = true;
      //   return;
      // }
      this.reportBug();
    },
    async getBugTypeOptions() {
      let data = await this.$axios.get("/util/bugTypes");
      this.bugTypeOptions = data.datas[0];
    },
    async reportBug() {
      let params = new URLSearchParams();
      params.append("username", this.data.anonymous ? "" : this.data.username);
      params.append("currentPath", this.data.currentPath);
      params.append("type", this.data.bugType);
      params.append("title", this.data.title);
      params.append("text", this.data.text);
      let data = await this.$axios.post("/bug/report", params);
      if (data.code === 10000) {
        this.$q.notify({
          icon: "check",
          color: "positive",
          message: "BUG提交成功",
          caption: "请留意系统消息哦"
        });
      } else {
        this.$q.notify({
          icon: "error",
          color: "negative",
          message: "BUG提交失败",
          caption: "请稍后重试"
        });
        return;
      }
      this.onOKClick();
    },
    // 以下方法是必需的
    // (不要改变它的名称 --> "show")
    show() {
      this.$refs.dialog.show();
    },
    // 以下方法是必需的
    // (不要改变它的名称 --> "hide")
    hide() {
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      // QDialog发出“hide”事件时
      // 需要发出
      this.$emit("hide");
    },
    async onOKClick() {
      // 按OK，在隐藏QDialog之前
      // 发出“ok”事件（带有可选的有效负载）
      // 是必需的
      this.$emit("ok");
      // 或带有有效负载：this.$emit('ok', { ... })
      // 然后隐藏对话框
      this.hide();
    },

    onCancelClick() {
      // 我们只需要隐藏对话框
      this.hide();
    }
  }
};
</script>

<style lang="scss" scoped>
.q-dialog-plugin {
  width: 35%;
}
</style>

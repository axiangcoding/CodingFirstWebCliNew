<template>
  <q-page class="body1">
    <q-card class="shadow-6 my-card fixed-center">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">欢迎登录！</div>
      </q-card-section>
      <q-form @submit="onSubmit" @reset="onReset">
        <q-card-section class="bg-white text-black">
          <q-input
            v-model="loginName"
            class="q-mb-lg"
            color="blue"
            filled
            label="用户名"
            lazy-rules
            :rules="[
          val => val !== null && val !== '' || '请输入用户名',
          val => val.length > 4 && val.length < 16 || '4 - 16个字符'
        ]"
          />

          <q-input
            color="blue"
            v-model="loginPwd"
            filled
            :type="isPwd ? 'password' : 'text'"
            label="密码"
            :rules="[
          val => val !== null && val !== '' || '请输入密码',
          val => val.length > 4 && val.length < 16 || '4 - 16个字符'
        ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-checkbox v-model="rememberPwd" label="记住密码" />
        </q-card-section>
        <q-card-actions align="around">
          <q-btn glossy type="reset" color="secondary" size="lg" flat>重 置</q-btn>
          <q-btn glossy type="submit" color="primary" size="lg">登 录</q-btn>
        </q-card-actions>
        <div class="row justify-between">
          <q-btn size="md" class="col-4" flat color="red">忘记密码？</q-btn>
          <q-btn size="md" class="col-4" flat color="red">没有账号？注册一个</q-btn>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      loginName: "",
      loginPwd: "",
      rememberPwd: false,
      isPwd: true
    };
  },
  mounted() {
    if (this.$route.query.relogin) {
      this.$q.notify({
        message: "已退出登录",
        caption: "你已退出登录，欢迎再次回来哦",
        color: "warning",
        icon: "warning",
        timeout: 2000
      });
      this.$store.commit("global/logout");
    } else {
    }
  },
  methods: {
    onSubmit() {
      this.doLogin();
    },
    onReset() {
      this.loginName = "";
      this.loginPwd = "";
      this.rememberPwd = false;
    },
    doRegister() {},
    async doLogin() {
      let params = new URLSearchParams({
        username: this.loginName,
        password: this.loginPwd
      });
      let data = await this.$axios.post("/user/login", params);
      if (data.code === 10000) {
        this.$store.commit("global/setIsLogin", true);
        this.$store.commit("global/setUsername", data.datas[0]);
        this.$store.commit("global/setToken", data.datas[1]);
        this.$store.commit("global/setPrivateInfo", data.datas[2]);
        this.$router.push("/");
        this.$q.notify({
          message: "登录成功",
          caption: "欢迎回来，亲爱的" + data.datas[0],
          color: "positive",
          icon: "done",
          timeout: 2000
        });
      }
      // this.$store.commit("global/setToken", "token");
      // this.$store.commit("global/setUsername", "username");
      // console.log(this.$store.state.global.token);
    }
  }
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 35%;
}
</style>

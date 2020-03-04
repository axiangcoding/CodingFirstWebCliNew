<template>
  <q-page class="row">
    <q-space class="col"></q-space>
    <q-card class="col-4 q-my-xl shadow-6 my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">欢迎登录！</div>
      </q-card-section>
      <q-form @submit="onSubmit" @reset="onReset">
        <q-card-section>
          <q-input
            v-model="loginName"
            class="q-mb-lg"
            color="blue"
            filled
            label="用户名"
            lazy-rules
            :rules="[
          val => val !== null && val !== '' || '请输入用户名',
          val => val.length > 4 && val.length < 16 || '4 - 16个字符']"
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
          <q-checkbox v-model="rememberPwd" label="记住密码（请确保是本人的电脑）" />
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
    <q-space class="col"></q-space>
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
    console.log(this.rememberPwd);
    this.rememberPwd = this.$q.cookies.has("rememberPwd")
      ? this.$q.cookies.get("rememberPwd")
      : this.rememberPwd;
    this.loginName = this.$q.cookies.has("loginName")
      ? this.$q.cookies.get("loginName")
      : this.loginName;
    this.loginPwd = this.$q.cookies.has("loginPwd")
      ? this.$q.cookies.get("loginPwd")
      : this.loginPwd;
  },
  methods: {
    onSubmit() {
      this.$q.cookies.set("rememberPwd", this.rememberPwd);
      if (this.rememberPwd) {
        this.$q.cookies.set("loginName", this.loginName);
        this.$q.cookies.set("loginPwd", this.loginPwd);
      } else {
        this.$q.cookies.remove("loginName");
        this.$q.cookies.remove("loginPwd");
      }
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
        this.$router.push({ name: "index" });
        this.$q.notify({
          message: "登录成功",
          caption: "欢迎回来，亲爱的" + data.datas[0],
          color: "positive",
          icon: "done",
          timeout: 2000
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.my-card {
}
</style>

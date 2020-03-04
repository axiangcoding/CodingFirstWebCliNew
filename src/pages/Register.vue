<template>
  <q-page>
    <q-banner class="row text-white bg-positive">欢迎注册一码当先账号，拥有账号可以体验更多内容哦。内测时期注册的账号将获得特有称号（称号系统上线时）</q-banner>
    <div class="row">
      <q-space class="col"></q-space>
      <q-card class="col-5 q-my-xl my-card shadow-6">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">注册账号</div>
        </q-card-section>
        <q-form @submit="onSubmit()" @reset="onReset()">
          <q-card-section>
            <q-input
              v-model="data.username"
              color="blue"
              filled
              clearable
              label="用户名"
              placeholder="用户名是登录的唯一方式"
              lazy-rules
              :rules="[
          val => val !== null && val !== '' || '用户名不能为空',
          val => val.length > 4 && val.length < 16 || '4 - 16个字符',
          val => /^\w+$/.test(val) || '请输入数字、字母或者下划线' ]"
            />
            <q-input
              color="blue"
              v-model="data.password"
              filled
              clearable
              type="password"
              label="密码"
              placeholder="密码最好复杂点"
              :rules="[
          val => val !== null && val !== '' || '密码不能为空',
          val => val.length > 4 && val.length < 16 || '4 - 16个字符',
          val => /^\w+$/.test(val) || '请输入数字、字母或者下划线'
        ]"
            />
            <q-input
              color="blue"
              v-model="data.checkPassword"
              filled
              clearable
              type="password"
              label="确认密码"
              :rules="[
          val => val !== null && val !== '' || '请确认密码',
          val => val===this.data.password || '两次输入的密码不一致'
        ]"
            />
            <q-input
              v-model="data.nickname"
              color="blue"
              filled
              clearable
              label="昵称"
              placeholder="昵称让你变得高端"
              lazy-rules
              :rules="[
          val => val !== null && val !== '' || '昵称不能为空',
          val => val.length > 0 && val.length < 8 || '1 - 8个字符',
           ]"
            />

            <q-btn-toggle
              v-model="data.gender"
              toggle-color="primary"
              class="q-mb-md"
              :options="[
          {label: '保密', value: '0'},
          {label: '男', value: '1'},
          {label: '女', value: '2'}
        ]"
            />
            <q-input
              v-model="data.email"
              color="blue"
              clearable
              filled
              label="邮箱"
              placeholder="邮箱是找回密码的唯一方式"
              lazy-rules
              :rules="[
          val => val !== null && val !== '' || '邮箱不能为空',
          val => /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(val) || '你肯定是瞎填的'
           ]"
            />
            <q-input
              v-model="data.phone"
              color="blue"
              clearable
              filled
              label="联系方式"
              placeholder="填个电话，万一搞活动中奖了呢"
              lazy-rules
              :rules="[
          val => val !== null && val !== '' || '联系方式不能为空',
          val => /^(13[0-9]{9})|(15[0-9][0-9]{8})|(18[0-9][0-9]{8})$/.test(val) || '这么奇怪的数字肯定不是手机号',
           ]"
            />
            <q-input
              v-model="data.motto"
              autogrow
              color="blue"
              clearable
              filled
              label="个人宣言"
              placeholder="随便说两句，让大家知道你是谁，不说也行"
            />
            <AvatarUploader class="q-my-md" :doUpload="doUpload" @returnUrl="getAvatarUrl" />
          </q-card-section>
          <q-card-actions align="around">
            <q-btn glossy type="reset" color="secondary" size="lg">重置内容</q-btn>
            <q-btn glossy type="submit" color="primary" size="lg">注册账号</q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
      <q-space class="col"></q-space>
    </div>
  </q-page>
</template>

<script>
import AvatarUploader from "components/AvatarUploader.vue";
export default {
  components: {
    AvatarUploader
  },
  data() {
    return {
      data: {
        username: "",
        password: "",
        checkPassword: "",
        nickname: "",
        gender: "",
        email: "",
        phone: "",
        motto: "",
        avatarUrl: ""
      },
      // 触发上传
      doUpload: false,
      // 是否上传完成
      uploadCompleted: false,
      uploadAvatarUrl: process.env.API + "/upload/avatar"
    };
  },
  watch: {
    uploadCompleted(val) {
      if (val) {
        this.doRegister();
      }
    }
  },
  methods: {
    onSubmit() {
      this.doUpload = true;
    },
    onReset() {
      this.data = {
        username: "",
        password: "",
        checkPassword: "",
        nickname: "",
        gender: "",
        email: "",
        phone: "",
        motto: "",
        avatarUrl: ""
      };
    },
    getAvatarUrl(val) {
      this.data.avatarUrl = val;
      this.uploadCompleted = true;
    },
    async doRegister() {
      let params = new URLSearchParams();
      params.append("username", this.data.username);
      params.append("password", this.data.password);
      params.append("nickname", this.data.nickname);
      params.append("gender", this.data.gender);
      params.append("email", this.data.email);
      params.append("phone", this.data.phone);
      params.append("motto", this.data.motto);
      params.append("avatarUrl", this.data.avatarUrl);
      let data = await this.$axios.post("/user/register", params);
      if (data.code === 10000) {
        this.$q.notify({
          message: "账号注册成功！",
          caption: "现在快登录一下吧！",
          icon: "check",
          color: "positive"
        });
        this.$router.push({ name: "index" });
      } else {

      }
      console.log(this.data);
    }
  }
};
</script>

<style lang="scss" scoped>
.my-card {
  min-height: 600px;
}
</style>

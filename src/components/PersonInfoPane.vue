<template>
  <div>
    <div class="row no-wrap q-pa-md">
      <div style="max-width: 200px">
        <div class="text-h6 q-mb-md">个人面板</div>
        <div class="q-gutter-x-sm q-gutter-y-sm">
          <q-btn color="positive" label="每日签到" />
          <q-btn color="accent" label="个人信息" />
          <q-btn color="info" label="系统消息" />
          <q-btn color="warning" label="修改资料" />
        </div>
      </div>
      <q-separator vertical inset class="q-mx-lg" />
      <div class="column items-center">
        <q-avatar size="72px">
          <img :src="this.$store.getters['global/getPrivateInfo'].avatarUrl" />
        </q-avatar>

        <div
          class="text-subtitle1 q-mt-md q-mb-xs"
        >{{this.$store.getters['global/getPrivateInfo'].nickname}}</div>

        <q-btn color="primary" label="退出登录" push size="sm" @click="doLogOut()" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    doLogOut() {
      this.$store.commit("global/logout");
      this.$q.notify({
        message: "已退出登录",
        caption: "你已退出登录，欢迎再次回来哦",
        color: "warning",
        icon: "warning",
        timeout: 2000
      });
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

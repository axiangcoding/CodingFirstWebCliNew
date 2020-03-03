<template>
  <div class="robot-body fixed-bottom-left z-top">
    <div v-if="showRobot">
      <q-img class="robot-img row" :src="robotUrl" spinner-color="white">
        <q-tooltip v-model="showText" anchor="top right" self="top middle">{{text}}</q-tooltip>
      </q-img>
      <q-btn color="negative" size="md" @click="shutdownRobot()">点我消灭机器人</q-btn>
    </div>
    <div v-else>
      <q-tooltip anchor="top right" self="top bottom">点我召唤敢敢</q-tooltip>
      <q-btn color="secondary" round icon="chat" @click="openRobot()"></q-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: "",
      showRobot: true,
      showText: true,
      text: "你好，我是敢敢，不智能的智能机器人",
      robotUrl: "https://i.loli.net/2019/12/13/TnkKVyBZjA8aLc7.gif"
    };
  },
  watch: {
    $route: "changePage"
  },
  mounted() {
    let _this = this;
    this.time = setInterval(() => {
      //
    }, 6000);
  },
  methods: {
    changePage() {
      this.showText = false;
      if (this.time) {
        clearInterval(this.time);
      }
      switch (this.$route.name) {
        case "index":
          this.text = "欢迎来到CodingFirst，点我查看更多好玩的内容哦";
          break;
        case "login":
          this.text = "欢迎登录，登录后享受更多内容哦";
          break;
        default:
          this.text = "好无聊啊，我什么时候才能变聪明";
          break;
      }
      this.showText = true;
      this.time = setInterval(() => {
        this.showText = false;
      }, 6000);
    },
    shutdownRobot() {
      this.showRobot = false;
    },
    openRobot() {
      this.showRobot = true;
    }
  },
  beforeDestroy() {
    if (this.time) {
      clearInterval(this.time);
    }
  }
};
</script>

<style lang="scss" scoped>
.robot-body {
  left: 20px;
  bottom: 20px;
  .robot-img {
    width: 150px;
    height: 150px;
  }
}
</style>

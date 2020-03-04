<template>
  <q-layout view="hHh lpR fff">
    <q-header class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar color="light-blue">
            CF
            <!-- <img src="https://i.loli.net/2020/03/02/hzBesEd89T42JUL.png" /> -->
          </q-avatar>&emsp;一码当先 | CodingFirst
        </q-toolbar-title>
        <q-space />
        <div v-if="!this.$store.getters['global/getIsLogin']">
          <q-tabs inline-label indicator-color="#ffffff">
            <q-route-tab icon="person_add" to="/register" label="注册" />
            <q-route-tab icon="person" to="/login" label="登录" />
          </q-tabs>
        </div>
        <div v-else>
          <q-btn icon="person" :label="fullNickname" class="glossy" color="secondry">
            <q-menu>
              <PersonInfoPane></PersonInfoPane>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>

      <q-tabs class="glossy" align="left" inline-label indicator-color="blue">
        <q-route-tab icon="home" to="/" label="主 页" />
        <q-route-tab icon="menu" to="/problem-list" label="题 库" />
        <!-- <q-btn-dropdown auto-close stretch flat icon="menu" label="题 库">
          <q-list avatar>
            <q-item clickable>
              <q-item-section icon="chevron_right">本地题库</q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section icon="chevron_right">VJ题库</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>-->
        <q-route-tab icon="gavel" to="/" label="评 测" />
        <q-route-tab icon="receipt" to="/" label="比 赛" />
        <q-route-tab icon="format_list_numbered" to="/" label="排 名" />
        <q-route-tab icon="chat_bubble" to="/" label="讨 论" />
        <q-route-tab icon="store_mall_directory" to="/" label="商 城" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
      <!-- place QPageScroller at end of page -->
      <!-- 回到顶部组件 -->
      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="primary" />
      </q-page-scroller>
    </q-page-container>

    <q-footer class="bg-grey-8 text-white my-footer">
      <div class="row justify-center">
        <div class="text-h4">
          CodingFirst
          <q-badge color="warning">v1.0.0 TEST</q-badge>
        </div>
      </div>
      <div class="row justify-center">
        <q-btn-group outline>
          <q-btn outline color="white" label="Bug反馈" @click="openBugReport()" />
          <q-btn outline color="white" label="FAQ" />
          <q-btn outline color="white" label="开发日志" />
          <q-btn outline color="white" label="开发团队" />
          <q-btn outline color="white" label="加入我们" />
          <q-btn outline color="white" label="闽ICP备19024997号" />
        </q-btn-group>
      </div>
      <div class="row justify-center text-h7 text-amber-7">
        Power by&nbsp;
        <q-icon name="copyright" />&nbsp;福建工程学院 - OJ项目组
      </div>
    </q-footer>
    <CleverRobot></CleverRobot>
  </q-layout>
</template>

<script>
import PersonInfoPane from "components/PersonInfoPane";
import CleverRobot from "components/CleverRobot";
import BugReport from "components/BugReport";
export default {
  components: {
    PersonInfoPane,
    CleverRobot
    // BugReport
  },
  data() {
    return {};
  },
  computed: {
    fullNickname() {
      let info = this.$store.getters["global/getPrivateInfo"];
      return (
        info.adjectiveTitle + " " + info.articleTitle + " " + info.nickname
      );
    }
  },
  methods: {
    openBugReport() {
      this.$q
        .dialog({
          component: BugReport,
          parent: this
        })
        .onOk(() => {
          // alert("ok");
        })
        .onCancel(() => {
          // alert("cancel");
        })
        .onDismiss(() => {
          // alert("called on ok or cancel");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.my-footer {
  min-height: 90px;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave {
  opacity: 1;
}

.fade-leave-active {
  opacity: 0;
  transition: opacity 0.5s;
}
</style>

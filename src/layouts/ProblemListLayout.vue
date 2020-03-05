<template>
  <div>
    <q-layout view="hHh lpR fFf">
      <q-drawer elevated show-if-above bordered :width="180">
        <q-list>
          <q-item-label header class="text-h6">本地题库</q-item-label>
          <q-item>
            <q-btn color="blue" @click="toLocalProblem()">本地题库</q-btn>
          </q-item>
          <q-separator spaced />
          <q-item-label header class="text-h6">第三方题库</q-item-label>
          <q-item>
            <q-btn color="orange" @click="toVJProblem()">Virtual Judge</q-btn>
          </q-item>
        </q-list>
      </q-drawer>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toLocalProblem() {
      this.$router.push({ name: "localProblem" });
    },
    toVJProblem() {
      this.$router.push({ name: "VJProblem" });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

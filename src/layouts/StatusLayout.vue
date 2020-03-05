<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer show-if-above side="left" elevated :width="180">
      <!-- drawer content -->
      <q-list>
        <q-item-label header class="text-h6">本地评测</q-item-label>
        <q-item>
          <q-btn color="blue" @click="toLocalStatus()">本地评测</q-btn>
        </q-item>
        <q-separator spaced />
        <q-item-label header class="text-h6">第三方评测</q-item-label>
        <q-item>
          <q-btn color="orange" @click="toVJStatus()">Virtual Judge</q-btn>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      left: false
    };
  },
  methods: {
    toLocalStatus() {
      this.$router.push({ name: "localStatus" });
    },
    toVJStatus() {
      this.$router.push({ name: "VJStatus" });
    }
  }
};
</script>

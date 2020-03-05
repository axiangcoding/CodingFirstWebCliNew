<template>
  <q-page class="row flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg" />
    <q-btn>{{this.$store.getters['global/getIsLogin']}}</q-btn>
  </q-page>
</template>

<script>
export default {
  methods: {
    test() {
      this.$axios.get("/test/test");
    }
  }
};
</script>

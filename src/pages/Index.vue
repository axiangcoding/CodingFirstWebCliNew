<template>
  <q-page class="row flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg" />
    <q-btn>{{this.$store.getters['global/getIsLogin']}}</q-btn>
    <q-btn>{{this.$store.getters['global/getUsername']}}</q-btn>
    <q-btn>{{this.$store.getters['global/getToken']}}</q-btn>
    <q-btn>{{this.$store.getters['global/getPrivateInfo']}}</q-btn>
  </q-page>
</template>

<script>
export default {};
</script>

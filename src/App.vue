<template>
<div id="app">
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <main-tab-bar></main-tab-bar>
</div>
</template>

<script>
import MainTabBar from './components/content/mainTabBar/MainTabBar.vue'

export default {
  name: "app",
  components: {
    MainTabBar
  }
};
</script>

<style scoped>
  @import "assets/css/base.css";
</style>

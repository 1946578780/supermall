<template>
  <div id="app">
    <router-view/>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/TabBarItem'
export default {
  name:'App',
  components: {
    MainTabBar
  }
}
</script>
<style lang="scss">
@import "assets/css/base.css";
p{
  color: red
}
</style>

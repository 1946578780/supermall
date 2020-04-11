<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
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

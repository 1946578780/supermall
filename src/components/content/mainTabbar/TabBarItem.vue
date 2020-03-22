<template>
<div id="app">
  <router-view></router-view>
  <tab-bar>
    <tab-bar-item path="/Home" activeColor="#1999dc">
      <img slot="item-icon" src="~assets/img/tabbar/首页.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/page-active.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/CateGory" activeColor="#1999dc">
      <img slot="item-icon" src="~assets/img/tabbar/类目 品类 分类 类别.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/classify-active.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/Cart" activeColor="#1999dc">
      <img slot="item-icon" src="~assets/img/tabbar/购物车-23.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/shopping-active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/ProFile" activeColor="#1999dc">
      <img slot="item-icon" src="~assets/img/tabbar/我的.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/my-active.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</div>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
  name: "App",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style>

</style>

<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物车</div>
        </nav-bar>
        <tab-control class="tab-control" 
                       :titles="['流行','新款','精选']" 
                       @tabClick="tabClick"
                       ref="tabControl1"
                       v-show="isTabFixed"/>
        <scroll class="content" 
                ref="scroll" 
                :probe-type="3" 
                @scroll="contentScroll"
                :pull-up-load="true"
                 @pullUpLoad="loadMore">
          <home-swiper :banners="banners" @swiperImgeLoad="swiperImgeLoad"/>
          <recommend-view :recommends="recommends" />
          <feature-view />
          <tab-control :titles="['流行','新款','精选']" 
                       @tabClick="tabClick"
                       ref="tabControl2"/>
          <goods-list class="tab-goodslist" :goods="showGoods"/>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>
<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll"
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList"
// import BackTop from "components/content/backtop/BackTop"

import { getHomeMultidata,getHomeGoods } from "network/home";

import {debounce} from "common/utils"
import {itemListenerMiXin,backTopMixin} from 'common/mixin'
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      currentType: 'pop',
      // isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null
    };
  },
  //使用mixins首先import导入，再使用mixins混入常量名称，接来下就可以直接使用封装好的方法啦
  mixins:[itemListenerMiXin,backTopMixin],
  computed: {
    showGoods(){
      //显示哪一类数据
      return this.goods[this.currentType].list
    },
    activated () {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refersh()
    },
    //离开时
    deactivated () {
      //保存Y值
      this.saveY = this.$refs.scroll.getScrollY()

      //取消全局事件的监听
      this.$bus.$off('itemImgeLoad',this.itemImgListener)
    }
  },
  created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
  },
  mounted () {
      //监听item中图片加载完成
      // const refersh = debounce(this.$refs.scroll.refresh, 50)
      // //将此处的函数交于deactivated取消全局事件监听使用
      // this.itemImgListener = ()=>{
      //   refersh()
      // }
      // // itemImgeLoad  
      // this.$bus.$on('itemImgeLoad',this.itemImgListener)

      //获取tabControl的offsetTop
      //所有组件都有一个$el: 用于获取组件中的元素
      // console.log(this.$refs.tabControl2.$el.offsetTop)
  },
  methods: {
    /**
    * 事件监听相关方法
    */
    tabClick(index){
      switch(index){
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0);
    },
    contentScroll(position){
      //  this.isShowBackTop = (-position.y) > 1000
       //滚动显示tab菜单栏
       this.isTabFixed = (-position.y) > this.tabOffsetTop
       //混入的点击回到顶部代码
       this.listenShoBackTop(position)
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.refresh()
    },
    swiperImgeLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res =>{
            this.goods[type].list.push(...res.data.list),
            this.goods[type].page += 1
            //使用finishpullup()
            this.$refs.scroll.finishPullUp()
        })
    }
  }
};
</script>
<style scoped>
#home{
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.tab-control {
  position:  relative;
  z-index: 9;
  background-color: #fff;
}

.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>

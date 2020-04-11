<template>
    <div id="Detail">
        <!-- {{iid}} -->
        <!-- 导航栏 -->
        <detail-nav-bar class="Detail-Nav" @titelClick="titelClick" ref="nav"/>
        <!-- <div v-for="(item,index) in $store.state.cartList" :key="index">
            {{item}}
        </div> -->
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
            <detail-swiper :top-images="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info ref="params" :param-info="paramInfo"/>
            <detail-comment-info ref="comment" :comment-info="commentInfo"/>
            <goods-list ref="recommend" :goods="recommends"/>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
        <detail-bottom-bar @addToCart="addToCart"/>
        <!-- <Toast :message="message" :show="show"/> -->
    </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import Toast from "components/common/toast/Toast"
import GoodsList from "components/content/goods/GoodsList";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMiXin, backTopMixin } from "common/mixin";
//映射
import { mapActions } from 'vuex'
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      itemImgListener: null,
      themeTopYs: [0, 5000, 6000, 7000],
      getThemeTopY: [],
      currentIndex: 0,
      // message: '',
      // show: false
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    Scroll,
    Goods,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast
  },
  mixins: [itemListenerMiXin, backTopMixin],
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then(res => {
      //获取顶部的图片轮播数据
      var data = res.result;
      this.topImages = data.itemInfo.topImages;
      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services,
      );
      //获取商家信息
      this.shop = new Shop(data.shopInfo);
      //保存商品的详细数据
      this.detailInfo = data.detailInfo;
      //获取商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      //此处若直接获取各个组件的位置是不妥的，虽然我获取到了数据，但是组件渲染需要时间
      //使用nextTick 渲染完后再获取位置
      //但是还要考虑一个问题虽然$el dom已经渲染完成但是图片没有渲染，所以值还是错的
      // this.$nextTick(()=>{
      //     this.themeTopYs = []

      //     this.themeTopYs.push(0)
      //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // })
    });
    //获取详情信息
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
    //给getThemeTopY赋值(对this.themeTopYs进行防抖操作)
    this.getThemeTopY = debounce(() => {
      this.$nextTick(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        //最大值
        this.themeTopYs.push(Number.MAX_VALUE);
      });
    });
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      //调用
      this.getThemeTopY();
    },
    titelClick(index) {
      //调用scroll当中封装的scrollTo
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 200);
    },
    //商品导航条联动
    contentScroll(position) {
      //获取Y值
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for(let i = 0;i < length; i++){
          if(this.currentIndex !== i && ((i < length-1 && positionY >= this.themeTopYs[i]-44 && positionY <
          this.themeTopYs[i+1])||(i === length - 1 && positionY >= this.themeTopYs[i]))){
              this.currentIndex = i;
              // console.log(this.currentIndex)
              this.$refs.nav.currentIndex = this.currentIndex
          }
      }
      // hack做法（使用内存换取空间）
      // for (let i = 0; i < length - 1; i++) {
      //   if (
      //     this.currentIndex !== i &&
      //     (positionY >= this.themeTopYs[i] &&
      //       positionY < this.themeTopYs[i + 1])
      //   ) {
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }
      //混入的点击回到顶部代码
      this.listenShoBackTop(position);
    },
    //点击添加购物车
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.oldPrice = this.goods.oldPrice;
      product.iid = this.iid;
      // console.log(product);
      // this.$store.careList.push(product)
      //使用commit提交传入两个参数('方法名称',数据)
      // 2.将商品添加到购物车里
      // this.$store.dispatch("addCart", product);
      // 3.添加到购物车成功
      //将actions当中的方法映射在组件中使用
      this.addCart(product).then(res => {
        this.$toast.show(res,1500)
        // this.message = res,
        // this.show = true,
        // setTimeout(() => {
        //   this.show = false,
        //   this.message = ''
        // }, 1500);
        // console.log(res)
      })
      // this.$store.dispatch("addCart", product).then(res=>{
      //   console.log(res)
      // })
    }
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImgeLoad", this.itemImgListener);
  }
};
</script>

<style scoped>
#Detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
  overflow: scroll;
  overflow-y: hidden;
}

.Detail-Nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>

<template>
    <div class="tab-bar-item" @click="itemClick">
      <!-- 返回结果为true取反为false -->
      <div v-if="!switchover"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      path: String,
      default: 'red'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    switchover(){
      return this.$route.path.indexOf(this.path) !== -1 
      //将路由当中的路径 与 当前路径做对比
      //值有0 与 -1 没有返回-1
    },
    activeStyle(){
      return this.switchover ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick(){
      //此处只获取路径替换成当前路径
      this.$router.replace(this.path);
    }
  }
};
</script>
<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-bottom: 2px;
}

</style>


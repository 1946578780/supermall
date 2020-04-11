import { debounce } from './utils'
import BackTop from 'components/content/backtop/BackTop'
export const itemListenerMiXin = {
    mounted() {
        //此处引入防抖函数
        const refersh = debounce(this.$refs.scroll.refresh, 50)
        //此处调用防抖函数
        this.itemImgListener = () => {
            refersh()
        }
        //此处取消全局监听事件
        this.$bus.$off('itemImgeLoad', this.itemImgListener)
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0);
        },
        listenShoBackTop(position) {
            this.isShowBackTop = (-position.y) > 1000
            //滚动显示tab菜单栏
            this.isTabFixed = (-position.y) > this.tabOffsetTop
        }
    }
}
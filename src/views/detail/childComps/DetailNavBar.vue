<template>
    <div>
        <nav-bar>
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="titel">
                <div v-for="(item,index) in titels" :key="index"
                    class="titel-item"
                    :class="{active :index === currentIndex}"
                    @click="titelClick(index)">{{item}}</div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name: 'DetailNavBar',
    components: {
        NavBar
    },
    data () {
        return {
            titels:['商品','参数','评论','推荐'],
            currentIndex: 0
        }
    },
    methods: {
        titelClick(index){
            this.currentIndex = index
            this.$emit('titelClick',index)
        },
        backClick(){
            this.$router.back()
        }
    }
}
</script>

<style scoped>
    .titel{
        display: flex
    }
    .titel-item{
        flex: 1
    }
    .active{
        color: var(--color-high-text)
    }
    .back{
        margin-top: 6px;
    }
</style>

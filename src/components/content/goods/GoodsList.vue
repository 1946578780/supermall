<template>
    <div>
        <div class="goods">
            <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"/>
        </div>
    </div>
</template>
<script>
import GoodsListItem from './GoodsListItem'
export default {
    name: "GoodsList",
    props: {
        goods:{
            type: Array,
            defualt(){
                return []
            }
        }
    },
    components: {
        GoodsListItem
    }
}
</script>
<style>
.goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>



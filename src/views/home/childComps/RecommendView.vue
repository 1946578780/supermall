<template>
    <div class="recommends">
        <div v-for="(item,index) in recommends" :key="index"  class="recommends_img">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div class="recommends_text">{{item.title}}</div>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    name:"RecommendView",
    props:{
        recommends:{
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>
<style>
    .recommends{
        display: flex;
        text-align: center;
        padding: 0px 0 30px;
        border-bottom: 10px solid #eee;
    }
    .recommends img{
        width: 80%;
        margin: 10px 0 10px;
    }
    recommends_img{
        flex: 1;
    }
    .recommends_text{
        font-size: 14px;
    }
</style>


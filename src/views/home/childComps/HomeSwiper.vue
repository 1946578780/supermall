<template>
    <div id="home_swiper">
        <swiper>
            <swiper-item v-for="item in banners" :key="item.image">
                <a :href="item.link">
                    <img :src="item.image" alt="" @load="ImgeLoad">
                </a>
            </swiper-item>
         </swiper>
    </div>
</template>
<script>
import {Swiper,SwiperItem} from "components/common/swiper"
export default {
    name: "HomeSwiper",
    props: {
        banners: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data () {
        return {
            isLoad:false
        }
    },
    components: {
        Swiper,
        SwiperItem
    },
    methods: {
        ImgeLoad(){
            if(!this.isLoad){
                this.$emit('swiperImgeLoad')
                this.isLoad = true
            }
        }
    }
};
</script>

<style>
    #home_swiper{
        /* padding-top: 44px */
    }
</style>


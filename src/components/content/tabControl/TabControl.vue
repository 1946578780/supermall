<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles" :key="index" 
            class="tab-control-text" 
            :class="{active: index === currentIndex}" @click="itemactive(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "TabControl",
    props: {
        titles: {
            type: Array,
            default(){
                return []
            }
        }
    },
    data () {
        return {
            currentIndex: 0
        }
    },
    methods: {
        itemactive(index){
            this.currentIndex = index;
            this.$emit("tabClick",index)
        }
    }
}
</script>

<style>
.tab-control{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px; 
}
.tab-control-text{
    flex: 1;
}
.active{
    color: var(--color-high-text);
}

.active span{
    border-bottom: 3px solid red;
    padding-bottom: 5px;
}
</style>

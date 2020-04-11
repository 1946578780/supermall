<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{length}})</div>
        </nav-bar>
        <cart-list/>
        <cart-botton-bar/>
    </div>
</template>
<script>
import CartList from './childComps/CartList'
import CartBottonBar from './childComps/CartBottonBar'

import NavBar from 'components/common/navbar/NavBar'

import {mapGetters} from 'vuex'
export default {
    name: "Cart",
    components: {
        NavBar,
        CartList,
        CartBottonBar
    },
    computed:{
        //两种定义方式['cartLength','cartList']
        ...mapGetters({
            length: 'cartLength'
        })
    }
}
</script>
<style scpoed>
    .cart{
        height: 100vh;
    }
    .nav-bar{
        background-color: var(--color-tint);
        color: #fff
    }
</style>

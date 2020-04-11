import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'

export default {
    //默认两个形参;1、state指向当前对象state;2、payLoad是组件中传来的值
    [ADD_COUNTER](state, payLoad) {
        payLoad.count++
    },
    [ADD_TO_CART](state, payLoad) {
        //将新添加的商品加入购物车
        payLoad.checked = true
        state.cartList.push(payLoad)
    }
}
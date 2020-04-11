import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'

export default {
    addCart(context, payLoad) {
        return new Promise((resolve, reject) => {
            //若添加重复商品应当商品数量+1
            // let oldProduct = null
            // for(let item of state.cartList){
            //   //若添加商品id一致则将商品id赋值
            //   if(item.iid === payLoad.iid){
            //     oldProduct = item
            //   }
            // }
            //通过数组查找方法find判断iid是否一致
            let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)
            //若商品再次添加则数量+1
            if (oldProduct) {// 数量+1
                //调用mutations中的方法('方法名称',参数)
                context.commit(ADD_COUNTER, oldProduct)
                resolve("当前商品数量+1")
            } else {// 添加新的商品
                //若为商品只添加一次则赋值为1
                payLoad.count = 1
                context.commit(ADD_TO_CART, payLoad)
                resolve("添加新的商品")
            }
        })
    }
}
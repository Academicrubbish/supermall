import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  //mutations唯一的目的就是修改state状态
  //mutations中的每个方法尽可能完成的事比较单一一点
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = false
    state.cartList.push(payload) //添加新商品
  }
}

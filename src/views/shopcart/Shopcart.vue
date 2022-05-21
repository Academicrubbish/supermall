<template>
  <div class="shopcart">
    <!--导航-->
    <nav-bar class="cart-nav"><div slot="center"> 购物车({{length}})</div></nav-bar>

    <!--商品列表-->
    <scroll class="content" ref="scroll">
        <cart-list-item
        v-for="(item,index) in list"
        :key="index"
        :goods-item="item"/>
    </scroll>
    <!--底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import NavBar from 'components/common/navbar/NavBar'

import CartListItem from './childComps/CartListItem'
import CartBottomBar from './childComps/CartBottomBar.vue'

import { mapGetters } from 'vuex'

export default{
  name: "Shopcart",
  components: {
    Scroll,
    NavBar,
    CartListItem,
    CartBottomBar
  },
  computed: {
    // ...mapGetters(['cartLength'])
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .shopcart {
    height: 100vh;
  }
  .cart-nav {
    background-color: #ff86fb;
    color: white;
  }
  .content {
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>

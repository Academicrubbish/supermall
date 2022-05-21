<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>

    <scroll
    class="content"
    ref="scroll"
    :probe-type= "3"
    @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imagesLoad="imagesLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addToCart"/>
    <toast :message="message" :show="show"/>

  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'


import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import Toast from 'components/common/toast/Toast'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'

import { debounce } from "common/utils"
import { backTopMixin } from "common/mixin"
import { mapActions } from 'vuex'
export default{
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      Toast
    },
    mixins: [backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        message: '',
        show: false
      }
    },
    methods: {
      ...mapActions(['addCart']),
      imagesLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position) {
        //1.获取y值
        const positionY = -position.y

        //2.positionY和导航栏的位置进行对比
        let i = 0
        if (positionY < this.themeTopYs[1]) i = 0
        else if (positionY < this.themeTopYs[2]) i = 1
        else if (positionY < this.themeTopYs[3]) i = 2
        else i = 3

        if (this.currentIndex !== i) this.currentIndex = i,this.$refs.nav.currentIndex = this.currentIndex
        // if (this.currentIndex !== i) {
        //   this.currentIndex = i
        //   console.log(this.currentIndex)
        // }

        //3.判断BackTop是否显示
        this.listenShowBackTop(position)
      },
      addToCart() {
        // console.log('点击了购物车')
        //1.获取商品信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        //2.将商品添加到购物车(1.Promise 2.mapActions)
        // this.$store.cartList.push(product)
        // this.$store.commit('addCart', product)
        this.$store.dispatch('addCart', product).then(res => {
          // this.show = true
          // this.message = res

          // setTimeout(() => {
          //   this.show = false
          // },1000)
          this.$toast.show(res, 1000)
        })

        // this.addCart(product).then(res => {
        //   console.log(res)
        // })
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res)
        const data = res.result
        //1.获取顶部的图片进行轮播
        this.topImages = data.itemInfo.topImages

        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //4.保存商品的详细数据
        this.detailInfo = data.detailInfo

        //5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //6.取出评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        //获取每个组件的位置

        //1.第一次获取，值不对
        //值不对的原因：this.$refs.params.$el压根没有渲染
        // this.themeTopYs = [];
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs)

        //2.第二次获取，值不对
        //值不对的原因：图片没有计算在内
      //   this.$nextTick(() => {
      //     //根据最新的数据，对应的DOM是已经渲染完了
      //     //但是图片没有渲染完，所对应的高度是没有图片的
      //     this.themeTopYs = [];
      //     this.themeTopYs.push(0);
      //     this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //     console.log(this.themeTopYs)
      //   })
      })

      //3.请求推荐数据
      getRecommend().then(res => {
        console.log(res)
        this.recommends= res.data.list
      })

      //4.getThemeTopY赋值(对赋值操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs)
      },200)
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on('detailItemImageLoad', () => {
        refresh()
      })
    }
}
</script>

<style scoped>
  .detail {
      height: 100vh;
      position: relative;
      background:#fff;
      z-index: 9;
  }
  .detail-nav {
      position: relative;
      z-index: 9;
      background:#fff;
  }
  .content {
      /* position: absolute;
      top: 44px;
      left: 0;
      right: 0;
      bottom: 58px; */
      /* overflow: hidden; */
    /* height: 400px; */
    height: calc(100% - 44px - 58px);
    /* overflow: hidden; */
  }
</style>

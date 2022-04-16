<template>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control :titles= titles @tabClick="tabClick" ref="TabControl1" class="tab-control" v-show="isTabFixed"/>

      <scroll class= "content" ref= "scroll"
      :probe-type= "3"
      @scroll="contentScroll"
      :pull-up-load= "true"
      @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <home-recommend :recommends="recommends"/>
        <feature-view/>
        <tab-control :titles= titles @tabClick="tabClick" ref="TabControl2"/>
        <goods-list :goods="goods[currentType].list"/>
      </scroll>

      <back-top @click.native="backClick" v-show="isShowBackTop"/><!--.native监听原生组件-->

    </div>
</template>

<script>

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend"
import FeatureView from "./childComps/FeatureView";

import NavBar from 'components/common/navbar/NavBar';
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll"

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils"
import { backTopMixin } from "common/mixin"

export default{
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll
  },
  mixins: [backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ['流行','新款','精选'],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  destroyed() {
    console.log('home destroyed')
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    //1.监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh,200)
    this.$bus.$on('homeItemImageLoad', () => {
      refresh()
    })

    //2.获取tabControl的offsetTop
    //所有组件都有一个$el
    // this.tabOffsetTop = this.$refs.TabControl.$el.OffsetTop
    // console.log(this.$refs.TabControl2.$el.offsetTop);
  },
  methods: {
    /**
     * 网络请求相关
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res)
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        //(...res.data.list)
        //将请求过来的数组解构一个一个存到我们的数组里去
        //因为如果直接传值的话，后面的就会覆盖前面的
        this.goods[type].page += 1

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    },
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch(index) {
        case 0 :
          this.currentType = 'pop'
          break
        case 1 :
          this.currentType = 'new'
          break
        case 2 :
          this.currentType = 'sell'
          break
      }
      this.$refs.TabControl1.currentIndex = index;
      this.$refs.TabControl2.currentIndex = index;
    },
    contentScroll(position) {
      //1.判断BackTop是否显示
      this.listenShowBackTop(position)

      //2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      // console.log('加载更多');
      this.getHomeGoods(this.currentType)
      //把当前的页面传给getHomeGoods，getHomeGoods会将该页面的page+1
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.TabControl2.$el.offsetTop
    }
  }
}
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: #ff86fb;
    color: white;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>

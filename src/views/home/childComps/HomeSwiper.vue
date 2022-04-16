<template>
    <swiper>
        <swiper-item v-for="(item,key) in banners" :key="key">
          <a href="item.link">
            <img :src="item.image" @load="imageLoad">
          </a>
        </swiper-item>
      </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'


export default{
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {//减少重复，因为有四张轮播图
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>

</style>

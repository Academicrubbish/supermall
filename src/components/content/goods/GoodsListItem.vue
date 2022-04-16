<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default{
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imageLoad() {//用于监听图片是否加载完成
        if (this.$route.path === '/home') {
          this.$bus.$emit('homeItemImageLoad')
        } else if (this.$route.path.indexOf('./detail')) {
          this.$bus.$emit('detailItemImageLoad')
        }

      },
      itemClick() {
        if (this.$route.path === '/home') {
          this.$router.push('/detail/' + this.goodsItem.iid)
        } else if (this.$route.path.indexOf('./detail')) {
          // this.$router.push('/detail/' + this.goodsItem.item_id)
          console.log('这些图片都没做数据，不要点了')
        }
      }
    }
}
</script>

<style scoped>
  .goods-item {
    position: relative;
    padding-bottom: 40px;
    width: 48%;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    text-align: center;
    /* padding: 3px; */
    position: absolute;
    bottom: 5px;
    left:0;
    right: 0;
    overflow: hidden;
    font-size: 12px;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before{
    content: '';
    position: absolute;
    top: -1px;
    left: -15px;
    width: 14px;
    height: 14px;
    background: url('~@/assets/img/common/collect.svg') 0 0/14px 14px;
  }
</style>

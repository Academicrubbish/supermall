<template>
   <div class="goods">
     <goods-list-item v-for="(item,key) in goods"
     :key="key"
     :goods-item="item"/>
   </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default{
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-around;
}

</style>

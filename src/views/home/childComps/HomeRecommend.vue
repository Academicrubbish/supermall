<template>
  <div class="recommend">
    <div v-for="(item,key) in recommends" :key="key" class="recommend-item">
        <img :src="item.image">
        <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default{
  name: "HomeRecommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    text-align: center;
    font-size: 12px;

    padding: 15px 0 30px;
    border-bottom: 8px solid #eee;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 65px;
    height: 65px;
    margin-bottom: 1px;
  }
</style>

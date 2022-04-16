<template>
    <div class="goods-info"  v-if="Object.keys(detailInfo).length !== 0">
        <div class="info-desc">
            <div class="desc">{{detailInfo.desc}}</div>
        </div>
        <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
        <div class="info-list">
            <img
               v-for="(item, index) in detailInfo.detailImage[0].list"
               :key="index"
               :src="item"
               @load="imgLoad">
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailGoodsInfo',
    props: {
        detailInfo:{
            type: Object,
            default(){
                return {};
            }
        }
    },
    data() {
        return {
            counter: 0,
            imagesLength: 0,
        }
    },
    methods: {
        imgLoad(){
            //判断，所有图片加载完了，才进行一次回调
            if(++this.counter === this.imagesLength){
                this.$emit('imagesLoad');
            }
        }
    },
    watch: {//监听某一个属性的变化
      detailInfo() {//一旦发生变化就将最新的长度赋值给imagesLength
        //最终目的，获取图片的个数
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    }
}
</script>
<style scoped>
.goods-info {
    padding: 30px 8px 0;
    border-bottom: solid 4px rgba(100, 100, 100, .1);
}
.info-desc {
    padding: 0 8px 0;
    font-size: 14px;
}
.info-desc .desc {
    text-indent: 2em;
}
.info-key {
    padding: 8px;
}
.info-list img{
    width: 100%;
}

</style>

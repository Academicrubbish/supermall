<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton';

import {debounce} from 'common/utils';

import { mapGetters } from 'vuex';

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice(){
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((perValue,item) => {
        return perValue + item.price * item.count
      }, 0)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false
      //看没有被选中的数组是否有长度，有就是存在没有被选中的，然后取反
      //1.使用filter
      // return !(this.cartList.filter(item => !item.checked).length)

      //2.使用find
      return !this.cartList.find(item => !item.checked)

      //3.普通遍历
      // for (let item of this.cartList) {
      //   if(!item.checked) {
      //     return false
      //   }
      // }
      // return true
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) {//全部选中
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    handleSettleAccounts(){
    // 防抖
      let toast = debounce(()=>{
        this.$toast.show("去结算");
      }, 500);
      toast();
    }
  },
}
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .check-button {
    width: 22px;
    height: 22px;
    line-height: 22px;
  }

  .price {
    margin-left: 30px;
  }

  .calculate {
    position: absolute;

    width: 90px;
    right: 5px;
    text-align: center;

    background-color: #ff86fb;
    color: #eee;
  }
</style>

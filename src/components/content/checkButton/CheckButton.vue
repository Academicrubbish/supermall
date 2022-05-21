<template>
  <div class="check-btn" :class="{'check': !isChecked}">
      <img src="~assets/img/cart/tick.svg" v-show="isChecked">
  </div>
</template>
<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: true
    }
  }

}
</script>

<style scoped>
  .check-btn{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
  }
  .check {
    border: 2px solid rgba(100,100,100,.2);
  }
  .check-btn img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #d4237a;
  }
</style>

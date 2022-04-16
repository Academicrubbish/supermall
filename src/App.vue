<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar'


export default {
  name: 'App',
  components: {
    MainTabBar
  }
}

for(let i in 3) {
  console.log(i)
}
</script>

<style>
  @import "assets/css/base.css";
</style>

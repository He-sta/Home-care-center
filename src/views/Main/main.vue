<template>
  <div id="app">
    <div id="nav">
    <Nav />
    </div>
    <router-view />
  </div>
</template>
<script>
 import Nav from '@/components/nav.vue'
    
export default {
        components:{
            Nav
        },
}
</script>
<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
  height 100%
  width 100%
  
</style>

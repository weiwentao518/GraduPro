<template>
  <div class="index">
    <headerIndex></headerIndex>
    <div class="content-index">
      <div class="leftContent">
        <navLeftIndex></navLeftIndex>
      </div>
      <div class="rightContent">
        <router-view></router-view>
      </div>
    </div>
    
  </div>
</template>

<script>
import headerIndex from '../components/header.vue'
import navLeftIndex from '../components/navLeft.vue'
export default {
  data () {
    return {
      centerDialogVisible:false,
    }
  },
  components:{
    headerIndex,
    navLeftIndex
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index{
  width:100%;
  height: 100%;
  .content-index{
    width:100%;
    min-height:calc(100%-70px);
    overflow-x: hidden;
    position: relative;
    .leftContent{
      width:170px;
      height: 100%;
      position: absolute;
      left: 0;
      bottom:0;
      background-color: #2d3647;
    }
    .rightContent{
      width:100%;
      min-width:1230px;
      position: relative;
      left: 170px;
      padding-right: 170px;
    }
  }
}
</style>
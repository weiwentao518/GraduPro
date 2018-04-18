<template>
  <div id="header">
    <div class="logo">
     <img src="../assets/img/logo.png">
     <span>图书管理系统</span>
    </div>
    <div class="loginOut">
      <i class="iconfont icon-yonghu user"></i>
      {{tel}}
      <button @click="signOut">
        <i class="iconfont icon-tuichu"></i>
        退出
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
     tel:'17764592436',
    }
  },
  methods:{
    signOut(){
      sessionStorage.clear();
      this.$router.push({'path':"/"});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #header{
  width: 100%;
  background-color: #2b3245;
  text-align: left;
  .logo{
    width:170px;
    height:70px;
    background-color: #1a6fa6;
    /* padding-top: 10px; */
    display: inline-block;
    text-align: center;
    position: relative;
    img{
      display: block;
      position: absolute;
      top: 16px;
      left: 8px;
      width:36px;
    }
    span{
      font-size: 18px;
      color: #fff;
      line-height: 70px;
      margin-left: 35px;
    }
  }
  .loginOut{
    float: right;
    color:#fff;
    .user{
      color:#1e6190;
    }
    button{
      cursor: pointer;
      border:none;
      height: 70px;
      line-height: 70px;
      background-color: #2b3245;
      color:#ff6c00;
      margin:0 50px 0 28px;
    }
  }
 }
</style>

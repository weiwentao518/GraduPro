<template>
  <div id="navLeft">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#333e50"
      text-color="#fff"
      active-text-color="#65bef8"
			:default-active="$route.path"
      :router="isRouter"
      :unique-opened = "uniqueOpened"
      >
      <el-submenu index="1">
        <template slot="title">
          <i class="iconfont icon-yonghuguanli"></i>
          <span>图书管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/addBook"><span>添加图书</span></el-menu-item>
          <el-menu-item index="/allBook"><span>所有图书</span></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="iconfont icon-jiaoyijilu"></i>
          <span>图书分类</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/technologyBook"><span>技术类</span></el-menu-item>
          <el-menu-item index="/literatureBook"><span>文学类</span></el-menu-item>
          <el-menu-item index="/managementBook"><span>管理类</span></el-menu-item>
          <el-menu-item index="/historyBook"><span>历史类</span></el-menu-item>
          <el-menu-item index="/economicsBook"><span>经济类</span></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="iconfont icon-Statistics"></i>
          <span>图书统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/classStatistic"><span>分类统计</span></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="iconfont icon-zhanghuguanli"></i>
          <span>账户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/"><span>账户管理</span></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
	</div>
</template>

<script>
import Bus from '../assets/js/bus.js'

export default {
  data () {
    return {
      defaultActive:'',
      isRouter:true,
      uniqueOpened:true,
    }
  },
  mounted:function(){
    this.$nextTick(()=>{
     
    })
  },
  methods: {
    toAllBook(){
      Bus.$emit('type',1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	#navLeft{
		.el-menu{
			width:170px;
			.el-submenu__title{
				width:170px;
				text-align: left;
				span{
					margin-left: 10px;
				}
				i{
					color:#fff;
					font-size: 18px;
				}
				i:nth-of-type(2){
					font-size: 16px;
				}
			}
			.el-menu-item-group__title{
				padding:0;
			}
			.el-menu-item{
				min-width: 170px; 
				background-color: #2d3647!important;
				text-align: center;
				border-left:2px solid #2d3647;
				span{
					margin-right: 4px;
				}
			}
			.el-submenu{
				.is-active{
					background-color: #222a35!important;
					border-left:2px solid #65bef8;
				}
			}
		}
	}
</style>
<style scoped>
 #navLeft{
	width:170px;
	height: 100%;
	.isActive{
		background-color: #222a35;
		color:#65bef8;
	}
 }
</style>

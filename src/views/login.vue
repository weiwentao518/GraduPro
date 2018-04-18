<template>
	<div class="login">
		<div class="title">
			<h1>图书管理系统<img src="../assets/img/租借图书.png"></h1>
		</div>
		<div class="box">
			<div class="header">
				<p>欢迎登录</p>
			</div>
			<div class="main">
				<div class="line">
					<span>
						<img src="../assets/img/用户.png">账号：
					</span>
					<el-input v-model="account" placeholder="请输入您的账号"></el-input>
				</div>
				<div class="line">
					<span>
						<img src="../assets/img/密码.png">密码：
					</span>
					<el-input v-model="password" type="password" placeholder="请输入您的密码" @keyup.enter="login()"></el-input>
				</div>
				<el-button class="btn" type="primary" @click="login()">登录</el-button>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			account:'',
			password:'',
		}
	},
	methods:{
		login(){
			if(this.account=="17764592436"&&this.password=="123456"){
				this.$router.push({path:'/addBook'});
				this.$notify({
	        title: '成功',
	        message: '登录成功！',
	        type: 'success',
	        duration:'2000'
	      })
			}else{
				this.$notify({
	        title: '失败',
	        message: '用户名或密码错误！',
	        type: 'error',
	        duration:'2000'
	      })
			}
		}
	}
}
</script>

<style>
.login{
	width: 100%;
	height: 100%;
	background:radial-gradient(#05abd5,#00659d);
	.title{
		height: 50px;
		padding-top: 180px;
	  padding-bottom: 100px;
		>h1{
			width: 500px;
			margin: 0 auto;
			font-size: 38px;
	    color: #ffffff;
	    text-align: center;
	    position: relative;
	    >img{
	    	position: absolute;
	    	top: 4px;
	    	left: 75px;
	    }
		}
	}
	.box{
		width: 500px;
    height: 420px;
    margin: 0 auto;
    border: 1rem solid #67B6D4;
		background-color: #fff;
		.header{
			width: 100%;
			height: 100px;
			text-align: center;
    	border-bottom: 2px solid #e5e5e5;
			>p{
				line-height: 100px;
		    color: #1a6fa6;
		    font-size: 28px;
			}
		}
		.main{
			width: 100%;
			.line{
				padding:20px 0;
				>span{
					line-height: 48px;
					display: inline-block;
					margin: 0 10px 0 30px;
					font-size: 18px;
					img{
						width: 24px;
						position: relative;
						top:5px;
					}
				}
			}
			.btn{
				display: block;
				margin: 30px auto;
			}
		}
	}
}
@media screen and (max-width: 1366px){
	.login{
		.title{
			padding-top: 70px;
	  	padding-bottom: 90px;
		}
	}
}
</style>

<style>
.login{
	.el-input{
		width: 280px;
	}
	.el-button{
		width: 100px;
		font-size: 16px;
	}
}
</style>
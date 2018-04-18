<template>
	<div class="managementBook">
		<div class="box">
			<div class="header">
				<el-input v-model="input"  placeholder="请输入书名/作者" ></el-input>
				<el-button class="searchBtn" type="primary" @click="searchBook()">搜索</el-button>
				<p>共搜索到{{total}}条数据</p>
			</div>
			<div class="table">
			  <el-table :data="searchResult" stripe border class="elTable" style="width:96%">
			  	<el-table-column prop="id" label="图书编号" min-width="100"></el-table-column>
			    <el-table-column prop="name" label="书名" min-width="100"></el-table-column>
			    <el-table-column prop="actor" label="作者" min-width="100"></el-table-column>
			    <el-table-column prop="type" label="图书类别" min-width="100"></el-table-column>
			    <el-table-column prop="press" label="出版社" min-width="100"></el-table-column>
			    <el-table-column prop="time" label="出版时间" min-width="100"></el-table-column>
			    <el-table-column prop="state" label="图书状态"></el-table-column>
			  </el-table>
			</div>
		</div>
	</div>
</template>

<script>
import Bus from '../../assets/js/bus.js'

export default{
	data(){
		return{
			input:'',
			tableData:[],//本页的所有图书数据
			searchResult:[],//搜索后的图书数据
			arr:[],//存分类后的数据,赋值给tableData
			total:0,
		}
	},
	mounted(){
		this.refreshTable();
		this.searchBook();
	},
	methods:{
		refreshTable(){
			let tableNew = JSON.parse(sessionStorage.getItem('bookInfo'));
			//console.log('tableNew:'+tableNew);
			if(tableNew == null){
				return false;
			}else{
				for(let i=0;i<tableNew.length;i++){
					console.log(tableNew[i].type);
					if(tableNew[i].type == '历史类'){
						this.arr.push(tableNew[i]);
					}
				}
				this.tableData = this.arr;
			}
		},
		searchBook(){
			this.total = 0;
			this.searchResult = [];
			for(let i=0;i<this.tableData.length;i++){
				if(this.tableData[i].name.indexOf(this.input)!=-1){
					this.searchResult.push(this.tableData[i]);
					this.total++;
				}else if(this.tableData[i].actor.indexOf(this.input)!=-1){
					this.searchResult.push(this.tableData[i]);
					this.total++;
				}
			}
			return this.searchResult;
		},
	},
}
</script>

<style>
.managementBook{
	.box{
		width: 100%;
		.header{
			width: 96%;
			margin: 0 auto;
			height: 72px;
			.searchBtn{
				float: left;
				margin: 15px 0px 0 0;
			}
			.el-input{
				width: 280px;
				float: left;
				margin: 15px 0px 0 0;
			}
		}
		.table{
			width: 100%;
			.el-table{
				margin: 0 auto;
				tr,th{
					text-align: center;
				}	
			}
		}
	}
}
</style>
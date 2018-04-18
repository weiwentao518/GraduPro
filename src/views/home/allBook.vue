<template>
	<div class="allBook">
		<div class="box">
			<div class="header">
				<el-input v-model="input"  placeholder="请输入书名/作者"></el-input>
				<el-button class="searchBtn" type="primary" @click="searchBook()">搜索</el-button>
				<p>共搜索到{{totalNum}}条数据</p>
			</div>
			<div class="table">
				<el-table :data="tableData" stripe border class="elTable" style="width:96%;display:none;">
			    <el-table-column prop="id" label="图书编号" min-width="100"></el-table-column>
			    <el-table-column prop="name" label="书名" min-width="100"></el-table-column>
			    <el-table-column prop="actor" label="作者" min-width="100"></el-table-column>
			    <el-table-column prop="type" label="图书类别" min-width="100"></el-table-column>
			    <el-table-column prop="press" label="出版社" min-width="100"></el-table-column>
			    <el-table-column prop="time" label="出版时间" min-width="100"></el-table-column>
			    <el-table-column prop="state" label="图书状态"></el-table-column>
			  </el-table>
			  <el-table :data="searchResult.slice((paging.page-1)*paging.size,paging.page*paging.size)" stripe border class="elTable" style="width:96%">
			  	<el-table-column prop="id" label="图书编号" min-width="100"></el-table-column>
			    <el-table-column prop="name" label="书名" min-width="100"></el-table-column>
			    <el-table-column prop="actor" label="作者" min-width="100"></el-table-column>
			    <el-table-column prop="type" label="图书类别" min-width="100"></el-table-column>
			    <el-table-column prop="press" label="出版社" min-width="100"></el-table-column>
			    <el-table-column prop="time" label="出版时间" min-width="100"></el-table-column>
			    <el-table-column prop="state" label="图书状态"></el-table-column>
			  </el-table>
			</div>
			<el-pagination
			  background
			  layout="total,prev, pager, next"
			  :page-size="paging.size"
			  :current-page.sync="paging.page"
			  :total="totalNum"
			  @size-change="handleSizeChange"
			  @current-change="currentChange">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import Bus from '../../assets/js/bus.js'

export default{
	data(){
		return{
			input:'',
			tableData:[],
			searchResult:[],
			totalNum:0,
			paging:{
				size:10,
				page:1,
			},
		}
	},
	created(){
		
	},
	mounted(){
		this.refreshTable();
		this.searchBook();
	},
	computed:{

	},
	methods:{
		//分页
		currentChange(val){
			console.log(`当前页: ${val}`);
			this.paging.page = val;
		},
		handleSizeChange(size) {
      this.paging.size = size;
    },
		refreshTable(){
			let tableNew = JSON.parse(sessionStorage.getItem('bookInfo'));
			console.log('tableNew:'+tableNew);
			if(tableNew == null){
				return false;
			}else{
				this.tableData = tableNew;
				this.totalNum = tableNew.length;
			}
		},
		searchBook(){
			this.searchResult = [];
			this.totalNum = 0;
			for(let i=0;i<this.tableData.length;i++){
				if(this.tableData[i].name.indexOf(this.input)!=-1){
					this.searchResult.push(this.tableData[i]);
					this.totalNum++;
				}else if(this.tableData[i].actor.indexOf(this.input)!=-1){
					this.searchResult.push(this.tableData[i]);
					this.totalNum++;
				}
			}
			return this.searchResult;
		},
	},
}
</script>

<style>
.allBook{
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
			p{
				float: left;
				padding-left: 30px;
				line-height: 72px;
				color:red;
			}
		}
		.table{
			width: 100%;
			min-height: 540px;
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
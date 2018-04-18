<template>
	<div class="bookManagement">
		<div class="box">
			<div class="header">
				<el-button class="addBtn" type="primary" @click="addBook()">新增图书</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData.slice((paging.page-1)*paging.size,paging.page*paging.size)" stripe border style="width: 100%;text-align: center;" :default-sort = "{prop: 'id'}">
			    <el-table-column prop="id" label="图书编号" width="100" sortable></el-table-column>
			    <el-table-column prop="name" label="书名" min-width="100"></el-table-column>
			    <el-table-column prop="actor" label="作者" min-width="100"></el-table-column>
			    <el-table-column prop="type" label="图书类别" min-width="100"></el-table-column>
			    <el-table-column prop="press" label="出版社" min-width="100"></el-table-column>
			    <el-table-column prop="time" label="出版时间" min-width="100"></el-table-column>
			    <el-table-column prop="state" label="图书状态" min-width="100"></el-table-column>
			    <el-table-column label="操作">
			    	<template slot-scope="scope">
			        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			      </template>
			    </el-table-column>
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
		<!-- 添加弹窗 -->
		<el-dialog title="新增图书入库" :visible.sync="dialogVisible" width="620px" center>
		  <div class="line">
		  	<div class="block">
		  		<span>图书编号：</span>
		  		<el-input v-model="addParam.bookid" placeholder="请输入图书编号"></el-input>
		  	</div>
		  	<div class="block">
		  		<span>书&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
		  		<el-input v-model="addParam.bookname" placeholder="请输入书名"></el-input>
		  	</div>
		  </div>
		  <div class="line">
		  	<div class="block">
		  		<span>作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;者：</span>
			  	<el-input v-model="addParam.bookactor" placeholder="请输入作者"></el-input>
		  	</div>
		  	<div class="block">
		  		<span>图书类别：</span>
			  	<el-select v-model="addParam.booktype" placeholder="请选择">
				    <el-option
				      v-for="item in bookTypes"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
		  	</div>
		  </div>
		  <div class="line">
		  	<div class="block">
		  		<span>出&nbsp;&nbsp;版&nbsp;社：</span>
		  		<el-input v-model="addParam.bookpress" placeholder="请输入出版社"></el-input>
		  	</div>
		  	<div class="block">
		  		<span>出版时间：</span>
		  		<el-date-picker
		  		  v-model="addParam.booktime"
		  		  type="date"
		  		  placeholder="选择日期"
		  		  value-format="yyyy-MM-dd"
		  		  ></el-date-picker>
		  	</div>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addSure()">确 定</el-button>
		  </span>
		</el-dialog>
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑图书信息" :visible.sync="dialogVisible2" width="620px" center>
		  <div class="line">
		  	<div class="block">
		  		<span>图书编号：</span>
		  		<el-input v-model="addParam.bookid" placeholder="请输入图书编号"></el-input>
		  	</div>
		  	<div class="block">
		  		<span>书&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
		  		<el-input v-model="addParam.bookname" placeholder="请输入书名"></el-input>
		  	</div>
		  </div>
		  <div class="line">
		  	<div class="block">
		  		<span>作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;者：</span>
			  	<el-input v-model="addParam.bookactor" placeholder="请输入作者"></el-input>
		  	</div>
		  	<div class="block">
		  		<span>图书类别：</span>
			  	<el-select v-model="addParam.booktype" placeholder="请选择">
				    <el-option
				      v-for="item in bookTypes"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
		  	</div>
		  </div>
		  <div class="line">
		  	<div class="block">
		  		<span>出&nbsp;&nbsp;版&nbsp;社：</span>
		  		<el-input v-model="addParam.bookpress" placeholder="请输入出版社"></el-input>
		  	</div>
		  	<div class="block">
		  		<span>出版时间：</span>
		  		<el-date-picker
		  		  v-model="addParam.booktime"
		  		  type="date"
		  		  placeholder="选择日期"
		  		  value-format="yyyy-MM-dd"
		  		  ></el-date-picker>
		  	</div>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible2 = false">取 消</el-button>
		    <el-button type="primary" @click="eidtSure()">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
import {ajax} from '../../assets/js/common.js'
import Bus from '../../assets/js/bus.js'

export default{
	data(){
		return{
			resData:[],
			tableData: [
				{
	        id:0,
	        name:'神探夏洛克',
	        actor:'Jobs',
	        type:'文学类',
	        press:'人民出版社',
	        time:'2015-10-10',
	        state:'可借阅',
	      },
	      {
	        id:1,
	        name:'人间失格',
	        actor:'Jobs',
	        type:'历史类',
	        press:'新华出版社',
	        time:'2015-10-10',
	        state:'可借阅',
	      },
	      {
	        id:2,
	        name:'解忧杂货店',
	        actor:'Jobs',
	        type:'文学类',
	        press:'人民出版社',
	        time:'2015-10-10',
	        state:'可借阅',
	      },
	      {
	        id:3,
	        name:'岛上书店',
	        actor:'Jobs',
	        type:'文学类',
	        press:'人民出版社',
	        time:'2015-10-10',
	        state:'可借阅',
	      },
	      {
	        id:4,
	        name:'我不',
	        actor:'Jobs',
	        type:'文学类',
	        press:'新华出版社',
	        time:'2015-10-10',
	        state:'可借阅',
	      },
	      {
	        id:5,
	        name:'人类简史',
	        actor:'Jobs',
	        type:'历史类',
	        press:'人民出版社',
	        time:'2015-10-10',
	        state:'可借阅',
	      },
	      {
	        id:6,
	        name:'明朝那点事',
	        actor:'Jobs',
	        type:'历史类',
	        press:'新华出版社',
	        time:'2015-10-10',
	        state:'可借阅',
	      },
	      {
	        id:7,
	        name:'机器学习',
	        actor:'Jobs',
	        type:'技术类',
	        press:'科学出版社',
	        time:'2015-10-10',
	        state:'可借阅',
	      },
	      {
	        id:8,
	        name:'PhotoShop入门',
	        actor:'Jobs',
	        type:'技术类',
	        press:'科学出版社',
	        time:'2015-10-10',
	        state:'可借阅',
	      },
	      {
	        id:9,
	        name:'极简经济学',
	        actor:'Jobs',
	        type:'文学类',
	        press:'新华出版社',
	        time:'2015-10-10',
	        state:'可借阅',
	      },
	      {
	        id:10,
	        name:'魔鬼经济学',
	        actor:'Jobs',
	        type:'文学类',
	        press:'新华出版社',
	        time:'2015-10-10',
	        state:'可借阅',
	      },
			],
			dialogVisible:false,
			dialogVisible2:false,
			bookTypes:[
				{
					value:'文学类',
					label:'文学类',
				},
				{
					value:'技术类',
					label:'技术类',
				},
				{
					value:'管理类',
					label:'管理类',
				},
				{
					value:'历史类',
					label:'历史类',
				},
				{
					value:'经济类',
					label:'经济类',
				}
			],
			addParam:{
				bookid:'',
				bookname:'',
				bookactor:'',
				booktype:'',
				bookpress:'',
				booktime:'',
			},
			xiabiao:'',
			totalNum:11,
			paging:{
				size:10,
				page:1,
			}
		}
	},
	mounted(){
		this.refreshTable();
	},
	methods:{
		//分页
		currentChange(val){
			//console.log(`当前页: ${val}`);
			this.paging.page = val;
		},
		handleSizeChange(size) {
      this.paging.size = size;
    },
		//编辑按钮
		handleEdit(index, row) {
      console.log(index, row);
      this.dialogVisible2 = true;

			this.addParam.bookid = row.id;
			this.addParam.bookname = row.name;
			this.addParam.bookactor = row.actor;
			this.addParam.booktype = row.type;
			this.addParam.bookpress = row.press;
			this.addParam.booktime = row.time;

			this.xiabiao = Number((this.paging.page-1)*this.paging.size + index);
    },
    //编辑确定按钮
    eidtSure(){
    	let s = {};
      s.id = this.addParam.bookid;
			s.name = this.addParam.bookname;
			s.actor = this.addParam.bookactor;
			s.type = this.addParam.booktype;
			s.press = this.addParam.bookpress;
			s.time = this.addParam.booktime;
			s.state = '可借阅';

			this.tableData.splice(this.xiabiao,1,s);
			sessionStorage.setItem('bookInfo',JSON.stringify(this.tableData));
			this.dialogVisible2 = false;
			this.$notify({
        title: '成功',
        message: '编辑图书信息成功！',
        type: 'success',
        duration:'1500'
      })
      this.refreshTable();
    },
    //删除按钮
    handleDelete(index, row) {
      //console.log(index, row);
      let ind = (this.paging.page-1)*this.paging.size + index;
      //console.log("ind:"+ind)
      this.tableData.splice(ind,1);
      sessionStorage.setItem('bookInfo',JSON.stringify(this.tableData));
      this.$notify({
        title: '成功',
        message: '删除图书信息成功！',
        type: 'success',
        duration:'1500'
      })
       this.refreshTable();
    },
    //添加按钮
		addBook(){
			this.dialogVisible = true;
			//sessionStorage.removeItem("bookInfo");
			this.addParam.bookid = '';
			this.addParam.bookname = '';
			this.addParam.bookactor = '';
			this.addParam.booktype = '';
			this.addParam.bookpress = '';
			this.addParam.booktime = '';
		},
		//添加确定按钮
		addSure(){
			if(this.addParam.bookid==''||this.addParam.bookname==''||this.addParam.bookactor==''||this.addParam.booktype==''||this.addParam.bookpress==''||this.addParam.booktime==''){
				this.$notify({
          title: '图书信息不完整',
          message: '请完整填写图书录入信息',
          type: 'warning',
          duration:'1500'
        })
        return false;
			}
			/*console.group('图书信息');
			console.log('bookid:'+this.addParam.bookid);
			console.log('bookname:'+this.addParam.bookname);
			console.log('bookactor:'+this.addParam.bookactor);
			console.log('booktype:'+this.addParam.booktype);
			console.log('bookpress:'+this.addParam.bookpress);
			console.log('booktime:'+this.addParam.booktime);
			console.groupEnd();*/
			//console.log('booktime:'+this.addParam.booktime);
			let s = {};
			s.id = this.addParam.bookid;
			s.name = this.addParam.bookname;
			s.actor = this.addParam.bookactor;
			s.type = this.addParam.booktype;
			s.press = this.addParam.bookpress;
			s.time = this.addParam.booktime;
			s.state = '可借阅';

			this.tableData.push(s);

			sessionStorage.setItem('bookInfo',JSON.stringify(this.tableData));//将table数据存储在sessionStorage中
			//Bus.$emit('data',JSON.stringify(this.tableData));
			//console.log(this.tableData)
			this.dialogVisible = false;
			this.$notify({
        title: '图书录入成功！',
        message: 'OK！',
        type: 'success',
        duration:'1500'
      })
      this.refreshTable();
		},
		getAjax(){
			ajax(this,this.extendApi.Data,'',(res)=>{
				this.resData =  eval('(' + res + ')');
				//console.log(this.resData);
				this.tableData = this.resData.data.rows;
			},"GET")
		},
		refreshTable(){
			let tableNew = JSON.parse(sessionStorage.getItem('bookInfo'));
			//console.log('tableNew:'+tableNew);
			if(tableNew == null){
				return false;
			}else{
				this.tableData = tableNew;
				this.totalNum = tableNew.length;
			}
		}
	}
}
</script>

<style scoped>
.bookManagement{
	width: 100%;
	height: 100%;
	padding: 30px;
	.box{
		width: 100%;
		.header{
			height: 72px;
			.addBtn{
				float: right;
				margin: 15px 30px 0 0;
			}
		}
		.table{
			min-height: 600px;
		}
	}
}
</style>

<style>
.bookManagement{
	.line{
		.block{
			width: 280px;
			float: left;
			margin: 5px 0;
			>span{
				font-size: 16px;
				display: inline-block;
				float: left;
				line-height: 40px;
			}
			.el-input{
				float: right;
				width: 180px;
				margin-right: 10px;
			}
			.el-select{
				float: right;
				width: 100px;
			}
			.el-select-dropdown__list{
				width: 176px !important;
			}
		}
	}
	.el-dialog__footer{
		margin-top: 130px;
	}
	.el-table__body-wrapper{
		overflow: hidden;
	}
	.box{
		.el-table{
			th{
				text-align: center;
			}
		}
	}
}
@media screen and (max-width: 1366px) {
	.bookManagement{
		.el-button+.el-button{
			margin-left: 0;
			margin-top: 5px;
		}
	}
}
.el-pagination{
	text-align: center;
}
</style>
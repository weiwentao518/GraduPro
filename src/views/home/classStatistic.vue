<template>
	<div class="classStatistic">
		<div id="pie" style="width:600px;height:600px;"></div>
		<div id="bar" style="width:600px;height:600px;"></div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			wenxue:'',
			jishu:'',
			guanli:'',
			lishi:'',
			jingji:'',
			num:{
				wenxue:0,
				jishu:0,
				guanli:0,
				lishi:0,
				jingji:0
			}
		}
	},
	mounted(){
		this.$nextTick(()=>{
			this.getClassNumber();
			this.paintingPie();
			this.paintingBarChart();
		})
	},
	methods:{
		paintingPie(){
			var myChart = this.$echarts.init(document.getElementById('pie'));

			myChart.setOption({
			    title : {
		        text: '本馆图书分类统计',
		        subtext: '纯属虚构',
		        x:'center'
			    },
			    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
		        orient: 'vertical',
		        left: 'left',
		        data: ['技术类','文学类','管理类','历史类','经济类']
			    },
			    series:[
		        {
	            name: '访问来源',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data:[
                {value:this.num.jishu, name:'技术类'},
                {value:this.num.wenxue, name:'文学类'},
                {value:this.num.guanli, name:'管理类'},
                {value:this.num.lishi, name:'历史类'},
                {value:this.num.jingji, name:'经济类'}
	            ],
	            itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
	            }
		        }
			    ]
			})
		},
		paintingBarChart(){
			var myChart2 = this.$echarts.init(document.getElementById('bar'));

			myChart2.setOption({
				title : {
	        text: '本馆图书分类统计',
	        subtext: '纯属虚构',
	        x:'center'
		    },
		    color:['#3398DB'],
		    tooltip:{
	        trigger: 'axis',
	        axisPointer:{            // 坐标轴指示器，坐标轴触发有效
	          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
		    },
		    grid:{
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
		    },
		    xAxis:[
	        {
            type : 'category',
            data : ['技术类', '文学类', '管理类', '历史类', '经济类'],
            axisTick: {
              alignWithLabel: true
            }
	        }
		    ],
		    yAxis:[
	        {
	          type : 'value'
	        }
		    ],
		    series:[
	        {
            name:'数量',
            type:'bar',
            barWidth: '50%',
            data:[this.num.jishu, this.num.wenxue, this.num.guanli, this.num.lishi, this.num.jingji]
	        }
		    ]
			})
		},
		getClassNumber(){
			let tableNew = JSON.parse(sessionStorage.getItem('bookInfo'));
			//console.log('tableNew:'+tableNew);
			if(tableNew == null){
				return false;
			}else{
				for(let i=0;i<tableNew.length;i++){
					console.log(tableNew[i].type);
					if(tableNew[i].type == '文学类'){
						this.num.wenxue++;
					}else if(tableNew[i].type == '技术类'){
						this.num.jishu++;
					}else if(tableNew[i].type == '管理类'){
						this.num.guanli++;
					}else if(tableNew[i].type == '历史类'){
						this.num.lishi++;
					}else if(tableNew[i].type == '经济类'){
						this.num.jingji++;
					}
				}
			}
		},
	}
}
</script>

<style>
.classStatistic{
	width: 100%;
	min-height: 800px;
	#pie{
		float: left;
	}
	#bar{
		float: left;
	}
}
</style>
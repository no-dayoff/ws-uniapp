<template>
	<view>
		<!-- <view v-for="(item,index) in record" :key="index">
		{{item.examName}}
		{{item.examType}}
		</view>
		{{$u.timeFrom(record[10].time)}}
		{{$u.timeFrom(record1[10].time)}}
		{{$u.timeFrom(record2[10].time)}}
		{{$u.timeFrom(record3[10].time)}}
		{{$u.timeFrom(record4[10].time)}}
		{{record[10].score}} -->
		<u-subsection :list="list" :current="current" mode="subsection" active-color="#325288" @change="sectionChange">
		</u-subsection>
		<view v-show="current==0">
			<view v-for="(item,index) in record" :key="index">
				<view class="recordOne">

					<view class="text1">答题成绩#{{index+1}}</view>
					<view class="text2">{{$u.timeFrom(item[10].time)}}</view>
					<view class="text3">分数：{{item[10].score}}</view>
					
					
					<view class="detailBtn" @click="goDetail(index)">查看详情</view>
				</view>
				
			</view>
				<u-popup v-model="show" mode="bottom" border-radius="14" :mask-custom-style="mask" :closeable="true">
					<view class="content">
						<scroll-view scroll-y="true" style="height: 900rpx;" class="scr-view">
							<view v-for="(detailItem,index) in record[popIndex]" :key="index">
								<view class="pop-detail-name" :class="[detailItem.examType==detailItem.type?'exam-right':'exam-err']">{{detailItem.examName}} {{detailItem.examType}}</view>
							</view>
						</scroll-view>
					</view>
				</u-popup>
		</view>
		<view v-show="current==1">
			<view>
				<view class="all-score">总得分:{{allScore}}</view>
				<view v-if="record[0]">得分：{{record[0][10].score}} 答题时间：{{timeChange(record[0][10].time)}}</view>
				<view v-if="record[1]">得分：{{record[1][10].score}} 答题时间：{{timeChange(record[1][10].time)}}</view>
				<view v-if="record[2]">得分：{{record[2][10].score}} 答题时间：{{timeChange(record[2][10].time)}}</view>
				<view v-if="record[3]">得分：{{record[3][10].score}} 答题时间：{{timeChange(record[3][10].time)}}</view>
				<view v-if="record[4]">得分：{{record[4][10].score}} 答题时间：{{timeChange(record[4][10].time)}}</view>
			</view>
			<view class="dec1">
				得分说明：最近的5次答题成绩会纪录得分，您的头衔取决于总得分，快来挑战吧！
			</view>
			<view class="dec2">
				头衔	：<view class="nowTitle">{{nowTitle}}</view>
				<u-rate :count="4" v-model="value" :disabled="true"></u-rate>
				<view>分类菜鸟——总得分000~200</view>
				<view>分类能手——总得分200~300</view>
				<view>分类高手——总得分300~400</view>
				<view>分类专家——总得分400~500</view>
			</view>
		</view>
		<view v-show="current==2">
			<view class="sort-tips">误区一：大棒骨是厨余垃圾。事实上，大棒骨因为“难腐蚀”被列入“其它垃圾”。类似的还有玉米核、坚果壳、果核等。</view>
			<view class="sort-tips">误区二：厕纸是纸，不算可回收“纸张”。厕纸、卫生纸遇水即溶，不算可回收的“纸张”，类似的还有陶器、烟盒等。</view>
			<view class="sort-tips">误区三：厨余垃圾装袋扔进桶。常用的塑料袋，即使是可以降解的也远比厨余垃圾更难腐蚀。此外塑料袋本身是可回收垃圾。正确做法应该是将厨余垃圾倒入垃圾桶，塑料袋另扔进“可回收垃圾”桶。</view>
			<view class="sort-tips">误区四：塑料制品都属于其他垃圾。除塑料袋外的塑料制品，比如泡沫塑料、塑料瓶、硬塑料、橡胶及橡胶制品，都属于可回收物。</view>
			<view class="sort-tips">误区五：速冻饺子、豆腐包装盒，都是厨房里产生的垃圾，当然是厨余垃圾。一次性餐具、食品包装袋都归类“其他垃圾”。另外，用过的餐巾纸、卫生间的纸，还有抽过的烟头、旧衣物，也属于“其他垃圾”。</view>
			<view class="sort-tips">误区六：吃完的花生壳算其它垃圾。吃完的花生壳应该算厨余垃圾。家里用剩的废弃食用油，也归类在厨余垃圾。</view>
			<view class="sort-tips">误区七：残枝落叶算其它垃圾。残枝落叶及家里开败的鲜花属于“厨余垃圾”，而尘土属于“其它垃圾”。</view>
		</view>
	</view>
</template>

<script>
	Date.prototype.Format = function(fmt) {
		var o = {
			"M+": this.getMonth() + 1, //月份 
			"d+": this.getDate(), //日 
			"h+": this.getHours(), //小时 
			"m+": this.getMinutes(), //分 
			"s+": this.getSeconds(), //秒 
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			"S": this.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((
				"00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}

	export default {
		data() {
			return {
				record: [],
				list: [{
						name: '答题纪录'
					},
					{
						name: '得分记录'
					},
					{
						name: '分类误区'
					}
				],
				current: 0,
				show: false,
				mask: {
					background: 'rgba(34, 34, 34, 0.2)'
				},
				popIndex:0,
				allScore:0,
				nowTitle:'分类菜鸟',
				value:1,
				//适配微信小程序的详情list
				detailNewList:''
			}
		},
		methods: {
			sectionChange(index) {
				this.current = index;
			},
			timeChange(time) {
				return new Date(time).Format("yyyy-MM-dd hh:mm")
			},
			goDetail(index) {
				console.log(index)
				this.popIndex=index
				this.show = true
			},
			strToVar(str) {
			        var json = (new Function("return " + str))();
			        return json;
			  }

		},
		onLoad() {
			// uni.removeStorageSync('record');
			// uni.removeStorageSync('record1');
			// uni.removeStorageSync('record2');
			// uni.removeStorageSync('record3');
			// uni.removeStorageSync('record4');

			//提取所有记录 在recordArr里
			// let record = 'record'
			let record0 = uni.getStorageSync('record')
			let record1 = uni.getStorageSync('record1')
			let record2 = uni.getStorageSync('record2')
			let record3 = uni.getStorageSync('record3')
			let record4 = uni.getStorageSync('record4')
			let recordArr = []
			
			//微信小程序内不能使用eval
			// for (let i = 0; i < 5; i++) {
			// 	let temp = eval(record + i)
			// }
				if (record0) {
					recordArr.push(record0)
				}
				if (record1) {
					recordArr.push(record1)
				}
				if (record2) {
					recordArr.push(record2)
				}
				if (record3) {
					recordArr.push(record3)
				}
				if (record4) {
					recordArr.push(record4)
				}
			
			//利用sort方法，对里面的time的属性按照大到小排序，也就是距离现在最近的时间正序排列
			recordArr.sort(function(a, b) {
				return b[10].time - a[10].time
			})
			
			//垃圾类别重写
			let trashType = uni.getStorageSync('trashType');
			if (trashType && trashType != '湿垃圾') {
					for (let i=0;i<recordArr.length;i++) {
						for(let j=0;j<recordArr[i].length;j++){
						if (recordArr[i][j].examType == '湿垃圾') {
							recordArr[i][j].examType = trashType
						} else if (recordArr[i][j].examType == '干垃圾') {
							recordArr[i][j].examType = '其他垃圾'
						} 
						if (recordArr[i][j].type == '湿垃圾') {
							recordArr[i][j].type = trashType
						} else if (recordArr[i][j].type == '干垃圾') {
							recordArr[i][j].type = '其他垃圾'
						}										
						}
					}
				}		
			this.record = recordArr
			//计算总分
			let allScore=0
			recordArr.forEach(function(a){
				allScore+=a[10].score
			})
			this.allScore=allScore
			//设置头衔
			let title={name:'分类菜鸟',level:1}
			if(allScore>=200 && allScore<300){
				title={name:'分类能手',level:2}
			}else if(allScore>=300 && allScore<400){
				title={name:'分类高手',level:3}
			}else if(allScore>=400){
				title={name:'分类专家',level:4}
			}
			uni.setStorageSync('title',title)
			let nowTitle=uni.getStorageSync('title')
			if(nowTitle){
			this.nowTitle=nowTitle.name
			this.value=nowTitle.level
			
			}
		}
	}
</script>

<style>
	.recordOne {
		/* margin: 40px; */
		width: 100vw;
		height: 20vh;
		margin: 10px 0px;
		background-color: #114e60;
		/* text-align: center; */
		color: #f4eee8;
		font-size: 20px;
		position: relative;
	}
	.text1{
		font-size: 24px;
		font-weight: 100;
	}
	.text2{
		padding: 5px 10px;
		font-size: 22px;
		font-weight: 100;
	}
	.text3{
		padding: 0px 10px;
		position: absolute;
		bottom: 70%;
		right: 0;
		font-size: 30px;
		font-weight: 600;
	}
	.detailBtn {
		width: 120px;
		height: 50px;
		background-color: #f5cebe;
		margin: 0 auto;
		text-align: center;
		line-height: 50px;
		border-radius: 25px;
		color: #4b4a4b;
		position: absolute;
		right: 4%;
		bottom: 15%;
	}
	.all-score{
		font-size: 40px;
		text-align: center;
		background-color: #f5eded;
		font-weight: 600;
	}
	.all-score~view{
		font-size: 18px;
		text-align: center;
		padding-top: 5px;
		font-family: 100;
		background-color: #a7c2e1;
	}
	.dec1{
		font-size: 18px;
		padding: 10px;
		text-align: justify;
		color: #00549d;
	}
	.dec2{
		font-size: 20px;
		text-align: center;
		font-weight: 100;
	}
	.sort-tips{
		font-size: 18px;
		font-weight: lighter;
		margin: 20px;
		background-color: rgb(240,248,255);
	}
	.pop-detail-name{
		font-size: 18px;
		padding: 10px;
	}
	.pop-detail-status{
		font-size: 18px;
	}
	.exam-right{
		background-color: #89e39d;
	}
	.exam-err{
		background-color: #f14765;
		color: white;
		/* width: 200px; */
	}
	.scr-view{
		background-color: #89e39d;
	}
	.nowTitle{
		color: #ff2c2c;
		display: inline-block;
		font-weight: 600;
		font-size: 22px;
		margin: 10px;
	}
</style>

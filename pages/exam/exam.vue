<template>
	<view>
		<u-toast ref="uToast" />
		<u-top-tips ref="uTips"></u-top-tips>
		<view v-for="(item,index) in exam" :key="index">
			<view v-if="currentIndex===index">
				<text class="num">{{index+1}}.</text><text class="highlight">{{item.name}}</text><text
					class="title">属于哪个垃圾分类?</text>
				<view class="btn-list">
					<!-- #ifdef H5 -->
					<view class="btn-select" v-on:touchend="selectTab('湿垃圾')">{{trashList[0]}}</view>
					<view class="btn-select" v-on:touchend="selectTab('干垃圾')">{{trashList[1]}}</view>
					<view class="btn-select" v-on:touchend="selectTab('可回收物')">{{trashList[2]}}</view>
					<view class="btn-select" v-on:touchend="selectTab('有害垃圾')">{{trashList[3]}}</view>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<view class="btn-select" @click="selectTab('湿垃圾')">{{trashList[0]}}</view>
					<view class="btn-select" @click="selectTab('干垃圾')">{{trashList[1]}}</view>
					<view class="btn-select" @click="selectTab('可回收物')">{{trashList[2]}}</view>
					<view class="btn-select" @click="selectTab('有害垃圾')">{{trashList[3]}}</view>
					<!-- #endif -->
				</view>
				<text class="tips-num">第{{index<9?index+1:10}}题/共10题</text>
			</view>
		</view>
		<view v-if="currentIndex===10">
			<u-notice-bar :list="list" :is-circular="false" type="primary" :volume-icon="false" :close-icon="true"
				@close="setNoticeBar('close')"></u-notice-bar>
			<view class="res-title">全国垃圾分类统一考试 </view>
			<view class="res-score">{{score}}分</view>
			<view class="res-table">
				<u-table>
					<u-tr>
						<u-th width="15%">题号</u-th>
						<u-th width="45%">题目</u-th>
						<u-th width="20%">我的答案</u-th>
						<u-th width="20%">正确答案</u-th>
					</u-tr>
					<u-tr v-for="(item,index) in record" :key="index">
						<u-td width="15%">{{index+1}}</u-td>
						<u-td width="45%">{{item.examName}}</u-td>
						<u-td width="20%">
							<view :class="[index==errorIndex[index]?'text-line':'text-yes']">{{item.type}}</view>
						</u-td>
						<u-td width="20%">
							<view :class="[index==errorIndex[index]?'text-bold':'']">{{item.examType}}</view>
						</u-td>
					</u-tr>
				</u-table>
			</view>
			<view class="bot-botton">
				<view class="remake-btn" @click="remake">
					再来一次
				</view>
				<view class="remake-btn" @click="scoreAdd">
					保存成绩
				</view>
			</view>
		</view>
		<!-- tabbar -->
		<u-tabbar :list="OneTabbar" :mid-button="true" active-color="#5098FF"></u-tabbar>
	</view>
</template>

<script>
	import OneTabbar from "../../tabbar.js"
	import globalData from "../../global.js";
	export default {
		data() {
			return {
				trashList: ['湿垃圾', '干垃圾', '可回收物', '有害垃圾'],
				list: [],
				OneTabbar: OneTabbar,
				exam: [],
				currentIndex: 0,
				record: [], //答题时记录正确答案和选择的答案
				score: 0, //记录分数,总分100分
				preTime: 0,
				guideInfo: globalData,
				errorIndex: [],
				flag: true,
				oldRecord: []
			}
		},
		watch: {
			currentIndex(val, oldVal) {
				if (val == 10) {
					this.changeTrash()
					// this.scoreAdd()
				}
			}
		},
		methods: {
			randomExam() {
				let randomExam = [];
				for (let i = 0; i < 10; i++) {
					let index1 = parseInt(Math.random() * 4)
					let length = this.guideInfo[index1].list.length
					let index2 = parseInt(Math.random() * length)
					randomExam.push({
						type: this.guideInfo[index1].type,
						name: this.guideInfo[index1].list[index2]
					})
				}
				this.exam = randomExam
			},
			selectTab(type) {
				let examName = this.exam[this.currentIndex].name
				let examType = this.exam[this.currentIndex].type
				this.record.push({
					examName,
					examType,
					type
				})
				if (examType === type) {
					this.score += 10
					this.errorIndex.push('yes')
				} else {
					this.errorIndex.push(this.currentIndex)
				}
				this.currentIndex++
			},
			remake() {
				this.randomExam()
				this.currentIndex = 0
				this.score = 0
				this.record = []
				this.errorIndex = []
				this.flag = true
				this.oldRecord = []
			},
			setNoticeBar(e) {
				if (e == 'close') {
					this.list = []
				} else {

					this.list = ["答题记录至多保存5次，距今最久的记录将被覆盖。"]
				}
			},
			changeTrash() {
				let trashType = uni.getStorageSync('trashType');
				this.oldRecord = JSON.parse(JSON.stringify(this.record))
				let newRecord = this.record
				if (trashType != '湿垃圾') {
					for (let i in newRecord) {
						if (newRecord[i].examType == '干垃圾') {
							newRecord[i].examType = '其他垃圾'
						} else if (newRecord[i].examType == '湿垃圾') {
							newRecord[i].examType = trashType
						}

						if (newRecord[i].type == '干垃圾') {
							newRecord[i].type = '其他垃圾'
						} else if (newRecord[i].type == '湿垃圾') {
							newRecord[i].type = trashType
						}
					}
					this.record = newRecord
				}
			},
			scoreAdd() {
				let record = 'record'
				let timeArr = []
				for (let i = 1; i < 6; i++) {
					let a = uni.getStorageSync(record)
					if (a) {
						record = 'record' + i
						timeArr.push(a[10].time)
					} else {
						break;
					}
				}
				if (record == 'record5') {
					//进入此处，说明已经存了5个record 需要覆盖旧的record
					// this.flag=false
					//找到最小的毫秒数的下标	
					let EXindex = timeArr.indexOf(Math.min(...timeArr))
					//覆盖旧的record 重新命名
					if (EXindex == 0) {
						record = 'record'
					} else {
						record = 'record' + EXindex
					}
				}
				if (this.flag) {
					let obj = {
						time: Date.now(),
						score: this.score
					}
					this.oldRecord.push(obj)
					uni.setStorageSync(record, this.oldRecord)
					this.$refs.uToast.show({
						title: '成绩保存成功！',
						type: 'success',
					})
					this.$refs.uTips.show({
						title: '成绩详情请在【我的-答题纪录】查看',
						type: 'success',
						duration: '4000'
					})
					this.flag = false
				} else {
					this.$refs.uToast.show({
						title: '该成绩保存过了！',
						type: 'error',
					})
				}
			},

		},
		onLoad() {
			this.randomExam()
			let res = uni.getStorageSync('record4')
			if (res) {
				//给予头部提示
				this.setNoticeBar()
			}
		},
		onShow() {
			let trashType = uni.getStorageSync('trashType')
			if (trashType) {
				this.trashList[0] = trashType
				this.trashList[1] = '其他垃圾'
			}
			if (trashType == '湿垃圾') {
				this.trashList[0] = trashType
				this.trashList[1] = '干垃圾'
			}

		}
	}
</script>

<style>
	.text-line {
		text-decoration: line-through;
		color: rgba(255, 0, 0, 0.62);
	}

	.text-yes {
		font-weight: 600;
		color: rgba(81, 113, 204, 1);
	}

	.text-bold {
		font-weight: 600;
	}

	.highlight {
		font-size: 60rpx;
		font-weight: 600;
		color: #fa3534;
	}

	.title {
		font-size: 18px;
		padding: 20rpx;
	}

	.num {
		font-size: 55rpx;
		color: #fa3534;
	}

	.tips-num {
		font-size: 30rpx;
		font-weight: 400;
		text-align: center;
		display: block;
		color: #82848A;
		margin-top: 60rpx;
		position: absolute;
		bottom: 30%;
		left: 50%;
		margin-left: -37px;
	}

	.btn-list {
		margin: 60rpx;
		position: absolute;
		top: 4%
	}

	.btn-list .btn-select {
		margin: 40px;
		padding: 8px 0;
		width: 250px;
		border-radius: 80px;
		text-align: center;
		font-size: 16px;
		font-weight: 600;
		color: white;
		position: relative;
	}

	.btn-list .btn-select:active {
		transition: 0.15s top linear;
		top: 3px;
		text-shadow: 0 1px 1px rgba(255, 255, 255, 0.3);
		/* color: #393939; */
	}

	.btn-list .btn-select:nth-child(1) {
		background: linear-gradient(to right, #6acf0c 0, #44bc58 100%);
		box-shadow: 0 7px 0 #03be61, 0 8px 3px rgba(0, 0, 0, 0.3);
	}

	.btn-list .btn-select:nth-child(1):active {
		box-shadow: 0 2px 0 #119107, 0 3px 3px rgba(0, 0, 0, 0.2);
	}

	.btn-list .btn-select:nth-child(2) {
		background: linear-gradient(to right, #f07d17 0, #ffae12 100%);
		box-shadow: 0 7px 0 #d58f02, 0 8px 3px rgba(0, 0, 0, 0.3);
	}

	.btn-list .btn-select:nth-child(2):active {
		box-shadow: 0 2px 0 #bec70e, 0 3px 3px rgba(0, 0, 0, 0.2);
	}

	.btn-list .btn-select:nth-child(3) {
		background: linear-gradient(to right, #3a8cf0 0, #859bff 100%);
		box-shadow: 0 7px 0 #0880d7, 0 8px 3px rgba(0, 0, 0, 0.3);
	}

	.btn-list .btn-select:nth-child(3):active {
		box-shadow: 0 2px 0 #0662a6, 0 3px 3px rgba(0, 0, 0, 0.2);
	}

	.btn-list .btn-select:nth-child(4) {
		background: linear-gradient(to right, #f01f5e 0, #ff73ab 100%);
		box-shadow: 0 7px 0 #d7004b, 0 8px 3px rgba(0, 0, 0, 0.3);
	}

	.btn-list .btn-select:nth-child(4):active {
		box-shadow: 0 2px 0 #a60a46, 0 3px 3px rgba(0, 0, 0, 0.2);
	}

	.res-table {
		margin: 40rpx;
	}

	.res-title {
		font-weight: 600;
		font-size: 58rpx;
		text-align: center;
		margin-top: 5px;
	}

	.res-score {
		font-size: 58rpx;
		font-weight: 600;
		text-align: center;
		color: rgba(255, 0, 0, 0.65);
		margin-top: 10rpx;
	}

	.remake-btn {
		text-align: center;
		background-image: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
		background-size: 400%;
		animation: show 24s linear infinite;
		width: 140px;
		height: 40px;
		border-radius: 40px;
		padding: 0;
		margin: 0 auto;
		font-size: 20px;
		color: black;
		line-height: 40px;
		box-shadow: 4px 5px 10px rgba(197, 197, 197, 0.8);

	}

	.remake-btn:nth-child(2) {
		color: white;
		font-weight: 600;
		background-image: linear-gradient(90deg, #30b57b, #5185bc, #2778a2, #30b59b);
		animation: show 24s linear infinite;
	}

	.bot-botton {
		display: flex;
	}

	@keyframes show {
		0% {
			background-position: 0%;
		}

		100% {
			background-position: 400%;
		}
	}
</style>

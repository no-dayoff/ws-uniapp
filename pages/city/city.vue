<template>
	<view class="warpper">
		<u-top-tips ref="uTips"></u-top-tips>
		<u-action-sheet :list="listAC" v-model="showAC" @click="clickAC" :tips="tipsAC"></u-action-sheet>
		<u-modal v-model="modalShow" confirm-text="好的" :title="modalTitle"
			:title-style="{color: 'red',fontSize:'18px',fontWeight:'600'}">
			<view class="slot-content">
				<rich-text :nodes="content"></rich-text>
			</view>
		</u-modal>
		<view class="bck">
			<view class="search-bar">
				<view class="city-select" @click="show = true">{{tips}}</view>
				<view class="line"></view>
				<view class="city-tips" @click="goSearch"><text class="iconfont icon-sousuo"></text>输入要搜索的名称(例纸箱)</view>
			</view>
		</view>
		<view class="header">
			<image class="bg_ware" src="/static/wave.gif"></image>
		</view>
		<u-select v-model="show" mode="mutil-column-auto" :list="list" @confirm="confirm" :default-value="arrindex"
			title="请选择试点城市">
		</u-select>
		<view class="trash-box">
			<view class="trash-box-header">垃圾种类</view>
			<view>
				<view>
					<u-row gutter="16">
						<u-col span="3" offset="2" v-for="(item,index) in trashList" :key="index">
							<view class="trash-tag" @click="showtips(index)">
								{{item}}
							</view>
						</u-col>
					</u-row>
				</view>
			</view>
		</view>
		<view class="lineBar"></view>
		<view class="leftBtn" @click="leftBtn">
			<span class="wave_scale">
			</span>
			<span class="wave_scale delay">

			</span>
		</view>
		<view class="rightBtn" @click="rightBtn"></view>
		<!-- tabbar -->
		<u-tabbar :list="OneTabbar" :mid-button="true" active-color="#5098FF" mid-button-size="98"></u-tabbar>
	</view>
</template>

<script>
	import cityList from '../../cityList.js'
	import OneTabbar from '../../tabbar.js'
	export default {
		data() {
			return {
				OneTabbar: OneTabbar,
				show: false,
				tips: '上海市',
				trashList: ['湿垃圾', '干垃圾', '可回收物', '有害垃圾'],
				arrindex: [8, 0],
				list: cityList,
				showAC: false,
				listAC: [{
					text: '我想识别一些垃圾的种类',
					color: 'blue',
					fontSize: 28,
					subText: '文字搜索/图像识别'
				}, {
					text: '我想学习一些垃圾分类知识'
				}, {
					text: '分享给朋友'
				}],
				tipsAC: {
					text: '您想用本程序做什么呢？',
					color: '#909399',
					fontSize: 24
				},
				modalShow: false,
				content: "",
				modalTitle: "提示"
			}
		},
		methods: {
			confirm(e) {
				let city = e[1].label
				let trashType = e[1].value
				let arrindex = [e[0].value, 0]
				if (e[1].extra) {
					arrindex = [e[0].value, e[1].extra]
				}
				this.tips = city
				this.arrindex = arrindex
				this.$refs.uTips.show({
					title: '您已经切换到' + city,
					type: 'primary',
					duration: '2300'
				})
				uni.setStorageSync('trashType', trashType);
				uni.setStorageSync('cityName', city);
				uni.setStorageSync('arrindex', arrindex);
				this.changeTrash()
			},
			changeTrash() {
				let trashType = uni.getStorageSync('trashType');
				this.trashList[0] = trashType
				if (trashType != '湿垃圾') {
					this.trashList[1] = '其他垃圾'
				} else {
					this.trashList[1] = '干垃圾'
				}
			},
			goSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			leftBtn() {
				this.showAC = true
			},
			rightBtn() {
				uni.navigateTo({
					url: '/pages/imgdetect/imgdetect'
				})
			},
			clickAC(index) {
				console.log(`点击了第${index + 1}项，内容为：${this.listAC[index].text}`)
				switch (index) {
					case 0:
						this.$refs.uTips.show({
							title: '设置好您所在城市，并使用输入搜索会更加精准！在【我的】里可以查看您的搜索记录和收藏记录！',
							type: 'error',
							duration: '3300'
						})
						break;
					case 1:
						this.$refs.uTips.show({
							title: '您可以点击底部的指南栏，查看不同垃圾的分类和投放标准！',
							type: 'warning',
							duration: '3300'
						})
						break;
					case 2:
						this.$refs.uTips.show({
							title: '点击右上角的按钮 · · ·即可转发本程序',
							type: 'success',
							duration: '2000'
						})
						break;
				}
			},
			showtips(index) {
				this.modalShow = true
				let type = this.trashList[index]
				this.modalTitle = type
				switch (index) {
					case 0:
						this.content = `
						${type}指容易腐烂的生物质废弃物，包括剩饭剩菜、过期食品、瓜皮果核、花卉绿植等。<br>
						常见的${type}有：<br>
						米饭、面、水果皮、花卉、蔬菜、植物、面包、调味品、肉类、零食等。
					`
						break;
					case 1:
						this.content = `
						${type}指除其他三类垃圾之外的砖瓦陶瓷、渣土、卫生间废纸、纸巾等难以回收的废弃物及尘土、食品袋等。<br>
						常见的${type}有：<br>
						污损餐盒、塑料袋、一次性餐具、纸巾、大棒骨、口罩、海绵、烟蒂等。
					`
						break;
					case 2:
						this.content = `
						${type}指适宜回收、可循环利用的废弃物，主要包括废纸、塑料、玻璃、金属和布料五大类。<br>
						常见的${type}有：<br>
						纸箱、报纸、易拉罐、塑料瓶、玻璃瓶、毛绒玩具、干净衣服等。 
					`
						break;
					case 3:
						this.content = `
						${type}指对人体健康或自然环境造成直接或潜在危害的生活垃圾。<br>
						常见的${type}有：<br>
						过期药品、水银体温计、废弃灯泡、电池、荧光灯管、油漆桶等。
					`
						break;
				}
			}
		},
		onLoad() {
			const value = uni.getStorageSync('cityName');
			if (!value) {
				//新用户没缓存
				uni.setStorageSync('cityName', '上海市')
				uni.setStorageSync('trashType', '湿垃圾');
			}

			const arrindex = uni.getStorageSync('arrindex')
			if (value && arrindex) {
				this.tips = value
				this.arrindex = arrindex
			}
			if (value != '上海市') {
				this.changeTrash();
			}
		},
		onShow() {
			const value = uni.getStorageSync('cityName');
			if (value != this.tips) {
				this.arrindex = uni.getStorageSync('arrindex')
				this.tips = value
				this.changeTrash()
			}
		},
		onShareAppMessage(res) {
			return {
				title: '这可能是您手机里最好用的垃圾分类指南~',
				path: '/pages/city/city?'
			}
		}
	}
</script>

<style>
	.slot-content {
		font-size: 32rpx;
		color: $u-content-color;
		text-align: left;
		padding: 20px;
	}

	.leftBtn {
		position: absolute;
		width: 75px;
		height: 75px;
		border-radius: 37.5px;
		/* background-image: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
		 background-size: 400%;
		 animation: show 12s linear infinite; */
		background-image: url(../../static/tabbar/huishou.png);
		background-repeat: round;
		bottom: 15.5%;
		/* bottom: 9.5%; */
		left: 3.5%;
		transform: matrix(0.707, 0.707, -0.707, 0.707, 0, 0);
	}

	.leftBtn span {
		position: absolute;
		width: 50%;
		height: 50%;
		top: 25%;
		left: 25%;
		/* border: 0.1rem solid rgba(248, 41, 171, 0.28); */
		border: 0.1rem solid rgba(94, 152, 238, 0.28);
		border-radius: 50%;
		z-index: -1;
	}

	.leftBtn span.wave_scale {
		animation: wave_scale 2.7s linear infinite;
		-webkit-animation: wave_scale 2.7s linear infinite;
	}

	@keyframes wave_scale {
		from {
			transform: translate3d(-41px, -41px, 0px) scale(1, 1);
			-webkit-transform: scale(1, 1);
			opacity: 1;
		}
		to {
			transform: translate3d(-41px, -41px, 0px) scale(10, 10);
			-webkit-transform: scale(5, 5);
			opacity: 0;
		}
	}

	span.wave_scale.delay {
		animation: wave_scale 3s linear infinite 0.3s;
		-webkit-animation: wave_scale 3s linear infinite 0.3s;
	}

	.lineBar {
		width: 100%;
		height: 30px;
		/* background-color: #007AFF; */
		background-image: linear-gradient(#fff, rgba(241, 241, 241, 0));
	}

	.rightBtn {
		position: absolute;
		width: 70px;
		height: 70px;
		border-radius: 35px;
		bottom: 16%;
		/* bottom: 10%; */
		right: 4%;
		box-shadow: 3px 3px 7px rgb(105 107 75 / 84%);
		/* background-image: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
		 background-size: 400%;
		 animation: show 12s linear infinite; */
		background-image: url(../../static/xiangji.png);
		background-repeat: round;
	}

	@keyframes show {
		0% {
			background-position: 0%;
		}

		100% {
			background-position: 400%;
		}
	}

	.warpper {
		background-color: rgb(241, 241, 241);
		height: 100vh;
		overflow: hidden;
	}

	.bck {
		height: 40vh;
		width: 100vw;
		background-image: url(../../static/trash.jpg);
		background-repeat: round space;
		background-size: contain;
		background-repeat-y: repeat;
		position: relative;

	}
	.header {
		position: relative;
		height: 5rpx;
		background: linear-gradient(to bottom, #3b69b5, #5f89ed);
	}

	.bg_ware {
		position: absolute;
		left: 0;
		bottom: -2rpx;
		width: 100%;
		mix-blend-mode: screen;
		height: 120rpx;

	}

	.search-bar {
		width: 90vw;
		height: 7vh;
		background-color: rgb(243, 243, 244);
		border-radius: 120upx;
		display: flex;
		position: absolute;
		top: 50px;
		right: 0;
		left: 0;
		bottom: 0;
		margin: auto;
		/* margin: 0 auto; */
		/* margin-top: 40rpx; */
	}

	.city-select,
	.city-tips {
		width: 30%;
		height: 7vh;
		/* background-color: #007AFF; */
		text-align: center;
		line-height: 7vh;
		font-size: 18px;
		font-weight: 400;
		color: rgb(94, 97, 108);
	}

	.line {
		width: 0.5%;
		height: 3.5vh;
		margin: auto 0;
		background-color: #cbcbcb;
	}

	.city-tips {
		width: 69.5%;
		color: rgb(172, 172, 172);
	}

	.city-select::after {
		content: '▼';
		font-size: 13px;
		padding-left: 6px;

	}

	.type-box {
		background-color: #007AFF;
		width: 100vw;
		height: 30vh;
		margin-top: 5vh;
	}

	.type-class {
		background-color: #18B566;
		width: 100px;
		height: 100px;
		border: #313C39 1px solid;
	}

	.type-class:nth-child(2) {
		background-color: red;
	}

	.type-class .type-text {
		font-size: 20px;
	}

	.trash-box {
		background-color: white;
		padding-top: 20px;
	}

	.trash-box-header {
		text-align: left;
		font-size: 20px;
		font-weight: 600;
		color: black;
		padding-left: 25px;
	}


	.trash-tag {
		margin: 20px 0 10px 0;
		background: linear-gradient(135deg, #6e8efb, #a777e3);
		border-radius: 4px;
		height: 30px;
		color: white;
		font-size: 18px;
		/* font-weight: 100; */
		text-align: center;
		line-height: 30px;

	}
</style>

<template>
	<view class="u-wrap">
		<!-- 返回顶部 -->
		<!-- #ifdef H5 -->
		<view @click="goTop" class="goTop" ref="goTop"></view>
		<!-- #endif -->
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="header">
			<view class="city"><text class="iconfont icon-dituzuobiao"
					style="padding:0px 5px;color: #FF9900;"></text>{{cityName}}</view>
			<search preholder="垃圾搜索" @toSearch="toSearchFun"></search>
		</view>
		<u-notice-bar mode="vertical" :list="noticeBar"></u-notice-bar>
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item,index) in tabbar" :key="index" class="u-tab-item"
					:class="[current==index ? ['u-tab-item-active',indexClass[index]] : '']" :data-current="index"
					@tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.name}}</text>
				</view>
				<!-- 动画滑块与会跳的鱼 -->
				<!-- #ifdef H5 -->
				<view class="slider" id="slider"></view>
				<view class="openBtn">
				</view>
				<!-- #endif -->
			</scroll-view>
			<block v-for="(item,index) in tabbar" :key="index">
				<scroll-view scroll-y class="right-box" v-if="current==index" @scrolltoupper="upper"
					@scrolltolower="lower" @scroll="scroll" :scroll-top="newScrollTop">
					<view class="page-view">
						<view class="class-item">
							<view class="top-box">
								<view class="item-top" :class="[index==current?indexClass[index]:'black']">
									<view class="item-title"><text>{{item.name}}</text></view>
									<view class="item-next">{{global[index].elplain}}</view>
									<view v-for="(item,index2) in global[index].rtext" :key="index2" class="item-show">
										■ {{item}}
									</view>
								</view>
							</view>
							<view class="item-container">
								<scroll-view scroll-y>
									<block>
										<view v-for="(item, index2) in dataList[index]" :key="item._id"
											class="item-list">{{item.name}}</view>
									</block>
								</scroll-view>
								<u-loadmore status="nomore" class="nomore" />
							</view>
						</view>
					</view>
				</scroll-view>
			</block>
			<!-- tabbar -->
			<u-tabbar :list="OneTabbar" :mid-button="true" active-color="#5098FF"></u-tabbar>
		</view>
	</view>
</template>

<script>
	import globalData from "../../global.js";
	import OneTabbar from "../../tabbar.js"
	import search from '@/components/ay-search/search.vue';
	export default {
		data() {
			return {
				newScrollTop: 0,
				old: {
					newScrollTop: 0
				},
				cityName: '上海市',
				OneTabbar: OneTabbar,
				noticeBar: ["全国垃圾分类标准因地制宜，本系统信息仅供参考", "各城市具体分类细则以当地专业管理部门为准。", "做好垃圾分类，让我们一起来为地球多添一抹绿色！"],
				tabbar: [{
					"name": "湿垃圾"
				}, {
					"name": "干垃圾"
				}, {
					"name": "可回收物"
				}, {
					"name": "有害垃圾"
				}],
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				global: globalData,
				rtext: [],
				indexClass: ['top-shi', 'top-gan', 'top-huishou', 'top-youhai'],
				dataList: [
					[{
						name: "阿尔卑斯糖"
					}, {
						name: "艾叶"
					}, {
						name: "艾草"
					}, {
						name: "八角"
					}, {
						name: "芭蕉叶"
					}, {
						name: "八宝饭"
					}, {
						name: "锅巴"
					}, {
						name: "八宝粥"
					}, {
						name: "巴旦木壳"
					}, {
						name: "白菜"
					}, {
						name: "板栗"
					}],
					[{
						name: "安全套"
					}, {
						name: "按摩棒"
					}, {
						name: "肮脏塑料袋"
					}, {
						name: "泥巴"
					}, {
						name: "扫把"
					}, {
						name: "拖把"
					}, {
						name: "旧拖把"
					}, {
						name: "百洁布"
					}, {
						name: "搅拌棒"
					}, {
						name: "搅拌勺"
					}, {
						name: "蹄膀骨头"
					}, {
						name: "棒骨"
					}],
					[{
						name: "安全帽"
					}, {
						name: "密胺碗"
					}, {
						name: "密胺餐具"
					}, {
						name: "档案袋"
					}, {
						name: "棉袄"
					}, {
						name: "浴霸灯"
					}, {
						name: "白纸"
					}, {
						name: "玻璃摆件"
					}, {
						name: "一般铁罐"
					}, {
						name: "复印件版纸"
					}, {
						name: "手办"
					}],
					[{
						name: "阿司匹林"
					}, {
						name: "浴霸灯泡"
					}, {
						name: "保健品"
					}, {
						name: "避孕药"
					}, {
						name: "中成药"
					}, {
						name: "电池"
					}, {
						name: "蓄电池"
					}, {
						name: "充电电池"
					}, {
						name: "白炽灯泡"
					}, {
						name: "白炽灯"
					}, {
						name: "除草剂"
					}]
				],
			}
		},
		computed: {},
		components: {
			search
		},
		onLoad() {

			for (let i = 0; i < 4; i++) {
				this.rtext.push(this.global[i].rtext)
			}
			uniCloud.callFunction({
				name: 'getList'
			}).then((res) => {
				this.dataList = []
				for (let i = 0; i < 4; i++) {
					this.dataList.push(res.result[i].data)
				}
			})
		},
		onShow() {
			//切换tabbar时触发
			let cityName = uni.getStorageSync('cityName')
			if (cityName) {
				this.cityName = cityName

			}
			let trashType = uni.getStorageSync('trashType')
			if (trashType) {
				this.tabbar[0].name = trashType
				this.tabbar[1].name = '其他垃圾'
				this.indexClass[0] = 'top-canchu'
				this.indexClass[1] = 'top-qita'
			}
			if (trashType == '湿垃圾') {
				this.tabbar[0].name = trashType
				this.tabbar[1].name = '干垃圾'
				this.indexClass[0] = 'top-shi'
				this.indexClass[1] = 'top-gan'
			}
		},
		methods: {
			toSearchFun(e) {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			getImg() {
				return Math.floor(Math.random() * 35);
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if (index == this.current) return;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;

				//goTOP 按钮注释
				// #ifdef H5
				let goTop = document.getElementsByClassName('goTop')
				goTop[0].classList.remove("changeZindex");
				// #endif
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			},
			upper: function(e) {
				//goTOP 按钮注释
				// #ifdef H5
				let goTop = document.getElementsByClassName('goTop')
				goTop[0].classList.remove("changeZindex");
				// #endif
			},
			lower: function(e) {
				this.$refs.uTips.show({
					title: '如果想查看更多数据，请使用搜索功能。',
					type: 'primary',
					duration: '2500'
				})
			},
			scroll: function(e) {
				this.old.newScrollTop = e.detail.scrollTop
				// goTOP 按钮注释
				// #ifdef H5
				let goTop = document.getElementsByClassName('goTop')

				if (e.detail.scrollTop > 400) {
					goTop[0].classList.add("changeZindex");
				}
				if (e.detail.scrollTop == 0) {
					goTop[0].classList.remove("changeZindex");
				}
				// #endif
			},
			// goTOP 按钮注释
			// #ifdef H5
			goTop: function(e) {
				this.newScrollTop = this.old.newScrollTop
				this.$nextTick(function() {
					this.newScrollTop = 0
				});
				let goTop = document.getElementsByClassName('goTop')
				goTop[0].classList.remove("changeZindex");
			},
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	.openBtn {
		position: absolute;
		width: 160px;
		height: 160px;
		bottom: -4%;
		left: 0;
		margin-left: -40px;
		background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01fff357909c890000012e7e76e205.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1622902209&t=233823d15b621498369eca1c9ff55184");
		background-repeat: round;
		mix-blend-mode: darken;
	}

	.city {
		width: 30%;
		height: 53px;
		line-height: 53px;
		// margin: 0 auto;
		text-align: center;
		font-size: 14px;
		font-weight: 600;
	}

	.header {
		display: flex;
	}

	.slider {
		background-color: rgba(157, 243, 166, 0.9);
		height: 10px;
		position: relative;
		top: 0px;
		z-index: -1;
		transition-property: top, background-color;
		transition-duration: 0.5s, 0.5s;
		transition-timing-function: ease-in-out;
	}


	/* #ifdef H5 */
	.u-tab-item:nth-child(1):hover~.slider {
		background-color: rgba(157, 243, 166, 0.9);
		top: -165px;
		z-index: 99;
	}

	.u-tab-item:nth-child(2):hover~.slider {
		background-color: rgba(255, 87, 87, 0.9);
		top: -110px;
		z-index: 99;
	}

	.u-tab-item:nth-child(3):hover~.slider {
		background-color: rgba(129, 217, 255, 0.9);
		top: -55px;
		z-index: 99;
	}

	.u-tab-item:nth-child(4):hover~.slider {
		background-color: rgba(249, 123, 150, 0.9);
		top: -0px;
		z-index: 99;
	}

	/* #endif */

	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
		background-color: #f6f6f6;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		color: #8f8f8f;
		font-weight: 200;
		line-height: 1;

	}


	.u-tab-item-active {
		position: relative;
		color: #ffffff;
		font-size: 32rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}

	.page-view {
		padding: 0;
	}

	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 32rpx 16rpx 16rpx 0;
		border-radius: 8rpx;
	}

	.item-container {
		display: flex;
		flex-wrap: wrap;
	}

	.top-box {
		margin-left: 28rpx;
	}

	.item-top {
		background-color: lightblue;
		border-radius: 10px;
	}

	.top-shi {
		background-color: $uni-color-shi;
	}

	.top-gan {
		background-color: $uni-color-gan;
	}

	.top-huishou {
		background-color: $uni-color-huishou;
	}

	.top-youhai {
		background-color: $uni-color-youhai;
	}

	.top-qita {
		background-color: $uni-color-qita;
	}

	.top-canchu {
		background-color: $uni-color-canchu;
	}

	.item-show {
		margin-left: 40rpx;
		padding: 10rpx;
		color: white;
		font-size: 30rpx;
	}

	.item-show:last-child {
		padding-bottom: 30rpx;
	}

	.item-list {
		padding: 15rpx;
	}

	.item-list:nth-child(even) {
		background-color: rgb(246, 246, 246);
	}

	.item-title {
		font-size: 52rpx;
		color: white;
		font-weight: bold;
		padding: 20rpx;
		margin-left: 20rpx;
	}

	.item-next {
		margin-left: 20rpx;
		padding: 20rpx;
		color: white;
		font-size: 30rpx;
	}

	.goTop {
		position: absolute;
		z-index: -1;
		right: 20px;
		bottom: 100px;
		background-image: url("https://z3.ax1x.com/2021/05/06/glWP4P.png");
		width: 50px;
		height: 50px;
		background-repeat: round;
	}

	.changeZindex {
		z-index: 999;
	}

	.nomore {
		margin: 0 auto;
	}
</style>

<template>
	<view>
		<u-modal v-model="show" :content="content" title="新闻简述" class="modal">
			<view class="slot-content">
				<rich-text :nodes="content">
				</rich-text>
				<view class="tips-link">
					<u-link :href="urlLink" :under-line="true">点此链接，查看原文</u-link>
				</view>
			</view>
		</u-modal>
		<view class="banner" @click="goBanner">
			<image class="banner-img" src="http://china.cnr.cn/gdgg/20181107/W020181107382611227870.jpg"></image>
			<view class="banner-title">这些年，总书记牵挂的民生事：垃圾分类 正成时尚</view>
		</view>
		<!-- H5中的新闻列表 -->
		<!--  #ifdef H5 -->
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in newsList" :key="key"
				@click="showDetail(key)">
				<view class="uni-media-list">
					<image class="uni-media-list-logo" :src="value.picUrl"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{value.title}}</view>
						<view class="uni-media-list-text-bottom">
							<text>{{value.source}}</text>
							<text>{{value.ctime}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- #endif-->

			<!-- 小程序界面 -->
			<!--  #ifdef MP-WEIXIN -->
			
			
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="GoDetail(1)">
					<view class="uni-media-list">
						<image class="uni-media-list-logo"
							src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1349597703,4002036282&fm=26&gp=0.jpg">
						</image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">我们都知道要垃圾分类，这么做的原因到底是什么呢？意义在哪里？</view>
							<view class="uni-media-list-text-bottom">
								<text>垃圾分类文章</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="GoDetail(2)">
					<view class="uni-media-list">
						<image class="uni-media-list-logo"
							src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.nmgnews.com.cn%2F003%2F002%2F694%2F00300269426_5656bd46.jpg&refer=http%3A%2F%2Fpic1.nmgnews.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625148059&t=951e7104e92d763322297dfef6799517">
						</image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">垃圾分类政策的对应细节问答</view>
							<view class="uni-media-list-text-bottom">
								<text>垃圾分类知识</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="GoDetail(3)">
					<view class="uni-media-list">
						<image class="uni-media-list-logo"
							src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.luoding.gov.cn%2Fimg%2F0%2F17%2F17405%2F1272103.jpg&refer=http%3A%2F%2Fwww.luoding.gov.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625148026&t=d00274c52f5ec32c1a2f2fef8602c0a7">
						</image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">垃圾分类 意义深远</view>
							<view class="uni-media-list-text-bottom">
								<text>垃圾分类文章</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="GoDetail(4)">
					<view class="uni-media-list">
						<image class="uni-media-list-logo"
							src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180615%2Fb668390cd8e44d98baac35a38eb65e2f.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625148059&t=4690383cc9da74fadb09685d961e5d0b">
						</image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">垃圾分类为什么这么重要？</view>
							<view class="uni-media-list-text-bottom">
								<text>分类政策解读</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- #endif -->

			<!-- tabbar -->
			<u-tabbar :list="OneTabbar" :mid-button="true" active-color="#5098FF"></u-tabbar>
		</view>
	</view>
</template>

<script>
	import OneTabbar from "../../tabbar.js"
	export default {
		data() {
			return {
				OneTabbar: OneTabbar,
				newsList: [],
				content: '',
				show: false,
				detailList: [],
				urlList: [],
				urlLink: ''
			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			getList() {
				// H5中请求新闻列表
				// #ifdef H5
				uni.request({
					url: 'https://api.tianapi.com/lajifenleinews/index',
					data: {
						key: ''
						//在这里输入你自己的天行API的KEY
					},
					success: (res) => {
						console.log(res);
						this.newsList = res.data.newslist
						for (let i = 0; i < this.newsList.length; i++) {
							this.detailList.push(res.data.newslist[i].description)
							this.urlList.push(res.data.newslist[i].url)
						}
					},
				})
				// #endif
			},
			showDetail(key) {
				this.show = true
				this.content = this.detailList[key] + '············'
				this.urlLink = this.urlList[key]
			},
			goBanner() {
				uni.navigateTo({
					url: '../banner/banner'
				})
			},
			GoDetail(e){
				uni.navigateTo({
					url:'./newsDetail?id='+e,
				})
			}
		}
	}
</script>

<style>
	.modal {
		line-height: 25px;
	}

	.tips-link {
		text-align: center;
		font-size: 50rpx;
	}

	.banner {
		height: 360upx;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}

	.banner-img {
		width: 100%;
	}

	.banner-title {
		max-height: 84upx;
		overflow: hidden;
		position: absolute;
		left: 30upx;
		bottom: 30upx;
		width: 90%;
		font-size: 32upx;
		font-weight: 400;
		line-height: 42upx;
		color: white;
		z-index: 11;
	}

	.uni-list {
		background-color: #FFFFFF;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.uni-list:after {
		position: absolute;
		z-index: 10;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-list::before {
		position: absolute;
		z-index: 10;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-list-cell {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.uni-list-cell-hover {
		background-color: #eee;
	}

	.uni-list-cell::after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 30upx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-list .uni-list-cell:last-child::after {
		height: 0upx;
	}

	/* 图文列表 */
	.uni-media-list {
		padding: 22upx 30upx;
		box-sizing: border-box;
		display: flex;
		width: 100%;
		flex-direction: row;
	}

	.uni-navigate-right.uni-media-list {
		padding-right: 74upx;
	}

	.uni-pull-right {
		flex-direction: row-reverse;
	}

	.uni-pull-right>.uni-media-list-logo {
		margin-right: 0upx;
		margin-left: 20upx;
	}

	.uni-media-list-logo image {
		height: 100%;
		width: 100%;
		/* background-repeat: round; */
	}


	.uni-media-list-text-bottom {
		width: 100%;
		line-height: 30upx;
		font-size: 26upx;
		color: #8f8f94;
	}

	.uni-media-list-logo {
		width: 180upx;
		height: 140upx;
		margin-right: 20upx;
	}

	.uni-media-list-body {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		overflow: hidden;
		height: auto;
	}

	.uni-media-list-text-top {
		width: 100%;
		line-height: 36upx;
		font-size: 30upx;
		height: 74upx;
		font-size: 28upx;
		overflow: hidden;
	}

	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>

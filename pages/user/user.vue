<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
			<view class="u-flex u-row-right" style="width: 100%;">
				<view class="camera u-flex u-row-center" @click="goImg">
					<u-icon name="camera-fill" color="#000000" size="48"></u-icon>
				</view>
			</view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30" :class="[userInfo.nickName=='爱学习的喵星人'?'':'unblur']">
			<view class="u-m-r-10">
				<u-avatar :src="userInfo.avatarUrl" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20" :class="[userInfo.gender==1?'male':'falame']">{{userInfo.nickName}}</view>
				<view class="u-font-14 u-tips-color"><u-icon name="level" color="#d4971c" size="30"></u-icon>{{nowTitle}}</view>
			</view>
			
			<!-- <view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view> -->
			<!-- <view class="u-m-l-10 u-p-10" @click="getInfo">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view> -->
			
		</view>
			<view :class="[userInfo.nickName=='爱学习的喵星人'?'unlogin':'unshow']" @click="getInfo">
				登录账号
				<u-icon name="arrow-right" color="#969799" size="50"></u-icon>
			</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="star" title="我的收藏" @click='goCollect'></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="more-circle" title="查询历史" @click="goHistory"></u-cell-item>
				<u-cell-item icon="order" title="答题记录" @click="goNotes"></u-cell-item>
				<u-cell-item icon="fingerprint" title="登录授权" @click="getInfo"></u-cell-item>
				<u-cell-item icon="heart" title="改进建议"><button open-type="feedback" type="primary" class="btn-sug"></button></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="设置" @click="goSetting"></u-cell-item>
			</u-cell-group>
		</view>
				
		
		<!-- tabbar -->
		<u-tabbar :list="OneTabbar" :mid-button="true"  active-color="#5098FF"></u-tabbar>
	</view>
</template>

<script>
	import OneTabbar from "../../tabbar.js"
	export default {
		data() {
			return {
				OneTabbar:OneTabbar,
				show:true,
				oldKwList:'',
				nowTitle:'分类菜鸟',
				userInfo:{nickName:'爱学习的喵星人',avatarUrl:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1750075865,2377531019&fm=26&gp=0.jpg',gender:'-1'}
			}
		},
		onLoad() {
			let nowTitle=uni.getStorageSync('title')
			if(nowTitle){
				this.nowTitle=nowTitle.name
			}
			// #ifdef MP-WEIXIN
			let us=uni.getStorageSync('userInfo')
			if(us){
				this.userInfo=us
			}
			// #endif
		},
		methods: {
			goSetting(){
				uni.navigateTo({
					url:'./setting'
				})
			},
			goHistory(){
				uni.navigateTo({
					url:'./history'
				})
			},
			goCollect(){
				uni.navigateTo({
					url:'./collect'
				})
			},
			goNotes(){
				uni.navigateTo({
					url:'./notes'
				})
			},
			goImg(){
				uni.navigateTo({
					url:'/pages/imgdetect/imgdetect'
				})
			},
			getInfo(){
				// 微信特有API获取用户信息
				// #ifdef MP-WEIXIN
				if(this.userInfo.nickName=='爱学习的喵星人'){					
				uni.getUserProfile({
				                lang:'zh_CN',
								desc:'登录',
								success:(res)=>{
									let userInfo={nickName:'',avatarUrl:'',gender:''}
									userInfo.nickName=res.userInfo.nickName
									userInfo.avatarUrl=res.userInfo.avatarUrl
									userInfo.gender=res.userInfo.gender
									uni.setStorageSync('userInfo',userInfo)
									this.$refs.uTips.show({
										title: '授权成功！',
										type: 'success',
										duration: '1300'
									})
									
									this.userInfo=userInfo
								},
								fail:(res)=>{
									this.$refs.uTips.show({
										title: 'oops！授权失败了，暂时用喵星人来代替您吧~',
										type: 'warning',
										duration: '2300'
									})
								}
							});
				}
				// #endif

			}
			
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.u-row-right{
	background-color: #fff;
}
.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
	filter:blur(4px);
	
}
.unlogin{
		background-color: rgba(225, 225, 225, 0.5);
		position: absolute;
		left: 0;
		top: 75rpx;
		width: 100vw;
		height: 16vh;
		font-size: 30px;
		text-align: center;
		line-height: 16vh;
		// font-weight: 100;
		color: rgb(81, 81, 81);
		// display: none;
}
.unblur{
	filter:none;
}
.unshow{
	display: none;
}
.u-tips-color{
	color: #F29100;
}
.btn-sug{
	opacity: 0;
	height: 26px;
}
.male{
	color: #757575;
}
.falame{
	color: #e46365;
}
</style>

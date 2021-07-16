<template>
	<view>
		<u-toast ref="uToast" />
		<u-modal v-model="show" :content="content" :show-title="false" :show-cancel-button="true"
			@confirm="confirmFeedback"></u-modal>
		<view class="seh-box seh-box-w">
			<aSearch class="aSearch-input-box" button="inside" :placeholder="placeholder" @input="inputChange"
				v-model="kw" @searchCancal="searchCancalFun" ref="setValue"></aSearch>
		</view>
		<view class="seh-kw">
			<scroll-view class="kw-list-box" v-show="isShowKwList" scroll-y>
				<block v-for="(row,index) in kwList" :key="index">
					<view class="kw-entry" hover-class="kw-entry-tap">
						<view class="kw-text" @tap.stop="TodoSearch(row)">
							<view>{{row.kw}}<text class="type-text">[{{row.type}}]</text></view>
						</view>
						<view class="kw-img">
						</view>
					</view>
				</block>
				<block v-if="kwList.length==0" class="no-more-class">
					<view class="kw-entry" hover-class="kw-entry-tap">
						<view class="kw-text">
							<view class="loading-tip">
								<u-loadmore :status="searchStatus" icon-type="flower" :load-text="loadText" />
							</view>
						</view>
					</view>
					<view v-show="searchStatus=='nomore'" class="no-more-block">
						<u-tag text="反馈" type="warning" shape="circleLeft" mode="dark" class="no-more-tag"
							@click="feedBack" :show="tagShow" />
					</view>
				</block>
			</scroll-view>

			<scroll-view class="kw-box" v-show="!isShowKwList" scroll-y>
				<view class="kw-block" v-if="oldKwList.length>0">
					<view class="kw-list-header">
						<view>历史搜索</view>
						<view>
							<view class="iconfont icon-shanchu" @tap="oldDelete"></view>
						</view>
					</view>
					<view class="kw">
						<view v-for="(item,index) in oldKwList" @tap="doSearch(item)" :key="index">{{item.kw}}</view>
					</view>
				</view>
				<view class="kw-block">
					<view class="kw-list-header">
						<view>热门搜索</view>
						<view>
							<view class="iconfont icon-chakan" :class="forbid?'icon-buchakan':'icon-chakan'"
								@tap="hotToggle"></view>
						</view>
					</view>
					<view class="kw" v-if="forbid==''">
						<view v-for="(item,index) in hotKwList" @tap="doSearch(item)" :key="index">{{item.kw}}</view>
					</view>
					<view class="hide-hot-tis" v-else>
						<view>当前热门搜索已隐藏</view>
					</view>
				</view>
			</scroll-view>


		</view>

	</view>
</template>

<script>
	import aSearch from './ay-search-top.vue';
	export default {
		data() {
			return {
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: 'Sorry, 没有找到您想要的结果'
				},
				defaultKw: '搜索关键字',
				searchKw: '',
				kw: "",
				oldKwList: [],
				forbid: '',
				isShowKwList: false,
				show: false,
				content: '',
				tagShow: true,
				tempkw: ''
			}
		},
		props: {
			searchStatus: {
				value: String,
				default: 'loading'
			},
			placeholder: {
				value: String,
				default: '请输入搜索内容'
			},
			kwList: {
				type: Array,
				default () {
					return []
				}
			},
			hotKwList: {
				type: Array,
				default () {
					return []
				}
			},
			padding: {
				type: Number,
				default: 0
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			height: {
				type: Number,
				default: 0
			},
			borderRadius: {
				type: Number,
				default: 0
			},
			themeColor: {
				type: String,
				default: '#33CCCC',
			},
			themeColor_dan: {
				type: String,
				default: '#AFEEEE',
			},
		},
		created: function() {
			let that = this;
			that.loadOldKw();
		},
		components: {
			//引用组件
			aSearch,

		},

		methods: {
			feedBack() {

				if (this.kw) {
					this.content = "您确定要把【" + this.kw + "】提交给我们吗？"
				} else {
					this.content = "您确定要把【" + this.tempkw.kw + "】提交给我们吗？"
				}
				this.show = true
			},
			confirmFeedback() {
				let subKey=''
				if(this.kw){
					subKey=this.kw
				}else{
					subKey=this.tempkw
				}
				uniCloud.callFunction({
					name: 'addFeedback',
					data: {
						name:subKey.kw
					}
				}).then(res => {
					this.$refs.uToast.show({
						title: '谢谢您的反馈，我们会做得更好！',
						type: 'success',
					})
					this.tagShow = false
				}).catch(err => {
					this.$refs.uToast.show({
						title: '抱歉，由于未知的原因失败了！',
						type: 'error',
					})
				})
			},
			//热门搜索开关
			hotToggle() {
				this.forbid = this.forbid ? '' : '_forbid';
			},

			blur() {
				uni.hideKeyboard()
			},

			//加载历史搜索,自动读取本地Storage
			loadOldKw() {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						this.oldKwList = OldKeys;
					}
				});
			},

			//监听输入
			inputChange(event) {
				if (this.tagShow == false) {

					this.tagShow = true
				}
				//兼容引入组件时传入参数情况
				var kw = event.detail ? event.detail.value : event;
				if (!kw) {
					//this.kwList = [];
					this.$emit('clearkwList', null);
					this.isShowKwList = false;
					return;
				}
				this.isShowKwList = true;

				this.$emit('setListByKw', kw);
				//this.setListByMap(kw);
			},

			//顶置关键字
			setKw(index) {
				//this.kw = this.kwList[index].kw;
			},
			//清除历史搜索
			oldDelete() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.oldKwList = [];
							uni.removeStorage({
								key: 'OldKeys'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//热门搜索开关
			hotToggle() {
				this.forbid = this.forbid ? '' : '_forbid';
			},
			//执行搜索
			doSearch(item) {
				this.tempkw = item
				let that = this;
				let kw = item.kw;
				this.kw = item.kw;
				// this.saveKw(item); //保存为历史 
				this.$refs.setValue.mykw = {
					'value': this.kw
				}
				this.$refs.setValue.setInput()
				this.isShowKwList = true
				this.$emit('doSearch', item);
				that.initShow();
			},
			TodoSearch(item) {
				this.saveKw(item); //保存为历史
				// this.$emit('doSearch', item); 
				//通知父组件更新kwlist,变成一行
				this.$emit('oneRow', item)
				this.$refs.setValue.mykw = {
					'value': item.kw
				}
				this.$refs.setValue.setInput()
				this.$refs.uToast.show({
					title: '已保存[' + item.kw + ']',
					type: 'success',
					duration: 800
				})

			},
			searchCancalFun() {
				uni.navigateBack({});
			},

			//保存关键字到历史记录
			saveKw(kw) {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						//看是否有相同项，有相同项则不保存
						let oldHave = false;
						let findIndex = 0;
						OldKeys.forEach(item => {
							if (item.kw == kw.kw) {
								oldHave = true;
								findIndex = OldKeys.indexOf(item);
							}
						})
						if (!oldHave) {
							OldKeys.unshift(kw);
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(kw);
						}
						//最多10个纪录
						OldKeys.length > 10 && OldKeys.pop();
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKwList = OldKeys; //更新历史搜索
					},
					fail: (e) => {
						var OldKeys = [kw];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKwList = OldKeys; //更新历史搜索
					}
				});
			},
			initShow() {
				let that = this;
				that.kw = '';
				// that.isShowKwList = false ;
				this.$emit('clearkwList', null);
			},
		}
	}
</script>

<style lang="scss">
	.type-text {
		color: rgb(239, 0, 0);
	}

	.seh-box {
		// width: 100%;
		background-color: rgb(242, 242, 242);
		padding: 15upx 2.5%;
		display: flex;
		justify-content: space-between;
		position: sticky;
		top: 0;
	}

	.seh-box-w {
		width: 100%;
	}

	.seh-box .aSearch-input-box {
		width: 100%;
	}


	.seh-box .input-box {
		width: 85%;
		flex-shrink: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}



	.seh-box .input-box>input {
		width: 100%;
		height: 60upx;
		font-size: 32upx;
		border: 0;
		border-radius: 60upx;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		padding: 0 3%;
		margin: 0;
		background-color: #ffffff;
	}

	.placeholder-class {
		color: #9e9e9e;
	}

	.seh-kw {
		width: 100%;
		background-color: rgb(242, 242, 242);
	}

	.kw-list-box {
		height: calc(100vh - 110upx);
		padding-top: 10upx;
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
	}

	.kw-entry-tap {
		background-color: #eee;
	}

	.kw-entry {
		width: 94%;
		height: 80upx;
		margin: 0 3%;
		font-size: 30upx;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1upx #e7e7e7;
	}

	.kw-entry image {
		width: 60upx;
		height: 60upx;
	}

	.kw-entry .kw-text,
	.kw-entry .kw-img {
		height: 80upx;
		display: flex;
		align-items: center;
	}

	.kw-entry .kw-text {
		width: 100%;
	}

	.kw-entry .kw-img {
		width: 10%;
		justify-content: center;
	}

	.kw-box {
		height: calc(100vh - 110upx);
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
	}

	.kw-box .kw-block {
		padding: 10upx 0;
	}

	.kw-box .kw-block .kw-list-header {
		width: 94%;
		padding: 10upx 3%;
		font-size: 27upx;
		color: #333;
		display: flex;
		justify-content: space-between;
	}

	.kw-box .kw-block .kw-list-header image {
		width: 40upx;
		height: 40upx;
	}

	.kw-box .kw-block .kw {
		width: 94%;
		padding: 3px 3%;
		display: flex;
		flex-flow: wrap;
		justify-content: flex-start;
	}

	.kw-box .kw-block .hide-hot-tis {
		display: flex;
		justify-content: center;
		font-size: 28upx;
		color: #6b6b6b;
	}

	.kw-box .kw-block .kw>view {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 60upx;
		padding: 0 20upx;
		margin: 10upx 20upx 10upx 0;
		height: 60upx;
		font-size: 28upx;
		background-color: rgb(242, 242, 242);
		color: #6b6b6b;
	}

	.loading-tip {
		margin: 0 auto;
	}

	.no-more-block {
		position: absolute;
		// // left: 0;
		// bottom: 70%;
		right: 0;
		// margin-right: -80px;
		top: 15%;
		// // margin: auto;
		// text-align: center;

	}

	.no-more-tag {
		// padding: 10px;
		// padding-right: 5px;
		font-size: 14px;
		font-weight: 600;
	}

	.no-more-class {
		// position: relative;
	}
</style>

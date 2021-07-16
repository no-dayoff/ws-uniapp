<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="picker">

			<uni-file-picker v-model="imageValue" fileMediatype="image" mode="grid" :limit="1" @success="success"
				@fail="fail" @select="select" ref="files" />
		</view>

		<u-popup v-model="show" border-radius="14" mode="center" width="500rpx" height="300px">
			<view class="pop-title">
				请选择您要识别的物体：
			</view>
			<u-radio-group v-model="value" @change="radioGroupChange" :wrap="true">
				<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.name"
					:disabled="false" :label-size="45">
					{{item.name}}
				</u-radio>
			</u-radio-group>

			<view class="show-res" v-show="res">
				{{res}}
			</view>
		</u-popup>

		<view class="bot-tips">
			请尽量保持物体主体位于图片中间，且周围尽量没有杂物。
		</view>
		<view>
			如果对识别结果不满意，建议您使用更为常见的词语来描述该物体，通过文字搜索功能进行识别。
		</view>
		<view class="bot-tips2">
			Enjoy It ~
		</view>
		<view class="bot-tips3" @click="goSearch">
			Click Me 去文字搜索
		</view>
		<view class="bot-tips4" @click="goBack">
			返回上一个界面
		</view>
	</view>
</template>

<script>
	import uniFilePicker from '@/uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue'
	export default {
		data() {
			return {
				imageValue: [],
				list: [],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				value: '',
				show: false,
				res: ''

			}
		},
		components: {
			uniFilePicker
		},
		methods: {
			// 上传成功
			select(e) {
				uni.showLoading({
					title: '图片识别中'
				})
			},
			success(e) {
				//云函数获取图片临时下载地址
				let url = ''
				uniCloud.callFunction({
					data: {
						path: this.imageValue[0].url
					},
					name: 'imgDetect'
				}).then(res => {
					//拿到临时下载地址
					url = res.result
					//请求百度AI
					uni.request({
						method: 'POST',
						url: 'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general?access_token=',
						//在这里接上你自己的access_token
						header: {
							'Content-Type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						data: {
							url: url
						}
					}).then(res => {
						console.log(res)
						let resArr = res[1].data.result
						let list = []
						for (let i = 0; i < resArr.length; i++) {
							if (resArr[i].score > 0.2) {
								let item = {
									name: resArr[i].keyword
								}
								list.push(item)
							}

						}
						this.list = list
						uni.hideLoading();
						this.show = true
					}).catch(err => {
						console.log(err)
						uni.hideLoading();
						this.$refs.uTips.show({
							title: '识别失败！请稍后再试',
							type: 'error'
						})
					})

				}).catch(err => {
					console.log(err)
					uni.hideLoading();
					this.$refs.uTips.show({
						title: '识别失败！请稍后再试',
						type: 'error'
					})
				})
			},
			// 上传失败
			fail(e) {
				this.$refs.uTips.show({
					title: '操作失败！请稍后再试',
					type: 'error'
				})
				uni.hideLoading();
			},
			onLoad() {
			},
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				//用该数据去数据库查找数据
				this.res = 'Loading...'
				this.searchTrash(e)
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			},
			searchTrash(e) {
				uniCloud.callFunction({
					name: 'getTrashType',
					data: {
						name: e
					}
				}).then(res => {
					this.res = res.result.data[0].category			
				}).catch(err => {
					this.res = '抱歉，没有匹配到该数据！'
				})

			},
			goSearch() {
				uni.navigateTo({
					url: '../search/search'
				})
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>
	.picker {
		background-color: #0a043c;
	}

	.pop-title {
		text-align: center;
		font-size: 18px;
		margin-bottom: 20px;
	}

	.show-res {
		font-size: 18px;
		font-weight: 600;
		margin-top: 20px;
		text-align: center;
		color: #ff201c;
	}

	.bot-tips {
		font-size: 25px;
		padding: 20px;
		text-align: center;
		color: white;
		background-color: #03506f;
	}

	.bot-tips+view {
		font-size: 25px;
		padding: 20px;
		color: white;
		background-color: #a3ddcb;
	}

	.bot-tips2 {
		font-size: 25px;
		padding: 20px;
		text-align: center;
		color: black;
		background-color: #ffe3de;
	}

	.bot-tips3 {
		font-size: 25px;
		padding: 20px;
		text-align: center;
		color: black;
		background-color: #e1e5ea;
	}

	.bot-tips4 {
		font-size: 25px;
		padding: 20px;
		text-align: center;
		color: black;
		background-color: #a7bbc7;
	}
</style>

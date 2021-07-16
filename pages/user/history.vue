<template>
	<view>
		<u-notice-bar mode="horizontal" :list="toplist" :is-circular="false" v-if="list.length!=0"></u-notice-bar>
		<u-toast ref="uToast" />
		<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list" :key="item.id" @click="click"
			@open="open" :options="options">
			<view class="item u-border-bottom">
				<!-- <image mode="aspectFill" :src="item.images" /> -->
				<view class="SUB-img" :style="{backgroundColor:colorType(item.type)}"><text>{{item.type}}</text></view>
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="title-wrap">
					<text class="title u-line-2">{{ item.kw }}</text>
				</view>
			</view>

		</u-swipe-action>
		<u-empty v-if="list.length==0" text="无历史记录" mode="history" class="empty-history"></u-empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				toplist: ['仅保存十个临时查询记录，左滑收藏可以永久保存！'],
				list: [],
				disabled: false,
				// btnWidth: 180,
				show: false,
				tempOldKeys: '',
				options: [{
						text: '收藏',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#ec4040'
						}
					}
				]
			};
		},
		onLoad() {
			let res = uni.getStorageSync('OldKeys');
			if (res) {
				this.tempOldKeys = JSON.parse(res)
				let OldKeys = JSON.parse(JSON.stringify(this.tempOldKeys));
				for (let i = 0; i < OldKeys.length; i++) {
					OldKeys[i].id = i
					OldKeys[i].show = false
				}
				let trashType = uni.getStorageSync('trashType');
				//默认更改
				for (let i in OldKeys) {
					if (OldKeys[i].type == '可回收垃圾') {
						OldKeys[i].type = '可回收物'
					}else if(OldKeys[i].type == '湿垃圾'||OldKeys[i].type == '餐厨垃圾'||OldKeys[i].type == '易腐垃圾'||OldKeys[i].type == '厨余垃圾'){
						OldKeys[i].type = trashType
					}else if(OldKeys[i].type == '干垃圾'){
						OldKeys[i].type = '其他垃圾'
					}
				}
				this.list = OldKeys
			}
		},
		methods: {
			colorType(type) {
				switch (type) {
					case '有害垃圾':
						return '#a64254';
					case '可回收物':
						return '#496aa3';
					case '其他垃圾':
						return '#e89f38';
					case '干垃圾':
						return '#313c39';
					case '湿垃圾':
						return '#8a7058';
					default:
						return '#2E6D61';
				}

			},
			click(index, index1) {
				if (index1 == 1) {
					let temp = this.tempOldKeys
					let deleted = this.list.splice(index, 1);
					for (let i in temp) {
						if (deleted[0].kw == temp[i].kw) {
							temp.splice(i, 1)
						}
					}
					uni.setStorage({
						key: 'OldKeys',
						data: JSON.stringify(temp)
					});
					this.$refs.uToast.show({
						title: '[' + deleted[0].kw + ']已删除',
						type: 'error',
						duration: 1000,
						position: 'top'
					})
				} else {
					this.list[index].show = false;
					let star_name = this.list[index].kw
					let star_type = this.tempOldKeys[index].type
					let star = {
						kw: star_name,
						type: star_type
					}
					let arr = []
					let flag = true
					const value = uni.getStorageSync('StarKeys');
					for (let i in value) {
						arr.push(value[i])
						if (value[i].kw == star.kw) {
							flag = false
							break;
						}
					}
					if (flag) {
						arr.push(star)
						uni.setStorageSync('StarKeys', arr);
						this.$refs.uToast.show({
							title: '收藏成功',
							type: 'success',
							duration: 1200
						})
					} else {
						this.$refs.uToast.show({
							title: '[' + star.kw + ']已被收藏',
							type: 'warning',
							duration: 1200
						})
					}
				}
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.item {
		display: flex;
		padding: 10rpx;
	}

	.empty-history {
		// height: 85vh;
		// display: flex;
		// align-items: center;
		// justify-content: center;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}

	// image {
	.SUB-img {
		width: 240rpx;
		flex: 0 0 180rpx;
		height: 100rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
		// background-color: rgb(255, 131, 23);
		color: white;

	}

	.SUB-img text {
		font-size: 18px;
		line-height: 100rpx;
		text-align: center;
		padding-left: 10px;
	}

	.title {
		text-align: left;
		font-size: 20px;
		color: $u-content-color;
		margin-top: 20rpx;
		font-weight: lighter;
	}
</style>

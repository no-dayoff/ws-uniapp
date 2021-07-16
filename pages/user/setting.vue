<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="top-city"><text class="iconfont icon-dituzuobiao"
				style="padding:0px 5px;color: #FF9900;font-size: 20px;"></text>{{nowCity}}</view>
		<u-index-list :scrollTop="scrollTop" :index-list="indexList">
			<view v-for="(item, index) in list" :key="index">
				<u-index-anchor :index="item.letter" />
				<view class="list-cell" v-for="(item1, index1) in item.data" :key="index1" @click="clickCity(item1)">
					<view :class="[nowCity==item1.name?'active':'']">{{item1.name}}</view>
				</view>
			</view>
		</u-index-list>
	</view>
</template>

<script>
	import indexList from '../../index.list.js'
	import cityList from '../../cityList.js'
	const letterArr = indexList.list.map(val => {
		return val.letter;
	})
	export default {
		data() {
			return {
				scrollTop: 0,
				indexList: letterArr,
				list: indexList.list,
				nowCity: '上海市',
				cityList: cityList
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad() {
			let cityName = uni.getStorageSync('cityName')
			if (cityName) {
				this.nowCity = cityName
			}
		},
		methods: {
			clickCity(e) {
				this.nowCity =e.name
				for (let i = 0; i < cityList.length; i++) {
					for (let j = 0; j < cityList[i].children.length; j++) {
						if (this.nowCity == cityList[i].children[j].label) {
							let city = cityList[i].children[j].label
							let trashType = cityList[i].children[j].value
							let arrindex = [cityList[i].value, 0]
							if (cityList[i].children[j].extra) {
								arrindex = [cityList[i].value, cityList[i].children[j].extra]
							}
							uni.setStorageSync('trashType', trashType);
							uni.setStorageSync('cityName', city);
							uni.setStorageSync('arrindex', arrindex);
						}
					}
				}
				this.$refs.uTips.show({
					title: '当前城市已切换为' + this.nowCity,
					type: 'primary',
					duration: '1200'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}

	.active {
		font-size: 16px;
		color: #6969ff;
		font-weight: 600;
	}

	.top-city {
		font-size: 20px;
		padding: 10px 20px;
		font-weight: 600;
	}
</style>

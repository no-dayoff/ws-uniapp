<template>
 <view>
	 <u-modal v-model="show" :content="content" :show-cancel-button="true" @confirm="deleteStar"></u-modal>
	 <u-toast ref="uToast" />
	 <view v-for="(item,index) in dataList" :key="index" >
		 <view class="star-card"  @longpress="logoTime(index)" :style="{backgroundColor:colorType(item.type)}">
			 <view class="trash-name">{{item.kw}}</view>
			 <view class="trash-type">{{item.type}} </view>
			 <view class="city-name">{{cityname}}</view>
		 </view>
		 
	 </view>
	 <u-empty mode="favor" v-show="dataList==''" class="none"></u-empty>
 </view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:'',
				cityname:'上海',
				show: false,
				content: '',
				nowIndex:'',
				value:''
			}
		},
		methods: {
			logoTime(index){
				this.content='您确定要从收藏中删除【'+this.dataList[index].kw+'】吗？'
				this.show=true
				this.nowIndex=index
				
			},
			deleteStar(){
				console.log(this.nowIndex)
				let value = this.value
				value.splice(this.nowIndex,1)
				// let deleted = this.list.splice(index, 1);
				this.dataList.splice(this.nowIndex,1)
				uni.setStorage({
					key: 'StarKeys',
					data: value
				});
				this.$refs.uToast.show({
					title: '删除成功',
					type: 'error',
					duration: 1100,
					position:'top'
				})
			},
			colorType(type) {
				switch (type) {
					case '有害垃圾':
						return '#a64254';
					case '可回收物':
						return '#608bd6';
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
		},
		onLoad(){
			const value = uni.getStorageSync('StarKeys');
			console.log(value)
			this.value=value;
			const trashType = uni.getStorageSync('trashType');
			let cityname = uni.getStorageSync('cityName');
			if(cityname&&cityname!='呼和浩特'&&cityname!='乌鲁木齐'){
				cityname=[...cityname]
				cityname.splice(cityname.length-1,1)
				cityname=cityname.join("")
				console.log(cityname)
			}
			this.cityname=cityname
			
			let StarKeys=JSON.parse(JSON.stringify(value))
			//默认更改
			for (let i in StarKeys) {
				if (StarKeys[i].type == '可回收垃圾') {
					StarKeys[i].type = '可回收物'
				}
				
			}
				//新用户和非上海用户
			if (trashType && trashType != '湿垃圾') {
					for (let i in StarKeys) {
						if (StarKeys[i].type == '湿垃圾') {
							StarKeys[i].type = trashType
						} else if (StarKeys[i].type == '干垃圾') {
							StarKeys[i].type = '其他垃圾'
						}
					}
				}
			
				// this.list = StarKeys
				this.dataList=StarKeys
		}
	}
</script>

<style>
	.star-card{
		width: 100vw;
		height: 15vh;
		background-color: #da7f7f;
		border: groove 1px rgba(99,94,94,0.2);
		position: relative;
	}
	.trash-name{
		font-size: 30px;
		color: white;
		font-weight: 600;
		padding-left: 20px;
	}
	.trash-type{
		color: white;
		padding: 10px 20px;
		font-size: large;
		font-weight: 100;
	}
	.city-name{
		color: white;
		position: absolute;
		right: 4%;
		bottom: 10%;
		font-size: 12px;
	}
	.none{
		position: absolute;
		right: 0;
		left: 0;
		bottom: 0;
		top: 0;
		margin: auto;
	}
</style>

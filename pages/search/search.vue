<template>
	<view>
		<aSearchList :placeholder="defaultKw" :kwList="kwList" :hotKwList="hotKwList" @clearkwList="clearkwList" @setListByKw="setListByMap"
		 @doSearch="doSearch" :searchStatus="searchStatus" @oneRow="oneRow"></aSearchList>
	</view>
</template>

<script>
	import aSearchList from '@/components/ay-search/ay-search-list.vue';
	export default {
		data() {
			return {
				searchStatus:'',
				defaultKw: '请输入您想查询的物品',
				searchKw: '',
				kw: "",
				kwList: [],
				hotKwList: [],
			}
		},
		components: {
			//引用组件
			aSearchList
		},
		onLoad() {
			uni.request({
				url: 'https://api.tianapi.com/txapi/hotlajifenlei/index',
				data: {
					key: ''
					//在这里输入你自己天行API的KEY
				},
				success: (res) => {
					let hklist = res.data.newslist
					for (let i = 0; i < 20; i++) {
						this.hotKwList.push({
							'kw': hklist[i].name
						})
					}
				},
			})
		},
		methods: {
			clearkwList() {
				this.kwList = [];
			},
			setListByMap(kw) {
				this.searchStatus='loading'
				uniCloud.callFunction({
					name: 'searchList',
					data: {
						name: kw
					}
				}).then((res) => {
					this.kwList = []
					let maxNum = res.result.data.length
					for (let i = 0; i < maxNum; i++) {
						let str1 = res.result.data[i].name
						let str2 = res.result.data[i].category
						this.kwList.push({
							'kw': str1,
							'type': str2
						})
					}
					
					if(this.kwList.length==0){
						this.searchStatus='nomore'
					}
					//对不是上海的城市的kwlist再做过滤
					let trashType=uni.getStorageSync('trashType');
					if(trashType && trashType !='湿垃圾'){
						let newList=this.kwList
						for(let key in newList){
							if(newList[key].type=='湿垃圾'){
								newList[key].type=trashType
							}else if(newList[key].type=='干垃圾'){
								newList[key].type='其他垃圾'
							}
						}
						this.kwList=newList
					}
					
				})
			},
			doSearch(item) {
				let kw = item.kw;
				this.kw = item.kw;
				this.setListByMap(item.kw)
			},
			oneRow(item){
				this.kwList=[{kw:item.kw,type:item.type}]
			}
		}
	}
</script>

<style>

</style>

'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	let value=event.name
	const collection = db.collection('trash');
	const res = await collection.where({
		 name: value
	}).get()
	
	//返回数据给客户端
	return res
};

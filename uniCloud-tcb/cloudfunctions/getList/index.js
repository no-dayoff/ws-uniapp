'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('trash');
	const res1 = await collection.where({
		 category:'湿垃圾'
	}).limit(500).get()
	const res2 = await collection.where({
		 category:'干垃圾'
	}).limit(500).get()
	const res3 = await collection.where({
		 category:'可回收垃圾'
	}).limit(500).get()
	const res4 = await collection.where({
		 category:'有害垃圾'
	}).limit(500).get()
	return [res1,res2,res3,res4]
};

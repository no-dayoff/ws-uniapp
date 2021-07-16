'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	let value=event.name
	const collection = db.collection('trash');
	const res = await collection.orderBy("category", "desc").where({
		 name: new RegExp(value, 'i')
	}).get()
	return res
};

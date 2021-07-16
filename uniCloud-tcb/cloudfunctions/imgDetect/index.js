'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	console.log(event.path)
	let result = await uniCloud.getTempFileURL({
	    fileList: [event.path]
	});
	
	const imageUrl=result.fileList[0].download_url
	// let image = buffer.toString("base64");

	//返回数据给客户端
	return imageUrl
};

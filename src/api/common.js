import service from "@/until/request.js"

//获取七牛云上传token
export function uploadImgToken(data){
	return service.request({
		method:'post',
		url:'/uploadImgToken/',
		data
	})
}
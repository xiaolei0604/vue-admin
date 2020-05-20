import service from "@/until/request.js"

export function addFirstCategory(data){
	return service.request({
		method:'post',
		url:'/news/addFirstCategory/',
		data
	})
}
export function getCategoryAll(data){
	return service.request({
		method:'post',
		url:'/news/getCategoryAll/',
		data
	})
}
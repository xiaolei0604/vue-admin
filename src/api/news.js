import service from "@/until/request.js"
//添加一级分类
export function addFirstCategory(data){
	return service.request({
		method:'post',
		url:'/news/addFirstCategory/',
		data
	})
}
//获取所有分类
export function getCategoryAll(data){
	return service.request({
		method:'post',
		url:'/news/getCategoryAll/',
		data
	})
}
//删除分类
export function deleteCategory(data){
	return service.request({
		method:'post',
		url:'/news/deleteCategory/',
		data
	})
}
//修改分类
export function editCategory(data){
	return service.request({
		method:'post',
		url:'/news/editCategory/',
		data
	})
}
	

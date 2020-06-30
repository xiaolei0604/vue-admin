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
//添加子分类
export function addChildrenCategory(data){
	return service.request({
		method:'post',
		url:'/news/addChildrenCategory/',
		data
	})
}
//获取信息列表

export function getList(data){
	return service.request({
		method:'post',
		url:'/news/getList/',
		data
	})
}

//添加新闻	
export function add(data){
	return service.request({
		method:'post',
		url:'/news/add/',
		data
	})
}

//删除新闻
export function delNews(data){
	return service.request({
		method:'post',
		url:'/news/deleteInfo/',
		data
	})
}

//修改新闻
export function editInfo(data){
	return service.request({
		method:'post',
		url:'/news/editInfo/',
		data
	})
}
import service from "@/until/request.js"

export function getRole(data){
	return service.request({
		method:'post',
		url:'role/',
		data
	})
	
}

export function addUser(data){
	return service.request({
		method:'post',
		url:'/user/add/',
		data
	})
}

export function getUser(data){
	return service.request({
		method:'post',
		url:'/user/getList/',
		data
	})
}

export function delUser(data){
	return service.request({
		method:'post',
		url:'/user/delete/',
		data
	})
}


export function editActive(data){
	return service.request({
		method:'post',
		url:'/user/actives/',
		data
	})
}
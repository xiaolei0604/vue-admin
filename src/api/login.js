import service from "@/until/request.js"

//获取邮箱验证码
export function getSms(data){
	 return service.request({
		method: 'post',
		url: '/getSms/',
		data
		})
}
export function register(data){
	return service.request({
		method:'post',
		url:'/register/',
		data
	})
}
export function login(data){
	return service.request({
		method:'post',
		url:'/login/',
		data
	})
}
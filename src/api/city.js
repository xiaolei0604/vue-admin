import service from "../until/request.js"

//获取所有省份
export function getProvince(data){
	return service.request({
		method:'post',
		url:'/cityPicker/',
		data
	})
}
import axios from "axios";
import { Message } from 'element-ui';

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/api';

const service = axios.create({
	baseURL: BASEURL,
	timeout: 1000,

})
//请求之前做什么
service.interceptors.request.use(function (config) {
	
    // 在发送请求之前做些什么
	config.headers['token']='zhaohailei'
	config.headers['appid']='goodgood123'
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器（请求之后做什么）
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
	let data=response.data
	console.log(response)
	if(data.resCode!==0){
		Message.error(data.message)
		return Promise.reject(data)
	}else{
		return response
		return Promise.resolve(data)
	}
    
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default service;
import { MessageBox } from 'element-ui';
import {reactive,ref} from "@vue/composition-api";
import {getCategoryAll} from "../api/news.js";
//公共方法调取新闻分类
export function globalGetCategory (){
	const catList=reactive({
		item:[]
	})
	const globalGetCategoryAll=(()=>{
		getCategoryAll().then(response=>{
			let cateDate=response.data.data
			catList.item=cateDate
		}).catch(error=>{
			console.log(error)
			root.$message.error("获取列表失败")
		}) 
	})
	return{
		catList,
		globalGetCategoryAll
	}
}
//转换时间戳
export function toDateChange(dataC){
	let timestamp=dataC;
	let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	let Y = date.getFullYear() + '-';
	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	let D = date.getDate() + ' ';
	let h = date.getHours() + ':';
	let m = date.getMinutes() + ':';
	let s = date.getSeconds();
	return Y + M + D + h + m + s;
}
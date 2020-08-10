<template>
	<div>
	    <el-select v-model="addList.province" placeholder="请选择省" class="address_select" @change="getcity(addList.province,true)" size="small">
	      <el-option v-for="item in addList.sheng" :key="item.PROVINCE_ID" :label="item.PROVINCE_NAME" :value="item.PROVINCE_CODE">
	      </el-option>
	    </el-select>
	    <el-select v-model="addList.city" placeholder="请选择市" class="address_select" @change="getarea(addList.city,true)" size="small">
	      <el-option v-for="item in addList.shi" :key="item.CITY_ID" :label="item.CITY_NAME" :value="item.CITY_CODE">
	      </el-option>
	    </el-select>
	    <el-select v-model="addList.area" placeholder="请选择区" class="address_select" @change="getstreet(addList.area,true)" size="small">
	      <el-option v-for="item in addList.qu" :key="item.AREA_ID" :label="item.AREA_NAME" :value="item.AREA_CODE">
	      </el-option>
	    </el-select>
		<el-select v-model="addList.street" placeholder="请选择街道" class="address_select" @change="postData(addList.street)" size="small">
		  <el-option v-for="item in addList.jia" :key="item.STREET_ID" :label="item.STREET_NAME" :value="item.STREET_CODE">
		  </el-option>
		</el-select>
	</div>
</template>

<script>
	import {reactive,ref,watch,onMounted} from "@vue/composition-api";
	import { getProvince } from "../api/city.js"
	export default{
		name:"commonCity",
		props:{
			cityReNumber:{
				type:String,
				default:''
			}
		},
		setup(props,{root,emit}){
			const addList=reactive({
				/*这三个是默认选中时的值*/
				province:"",
				city:"",
				area:"",
				street:"",
				/*这三个是查出来的值*/
				sheng:[],
				shi:[],
				qu:[],
				jia:[],
				/*下面这些是获取某个地区接口参数*/
				type:"province",
				province_code:"",
				city_code:"",
				area_code:"",
				/*给父组件返回值*/
				provinceValue:"",
				cityValue:"",
				areaValue:"",
				streetValue:""
			})
			/*先默认加载省份*/
			onMounted(()=>{
				provincelist()
			})
			//获取所有省份列表
			const provincelist=(()=>{
				getProvince(addList).then(request=>{
					addList.sheng=request.data.data.data
				}).catch(error=>{
					console.log(error)
				})
			})
			//获取省份下面的地区
			const getcity=((val,is)=>{
				addList.type="city"
				addList.province_code=val
				if(is){
					addList.area = "";
					addList.city = "";
					addList.street="";
				}
				emit("update:provinceValue",val)
				getProvince(addList).then(request=>{
					addList.shi=request.data.data.data
				}).catch(error=>{
					console.log(error)
				})
			})
			//获取市
			const getarea=((val,is)=>{
				addList.type="area"
				addList.city_code=val
				emit("update:cityValue",val)
				if(is){
					addList.area = "";
					addList.street="";
				}
				getProvince(addList).then(request=>{
					addList.qu=request.data.data.data
				}).catch(error=>{
					console.log(error)
				})
			})
			//获取街道
			const getstreet=((val,is)=>{
				addList.type="street"
				addList.area_code=val
				emit("update:areaValue",val)
				if(is){
					addList.street="";
				}
				getProvince(addList).then(request=>{
					addList.jia=request.data.data.data
				}).catch(error=>{
					console.log(error)
				})
			})
			const postData=((val)=>{
				emit("update:streetValue",val)
			})
			return{
				//省市区返回
				getcity,getarea,postData,addList,getstreet
			}
		}
	}
</script>

<style>
</style>

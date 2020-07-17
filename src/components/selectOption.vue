<template>
	<div>
			<el-select v-model="formUser.searchContent" placeholder="请选择" >
					<el-option
					 v-for="itme in formUser.searcheTitle"
					 :key="itme.valuekey"
					 :label="itme.label"
					 :value="itme.value"
					>
					</el-option>
			</el-select>
	</div>
</template>

<script>
	import {reactive,ref,watch,onMounted} from "@vue/composition-api";
	export default{
		name:"selectOption",
		props:{
			selectList:{
				type:Array,
				default:[]
			}
		},
		setup(props,{root,emit}){
			const formUser = reactive({
				searcheTitle:[],
				searchContent:"",
			})
			onMounted(()=>{
				formUser.searcheTitle=props.selectList
			})
			watch(()=>props.selectList,(value)=>{
				formUser.searcheTitle=value
			})
			return{
				//数组
				formUser,
				//变量
			}
		}
	}
</script>

<style>
</style>

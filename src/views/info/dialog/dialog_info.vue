<template>
	<div>
		<el-dialog title="新增" :visible.sync="dialogTableVisible" @close="close">
			<el-form :model="addNewsForm":ref="addNewsForm">
				 <el-form-item label="标题" :label-width="formLabelWidth" props="name">
				   <el-input v-model="addNewsForm.name" autocomplete="off"></el-input>
				 </el-form-item>
				 <el-form-item label="类型" :label-width="formLabelWidth" props="region">
				   <el-select v-model="addNewsForm.region" placeholder="请选择文章分类">
					   
					 <el-option v-for="item in cateList.item" :key="item.id" :label='item.category_name' :value='item.id' ></el-option>
					 
				   </el-select>
				</el-form-item>
				<el-form-item label="概况" :label-width="formLabelWidth" props="remark">
				  <el-input v-model="addNewsForm.remark" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			 <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogTableVisible = false">取 消</el-button>
			    <el-button type="primary" @click="addNews">确 定</el-button>
			  </div>
		</el-dialog>
	</div>
</template>

<script>
	import {reactive,ref,isref,toRefs,onMounted,} from "@vue/composition-api";
	import {getCategoryAll} from "@/api/news.js";
	export default{
		props:{
			flag:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			flag:{
				handler(newvalue,oldvalue){
					this.dialogTableVisible=newvalue
				}
			}
		},
		setup(props,{emit,root,refs}){			
			 const dialogTableVisible=ref(false)
			 const cateList = reactive({
				 itme:[]
			 })
			 const addNewsForm=reactive( {
			           name:'',
			           region: '',
					   remark:''
			    })
			 const formLabelWidth=ref('120px')
			 const close = (()=>{
				 
				 dialogTableVisible.value=false
				 //回调触发父组件方法close
				 //emit('close',false)
				 //使用父组件sync修饰符更新flag的值
				 emit("update:flag",false)
			 })
			 //提交添加信息回调
			 
			 const addNews = (()=>{
				 let newsInfo = {
					 category:addNewsForm.region,
					 title: addNewsForm.name,
					 content:addNewsForm.remark
				 }
				 emit('addNewsSon',newsInfo)
				 //refs['addNewsForm'].resetFields()
				 dialogTableVisible.value=false
				 
			 })
			 onMounted(()=>{
			 	getCategoryAll().then(response=>{
					let cateResult=response.data.data
					cateList.item=cateResult
					console.log(cateList)
				})
			 })
			 return{
				 cateList,
				 addNewsForm,
				 formLabelWidth,
				 dialogTableVisible,
				 close,
				 addNews
			 }
		}
		
		
	}
</script>

<style>
</style>

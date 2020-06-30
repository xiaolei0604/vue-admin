<template>
	<div>
		<el-dialog title="修改" :visible.sync="dialogTableVisible" @close="close">
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
			    <el-button type="primary" @click="updateNews">确 定</el-button>
			  </div>
		</el-dialog>
	</div>
</template>

<script>
	import {reactive,ref,isref,toRefs,onMounted,} from "@vue/composition-api";
	import {getCategoryAll,getList} from "@/api/news.js";
	export default{
		props:{
			flag:{
				type:Boolean,
				default:false
			},
			categoryList:{
				type:Array,
				default:()=>[]
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
			 
			 const updateNews = (()=>{
				 let newsInfo = {
					 id:listData.id,
					 categoryId:addNewsForm.region,
					 title: addNewsForm.name,
					 content:addNewsForm.remark,
					 updateDate: "2020-02-02 12:00:00",
					 imgUrl: "http://12.jpg",
					 
				 }
				  emit('updateNewsSon',newsInfo)
				 //console.log(props.oneNews)
				 
			 })
			 let listData = {
			 	categoryId: '',
			 	startTiem: '',
			 	endTime: '',
			 	title: '',
			 	id: '',
			 	pageNumber: 1,
			 	pageSize: 5
			 }
			 const open=((val)=>{
				 cateList.item=props.categoryList
				 listData.id = val;
				 getList(listData).then(response=>{
				 	let oneNews=response.data.data.data[0]
					addNewsForm.name=oneNews.title;
					addNewsForm.region=oneNews.categoryId;
					addNewsForm.remark=oneNews.content;
				 }).catch(error=>{
					 console.log("数据列表获取失败。")
				 })
			 })
			 return{
				 open,
				 cateList,
				 addNewsForm,
				 formLabelWidth,
				 dialogTableVisible,
				 close,
				 updateNews,
			 }
		}
		
		
	}
</script>

<style>
</style>

<template>
	<div>
		<div class="infodetail">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="新闻分类">
					  <el-select v-model="form.categoryId" placeholder="请选择新闻分类">
						<el-option
						   v-for="item in options.item"
						  :key="item.id"
						  :label="item.category_name"
						  :value="item.id">
						</el-option>
					  </el-select>
				</el-form-item>
				<el-form-item label="新闻标题">
					<el-input  v-model="form.title"></el-input>
				</el-form-item>
				<el-form-item label="新闻图片">
					<commonUploadImg :imgUrl.sync="form.imgUrl"/>
				</el-form-item>
				<el-form-item label="新闻时间">
					<div class="block">
						<el-date-picker
						  disabled
						  v-model="form.updateDate"
						  type="date"
						  placeholder="选择日期">
						</el-date-picker>
					</div>
				</el-form-item>
				<el-form-item label="新闻详情">
					<div class="block">
						<commonQuillEditor :content.sync="form.content"/>
					</div>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="exitOneNews()">立即保存</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {reactive,ref,isref,toRefs,onMounted,watch} from "@vue/composition-api";
	import { globalGetCategory,toDateChange } from "../../until/common.js";
	import { getList,editInfo } from "@/api/news.js"
	import commonQuillEditor from "../../components/quillEditor.vue"
	import commonUploadImg from "../../components/uploadImage.vue"
	import { quillEditor } from "vue-quill-editor"; 	import 'quill/dist/quill.core.css';	import 'quill/dist/quill.snow.css';	import 'quill/dist/quill.bubble.css';
	export default{
		name:"infoDetail",
		components:{ quillEditor,commonQuillEditor,commonUploadImg },
		setup(props,{root}){
			const {globalGetCategoryAll,catList} = globalGetCategory();
			const options=reactive({
				item:[]
			})
			watch(()=>catList.item,(value)=>{
				options.item=value
			})
			/*获取url传递参数  如果传递参数没有就读取session*/
			/* let id = root.$route.params.id || root.$store.getters['infoDetail/infoId'];
			let title = root.$route.params.title || root.$store.getters['infoDetail/infoTitle']; */
			const form=reactive({
					categoryId:'' ,
					title:'',
					updateDate:'',
					content:'',
					imgUrl:'',
			})
			
			const exitOneNews=(()=>{
				let editForm={
					id:root.$route.params.id || root.$store.getters['infoDetail/infoId'],
					categoryId:form.categoryId,
					title:form.title,
					updateDate:form.updateDate,
					content:form.content,
					imgUrl: form.imgUrl
				}
				editInfo(editForm).then(response=>{
					root.$message.success(response.data.message)
				}).catch(error=>{
					console.log(error)
				})
			})
			//获取单条数据的值
			let listData = {
				categoryId: '',
				startTiem: '',
				endTime: '',
				title: '',
				id: root.$route.params.id || root.$store.getters['infoDetail/infoId'],
				pageNumber: 1,
				pageSize: 5
			}
			const getOneNews = reactive(()=>{
				getList(listData).then(response=>{
					let res=response.data.data.data[0]
					form.categoryId=res.categoryId
					form.title=res.title
					form.updateDate=toDateChange(res.createDate)
					form.content=res.content
					form.imgUrl=res.imgUrl
				}).catch(error=>{
					console.log(error)
				})
			})
			
			onMounted(()=>{
				getOneNews()//获取单条新闻
				globalGetCategoryAll()//获取所有的分类
			})
			return{
				//变量
				form,
				//数组
				//方法
				options,exitOneNews
			}
		}
	}
</script>

<style>
	.infodetail{ width: 80%; }
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	  }
	  .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
	  }
	  .avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	  }
</style>

<template>
	<div>
		<el-form :inline="true" :model="formNewsList" class="demo-form-inline">
		  <el-row>
				<el-col :span="4">
				  <el-form-item label="类别:">
					 <el-select v-model="formNewsList.cat" placeholder="请选择" style="width: 120px;">
						<el-option
						   v-for="item in options.item"
						  :key="item.id"
						  :label="item.category_name"
						  :value="item.id">
						</el-option>
					 </el-select>
				   </el-form-item>
				</el-col>
				<el-col :span="10">
				  <el-form-item label="日期:">
					 <el-date-picker
					       v-model="formNewsList.date"
					       type="datetimerange"
					       range-separator="至"
						   format="yyyy-MM-dd HH:mm:ss"
						   value-format="yyyy-MM-dd HH:mm:ss"
					       start-placeholder="开始日期"
					       end-placeholder="结束日期">
					     </el-date-picker>
				   </el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="关键词:">
						<el-select v-model="formNewsList.searcheTitle" placeholder="请选择" style="width: 100px;">
								<el-option
								 v-for="itme in searchKey"
								 :key="itme.valuekey"
								 :label="itme.label"
								 :value="itme.value"
								>
								</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="3">
						 <el-input v-model="formNewsList.searchContent" placeholder="请输入内容"></el-input>
				</el-col>
				<el-col :span="1">
						<el-button type="danger" @click="whereList()">提交</el-button>
				</el-col>
				<el-col :span="1">
						&nbsp;
				</el-col>
				<el-col :span="1" style="float: right;">
						<el-button type="danger" @click="diafun">添加</el-button>
				</el-col>	
		  </el-row>
		</el-form>
		<el-table
			ref="multipleTable"
		    :data="tableData.item"
			@selection-change="changeFun"
			style="width: 100%"
			>
			<el-table-column 
			 type="selection"
			 prop='id'
			width="40">
			</el-table-column>
		    <el-table-column
		      prop="title"
		      label="标题"
		      >
		    </el-table-column>
			<el-table-column
			  prop="categoryId"
			  label="类型"
			  width="180"
			  :formatter="toCategoryName">
			</el-table-column>
		    <el-table-column
		      prop="createDate"
		      label="日期"
		      width="180"
			  :formatter="toDate"
			  >
		    </el-table-column>
		    <el-table-column
		      prop="user"
		      label="管理员"
			  width="100">
		    </el-table-column>
			<el-table-column
			 
			  label="操作"
			  width="260">
			   <template slot-scope="scope">
				  <el-button size="mini" type="success" @click="diainfoedit(scope.row.id)">编辑</el-button>
				  <router-link :to="{name: 'infodetail',query:{id:scope.row.id}}">
				  <el-button size="mini" type="warning">编辑详情</el-button>
				  </router-link>
				  <el-button size="mini" type="danger" @click="deleteItem(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		  </el-table>
		  <el-row style="margin-top: 30px;">
		    <el-col :span="12">
				<el-button size="small" @click="deleteAll">批量删除</el-button>
			</el-col>
		    <el-col :span="12">
				<div class="block" style="text-align: right;">
				    <el-pagination
						
				      @size-change="handleSizeChange"
				      @current-change="handleCurrentChange"
				      :current-page="listData.pageNumber"
				      :page-sizes="[5, 10, 15, 20]"
				      :page-size="listData.pageSize"
				      layout="total, sizes, prev, pager, next, jumper"
				      :total="total">
				    </el-pagination>
				  </div>
				
			</el-col>
		  </el-row>
		  <Dialoginfolist :flag.sync="dialog_info" :categoryList="options.item" @close="close" @addNewsSon="addNews" ref="dialog"/>
		  <Dialoginfoedit :flag.sync="dialog_info_edit" :categoryList="options.item" @close="close" @updateNewsSon="updateNews" ref="dialogedit"/>
	</div>
</template>

<script>
	import Dialoginfolist from "./dialog/dialog_info"
	import Dialoginfoedit from "./dialog/dialog_info_edit"
	import {reactive,ref,isref,toRefs,onMounted,watch} from "@vue/composition-api";
	import { globalconfirm } from "../../until/global_V3.0.js"
	import { getList,add,delNews,editInfo} from "../../api/news.js"
	import { globalGetCategory,toDateChange } from "../../until/common.js"
	export default{
		name:"infoindex",
		//2.0引入弹框组件
		components:{ Dialoginfolist,Dialoginfoedit },
		setup(props,{root,refs}){
			const { str:aaa,confirm } = globalconfirm();
			const {globalGetCategoryAll,catList} = globalGetCategory();
			const options=reactive({
				item:[]
			})
			watch(()=>catList.item,(value)=>{
				options.item=value
			})
			const searchKey = reactive([
				{
					value:'id',
					label:'ID'
				},
				{
					value:'title',
					label:'标题'
				}
			])
			const diafun=(()=>{
				dialog_info.value = true
				refs.dialog.open()
			})
			const newsId=ref(0)
			const diainfoedit=((val)=>{
		
				newsId.value = val;
				dialog_info_edit.value = true
				refs.dialogedit.open(val)
			   
			})
			const formNewsList=reactive({  })
			//获取信息列表
			let listData = {
				categoryId: '',
				startTiem: '',
				endTime: '',
				title: '',
				id: '',
				pageNumber: 1,
				pageSize: 10
			}
			
			const tableData=reactive({
				item:[],
				multipleSelection: []
			})
			const dialog_info=ref(false)
			const dialog_info_edit=ref(false)
			const value=ref('')
			const value1=ref('')
			const searcheTitle=ref('')
			const searchContent=ref('')
			const total=ref(25)
			const muchId=ref('')
			const handleSizeChange =((val)=>{
				listData.pageSize = val
				getListAll()
			})
			const handleCurrentChange =((val)=>{
				listData.pageNumber = val
				getListAll()
			})
			const close =(()=>{
				dialog_info.value=false
			})
			//调用GLOBAL弹框方法
			const deleteItem=((val)=>{
				//2.0引入弹框使用方法
				/* context.root.confirm({
					content:'确定要删除此条数据吗？？',
					tip:'删除提示',
					fn:deleteAlltrue,
					id:111111
				}) */
				//3.0引入弹框使用方法
				
				confirm(
					{
						content:'确定要删除此条数据吗？？',
						tip:'删除提示',
						fn:deleteItemtrue,
						id:val
					}
				);
			})
			//回调GLOBAL。js方法进行数据删除
			const deleteItemtrue=((value)=>{
				let data={					id:[value]				}				delNews(data).then(response=>{					root.$message.success(response.data.message)
					tableData.item.splice(0,1)				}).catch(error=>{					console.log(error)				})
				
			})
			//获取多选ID号码
			const changeFun=((val)=>{
				muchId.value='';
				tableData.multipleSelection = val;
				val.forEach(item =>{
					muchId.value=item.id+','+muchId.value
					
				})
				//截取最后一位的逗号
				muchId.value = muchId.value.substr(0,muchId.value.length-1);
			})
			//调用GLOBAL弹框方法
			const deleteAll=(()=>{
				//2.0引入弹框使用方法
				/* context.root.confirm({
					content:'确定要删除选中数据吗，删除不可恢复！！',
					btnType:'success',
					fn:deleteAlltrue,
					id:222222
				}) */
				confirm(
					{
						content:'确定要删除选中数据吗，删除不可恢复！！',
						btnType:'success',
						fn:deleteAlltrue,
						id:muchId.value
					}
				);
			})
			//回调GLOBAL。js方法进行数据删除
			const deleteAlltrue=((value)=>{
				console.log(value)
				let data={
					id:[value]
				}
				delNews(data).then(response=>{
					root.$message.success(response.data.message)
					muchId.value=''
				}).catch(error=>{
					muchId.value=''
					console.log(error)
				})
			})
			
			const addNews = ((val)=>{
				add(val).then(response=>{
					let data = response
					root.$message.success("添加成功")
					
				}).catch(()=>{
					console.log(error)
				})
			})
			const updateNews = ((val)=>{
				editInfo(val).then(response=>{
					root.$message.success("修改成功")
				}).catch(error=>{
					console.log(error)
				})
				
			})
			//条件列表筛选列表
			const whereList = (()=>{
				
				let keyType=formNewsList.searcheTitle
				if(formNewsList.cat){
					listData.categoryId=formNewsList.cat
				}
				if(formNewsList.date){
					listData.startTime=formNewsList.date[0]
					listData.endTime=formNewsList.date[1]
				}
				if(keyType == 'id'){
					listData.id=formNewsList.searchContent
				}
				if(keyType == 'title'){
					listData.title=formNewsList.searchContent
				}
				console.log(listData)
				getList(listData).then(response=>{
					tableData.item=response.data.data.data
					total.value=response.data.data.total
				})
				
			})
			//获取信息列表参数
			onMounted(()=>{
				getListAll()//获取所有的新闻
				globalGetCategoryAll()//获取所有的分类
			})
			//获取所有新闻列表
			const getListAll =(()=>{
				getList(listData).then(response=>{
					tableData.item=response.data.data.data
					total.value=response.data.data.total
					//console.log(tableData.item)
				})
			})
			//时间转换
			const toDate=((row, column, cellValue, index)=>{
				return toDateChange(row.createDate)
			})
			//分类id转换
			const toCategoryName=((row)=>{
				let catId = row.categoryId;
				//数据过滤
				let catnameRes = options.item.filter(item=>item.id==catId)[0];
				//console.log(catnameRes)
				if(catnameRes){
					return catnameRes.category_name;
				}else{
					return "暂无分类";
				}

			})
			return{
				listData,
				handleCurrentChange,
				handleSizeChange,
				tableData,
				options,
				value,
				value1,
				searchKey,
				searcheTitle,
				searchContent,
				formNewsList,
				dialog_info,
				close,
				deleteItem,
				deleteAll,
				addNews,
				whereList,
				total,
				diafun,
				changeFun,
				toDate,
				toCategoryName,
				//修改弹框使用参数
				dialog_info_edit,
				diainfoedit,
				newsId,
				//修改函数
				updateNews
			}
		}
	}
</script>

<style>
</style>

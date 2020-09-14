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
						<el-button type="danger" @click="diafun" v-if="getBtnRole('info:add')">添加</el-button>
				</el-col>	
		  </el-row>
		</el-form>
		<commonTable :tableDataConfig.sync="tableData" @deleteAll="deleteAll" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
			<template v-slot:newsImg="slotData">
				 <img :src="slotData.data.imgUrl" :alt="slotData.data.title" width="50" height="50">
			</template>
			<template v-slot:newsBtn="slotData">
				<el-button size="mini" type="success" @click="diainfoedit(slotData.data.id)" v-if="getBtnRole('info:edit')">编辑</el-button>
				 <!-- <router-link :to="{name: 'infodetail',query:{id:scope.row.id}}"> -->
				 <el-button size="mini" type="warning" @click="infodetailJump(slotData.data)" v-if="getBtnRole('info:detailed')">编辑详情</el-button>
				<!-- </router-link> -->
				 <el-button size="mini" type="danger" @click="deleteItem(slotData.data.id)" v-if="getBtnRole('info:del')">删除</el-button>
				 
				 
			</template>
		</commonTable>
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
	import { globalGetCategory,toDateChange,getBtnRole } from "../../until/common.js"
	import commonTable from "../../components/commonTable.vue"
	export default{
		name:"infoindex",
		//2.0引入弹框组件
		components:{ Dialoginfolist,Dialoginfoedit,commonTable },
		setup(props,{root,refs}){
			const { str:aaa,confirm } = globalconfirm();
			const {globalGetCategoryAll,catList} = globalGetCategory();
			const options=reactive({
				item:[]
			})
			watch(()=>catList.item,(value)=>{
				options.item=value
			})
			//公共表格配置参数（tbody和tableDatatotal 需要从接口更新值）
			const tableData = reactive({
				thead:[
					{label:"标题",value:"title"},
					{label:"类型",value:"categoryId"},
					{label:"日期",value:"createDate",formater:"toDate"},
					{label:"缩略图",value:"imgUrl",columType:"slot",slotName:"newsImg"},
					{label:"编辑",columType:"slot",slotName:"newsBtn"}
				],
				//给公共表格组件传递数据源
				tbody:[],
				//是否显示全选择控件
				selectState:true,
				tableDatatotal:20,//数组总数
				listPageSize:5,//每一页显示多少条数据
				listPageNumber:1//从第几页开始显示
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
				pageSize: 5
			}
			
			/* const tableData=reactive({
				item:[],
				multipleSelection: []
			}) */
			const dialog_info=ref(false)
			const dialog_info_edit=ref(false)
			const value=ref('')
			const value1=ref('')
			const searcheTitle=ref('')
			const searchContent=ref('')
			
			const close =(()=>{
				dialog_info.value=false
			})
			//调用GLOBAL弹框方法
			const deleteItem=((val)=>{
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
			//调用GLOBAL弹框方法
			const deleteAll=((val)=>{
				confirm(
					{
						content:'确定要删除选中数据吗，删除不可恢复！！',
						btnType:'success',
						fn:deleteAlltrue,
						id:val
					}
				);
			})
			//回调GLOBAL。js方法进行数据删除
			const deleteAlltrue=((value)=>{
				console.log(value)
				let data={
					id:value
				}
				delNews(data).then(response=>{
					root.$message.success(response.data.message)
				}).catch(error=>{
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
					tableData.tbody=response.data.data.data
					tableData.tableDatatotal=response.data.data.total
				})
				
			})
			const handleSizeChange =((val)=>{
				listData.pageSize = val
				getListAll()
			})
			const handleCurrentChange =((val)=>{
				listData.pageNumber = val
				getListAll()
			})
			//获取信息列表参数
			onMounted(()=>{
				getListAll()//获取所有的新闻
				globalGetCategoryAll()//获取所有的分类
				
			})
			//获取所有新闻列表
			const getListAll =(()=>{
				getList(listData).then(response=>{
					tableData.tbody=response.data.data.data
					tableData.tableDatatotal=response.data.data.total
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
			//路由跳转函数
			const infodetailJump = reactive((val)=>{
				console.log(val)
				root.$store.commit('infoDetail/SET_ID',val.id)
				root.$store.commit('infoDetail/SET_TITLE',val.title)
				root.$router.push({
					name:"infodetail",
					params:{
						id:val.id,
						title:val.title
					}
				})
			})
			return{
				listData,
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
				diafun,
				toDate,
				toCategoryName,
				//修改弹框使用参数
				dialog_info_edit,
				diainfoedit,
				newsId,
				//修改函数
				updateNews,
				//路由跳转
				infodetailJump,
				handleSizeChange,
				handleCurrentChange,
				getBtnRole
			}
		}
	}
</script>

<style>
</style>

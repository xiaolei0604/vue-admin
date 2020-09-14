<template>
	<div class="main-main">
		<el-form :inline="true" :model="formUser" class="demo-form-inline">
		  <el-row>
				
				<el-col :span="6">
					<el-form-item label="关键字:">
						<commonSelect :selectList.sync="formUser.optionList" :searchKey.sync="formUser.searchKey"/>
					</el-form-item>
				</el-col>
				<el-col :span="5" class="pull-left-10">
						 <el-input v-model="formUser.searchContent" placeholder="请输入内容"></el-input>
				</el-col>
				<el-col :span="1">
						<el-button type="danger" @click="search">提交</el-button>
				</el-col>
				<el-col :span="1" style="float: right; margin-right: 50px;">
						<el-button type="danger" @click="openDialog" v-if="getBtnRole('user:add')">添加用户</el-button>
				</el-col>	
		  </el-row>
		</el-form>
		<commonTable :tableDataConfig.sync="tableData" @deleteAll="deleteAllTip" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
			<!-- 状态插槽 -->
			<template v-slot:manaerState="slotData">
				<el-switch
				  v-model="slotData.data.status"
				  active-color="#13ce66"
				  inactive-color="#ff4949"
				  active-value="2"
				  inactive-value="1"
				  @change="editStat(slotData.data.status,slotData.data.id)">
				</el-switch>
			</template>
			<!-- 编辑按钮插槽 -->
			<template v-slot:btnEdit="slotData">
				<el-button size="mini" type="success" @click="edit(slotData.data.id,slotData.data.username)" v-if="getBtnRole('user:edit')">编辑</el-button>
				<el-button size="mini" type="danger" @click="deleteAllTip([slotData.data.id])" v-if="getBtnRole('user:del')">删除</el-button>
				<el-button size="mini" type="danger" v-btnPremits="'user:del'">自定指令</el-button>
				
			</template>
		</commonTable>
		<addUserDialog :flag.sync="dialogFormVisible" :refreshGetUser="getAllUser" ref="dialogUser"/>
		<edituserDialog :flag.sync="dialogFormVisibleEdit" ref="dialogEditUser" :refreshGetUser="getAllUser"/>
	</div>
</template>

<script>
	import {reactive,ref,isref,toRefs,onMounted,watch} from "@vue/composition-api";
	import {getUser,delUser,editActive} from "../../api/user.js"
	import commonSelect from "../../components/selectOption.vue"
	import commonTable from "../../components/commonTable.vue"
	import addUserDialog from "./dialog/add_user.vue"
	import edituserDialog from "./dialog/edit_user.vue"
	import {globalconfirm} from "../../until/global_V3.0.js"
	import { getBtnRole } from "@/until/common.js"
	export default{
		name:"userList",
		components:{commonSelect,commonTable,addUserDialog,edituserDialog},
		setup(props,{root,refs}){
			const { confirm } = globalconfirm()
			const tableData = reactive({
				//公共表格配置参数value=prop，label=label
				thead:[
					{ label:"邮箱/用户名",value:"username"},
					{ label:"真实姓名",value:"truename"},
					{ label:"手机号",value:"phone"},
					{ label:"地区",value:"region"},
					{ label:"角色",value:"role"},
					{ label:"禁用状态",value:"status",columType:"slot",slotName:"manaerState"},
					{ label:"编辑",value:"edit",columType:"slot",slotName:"btnEdit"}
				],
				//给公共表格组件传递数据源
				tbody:[],
				//是否显示全选择控件
				selectState:true,
				tableDatatotal:20,//数组总数
				listPageSize:5,//每一页显示多少条数据
				listPageNumber:1,//从第几页开始显示
				tableDataList:[]
			})
			const userList = reactive({
				username:'',
				truename:'',
				phone:'',
				pageNumber:1,
				pageSize:5
			})
			onMounted(()=>{
				getAllUser()
			})
			const handleSizeChange =((val)=>{
				userList.pageSize = val
				getAllUser()
			})
			const handleCurrentChange =((val)=>{
				userList.pageNumber = val
				getAllUser()
			})
			const formUser = reactive({
				optionList:[
					{value:"phone",label:"手机号"},
					{value:"name",label:"姓名"}
				],
				searchKey:'',
				searchContent:"",
			})
			/*条件筛选*/
			const search = (()=>{
				if(formUser.searchKey=="phone"){
					userList.phone=formUser.searchContent
				}
				if(formUser.searchKey=="name"){
					userList.username=formUser.searchContent
				}
				getAllUser()
			})
			//获取所有用户
			const getAllUser = (()=>{
				getUser(userList).then(request=>{
					tableData.tbody=request.data.data.data
					tableData.tableDatatotal=request.data.data.total
				}).catch(error=>{
					console.log(error)
				})
			})
			/*修改用户弹窗状态*/
			const dialogFormVisibleEdit = ref(false)
			//修改用户
			const edit =((valid,valname)=>{
				dialogFormVisibleEdit.value = true
				refs.dialogEditUser.open(valid,valname)
			})
			//修改用户状态
			const editStat=((val,valid)=>{
				let data={
					id:valid,
					status:val
				}
				editActive(data).then(request=>{
					root.$message.success("修改用户状态成功")
				}).catch(error=>{
					console.log(error)
				})
			})
			
			//多选删除提示
			const deleteAllTip=((val)=>{
				confirm(
					{
						content:'确定要删除此条数据吗？？',
						tip:'删除提示',
						fn:deleteAll,
						id:val
					}
				);
			})
			//多选删除
			const deleteAll=((val)=>{
				let data ={
					id:val
				}
				delUser(data).then(request=>{
					root.$message.success(request.data.message)
					getAllUser()
				}).catch(error=>{
					console.log(error)
				})
			})
			
			//表格参数
			const dialogFormVisible= ref(false)
			const openDialog=(()=>{
				dialogFormVisible.value = true
				/*直接调取子组件的open方法*/
				refs.dialogUser.open()
			})
			
			return{
				//分页方法
				handleSizeChange,handleCurrentChange,
				//弹窗状态
				dialogFormVisible,openDialog,dialogFormVisibleEdit,
				//方法
				edit,editStat,deleteAll,getAllUser,deleteAllTip,search,
				//数组
				formUser,tableData,
				//权限方法
				getBtnRole
			}
		}
	}
</script>

<style>
	.pull-left-10{ margin-right: 10px;}
</style>
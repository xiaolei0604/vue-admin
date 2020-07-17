<template>
	<div class="main-main">
		<el-form :inline="true" :model="formUser" class="demo-form-inline">
		  <el-row>
				
				<el-col :span="6">
					<el-form-item label="关键字:">
						<commonSelect :selectList.sync="formUser.optionList"/>
					</el-form-item>
				</el-col>
				<el-col :span="5" class="pull-left-10">
						 <el-input v-model="formUser.searchContent" placeholder="请输入内容"></el-input>
				</el-col>
				<el-col :span="1">
						<el-button type="danger" @click="">提交</el-button>
				</el-col>
				<el-col :span="1" style="float: right; margin-right: 50px;">
						<el-button type="danger" @click="">添加用户</el-button>
				</el-col>	
		  </el-row>
		</el-form>
		<commonTable :tableDataConfig.sync="tableData" >
			<!-- 状态插槽 -->
			<template v-slot:manaerState="slotData">
				<el-switch
				  v-model="slotData.data.state"
				  active-color="#13ce66"
				  inactive-color="#ff4949"
				  :change="editStat(slotData.data.state)">
				</el-switch>
			</template>
			<!-- 编辑按钮插槽 -->
			<template v-slot:btnEdit="slotData">
				<el-button size="mini" type="success" @click="edit(slotData.data.id)">编辑</el-button>
				<el-button size="mini" type="danger" @click="deleteUser(slotData.data.id)">删除</el-button>
			</template>
		</commonTable>
	</div>
</template>

<script>
	import {reactive,ref,isref,toRefs,onMounted,watch} from "@vue/composition-api";
	import commonSelect from "../../components/selectOption.vue"
	import commonTable from "../../components/commonTable.vue"
	export default{
		name:"userList",
		components:{commonSelect,commonTable},
		setup(prpos,{root}){
			const tableData = reactive({
				//公共表格配置参数value=prop，label=label
				thead:[
					{ label:"邮箱/用户名",value:"userName"},
					{ label:"真实姓名",value:"trueName"},
					{ label:"手机号",value:"phone"},
					{ label:"地区",value:"address"},
					{ label:"禁用状态",value:"state",columType:"slot",slotName:"manaerState"},
					{ label:"编辑",value:"edit",columType:"slot",slotName:"btnEdit"}
				],
				//给公共表格组件传递数据源
				tbody:[],
				//是否显示全选择控件
				selectState:true,
				tableDataList:[
							{
							  id:1,
					          userName: '437386299@qq.com',
					          trueName: '王小虎',
							  phone:'1325589856',
					          address: '上海市普陀区金沙江路 1518 弄',
							  state:true
					        }, 
							{
							 id:2,
					         userName: '505989656@qq.com',
					         trueName: '找小脑',
					         phone:'12165445',
					         address: '地方地方大凡凡1518弄',
							  state:false
					        },
							{
							id:3,
							 userName: '21573065@qq.com',
							 trueName: '王小六',
							 phone:'12165445',
							 address: '地方地方大凡凡1518弄',
							 state:false
							}
				]
			})
			onMounted(()=>{
				for(let i=0;i<tableData.tableDataList.length;i++){
					tableData.tbody.push({
						id:tableData.tableDataList[i].id,
						userName: tableData.tableDataList[i].userName,
						trueName: tableData.tableDataList[i].trueName,
						phone:tableData.tableDataList[i].phone,
						address: tableData.tableDataList[i].address,
						state:tableData.tableDataList[i].state,
					})
				}
			})
			const formUser = reactive({
				optionList:[
					{value:"phone",label:"手机号"},
					{value:"name",label:"姓名"},
					{value:"key",label:"关键词"}
				],
				searchContent:"",
			})
			const edit =((val)=>{
				console.log(val)
			})
			const deleteUser=((val)=>{
				console.log(val)
			})
			const editStat=((val)=>{
				console.log(val)
			})
			return{
				//方法
				edit,deleteUser,editStat,
				//数组
				formUser,tableData
			}
		}
	}
</script>

<style>
	.pull-left-10{ margin-right: 10px;}
</style>
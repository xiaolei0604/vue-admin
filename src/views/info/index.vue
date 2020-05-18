<template>
	<div>
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
		  <el-row>
				<el-col :span="4">
				  <el-form-item label="类别:">
					 <el-select v-model="value" placeholder="请选择" style="width: 120px;">
						<el-option
						   v-for="item in options"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value">
						</el-option>
					 </el-select>
				   </el-form-item>
				</el-col>
				<el-col :span="10">
				  <el-form-item label="日期:">
					 <el-date-picker
					       v-model="value1"
					       type="datetimerange"
					       range-separator="至"
					       start-placeholder="开始日期"
					       end-placeholder="结束日期">
					     </el-date-picker>
				   </el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label="关键词:">
						<el-select v-model="searcheTitle" placeholder="请选择" style="width: 100px;">
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
						 <el-input v-model="searchContent" placeholder="请输入内容"></el-input>
				</el-col>
				<el-col :span="1">
						<el-button type="danger">提交</el-button>
				</el-col>
				<el-col :span="1">
						&nbsp;
				</el-col>
				<el-col :span="1" style="float: right;">
						<el-button type="danger" @click="dialog_info = true">添加</el-button>
				</el-col>	
		  </el-row>
		</el-form>
		<el-table
		    :data="tableData"
			style="width: 100%"
			>
			<el-table-column 
			 type="selection"
			width="40">
			</el-table-column>
		    <el-table-column
		      prop="title"
		      label="标题"
		      >
		    </el-table-column>
			<el-table-column
			  prop="category"
			  label="类型"
			  width="180">
			</el-table-column>
		    <el-table-column
		      prop="date"
		      label="日期"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="user"
		      label="管理员"
			  width="180">
		    </el-table-column>
			<el-table-column
			 
			  label="操作"
			  width="180">
			   <template slot-scope="scope">
				  <el-button
					size="mini"
					type="success"
					@click="dialog_info = true">编辑</el-button>
				  <el-button
					size="mini"
					type="danger"
					@click="deleteItem">删除</el-button>
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
				      :current-page="currentPage4"
				      :page-sizes="[100, 200, 300, 400]"
				      :page-size="100"
				      layout="total, sizes, prev, pager, next, jumper"
				      :total="400">
				    </el-pagination>
				  </div>
				
			</el-col>
		  </el-row>
		  <Dialoginfolist :flag.sync="dialog_info" @close="close"/>
	</div>
</template>

<script>
	import Dialoginfolist from "./dialog/dialog_info"
	import {reactive,ref,isref,toRefs,onMounted,watch} from "@vue/composition-api";
	import { globalconfirm } from "../../until/global_V3.0.js"
	export default{
		name:"infoindex",
		//2.0引入弹框组件
		components:{ Dialoginfolist },
		setup(props,context){
			const { str:aaa,confirm } = globalconfirm();
			//监听输出global_V3.0.js   str值得变化并且输出
			/* watch(()=>{
				console.log(aaa.value)
			}) */
			const options=reactive([{
			  value: '选项1',
			  label: '黄金糕'
			}, {
			  value: '选项2',
			  label: '双皮奶'
			}])
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
			const formInline=reactive( {  })
			const tableData=reactive([{
					  category:'测试类型',
			          date: '2016-05-03',
			          user: '王小虎',
			          title: '上海市普陀区金沙江路 1518 弄'
			        }, {
			          category:'测试类型',
			          date: '2016-05-03',
			          user: '王小虎',
			          title: '上海市普陀区金沙江路 1518 弄'
			        }, {
			          category:'测试类型',
			          date: '2016-05-03',
			          user: '王小虎',
			          title: '上海市普陀区金沙江路 1518 弄'
			        }])
			const dialog_info=ref(false)
			const value=ref('')
			const value1=ref('')
			const searcheTitle=ref('')
			const searchContent=ref('')
			const currentPage4=ref(2)
			const handleSizeChange =((val)=>{
				console.log(val)
			})
			const handleCurrentChange =((val)=>{
				console.log(val)
			})
			const close =(()=>{
				dialog_info.value=false
			})
			//调用GLOBAL弹框方法
			const deleteItem=(()=>{
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
						fn:deleteAlltrue,
						id:111111
					}
				);
			})
			//回调GLOBAL。js方法进行数据删除
			const deleteItemtrue=((value)=>{
				console.log(value)
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
						id:222222
					}
				);
			})
			//回调GLOBAL。js方法进行数据删除
			const deleteAlltrue=((value)=>{
				console.log(value)
			})
			return{
				currentPage4,
				handleCurrentChange,
				handleSizeChange,
				tableData,
				options,
				value,
				value1,
				searchKey,
				searcheTitle,
				searchContent,
				formInline,
				dialog_info,
				close,
				deleteItem,
				deleteAll
			}
		}
	}
</script>

<style>
</style>

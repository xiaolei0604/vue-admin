<template>
	<div>
				<el-table
			    ref="multipleTable"
			    :data="data.tableData"
			    tooltip-effect="dark"
			    style="width: 100%"
			    @selection-change="handleSelectionChange">
				<!-- 多选框 -->
			    <el-table-column v-if="data.selectState" type="selection" width="55" prop="data.tableData.id"></el-table-column>
				<!-- 表格数据 -->
				<template v-for="item in data.tableConfig">
					<!-- 插槽 -->
					
					<el-table-column v-if="item.columType==='slot'" :key="item.label":prop="item.value" :label="item.label">
						<template slot-scope="scope">
							<slot :name="item.slotName" :data="scope.row"></slot>
						</template>
					</el-table-column>
					
					<el-table-column v-else-if="item.formater"  :key="item.label":prop="item.value" :label="item.label" :formatter="toDate"></el-table-column>
					
					<el-table-column v-else  :key="item.label":prop="item.value" :label="item.label"></el-table-column>
					
				</template>
				
			  
				</el-table-column>
				
			  </el-table>
			  <el-row style="margin-top: 30px;">
			    <el-col :span="12">
			  				<el-button v-if="data.selectState" size="small" @click="deleteAll">批量删除</el-button>
							<el-button v-if="data.selectState" size="small" @click="toggleSelection()">取消选择</el-button>
			  			</el-col>
			    <el-col :span="12">
			  				<div class="block" style="text-align: right;">
			  				    <el-pagination
			  						
			  				      @size-change="handleSizeChange"
			  				      @current-change="handleCurrentChange"
			  				      :current-page="data.listPageNumber"
			  				      :page-sizes="[5, 10, 15, 20]"
			  				      :page-size="data.listPageSize"
			  				      layout="total, sizes, prev, pager, next, jumper"
			  				      :total="data.tableDatatotal">
			  				    </el-pagination>
			  				  </div>
			  				
			  			</el-col>
			  </el-row>
	</div>
</template>

<script>
	import {reactive,ref,watch,onMounted,onBeforeMount} from "@vue/composition-api";
	import { toDateChange } from "../until/common.js"
	export default{
		name:"commonTable",
		props:{
			tableDataConfig:{
				type:Object,
				default:()=>[]
			}
		},
		setup(props,{root,emit,refs}){

			
			const data = reactive({
						tableData: [],
				        multipleSelection: [],
						tableConfig:[],
						selectState:"",
						tableDatatotal:"",
						listPageSize:"",
						listPageNumber:""
			})
			const formater=ref("toDate12456")
			onBeforeMount(()=>{
				data.selectState=props.tableDataConfig.selectState
				data.tableConfig=props.tableDataConfig.thead
				data.listPageSize=props.tableDataConfig.listPageSize
				data.listPageNumber=props.tableDataConfig.listPageNumber
			})
			watch(()=>props.tableDataConfig,(value)=>{
				
				data.tableData=props.tableDataConfig.tbody
				data.tableDatatotal=props.tableDataConfig.tableDatatotal
			},
			{deep:true},
			)
			onMounted(()=>{
				//console.log(props.tableDataConfig)
			})
			/*多选框选中的ID号码*/
			const muchId = ref('')
			const handleSelectionChange =((val)=>{
				/*多项选择ID*/
				muchId.value = val.map(item=>item.id)
				
			})
			/*多选删除*/
			const deleteAll =(()=>{
				emit('deleteAll',muchId.value)
			})
			const toggleSelection = reactive((rows)=>{
				if (rows) {
				  rows.forEach(row => {
				    refs.multipleTable.toggleRowSelection(row);
				  });
				} else {
					refs.multipleTable.clearSelection();
				}
			})
			//分页使用
			const handleSizeChange =((val)=>{
				emit("handleSizeChange",val)
				//console.log(val)
			})
			const handleCurrentChange =((val)=>{
				emit("handleCurrentChange",val)
				//console.log(val)
			})
			//格式化时间函数
			const toDate=((row, column, cellValue, index)=>{
				return toDateChange(row.createDate)
			})
			return{
				//数组
				data,formater,
				//方法
				handleSelectionChange,toggleSelection,deleteAll,handleSizeChange,handleCurrentChange,toDate
			}
		}
	}
</script>

<style>
</style>

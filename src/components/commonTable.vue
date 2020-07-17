<template>
	<div>
				<el-table
			    ref="multipleTable"
			    :data="data.tableData"
			    tooltip-effect="dark"
			    style="width: 100%"
			    @selection-change="handleSelectionChange">
				<!-- 多选框 -->
			    <el-table-column v-if="data.selectState" type="selection" width="55"></el-table-column>
				<!-- 表格数据 -->
				<template v-for="item in data.tableConfig">
					<!-- 插槽 -->
					
					<el-table-column v-if="item.columType==='slot'" :key="item.label":prop="item.value" :label="item.label">
						<template slot-scope="scope">
							<slot :name="item.slotName" :data="scope.row"></slot>
						</template>
					</el-table-column>
					
					<el-table-column v-else  :key="item.label":prop="item.value" :label="item.label"></el-table-column>
					
				</template>
				
			  
				</el-table-column>
			  </el-table>
			  <div style="margin-top: 20px">
			    <el-button @click="toggleSelection()">取消选择</el-button>
			  </div>
	</div>
</template>

<script>
	import {reactive,ref,watch,onMounted,onBeforeMount} from "@vue/composition-api";
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
						selectState:""
			})
			onBeforeMount(()=>{
				data.selectState=props.tableDataConfig.selectState
				data.tableConfig=props.tableDataConfig.thead
				data.tableData=props.tableDataConfig.tbody
			})
			onMounted(()=>{
				console.log(data.tableData)
			})
			const handleSelectionChange =((val)=>{
				root.multipleSelection = val;
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
			
			return{
				//数组
				data,
				//方法
				handleSelectionChange,toggleSelection
			}
		}
	}
</script>

<style>
</style>

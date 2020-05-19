<template>
	<div>
		<el-dialog title="新增" :visible.sync="dialogTableVisible" @close="close">
			<el-form :model="form">
				 <el-form-item label="标题" :label-width="formLabelWidth">
				   <el-input v-model="form.name" autocomplete="off"></el-input>
				 </el-form-item>
				 <el-form-item label="类型" :label-width="formLabelWidth">
				   <el-select v-model="form.region" placeholder="请选择活动区域">
					 <el-option label="区域一" value="shanghai"></el-option>
					 <el-option label="区域二" value="beijing"></el-option>
				   </el-select>
				</el-form-item>
				<el-form-item label="概况" :label-width="formLabelWidth">
				  <el-input v-model="form.remark" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			 <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogTableVisible = false">取 消</el-button>
			    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			  </div>
		</el-dialog>
	</div>
</template>

<script>
	import {reactive,ref,isref,toRefs,onMounted} from "@vue/composition-api";
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
		setup(props,{emit}){			
			 const dialogTableVisible=ref(false)
			 const form=reactive( {
			           name: '',
			           region: '',
					   remark:'',
			           
			    })
			 const formLabelWidth=ref('120px')
			 const close = (()=>{
				 dialogTableVisible.value=false
				 //回调触发父组件方法close
				 //emit('close',false)
				 //使用父组件sync修饰符更新flag的值
				 emit("update:flag",false)
			 })
			 return{
				 form,
				 formLabelWidth,
				 dialogTableVisible,
				 close
			 }
		}
		
	}
</script>

<style>
</style>

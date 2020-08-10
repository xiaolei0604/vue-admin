<template>
	<div>
		<el-dialog title="添加用户" :visible.sync="dialogFormVisible" @close="closeAdd" @open="getAllRole">
		  <el-form :model="form" :rules="rules" ref="form">
		    <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
		      <el-input v-model="form.username" autocomplete="off"></el-input>
		    </el-form-item>
			<el-form-item label="真实姓名" :label-width="formLabelWidth" prop="truename">
			  <el-input v-model="form.truename" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码" :label-width="formLabelWidth" prop="password">
			  <el-input v-model="form.password" autocomplete="off" type="password"></el-input>
			</el-form-item>
			<el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
			  <el-input v-model="form.phone" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="地区" :label-width="formLabelWidth">
			   <commonCity 
			   :provinceValue.sync="provinceValue" 
			   :cityValue.sync="cityValue" 
			   :areaValue.sync="areaValue" 
			   :streetValue.sync="streetValue"
			   ></commonCity> 
			</el-form-item>
			<el-form-item label="角色" :label-width="formLabelWidth" prop="role">
			    <el-checkbox-group v-model="form.role">
			      <el-checkbox v-for="item in form.role1" :key="item.role" :label="item.role" name="type">{{item.name}}</el-checkbox>
			    </el-checkbox-group>
			</el-form-item>
			<el-form-item label="是否启用" :label-width="formLabelWidth" prop="status">
			<el-radio-group v-model="form.status">
			      <el-radio label="1">禁用</el-radio>
			      <el-radio label="2">启用</el-radio>
			    </el-radio-group>
			</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addTrueUser">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	import sha1 from "js-sha1";
	import {reactive,ref,watch,onMounted} from "@vue/composition-api";
	import {getRole,addUser,getUser} from "../../../api/user.js"
	import commonCity from "../../../components/commonCity.vue"
	import {validateEmail,validatePhone} from "@/until/validate";
	export default{
		name:"adduser",
		props:{
			flag:{
				type:Boolean,
				default:false
			},
			refreshGetUser:{
				type:Function,
				default:null
			}
		},
		components:{ commonCity },
		setup(props,{root,emit,refs}){
			//表格参数
			const dialogFormVisible= ref(false)
			watch(()=>props.flag,value=>{
				dialogFormVisible.value=value
			})
			const form= reactive({
			          username: '',
					  truename:'',
					  password:'',
					  phone:'',
			          region: {},//地区
					  role: [],//角色
					  role1:[],//角色赋值
					  status: '',//启用状态
			})
			const provinceValue = ref('')
			const cityValue = ref('')
			const areaValue = ref('')
			const streetValue = ref('')
			const formLabelWidth = ref('80px')
			const closeAdd =(()=>{
				dialogFormVisible.value=false
				emit("update:flag",false)
			})
			/*父组件打开弹窗的时候调取的函数refs.dialogUser.open*/
			const open=(()=>{
				console.log("打开弹窗调取子组件函数成功")
			})
			/*执行添加用户函数*/
			const addTrueUser=(()=>{
				form.region='{"provinceValue":"'+provinceValue.value+'",'+'"cityValue":"'+cityValue.value+'"'+'",'+'"areaValue":"'+areaValue.value+'"'+'",'+'"streetValue":"'+streetValue.value+'"}'
				form.password=sha1(form.password)
				refs['form'].validate((valid) => {
				          if (valid) {
							 if(validateEmail(form.username)){
								 form.role=JSON.stringify(form.role)
								 addUser(form).then(request=>{
								 	root.$message.success(request.data.message)
									resetForm()
									props.refreshGetUser()
									dialogFormVisible.value=false
								 }).catch(error=>{
								 	form.role=JSON.parse(form.role)
								 	console.log(error)
								 }) 
								 
							 }else{
								root.$message.warning("请输入正确邮箱地址")
							 }
				            
				          } else {
							root.$message.warning("数据输入不合法")
				          }
				})
			})
			/*验证手机号*/
			const checkPhone = ((rule, value, callback)=>{
				
				if (validatePhone(value)) {
					callback();
				} else {
					callback(new Error('手机号错误'));
				}
			})
			const rules=reactive({
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
				],
				truename: [
					{ required: true, message: '请输入真实姓名', trigger: 'blur' },
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
				],
				phone: [
					{ required: true, trigger: 'blur',validator:checkPhone },
				],
				role: [
					{ required: true, message: '请选择角色', trigger: 'blur' },
				],
				status: [
					{ required: true, message: '请选择用户使用状态', trigger: 'blur' },
				]
			})
				
			
			/*获取角色*/
			const getAllRole = (()=>{
				getRole().then(request=>{
					form.role1=request.data.data
				}).catch(error=>{
					console.log(error)
				})
			})
			/*清空表格*/
			const resetForm = (()=>{
				  refs['form'].resetFields();
			})
			return{
				//验证返回
				rules,
				//地区返回
				provinceValue,cityValue,areaValue,streetValue,
				//添加用户
				addTrueUser,getAllRole,
				//表格返回参数
				formLabelWidth,dialogFormVisible,form,closeAdd,open
			}
		}
	}
</script>

<style>
</style>

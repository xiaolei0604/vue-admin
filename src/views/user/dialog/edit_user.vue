<template>
	<div>
		<el-dialog title="修改用户" :visible.sync="dialogFormVisible" @close="closeAdd" @open="getAllRole">
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
			<el-form-item label="按钮权限" :label-width="formLabelWidth" prop="btnPerm">
				<template v-for="item in form.btnPerm1">
					<h4 :key="item.name">{{item.name}}</h4>
			    <el-checkbox-group v-model="form.btnPerm">
			      <el-checkbox v-for="item in item.perm" :key="item.value" :label="item.value" name="type">{{item.name}}</el-checkbox>
			    </el-checkbox-group>
				
				</template>
			</el-form-item>
			<el-form-item label="是否启用" :label-width="formLabelWidth" prop="status">
				<el-radio-group v-model="form.status">
			      <el-radio :label="1">禁用</el-radio>
			      <el-radio :label="2">启用</el-radio>
			    </el-radio-group>
			</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="editTrueUser">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	import sha1 from "js-sha1";
	import {reactive,ref,watch,onMounted} from "@vue/composition-api";
	import {getRole,editUser,getUser,getSystem,getButtonRole} from "../../../api/user.js"
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
					  id:'',
					  btnPerm:[],
					  btnPerm1:[],
					  pageNumber:1,
					  pageSize:10
			})
			const provinceValue = ref('')
			const cityValue = ref('')
			const areaValue = ref('')
			const streetValue = ref('')
			const formLabelWidth = ref('80px')
			const closeAdd =(()=>{
				dialogFormVisible.value=false
				resetForm()
				emit("update:flag",false)
			})
			const oneRequest=ref()
			/*父组件打开弹窗的时候调取的函数refs.dialogUser.open*/
			const open=((valid,valname)=>{
				form.id=valid
				form.username=valname
				getUser(form).then(resquest=>{
					//let oneRequest=resquest.data.data.data.filter(data=>data.id == val)[0]
					let oneRequest=resquest.data.data.data[0]
					form.truename=oneRequest.truename
					form.phone=oneRequest.phone
					form.role=oneRequest.role.split(',')
					form.btnPerm=oneRequest.btnPerm.split(',')
					form.status=JSON.parse(oneRequest.status)
					form.region=oneRequest.region
				}).catch(error=>{
					console.log(error)
				})
			})
			/*执行修改用户函数*/
			const editTrueUser=(()=>{
				if(provinceValue.value){
					form.region='{"provinceValue":"'+provinceValue.value+'",'+'"cityValue":"'+cityValue.value+'"'+'",'+'"areaValue":"'+areaValue.value+'"'+'",'+'"streetValue":"'+streetValue.value+'"}'
				}
				if(form.password){
					form.password=sha1(form.password)
				}else{
					root.$delete(form,'password')
				}
				refs['form'].validate((valid) => {
				          if (valid) {
							  
							 if(validateEmail(form.username)){
								 form.role=form.role.join(',')
								 form.btnPerm=form.btnPerm.join(',')
								editUser(form).then(request=>{
									form.role=form.role.split(',')
									form.btnPerm=form.btnPerm.split(',')
								 	root.$message.success(request.data.message)
									props.refreshGetUser()
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
				
			
			onMounted(()=>{
				getBtnRole()
			})	
			
			/*获取角色*/
			const getAllRole = (()=>{
				getSystem().then(request=>{
					form.role1=request.data.data
				}).catch(error=>{
					console.log(error)
				})
			})
			/*获取按钮权限*/
			const getBtnRole = (()=>{
				getButtonRole().then(request=>{
					form.btnPerm1 =  request.data.data
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
				//修改用户
				editTrueUser,getAllRole,
				//表格返回参数
				formLabelWidth,dialogFormVisible,form,closeAdd,open
			}
		}
	}
</script>

<style>
</style>

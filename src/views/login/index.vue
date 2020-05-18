<template>
	<div>
		<div class="login">
			<ul>
				<li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toogleMenu(item)">{{item.txt}}</li>
			</ul>
			<div class="loginForm">
				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
					<el-form-item label="邮箱" prop="email">
						<el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="checkPass">
						<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" minlength="6" maxlength="20"></el-input>
					</el-form-item>
					<el-form-item label="重复密码" prop="checkrePass" v-if="model=='register'">
						<el-input type="text" v-model="ruleForm.checkrePass" autocomplete="off" minlength="6" maxlength="20"></el-input>
					</el-form-item>

					<el-form-item label="验证码" prop="code" minlength="6" maxlength="6">
						<el-row :gutter="0">
							<el-col :span="18">
								<div class="grid-content bg-purple">
									<el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content bg-purple-light">
									<el-button @click="getSms1()" type="primary" :disabled="sendBtn.regbtnState">{{sendBtn.sendState}}</el-button>
								</div>
							</el-col>


						</el-row>

					</el-form-item>
					<el-form-item>
						<el-button type="danger" @click="submitForm('ruleForm')" :disabled="loginbtnState">{{ model == "login" ? "登陆":"注册"}}</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped="scoped">
	.login {
		height: 100vh;
		background: #ccc;
	}

	.login ul {
		text-align: center;
	}

	.login ul li {
		display: inline-block;
		width: 100px;
		height: 50px;
		line-height: 50px;
		font-size: 14px;
		cursor: pointer;
	}

	.current {
		background: #ddd;
		border-radius: 2px;
	}

	.loginForm {
		margin: 30px auto;
		width: 70%;
	}
</style>
<script>
	import sha1 from "js-sha1";
	import {getSms,register,login} from "@/api/login.js";
	import {reactive,ref,isref,toRefs,onMounted} from "@vue/composition-api";
	import {validateEmail,validateCode} from "@/until/validate";
	export default {
		name: "login", //本页面路由名称
		setup(props, context) {
			let code = (rule, value, callback) => {

				if (!value) {
					return callback(new Error('验证码不能为空'));
				} else if (!validateCode(value)) {
					callback(new Error('验证码格式不正确,数字+字母'));
				} else {
					callback();
				}

			};
			let email = (rule, value, callback) => {

				if (!value) {
					return callback(new Error('邮箱不能为空'));
				} else if (!validateEmail(value)) {
					callback(new Error('邮箱格式不正确'));
				} else {
					callback();
				}
			};
			let checkPass = (rule, value, callback) => {

				if (!value) {
					return callback(new Error('密码不能为空'));
				} else if (!validateCode(value)) {
					callback(new Error('密码格式不正确,数字+字母'));
				} else {
					callback();
				}
			};
			let checkrePass = (rule, value, callback) => {

				if (!value) {
					return callback(new Error('重复密码不能为空'));
				} else if (ruleForm.checkPass != value) {
					callback(new Error('两次密码输入不一致'));
				} else {
					callback();
				}
			};
			const menuTab = reactive([{
					txt: "登陆",
					current: true,
					type: "login"
				},
				{
					txt: "注册",
					current: false,
					type: "register"
				}
			])
			const model = ref('login')
			const loginbtnState = ref(true)
			
			const sendBtn = reactive({
				regbtnState : false,
				sendState : "发送验证码"
			})
			const ruleForm = reactive({
				email: '16631420354@qq.com',
				checkPass: '',
				code: '',
				checkrePass: '',
			})
			const rules = reactive({
				email: [{
					validator: email,
					trigger: 'blur'
				}],
				checkPass: [{
					validator: checkPass,
					trigger: 'blur'
				}],
				code: [{
					validator: code,
					trigger: 'blur'
				}],
				checkrePass: [{
					validator: checkrePass,
					trigger: 'blur'
				}],
			})
			const submitForm = (formName => {
				context.refs[formName].validate((valid) => {
					if (valid) {
						if(model.value==="login"){
							denglu()
						}else{
							zhuce()
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				})
			})
			const zhuce=(()=>{
				let data ={
					username:ruleForm.email,
					password:sha1(ruleForm.checkPass),
					code:ruleForm.code,
					model:model.value
				}
				register(data).then(response=>{
					let res=response.data
					context.root.$message.success(res.message)
					toogleMenu(menuTab[0])
					stopTime()
				}).catch(error=>{
					context.root.$message.errors(error)
				})
			})
			const denglu=(()=>{
				let data ={
					username:ruleForm.email,
					password:sha1(ruleForm.checkPass), 
					code:ruleForm.code,
					model:model.value
				}
				//异步登陆
				context.root.$store.dispatch('login/login',data).then((response)=>{
					let res=response.data
					context.root.$message.success(res.message)
					context.root.$router.push({
						name:'console'
					})
				}).catch((error)=>{
					context.root.$message.errors(error)
				})
				//同步登陆
				/* login(data).then(response=>{
					let res=response.data
					context.root.$message.success(res.message)
					context.root.$router.push({
						name:'console'
					})
				}).catch(error=>{
					context.root.$message.errors(error)
				}) */
			})
			const resetForm = (formName => {
				context.refs[formName].resetFields()
			})
			const restFormData = (()=>{
				context.refs['ruleForm'].resetFields();
			})
			const toogleMenu = (data => {
				menuTab.forEach(elem => {
					elem.current = false
				})
				data.current = true
				model.value = data.type
				restFormData();
			})
			const getSms1 = (() => {

				let data = {
					username: ruleForm.email,
					model: model.value
				}
				if (ruleForm.email == '') {
					context.root.$message.error('邮箱不能为空');
					return false;
				}
				if (!validateEmail(ruleForm.email)) {
					context.root.$message.error('邮箱格式不正确');
					return false;
				}
				getSms(data).then(response => {
					context.root.$message.success("验证码已发送")
					loginbtnState.value=false
					cutTime(5)
				}).catch(error => {
					//context.root.$message.errors(error)
					console.log(error)
				})
				//getSms({username:ruleForm.email})
			})
			//定时器
			const timer = ref(null)
			const cutTime=((val)=>{
				let number=val
				timer.value = setInterval(()=>{
					number--
					console.log(number)
					if(number===0){
						sendBtn.regbtnState = false
						sendBtn.sendState="重新发送"
						clearInterval(timer.value)
					}else{
						//sendBtn.regbtnState = true
						sendBtn.sendState="剩余"+number+"秒"
					}
				},1000)
			})
			const stopTime=(()=>{
				sendBtn.regbtnState = false
				sendBtn.sendState="发送验证码"
				clearInterval(timer.value)	
			})
			onMounted(() => {
				//生命周期函数
				console.log(menuTab)
			})
			return {
				menuTab,
				model,
				submitForm,
				resetForm,
				toogleMenu,
				ruleForm,
				rules,
				getSms1,
				loginbtnState,
				sendBtn
			}

		},

	}
</script>

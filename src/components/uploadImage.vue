<template>
	<div>
		<el-upload
		  class="avatar-uploader"
		  action="http://up-z1.qiniup.com"
		  :show-file-list="false"
		  :data="form.uploadToken"
		  :on-success="handleAvatarSuccess"
		  :before-upload="beforeAvatarUpload"
		  :loading="imgState">
		  <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar">
		  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
	</div>
</template>

<script>
	import {reactive,ref,watch,onMounted} from "@vue/composition-api";
	import {uploadImgToken} from "../api/common.js"
	export default{
		name:"uploadImage",
		props:{
			imgUrl:{
				type:String,
				default:""
			}
		},
		setup(props,{root,emit}){
			const form=reactive({
				imgUrl:'',
				uploadToken:{
					token:"",
					key:""
				}
			})
			const imgState = ref(false)
			watch(()=>props.imgUrl,(value)=>{
				form.imgUrl=value
			})
			//上传图片方法
			const handleAvatarSuccess = ((res, file)=>{
				form.imgUrl = `http://ceshi.tsdengfeng.com/${res.key}`;
				imgState.value=false;
				emit("update:imgUrl",form.imgUrl)
			  })
			const beforeAvatarUpload=((file)=> {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
					
				if (!isJPG) {
				  root.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
				  root.$message.error('上传头像图片大小不能超过 2MB!');
				}
				let suffix = file.name
				let key = encodeURI(`${suffix}`)
				form.uploadToken.key=key
				imgState.value=true;
				return isJPG && isLt2M;
			  })
			
			 //获取七牛云token
			 const getNiuToken=(()=>{
				 let qiniuToken={
					 accessKey:"i7BuE5iU4Mk3a1XxF2Kni-_35Ic1X0_32Bha3HDp",
					 secretKey:"n6yBT3vKFcjY2X1zXetGE6WDxYalv4hbXnlOtYRo",
					 buckety:"vue-img-lei"
				 }
				 uploadImgToken(qiniuToken).then(response=>{
					 //接口返回TOken貌似不对，目前token写死
					 form.uploadToken.token="i7BuE5iU4Mk3a1XxF2Kni-_35Ic1X0_32Bha3HDp:GBpJk_LT10BGDbv3oqafE58asIg=:eyJzY29wZSI6InZ1ZS1pbWctbGVpIiwiZGVhZGxpbmUiOjE1OTQxOTI4MDB9"
				 }).catch(error=>{
					 console.log(error)
				 })
				 
			 })
			 onMounted(()=>{
				 getNiuToken()
			 })
			return{
				//变量
				imgState,
				//数组
				form,
				//方法
				handleAvatarSuccess,beforeAvatarUpload
			}
		}
	}
</script>

<style>
</style>

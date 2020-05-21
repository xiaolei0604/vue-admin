<template>
	<div>
		<div class="category">
			<el-row>
				<div class="addCategory">
									  <el-button type="danger" @click="show_category_input">添加一级分类</el-button>
				</div>
				<hr />
			  <el-col :span="12" >
				  
				  <div class="categoryList" >
					  <ul>
						  <li v-for="item in categoryResult.item":key="item.id">
							  <svg-icon icon-class="jia" />&nbsp;&nbsp;{{item.category_name}}<div class="catBtnFirst"> <el-button size="mini" type="success">添加子分类</el-button> <el-button size="mini" type="primary" @click="editFirstCategory(item.id,item.category_name)">编辑</el-button> <el-button size="mini" type="danger" @click="delFirstCategory(item.id)">删除</el-button></div>
							  
							  <ul class="secHover" v-if="item.children">
								 <li v-for="itemChild in item.children" :key="itemChild.id">— —{{itemChild.category_name}}<div class="catBtnSecond"><el-button size="mini" type="primary">编辑</el-button> <el-button size="mini" type="danger">删除</el-button></div></li>  
							  </ul>
						  </li>
						 
						
						 
					  </ul>
				  </div>
			  </el-col>
			  <el-col :span="12">
				   <p class="exitCatP">编辑分类</p>
				  <div class="categoryEdit">
					<el-form label-width="80px" :model="formAddCategory" ref="formAddCategory">
					  <el-form-item label="一级分类" v-if="show_first" prop="category_first">
					    <el-input v-model="formAddCategory.category_first"></el-input>
					  </el-form-item>
					  <el-form-item label="二级分类" v-if="show_second" prop="category_second">
					    <el-input v-model="formAddCategory.category_second"></el-input>
					  </el-form-item>
					</el-form>
					<el-button size="midum" type="danger" @click="add_category_fisrt(updateId)">{{btnFont}}</el-button>
				  </div>
			  </el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import {reactive,ref,onMounted} from "@vue/composition-api";
	import {addFirstCategory,getCategoryAll,deleteCategory,editCategory} from "@/api/news.js";
	import { globalconfirm } from "@/until/global_V3.0.js"
	export default{
		name:"category",
		setup(props,{root,refs}){
			const { str:aaa,confirm } = globalconfirm();
			const formAddCategory=reactive(
			{
			  category_first: '',
			  category_second: '',
			 
			})
			const show_first = ref(true)
			const show_second = ref(true)
			const btnFont=ref("添加")
			//定义更新按钮的值
			const updateId=ref('')
			const updateCategoryName=ref('')
			const categoryResult = reactive({
				item:[]
			})
			//添加一级分类
			const add_category_fisrt =((val)=>{
				
					if(val==''){
						addFirstCategory({categoryName:formAddCategory.category_first}).then(response=>{
							let data=response.data
							if(data.resCode==0){
								root.$message.success(data.message)
								refs['formAddCategory'].resetFields()
								getCategoryList()
							}else{
								root.$message.success("添加失败")
							}
						}).catch(error=>{
							//如果返回值resCode不等于0的话拦截器直接拦截了
							//root.$message.success(error)
						})
					}else{
						
						editCategory({id:val,categoryName:formAddCategory.category_first}).then(response=>{
							let data=response.data
							root.$message.success(data.message)
							refs['formAddCategory'].resetFields()
							getCategoryList()
							btnFont.value="添加"
						}).catch(error=>{
							console.log(error)
						})
					}
				
				
			})
			const show_category_input=(()=>{
				show_second.value=false
			})
			//获取分类列表
			const getCategoryList =(()=>{
				getCategoryAll().then(response=>{
					let cateDate=response.data.data
					categoryResult.item=cateDate
					//console.log(response.data.data)
				}).catch(error=>{
					console.log(error)
					root.$message.error("获取列表失败")
				})
			})
			//删除一级分类弹框提示
			const delFirstCategory=((val)=>{
				confirm({
					content:'确定要删除此条数据吗？？',
					tip:'删除提示',
					fn:delFirstTrue,
					id:val
				})
			})
			//删除及分类方法
			const delFirstTrue=((val)=>{
				deleteCategory({categoryId:val}).then(response=>{
					let delData=response.data
					root.$message.success(delData.message)
					getCategoryList()
				}).catch(error=>{
					console.log(error)
				})
			})
			//修改一级分类
			const editFirstCategory = reactive((valid,valname)=>{
				updateId.value = valid
				updateCategoryName.value = valname
				formAddCategory.category_first = valname
				btnFont.value="更新"
				/* editCategory({id:valid,categoryName:formAddCategory.category_first}).then(response=>{
					console.log(response)
				}).catch(error=>{
					console.log(error)
				}) */
			})
			//生命周期函数加载完成执行此函数
			onMounted(()=>{
				getCategoryList()
			})
			return {
				//变量ref
				show_first,show_second,updateId,updateCategoryName,btnFont,
				//方法
				add_category_fisrt,show_category_input,delFirstCategory,editFirstCategory,
				//数组reative
				formAddCategory,categoryResult
			}
		}
	}
</script>

<style scoped="scoped">
	hr{ margin-top: 20px;}
	.svg-icon{ position: relative; top: 8px;}
	.categoryList{ margin-top: 20px; margin-left: 20px;}
	.categoryEdit{ margin-top: 20px;}
	.categoryList ul li{ font-size: 14px; line-height: 40px;cursor: pointer;}
	.catBtnFirst{float: right; display: none;}
	.catBtnSecond{float: right; display: none;}
	.categoryList ul li:hover .catBtnFirst{ display: block; cursor: pointer;}
	.categoryList .secHover li:hover .catBtnSecond{ display: block; cursor: pointer;}
	.categoryEdit{ width: 50%; padding-left: 50px;}
	.exitCatP{ margin-top: 20px;margin-left: 20px;height: 45px; line-height: 45px; padding-left: 20px;background-color: #B3C0D1;}
</style>

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
						  <li v-for="item in categoryResult":key="item.id">
							  <svg-icon icon-class="jia" />&nbsp;&nbsp;{{item.category_name}}<div class="catBtn"> <el-button size="mini" type="success">添加子分类</el-button> <el-button size="mini" type="primary">编辑</el-button> <el-button size="mini" type="danger">删除</el-button></div>
							  </li>
						  <li>— —二级分类<div class="catBtn"> <el-button size="mini" type="success">添加子分类</el-button> <el-button size="mini" type="primary">编辑</el-button> <el-button size="mini" type="danger">删除</el-button></div></li>
						
						 
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
					<el-button size="midum" type="danger" @click="add_category_fisrt">确定</el-button>
				  </div>
			  </el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import {reactive,ref,onMounted} from "@vue/composition-api";
	import {addFirstCategory,getCategoryAll} from "@/api/news.js"
	export default{
		name:"category",
		setup(props,{root,refs}){
			
			const formAddCategory=reactive(
			{
			  category_first: '',
			  category_second: '',
			 
			})
			const show_first = ref(true)
			const show_second = ref(true)
			const categoryResult = reactive([
				{
					id:1,
					category_name:'测试分类'
				},
				{
					id:2,
					category_name:'测试分类1'
				},
				{
					id:3,
					category_name:'测试分类2'
					
				}
			])
			const add_category_fisrt =(()=>{
				
				addFirstCategory({categoryName:formAddCategory.category_first}).then(response=>{
					let data=response.data
					if(data.resCode==0){
						root.$message.success(data.message)
						refs['formAddCategory'].resetFields()
					}else{
						root.$message.success("添加失败")
					}
				}).catch(error=>{
					//如果返回值resCode不等于0的话拦截器直接拦截了
					//root.$message.success(error)
				})
			})
			const show_category_input=(()=>{
				show_second.value=false
			})
			const getCategoryList =(()=>{
				getCategoryAll().then(response=>{
					let categoryResult=response.data.data
					console.log(categoryResult)
				}).catch(error=>{
					root.$message.error("获取列表失败")
				})
			})
			//生命周期函数加载完成执行此函数
			onMounted(()=>{
				getCategoryList()
			})
			return {
				//变量ref
				show_first,show_second,
				//方法
				add_category_fisrt,show_category_input,
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
	.categoryList ul li{ font-size: 14px; height: 40px; line-height: 40px;cursor: pointer;}
	.catBtn{float: right; display: none;}
	.categoryList ul li:hover .catBtn{ display: block; cursor: pointer;}
	.categoryEdit{ width: 50%; padding-left: 50px;}
	.exitCatP{ margin-top: 20px;margin-left: 20px;height: 45px; line-height: 45px; padding-left: 20px;background-color: #B3C0D1;}
</style>

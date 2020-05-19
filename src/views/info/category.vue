<template>
	<div>
		<div class="category">
			<el-row>
				<div class="addCategory">
									  <el-button type="danger">添加分类</el-button>
				</div>
				<hr />
			  <el-col :span="12">
				  
				  <div class="categoryList">
					  <ul>
						  <li><svg-icon icon-class="jia" />&nbsp;&nbsp;新闻中心<div class="catBtn"> <el-button size="mini" type="success">添加子分类</el-button> <el-button size="mini" type="primary">编辑</el-button> <el-button size="mini" type="danger">删除</el-button></div></li>
						  <li>— —我们的新闻<div class="catBtn"> <el-button size="mini" type="success">添加子分类</el-button> <el-button size="mini" type="primary">编辑</el-button> <el-button size="mini" type="danger">删除</el-button></div></li>
						  <li>— —国家新闻<div class="catBtn"> <el-button size="mini" type="success">添加子分类</el-button> <el-button size="mini" type="primary">编辑</el-button> <el-button size="mini" type="danger">删除</el-button></div></li>
						  <li>— —世界新闻</li>
						  <li>— —韩国新闻</li>
					  </ul>
				  </div>
			  </el-col>
			  <el-col :span="12">
				   <p class="exitCatP">编辑分类</p>
				  <div class="categoryEdit">
					 
					<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
					  <el-form-item label="一级分类">
					    <el-input v-model="formLabelAlign.name"></el-input>
					  </el-form-item>
					  <el-form-item label="二级分类">
					    <el-input v-model="formLabelAlign.region"></el-input>
					  </el-form-item>
					</el-form>
					<el-button size="midum" type="danger">确定</el-button>
				  </div>
			  </el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import {reactive} from "@vue/composition-api";
	export default{
		name:"category",
		setup(props,context){
			const formLabelAlign=reactive(
			{
			  name: '',
			  region: '',
			 
			})
			return {
				formLabelAlign
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

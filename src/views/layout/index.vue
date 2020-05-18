<template>
	<div class="layoubody">
		
		
		<el-container>
		  <el-aside width="200px":class="[menuState ? 'close':'open']"><layoutleft /></el-aside>
		  <el-container>
		    <el-header><layoutheader /></el-header>
		    <el-main><layoutmain /></el-main>
		  </el-container>
		</el-container>
		
	</div>
</template>

<script>
	import {reactive,computed} from "@vue/composition-api";
	import layoutheader from "./components/layoutheader.vue"
	import layoutleft from "./components/layoutleft.vue"
	import layoutmain from "./components/layoutmain.vue"
	export default{
		name:'layout',
		components:{layoutheader,layoutleft,layoutmain},
		setup(props,context){
			
			const menuState = computed(()=>{
				return context.root.$store.state.app.isCollapse
			})
			return{
				menuState
			}
		}
	}
</script>

<style scoped="scoped">
	.close{ width: 60px !important; }
	.open{ width: 200px !important;}
	.layoubody{ height: 100vh;}
	.layoubody .is-vertical{ height: 100vh;}
	.el-header, .el-footer {
	    background-color: #B3C0D1;
	    color: #333;
	    text-align: center;
	    line-height: 60px;
	  }
	  
	  .el-aside {
	    background-color: #D3DCE6;
	    color: #333;
	    text-align: center;
	    line-height: 200px;
		-webkit-transition: all .3s ease 0s;
	  }
	  
	  
	  body > .el-container {
	    margin-bottom: 40px;
	  }
	  
	  .el-container:nth-child(5) .el-aside,
	  .el-container:nth-child(6) .el-aside {
	    line-height: 260px;
	  }
	  
	  .el-container:nth-child(7) .el-aside {
	    line-height: 320px;
	  }
</style>

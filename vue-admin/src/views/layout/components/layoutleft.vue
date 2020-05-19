<template>
	<div>
		
		<h1 class="logo"><img src="../../../assets/logo.png" /></h1>
		<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="transparent" router>
			<template  v-for="(item,index) in routes">
			
			<el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''" >
				<template slot="title">
				  <svg-icon :iconClass="item.meta.icon":className="item.meta.icon" />
				  <span>{{item.meta.name}}</span>
				</template>
				
				<el-menu-item v-for="(subitem,index) in item.children":key="subitem.id":index="subitem.path">{{subitem.meta.name}}</el-menu-item>
				
			 </el-submenu>
			
			 </template>
		</el-menu>
		
	</div>
</template>

<script>
	import {reactive,ref,isref,toRefs,onMounted,computed} from "@vue/composition-api";
	export default{
		setup(props,context){
			
			const routes = reactive(context.root.$router.options.routes)
			//路由输出
			//console.log(routes)
			//获取xuex里面定义的值
			const isCollapse = computed(()=>{
				return context.root.$store.state.app.isCollapse
			})
			//vuex数据输出
			//console.log(context.root.$store.state.isCollapse)
			//console.log(context.root.$store.getters.count)
			//context.root.$store.commit('SET_COUNT',100)
			const handleOpen = reactive((key ,keyPath)=>{
				console.log(key, keyPath)
			})
			const handleClose = reactive((key ,keyPath)=>{
				console.log(key, keyPath)
			})
			return{
				isCollapse,
				handleOpen,
				handleClose,
				routes
			}
		}
		 
	}
</script>

<style lang="scss" scoped="scoped">
	.el-menu{ text-align:left;
		svg{
			padding-right: 20px;
		}
	}
	.logo{ margin:0 auto; width: 50px; height:50px; padding: 10px 0;}
	.logo img{ display: block; width: 50px; height:50px}
</style>

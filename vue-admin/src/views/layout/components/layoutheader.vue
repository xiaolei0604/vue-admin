<template>
	<div>
		<div class="headleft" @click="stateMenu"> <svg-icon iconClass="menu" className="menu"/></div>
		<div class="headright">
		   
		    <div>
		      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
		    </div>
		   <div>{{username}}</div>
		   <div @click="exit"><svg-icon iconClass="close" className="close" /></div>
		 </div>
	</div>
</template>

<script>
	import {reactive,ref,isref,toRefs,onMounted,computed} from "@vue/composition-api";
	export default{
		setup(props,context){
			const exit=(()=>{
				context.root.$store.dispatch('login/exit').then(()=>{
					context.root.$router.push({
						name:'login'
					})
					
				})
			})
			const username = computed(()=>{
				return context.root.$store.state.login.username
			})
			const stateMenu = reactive(()=>{
				//直接执行mutations里面的方法改变菜单打开关闭
				//context.root.$store.commit('SET_isCollapse')
				//执行异步方法修改
				context.root.$store.dispatch('app/set_menu_State')
			})
			return{
				stateMenu,
				username,
				exit
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.headleft{
		float: left; width: 50px; height: 50px; margin-top: 7px;
		svg{
			cursor: pointer;
		}
	}
	.headright{
		float: right;margin-top: 7px;
	}
	.headright div{ float:left;}
	.headright div:nth-child(2){ line-height: 40px; font-size: 14px; padding:0 15px 0 5px; font-weight: bold; }
</style>

<template>
	<div class="main-main">
		
		<div class="mainxianshi"> 
			
			<keep-alive :exclude="userlist">
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
				<router-view v-if="!$route.meta.keepAlive"></router-view>
		</div>
		
		
	</div>
</template>

<script>
	export default{
		setup(){
			
		}
	}
</script>

<style>
	.mainxianshi{ background-color: #fff;}
</style>

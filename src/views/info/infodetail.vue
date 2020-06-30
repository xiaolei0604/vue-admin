<template>
	<div>
		新闻详情
	</div>
</template>

<script>
	export default{
		setup(props,context){
			let id = context.root.$route.query.id;
			console.log(id)
		}
	}
</script>

<style>
</style>

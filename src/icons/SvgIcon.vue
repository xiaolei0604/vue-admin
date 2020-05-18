<template>
	<svg :class="svgClass" aria-hidden="true">    	<use :xlink:href="iconname"></use>  	</svg>
</template>
<script>
	import {reactive,ref,isref,toRefs,onMounted,computed} from "@vue/composition-api";
	export default{
		name:"SvgIcon",
		props:{
			iconClass:{
				type:String,
				default:'没传iconClass',
				required:false
			},
			className:{
				type:String,
				default:"没传className",
				required:false
			}
		},
		setup(props,context){
			console.log(props)
			const msg=ref("手把手撸马前端大牛逼")
			const iconname = computed(() =>{
				if(props.iconClass){
					return  "#icon-"+props.iconClass
				}else{
					return  "#icon-"
				}
			})
			const svgClass = computed(() =>{
				if(props.className){
					return  "svg-icon "+props.className
				}else{
					return  "svg-icon"
				}
				
			})
			return{
				msg,
				iconname,
				svgClass
			}
		}
	}
</script>
<style>
	.svg-icon{ width: 25px; height: 25px;}
</style>

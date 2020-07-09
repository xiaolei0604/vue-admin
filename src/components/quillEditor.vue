<template>
	<div>
		<quillEditor v-model="data.value" ref="quillEditor" :options="data.editorOption" @change="onEditorChange"/>
	</div>
</template>

<script>
	import {reactive,ref,watch} from "@vue/composition-api";
	import { quillEditor } from "vue-quill-editor";
	import 'quill/dist/quill.core.css';
	import 'quill/dist/quill.snow.css';
	import 'quill/dist/quill.bubble.css';
	export default{
		name:"infoDetail",
		props:{
			content:{
				type:String,
				default:""
			}
		},
		components:{ quillEditor },
		setup(props,{root,emit}){
			const data = reactive({
				editorOption: {},
				value:""
			})
			watch(()=>props.content,(value)=>{
				data.value=value
			})
			const onEditorChange=(()=>{
				emit("update:content",data.value)
			})
			return{
				//数组
				data,
				//方法
				onEditorChange
			}
		}
	}
</script>

<style>
</style>

import { MessageBox } from 'element-ui';
import {reactive,ref} from "@vue/composition-api";
export function globalconfirm (){
	const str=ref('')
	const confirm=((params)=>{
		MessageBox.confirm(params.content, params.tip || '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: params.btnType || 'warning'
		}).then(() => {
			str.value="修改弹框定义的值"
			params.fn && params.fn(params.id)
		}).catch(() => {
		  MessageBox("已取消删除")
			
		});
	})
	return{
		str,
		confirm
	}
}
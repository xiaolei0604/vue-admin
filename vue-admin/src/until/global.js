import { MessageBox } from 'element-ui';
export default{
	install(Vue,option){
		Vue.prototype.confirm=(params)=>{
			  MessageBox.confirm(params.content, params.tip || '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: params.btnType || 'warning'
			}).then(() => {
				params.fn && params.fn(params.id)
			}).catch(() => {
			  //删除失败走这里         
			});
		}
	}
}
const state= {
	 /*如果有没值就取后面的值赋值给前面的值*/
	 id:'' || sessionStorage.getItem('infoId'),
	 title:'' || sessionStorage.getItem('infoTitle')
}
const  getters={
	  infoId:state=>state.id,
	  infoTitle:state=>state.title
}
const mutations= {
	 SET_ID(state,value){
		 state.id = value
		 sessionStorage.setItem('infoId',value)
	 },
	 SET_TITLE(state,value){
		 state.title=value
		 sessionStorage.setItem('infoTitle',value)
	 }
}
const  actions= {
	  
	
}
const modules= {}
export default {
	namespaced:true,
	state,
	getters,
	mutations,
	actions,
	modules
};
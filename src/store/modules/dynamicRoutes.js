import { getUserRole } from "@/api/user.js";
import { defaultRoutes,dynamicRoutes } from "@/router/index.js"
const state= {
	roles:[],
	allRoutes:defaultRoutes,
	addRoutes:[],
	btnRole:[]
}
const  getters={
	roles:state=>state.roles,
	allRoutes:state=>state.allRoutes,//所有路由  默认路由+新添加路由
	addRoutes:state=>state.addRoutes,//新添加的路由
	btnRole:state=>state.btnRole//存储按钮权限
}
const mutations= {
	SET_ROLES(state,value){
		state.roles=value
	},
	SET_ROUTES(state,value){
		state.addRoutes=value
		state.allRoutes=defaultRoutes.concat(value)
	},
	SET_BTNPERM(state,value){
		state.btnRole=value
	}
}
const  actions= {
	getRole({commit},data){
		return new Promise((resolve,reject)=>{
			getUserRole().then(response=>{
				let data = response.data.data;
				commit("SET_ROLES",data)
				commit("SET_BTNPERM",data)
				resolve(data)
			}).catch(error=>{
				console.log(error)
			})
		})
	},
	createRoute({ commit },data){
		return new Promise((resolve,reject)=>{
			//['userSystem','infoSystem']
			let role = data
			let addRoutes=[]
			if(role.includes("admin")){
				addRoutes = dynamicRoutes
			}else{
				addRoutes = dynamicRoutes.filter(item=>{
					/*过滤角色*/
					if(role.includes(item.meta.system)){
						return item
					}
				
				})
			}
			
			commit("SET_ROUTES",addRoutes)
			resolve();
		})
	}
	  
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
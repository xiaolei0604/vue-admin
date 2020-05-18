import cookie from "cookie_js";
import {login} from "@/api/login.js";
import {settoken,setusername,removetoken,removeusername} from "@/until/app.js";
const state= {
	to_ken:'',
	username:cookie.get('adminUsername') || ''
}
const  getters={
	
}
const mutations= {
	 SET_TOKEN (state,value){
		 state.to_ken=value
	 },
	 SET_USERNAME (state,value){
		 state.username = value
	 }
  }
 const  actions= {
	 
	  //异步登陆
	  login(context,data){
		  return new Promise((resolve,reject)=>{
			  login(data).then((response)=>{
				  let data = response.data.data
				  //改变vuex里面的值  先触发mutation这个方法   然后改变state里面的值
				 context.commit('SET_TOKEN',data.token)
				 context.commit('SET_USERNAME',data.username)
				 
				 settoken(data.token)
				 setusername(data.username)
				 resolve(response)
			  }).catch((error)=>{
				  reject(error)
			  })
		  })
	  },
	  exit(context,data){
		return new Promise((resolve,reject)=>{
			removetoken()
			removeusername()
			context.commit('SET_TOKEN','')
			context.commit('SET_USERNAME','')
			resolve()
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
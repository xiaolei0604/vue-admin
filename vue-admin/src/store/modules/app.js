import cookie from "cookie_js";
import {login} from "@/api/login.js";

const state= {
	  //HTML短存储
	  isCollapse:JSON.parse(sessionStorage.getItem('isCollapse')) || false,
	  //cookie_js存储
	  //isCollapse:JSON.parse(cookie.get('isCollapse')) || false,
	  count:10
}
const  getters={
	  count:(state) => state.count+10
}
 const mutations= {
	  SET_isCollapse(state){
		  state.isCollapse=!state.isCollapse
		  //HTML短存储
		  sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
		  //cokkie_js存储
		  //cookie.set('isCollapse',JSON.stringify(state.isCollapse))
	  },
	  SET_COUNT(state,value){
		  state.count=value
		  console.log(state.count)
	  }
  }
 const  actions= {
	  //修改菜单状态
	  set_menu_State(content,data){
		 // content.state
		 //content.getters
		 //content.commit执行方法使用
		  content.commit('SET_isCollapse')
		  
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
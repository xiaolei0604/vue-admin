import Vue from "vue";
import VueCompositionApi from '@vue/composition-api';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./icons"
//import globalconfirm from './until/global.js';2.0公共弹出方法引用
//引入路由卫士
import "./router/premits";
//Vue.use(globalconfirm)2.0公共弹出方法引用注入
Vue.use(VueCompositionApi);
Vue.use(ElementUI);
Vue.config.productionTip = false;


Vue.directive("btnPremits",{
	bind:function(el,bingind,vnode){
		if(bingind.def.getBtnPremits(bingind.value)){
			el.style.background='black'
		}else{
			el.style.background='red'
		}
		
	},
	insert:function(el){
		el.focus()
		el.setAttribute('placeholder','自定义内容');
		console.log(el)
	},
	getBtnPremits:function(val){
		let btnRoleAdmin = store.getters["dynamicRoutes/btnRole"].role
		if(btnRoleAdmin.includes('admin')){
			return true;
		}else{
			let btnRole = store.getters["dynamicRoutes/btnRole"].btnPerm
			if(btnRole.includes(val)){
				return true
			}else{
				return false
			}
		}
	}
})


new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount("#app");


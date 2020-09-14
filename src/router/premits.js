import router from "./index.js"
import store from "../store/index"
import {gettoken,removetoken,removeusername} from "../until/app.js"

//路由白名单
const routerWhite=['/login']

//路由卫士
router.beforeEach((to,from,next)=>{
	if(gettoken()){
		if(to.path==='/login'){
			removetoken();
			removeusername();
			store.commit("login/SET_TOKEN",'');
			store.commit("login/SET_USERNAME",'');
			console.log('执行清除缓存')
			next();
		}else{
			
			if(store.getters["dynamicRoutes/roles"].length ===0){
				store.dispatch("dynamicRoutes/getRole").then(response=>{
					
					let role=response.role
					store.dispatch("dynamicRoutes/createRoute",role).then(response=>{
						
						let addroute = store.getters["dynamicRoutes/addRoutes"]
						let allroute = store.getters["dynamicRoutes/allRoutes"]
						router.options.routes=allroute
						router.addRoutes(addroute)
						next({ ...to, replace: true });
						
						})
					}).catch(error=>{
						console.log(error)
					})
			}else{
				next();
			}
			
			
			
			
		}
		
		
	}else{
		if(routerWhite.indexOf(to.path)!==-1){
			next()
		}else{
			next('/login')
		}
	}
	/* console.log(to)
	console.log(from)
	console.log(next)
	next() */
})
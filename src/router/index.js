import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
/*默认路由*/
export const defaultRoutes = [
  {
    path: "/",
    redirect:"login",
	hidden:true,
	meta:{
		name:"主页"
	}
  },
  {
    path: "/login",
    name: "login",
	hidden:true,
	meta:{
		name:"登陆"
	},
    component: () =>import( "../views/login/index.vue")
  },
  {
    path: "/console",
    name: "console",
	redirect:"index",
	meta:{
		name:"控制台",
		icon:"console"
	},
    component: () =>import( "../views/layout/index.vue"),
	children:[{
		path: "/index",
		name: "index",
		meta:{
			name:"控制台首页",
			
		},
		component: () =>import( "../views/console/index.vue")
	}]
  }
];
/*动态路由*/
export const dynamicRoutes = [
	{
	  path: "/info",
	  name: "info",
		meta:{
			system:'infoSystem',
			name:"新闻信息",
			icon:"info"
		},
	  component: () =>import( "../views/layout/index.vue"),
		children:[
			{
				path: "/infoindex",
				name: "infoindex",
				meta:{
					keepAlive:true,
					name:"新闻列表"
				},
				component: () =>import( "../views/info/index.vue")
			},
			{
				path: "/infocategory",
				name: "infocategory",
				meta:{
					name:"新闻分类"
				},
				component: () =>import( "../views/info/category.vue")
			},
			{
				path: "/infodetail",
				name: "infodetail",
				hidden:true,
				meta:{
					name:"新闻详情"
				},
				component: () =>import( "../views/info/infodetail.vue")
			}
			
		],
	},
	{
	  path: "/user",
	  name: "user",
		meta:{
			system:'userSystem',
			name:"用户管理",
			icon:"user"
		},
	  component: () =>import( "../views/layout/index.vue"),
		children:[
			{
				path: "/userlist",
				name: "userlist",
				meta:{
					keepAlive:true,
					name:"用户列表"
				},
				component: () =>import( "../views/user/index.vue")
			}
		],
	}
]
const router = new VueRouter({
  routes:defaultRoutes
});

export default router;

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import app from "./modules/app";
import login from "./modules/login";
import infoDetail from "./modules/infoDetail"
import dynamicRoutes from "./modules/dynamicRoutes"
export default new Vuex.Store({
  
  modules: {
	  app,
	  login,
	  infoDetail,
	  dynamicRoutes
  }
});

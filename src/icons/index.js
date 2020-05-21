import Vue from "vue";
import SvuIcon from "./SvgIcon.vue"

//定义全局组件
Vue.component('svg-icon',SvuIcon)

const req = require.context('./svg', false, /\.svg$/)const requireAll = requireContext => {
  //console.log(requireContext.keys())  return requireContext.keys().map(requireContext)}requireAll(req)
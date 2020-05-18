import cookie from "cookie_js";

const adminToken = "admin_token";
const adminUsername = "username";
export function gettoken(){
	return cookie.get("adminToken")
}
export function settoken(token){
	return cookie.set("adminToken",token)
}
export function removetoken(){
	return cookie.remove("adminToken")
}
export function getusername(){
	return cookie.get("adminUsername")
}
export function setusername(username){
	return cookie.set("adminUsername",username)
}
export function removeusername(){
	return cookie.remove("adminUsername")
}
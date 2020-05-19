export function validateEmail(val){
	var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
	return reg.test(val)
}
export function validateCode(val){
	var reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
	return reg.test(val)
}
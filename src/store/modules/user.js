/*
 * @Description: 
 * @Version: 1.0
 * @Autor: solid
 * @Date: 2022-05-17 14:17:49
 * @LastEditors: solid
 * @LastEditTime: 2022-05-31 18:50:40
 */

import {
	getToken,
	setToken,
	removeToken,
	getUser,
	setUser,
	removeUser
} from '@/utils/cookie';
const user = {
	state: {
		token: getToken() ? getToken() : '',
		isShowLogin: false,
		userInfo: getUser() ? getUser() : '',
		address: '',
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_ISSHOWLOGIN: (state, isShowLogin) => {
			state.isShowLogin = isShowLogin
		},
		SET_USER: (state, user) => {
			state.userInfo = user
		},
		SET_ADDRESS: (state, addr) => {
			state.address = addr
		},
	},

	actions: {
		// 登录
		Login({
			commit
		}, userInfo) {
			commit('SET_TOKEN', userInfo.token)
			setToken(userInfo.token)
		},
		// 登出
		Logout({
			commit
		}) {
			return new Promise((resolve) => {
				removeToken()
				removeUser()
				commit('SET_TOKEN', '')
				commit('SET_USER', '')
				resolve()
			})
		},
		resetToken({
			commit
		}) {
			return new Promise((resolve) => {
				removeToken()
				removeUser()
				commit('SET_TOKEN', '')
				commit('SET_USER', '')
				resolve()
			})
		},
		saveUserInfo({commit},userInfo){
			setUser(JSON.stringify(userInfo))
			commit('SET_USER', userInfo)
		},
	}
}
export default user

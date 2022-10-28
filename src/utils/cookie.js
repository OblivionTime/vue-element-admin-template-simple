/*
 * @Description: 
 * @Version: 1.0
 * @Autor: solid
 * @Date: 2022-05-17 12:45:40
 * @LastEditors: solid
 * @LastEditTime: 2022-05-31 18:52:46
 */
import Cookies from 'js-cookie'

const TokenKey = 'Authorization'
const NameKey = 'user'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getUser() {
  return Cookies.get(NameKey)
}

export function setUser(user) {
  return Cookies.set(NameKey, user)
}

export function removeUser() {
  return Cookies.remove(NameKey)
}
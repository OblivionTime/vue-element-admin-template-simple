/*
 * @Description: 
 * @Version: 1.0
 * @Autor: solid
 * @Date: 2022-05-31 18:47:07
 * @LastEditors: solid
 * @LastEditTime: 2022-12-14 11:37:39
 */
import request from '@/utils/request'
//登录
export function UserLogin(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}
/*
 * @Description: 
 * @Version: 1.0
 * @Autor: solid
 * @Date: 2022-05-31 18:47:07
 * @LastEditors: solid
 * @LastEditTime: 2022-10-28 21:08:19
 */
import request from '@/utils/request'
//登录
export function UserLogin(data) {
    return request({
        url: '/accounts/admin_access',
        method: 'post',
        data
    })
}
import request from '@/utils/request'

export function reqFileOriginalTable(tableName,page,limit,orderCol,order) {
  let params = {
    'tableName': tableName,
    'page': page,
    'limit': limit,
    'order': order,
    'orderCol': orderCol,
  }
  return request({
    url: '/basics/original',
    params: params,
    method: 'get'
  })
}
export function reqFileOriginalTableNameList() {
  return request({
    url: '/basics/tableNameList',
    method: 'get'
  })
}

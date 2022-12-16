import request from '@/utils/request'

export function reqSearchAddress(address) {
  let params
  params = {
    'address': address
  }
  return request({
    url: '/basics/searchAddress',
    method: 'get',
    params: params
  })
}

export function reqSearchAddressDetail(address, type, page, limit, orderCol, order) {
  let params
  params = {
    'address': address,
    'type': type,
    'order': order,
    'orderCol': orderCol,
    'page': page,
    'limit': limit,
  }
  return request({
    url: '/basics/searchAddressDetail',
    method: 'get',
    params: params
  })
}

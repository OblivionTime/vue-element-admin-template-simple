import request from '@/utils/request'

export function crawl(addressList, addressType) {
  let data = {
    'addresses': addressList
  }
  return request({
    url: '/crawl/' + addressType,
    data: data,
    method: 'post'
  })
}
export function running_address() {
  return request({
    url: '/crawl/running_address',
    method: 'get'
  })
}

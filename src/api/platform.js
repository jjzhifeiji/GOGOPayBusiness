import request from '@/utils/request'

export function getsPlatform(params) {
  return request({
    url: 'Business_BusinessController.getsBusiness',
    method: 'post',
    params
  })
}

export function addPlatform(params) {
  return request({
    url: 'Business_BusinessController.addBusiness',
    method: 'post',
    params
  })
}

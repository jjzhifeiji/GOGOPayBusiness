import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'Business_BusinessController.login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: 'Business_BusinessController.getInfo',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: 'Business_BusinessController.logout',
    method: 'post'
  })
}

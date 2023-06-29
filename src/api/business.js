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

export function getsAmountLog(params) {
  return request({
    url: 'Business_BusinessController.getsAmountLog',
    method: 'post',
    params
  })
}

export function createGoogleAuth(params) {
  return request({
    url: 'Business_BusinessController.CreateGoogleAuthenticator',
    method: 'post',
    params
  })
}

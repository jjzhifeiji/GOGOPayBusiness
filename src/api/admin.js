import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'Admin_AdminController.login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: 'Admin_AdminController.getInfo',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: 'Admin_AdminController.logout',
    method: 'post'
  })
}

import request from '@/utils/request'

export function getsUserGroup(params) {
  return request({
    url: 'User_UserController.getsUserGroup',
    method: 'post',
    params
  })
}

export function addUser(params) {
  return request({
    url: 'User_UserController.addUser',
    method: 'post',
    params
  })
}

export function modUserStatus(params) {
  return request({
    url: 'User_UserController.modUserStatus',
    method: 'post',
    params
  })
}

export function getUserList(params) {
  return request({
    url: 'User_UserController.getUserList',
    method: 'post',
    params
  })
}

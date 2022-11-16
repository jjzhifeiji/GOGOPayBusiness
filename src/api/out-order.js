import request from '@/utils/request'

/**
 *
 */
export function getChangeOrderList(params) {
  return request({
    url: 'OutOrder_OutOrderController.getsOutOrder',
    method: 'post',
    params
  })
}

export function withdrawal(params) {
  return request({
    url: 'OutOrder_OutOrderController.withdrawal',
    method: 'post',
    params
  })
}

export function confirmOutOrder(params) {
  return request({
    url: 'OutOrder_OutOrderController.confirmOutOrder',
    method: 'post',
    params
  })
}

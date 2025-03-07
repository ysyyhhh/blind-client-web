import request from '@/utils/request'
import { getToken } from '@/utils/auth'
export function addMessage(data) {
  return request({
    url: '/service-subscription/admin/addMessage',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data
  })
}

export function getUnReadMessageList() {
  return request({
    url: '/service-subscription/user/getUnReadMessageList',
    method: 'get',
    headers: {
      'token': getToken()
    }
  })
}

export function readMessage(obstacle_id) {
  return request({
    url: '/service-subscription/user/readMessage',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data: {
      'obstacle_id': obstacle_id
    }
  })
}

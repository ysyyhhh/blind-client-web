import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function updateUserPassword(data) {
  return request({
    url: '/service-user/user/updateUserPassword',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data
  })
}

export function updateUserInfo(data) {
  return request({
    url: '/service-user/user/updateUser',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data
  })
}

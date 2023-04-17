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


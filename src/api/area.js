import request from '@/utils/request'
import { getToken } from '@/utils/auth'
export function getAreaList() {
  return request({
    url: '/service-area/admin/getAreaList',
    method: 'get',
    headers: {
      'token': getToken()
    }
  })
}

export function getLocation(address) {
  return request({
    url: '/service-area/user/getLocation/address=' + address,
    method: 'get',
    headers: {
      'token': getToken()
    }
  })
}
export function getAreaTree() {
  return request({
    url: '/service-area/user/getAreaTree',
    method: 'get',
    headers: {
      'token': getToken()
    }
  })
}

export function getOptions() {
  return request({
    url: '/service-area/user/getOptions',
    method: 'get',
    headers: {
      'token': getToken()
    }
  })
}
export function getMySubscribedAreaList(listQuery) {
  return request({
    url: '/service-area/user/getMySubscribedAreaList',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data: listQuery
  })
}
export function subscribeArea(data) {
  return request({
    url: '/service-area/user/subscribeArea',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data
  })
}
export function unSubscribeArea(data) {
  return request({
    url: '/service-area/user/unSubscribeArea',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data
  })
}
export function updateObstacle(data) {
  return request({
    url: '/service-obstacle/admin/updateObstacle',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data
  })
}
export function getAreaById(id) {
  return request({
    url: '/service-area/user/getMyAreaSubscriptionByAreaId',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data: {
      'areaId': id
    }
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
export function updateObstacleProcessingStatus(data) {
  return request({
    url: '/service-obstacle/user/updateObstacleProcessingStatus',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data
  })
}


import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function assignResponsibility(userId, obstacleId) {
  return request({
    url: '/service-obstacle/admin/assignResponsibility',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data: {
      'userId': parseInt(userId),
      'obstacleId': parseInt(obstacleId)
    }
  })
}

export function deleteResponsibility(userId, obstacleId) {
  return request({
    url: '/service-obstacle/admin/deleteResponsibility',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data: {
      'userId': parseInt(userId),
      'obstacleId': parseInt(obstacleId)
    }
  })
}

export function getUserListByNotObstacleId(id) {
  return request({
    url: '/service-obstacle/admin/getUserListByNotObstacleId',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data: {
      'obstacleId': parseInt(id)
    }
  })
}
export function getUserListByObstacleId(id) {
  return request({
    url: '/service-obstacle/admin/getUserListByObstacleId',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data: {
      'obstacleId': parseInt(id)
    }
  })
}

export function getObstacleDetail(id) {
  return request({
    url: '/service-obstacle/user/getObstacleDetail',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data: {
      'obstacleId': parseInt(id)
    }
  })
}

export function getOptions() {
  return request({
    url: '/service-obstacle/user/getOptions',
    method: 'get',
    headers: {
      'token': getToken()
    }
  })
}
export function getObstacleList(listQuery) {
  return request({
    url: '/service-obstacle/user/getObstacleList',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data: listQuery
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
export function getObstacleListByArea(area) {
  return request({
    url: '/service-obstacle/user/getObstacleListByArea',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data: {
      'areaFullName': area
    }
  })
}

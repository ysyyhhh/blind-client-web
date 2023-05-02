import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getObstacleStatistics(fullName) {
  return request({
    url: '/service-obstacle/user/getObstacleStatistics',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data: {
      'areaFullName': fullName
    }
  })
}

export function getObstacleTypeByDate(fullName, begDate, endDate) {
  return request({
    url: '/service-obstacle/user/getObstacleTypeByDate',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data: {
      'areaFullName': fullName,
      'begDate': begDate,
      'endDate': endDate
    }
  })
}

export function getObstacleCountByDate(fullName) {
  return request({
    url: '/service-obstacle/user/getObstacleCountByDate',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data: {
      'areaFullName': fullName
    }
  })
}

export function getAreaListByLevel(level) {
  return request({
    url: '/service-area/user/getAreaListByLevel',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data: {
      'level': level
    }
  })
}

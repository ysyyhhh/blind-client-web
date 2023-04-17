import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getRawImageList(id) {
  return request({
    url: '/service-datasource/admin/rawImageList/?dataSourceId=' + id,
    method: 'get',
    headers: {
      'token': getToken()
    }
  })
}

export function getDatsSourceToken(id) {
  return request({
    url: '/service-datasource/admin/getDataSourceTokenById',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data: {
      dataSourceId: parseInt(id)
    }
  })
}

export function getDataSourceList() {
  return request({
    url: '/service-datasource/admin/getDataSourceList',
    method: 'get',
    headers: {
      'token': getToken()
    }
  })
}

export function addDataSource(data) {
  return request({
    url: '/service-datasource/admin/addDataSource',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data
  })
}
export function deleteDataSource(id) {
  return request({
    url: '/service-datasource/admin/deleteDataSource',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data: {
      dataSourceId: id
    }
  })
}

export function updateDataSource(data) {
  return request({
    url: '/service-datasource/admin/updateDataSource',
    method: 'post',
    headers: {
      'token': getToken()
    },
    data
  })
}

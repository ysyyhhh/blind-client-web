import request from '@/utils/request'
import { getToken } from '@/utils/auth'
export function addUser(data) {
  return request({
    url: '/service-user/admin/addUser',
    method: 'post',
    data: data,
    headers: {
      'token': getToken()
    }
  })
}
export function updateUser(data) {
  return request({
    url: '/service-user/admin/updateUser',
    method: 'post',
    data: data,
    headers: {
      'token': getToken()
    }
  })
}
export function deleteUser(id) {
  return request({
    url: '/service-user/admin/deleteUser',
    method: 'post',
    data: {
      'userId': id
    },
    headers: {
      'token': getToken()
    }
  })
}
export function modifyUserType(data) {
  return request({
    url: '/service-user/admin/modifyUserType',
    method: 'post',
    data: data,
    headers: {
      'token': getToken()
    }
  })
}
export function getUserListByQuery(query) {
  return request({
    url: '/service-user/admin/getUserListByQuery',
    method: 'post',
    data: query,
    headers: {
      'token': getToken()
    }
  })
}

export function getUserList() {
  return request({
    url: '/service-user/admin/getUserList',
    method: 'get',
    headers: {
      'token': getToken()
    }
  })
}

export function login(data) {
  // return request({
  //   url: '/vue-admin-template/user/login',
  //   method: 'post',
  //   data
  // })
  return request({
    url: '/service-user/login/login',
    method: 'post',
    data
  })
}
export function getPubKey(data) {
  return request({
    url: '/service-user/login/getPubKey',
    method: 'post',
    data
  })
}
export function signUp(data) {
  return request({
    url: '/service-user/login/signUp',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/service-user/user/getUser',
    method: 'get',
    headers: {
      'token': getToken()
    }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}


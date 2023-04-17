import Cookies from 'js-cookie'
import { JSEncrypt } from 'jsencrypt'

import { getPubKey } from '@/api/user'
const TokenKey = 'vue_admin_template_token'
import store from '@/store'
export function isAdmin() {
  var roles = store.getters.roles
  // console.log('roles: ' + roles)
  return roles == 'admin'
}
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// make async function return a promise
export async function myGetPubKey(loginName) {
  if (Cookies.get('pubKey')) {
    return Cookies.get('pubKey')
  }
  // 先发送手机号，获取公钥
  var data = {
    'loginName': loginName
  }
  return new Promise((resolve, reject) => {
    getPubKey(data).then(response => {
      const { data } = response
      Cookies.set('pubKey')
      // console.log(data)
      resolve(data)
    }).catch(error => {
      console.log('获取公钥失败！')
      reject(error)
    })
  })
}

export async function encryptPassword(loginName, password) {
  const pubKey = await myGetPubKey(loginName)
  // console.log('公钥:' + pubKey)
  if (typeof (pubKey) !== 'string') {
    // console.log("获取公钥失败！")
    return
  }
  // console.log(pubKey)
  var encrypt = new JSEncrypt()
  // console.log('new encrypt success')
  // 设置公钥
  encrypt.setPublicKey(pubKey)
  // console.log('初始密码:')
  // console.log(password)
  var hashPassword = getHashCode(password)
  // console.log('前端hash加密的密码为 ' + hashPassword)

  var encodeData = encrypt.encrypt(hashPassword)
  // console.log('加密后的: ' + encodeData)
  return encodeData
}
/*
 * 获取字符串的哈希值
 * @param {String} str
 * @return {string} hashCode
 */
export function getHashCode(str) {
  // 1315423911=b'1001110011001111100011010100111'
  var hash = 1315423911
  var i
  var ch
  for (i = str.length - 1; i >= 0; i--) {
    ch = str.charCodeAt(i)
    hash ^= (hash << 5) + ch + (hash >> 2)
  }
  return (hash & 0x7fffffff).toString()
}


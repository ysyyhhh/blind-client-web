import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { encryptPassword } from '@/utils/auth'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    user: {}// 用户信息
  }
}
const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER: (state, user) => {
    state.user = user
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { loginName, password } = userInfo
    var encodeData = await encryptPassword(loginName, password)
    return new Promise((resolve, reject) => {
      const loginData = { 'loginName': loginName.trim(), 'password': encodeURI(encodeData).replace(/\+/g, '%2B') }
      // console.log(loginData)
      login(loginData).then(response => {
        // console.log(response)
        commit('SET_TOKEN', response.data)
        setToken(response.data)
        resolve()
      }).catch(error => {
        // console.log(error)
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    // console.log('token ' + state.token)
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        // console.log(response)
        const data = response.data

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        delete data.password
        const name = data.username
        const avatar = data.userType
        // console.log(data)
        // 这里没有用原有的赋值方式，因为一是字段名不完全对应，二是roles必须是数组，而库里存的是个字符串 所以这里需要用split转一下
        const roles = data.userType.split(',')
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        // console.log('set user')
        // console.log(data)
        commit('SET_USER', data)
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    removeToken() // must remove  token  first
    resetRouter()
    commit('RESET_STATE')
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     removeToken() // must remove  token  first
    //     resetRouter()
    //     commit('RESET_STATE')
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


import Vue from 'vue'

import AMap from 'vue-amap'
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: 'ef2a5cacb68a466d5594a7162a7bb090',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation']
})
Vue.use(AMap)
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.clone = function(e) {
  return JSON.parse(JSON.stringify(e))
}
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

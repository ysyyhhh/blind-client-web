import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/obstacleDetail',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'obstacleDetail',
        component: () => import('@/views/obstacleDetail/index'),
        meta: { title: 'obstacleDetail', icon: 'form' }
      }
    ],
    hidden: true
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: { title: 'home', icon: 'user', noCache: true }
      }
    ],
    hidden: true
  },
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/index',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/profile/index'),
  //       name: 'Profile',
  //       meta: { title: 'Profile', icon: 'user', noCache: true }
  //     }
  //   ]
  // }
  {
    path: '/area',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'area',
        component: () => import('@/views/area/index'),
        meta: { title: 'area', icon: 'form' }
      }
    ]
    // hidden: true
  },
  {
    path: '/obstacle',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'obstacle',
        component: () => import('@/views/obstacle/index'),
        meta: { title: 'obstacle', icon: 'form' }
      }
    ]
    // hidden: true
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// 动态的路由 （最后通过 addRoutes 添加进去）
export const asyncRoutes = [
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'user',
        component: () => import('@/views/user/index'),
        meta: { title: 'user', icon: 'form', roles: ['admin'] }
      }
    ]
    // hidden: true
  },
  {
    path: '/dataSource',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'dataSource',
        component: () => import('@/views/dataSource/index'),
        meta: { title: 'dataSource', icon: 'form', roles: ['admin'] }
      }
    ]
    // hidden: true
  }
  // {
  //   path: '/user',
  //   component: Layout,
  //   redirect: '/user',
  //   name: 'adminRoute',
  //   meta: { title: '用户管理', icon: 'el-icon-s-help', roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table', roles: ['admin'] }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree', keepAlive: true, roles: ['admin'] }
  //     }
  //   ]
  // }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

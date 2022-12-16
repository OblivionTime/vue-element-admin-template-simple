/*
 * @Description: 
 * @Version: 1.0
 * @Autor: solid
 * @Date: 2022-05-17 12:45:40
 * @LastEditors: solid
 * @LastEditTime: 2022-12-14 12:05:04
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: { title: '登录', },
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: { title: '首页' },
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: { title: '首页' },
      },
    ]
  },
  {
    path: '/upload/',
    component: Layout,
    name: 'upload',
    meta: {
      title: '文件上传',
    },
    children: [
      {
        path: 'huobi',
        component: () => import('@/views/upload/huobi'),
        name: 'huobi_upload',
        meta: {
          title: '火币文件上传',
          icon: ''
        }
      },
      {
        path: 'bianance',
        component: () => import('@/views/upload/bianance'),
        name: 'bianance_upload',
        meta: {
          title: '币安文件上传',
          icon: ''
        }
      },
      {
        path: 'okex',
        component: () => import('@/views/upload/okex'),
        name: 'okex_upload',
        meta: {
          title: 'okex文件上传',
          icon: ''
        }
      },
    ]
  },
  {
    path: '/dataAnalysis/',
    component: Layout,
    name: 'dataAnalysis',
    meta: {
      title: '数据分析',
      icon: ''
    },
    children: [
      {
        path: 'originalTable',
        component: () => import('@/views/originalTable/index'),
        name: 'originalTable',
        meta: {
          title: '原始表',
          icon: ''
        }
      },
      {
        path: 'searchAddress',
        component: () => import('@/views/searchAddress/searchAddress'),
        name: 'searchAddress',
        meta: {
          title: '出入地址搜索',
          icon: ''
        }
      },{
        path: 'figureAnalysis',
        component: () => import('@/views/figureAnalysis/index'),
        name: 'figureAnalysis',
        meta: {
          title: '图分析',
          icon: ''
        }
      },
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true, meta: { title: '404' }, }
]

const createRouter = () => new Router({
  mode: 'hash', // require service support
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

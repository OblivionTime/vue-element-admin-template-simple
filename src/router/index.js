/*
 * @Description: 
 * @Version: 1.0
 * @Autor: solid
 * @Date: 2022-05-17 12:45:40
 * @LastEditors: solid
 * @LastEditTime: 2022-10-28 20:56:38
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
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
    meta: { title: '404' },
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
        component: () => import('@/views/Index/index'),
        meta: { title: '首页' },
      },
    ]
  },

  {
    path: '/list',
    component: Layout,
    meta: { title: '列表', icon: 'el-icon-tickets' },
    children: [
      {
        path: '/list/list1',
        name: 'list1',
        component: () => import('@/views/List/list'),
        meta: { title: '子列表', icon: 'stu-list' }
      },
      {
        path: '/list/list2',
        name: 'list2',
        component: () => import('@/views/List/list2'),
        meta: { title: '子列表2', icon: 'el-icon-tickets' }
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

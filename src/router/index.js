import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/shop',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/shop/index'),
        meta: { title: '找铺列表', icon: 'iconfont iconshop'},
      },
      {
        path: 'add',
        component: () => import('@/views/shop/add'),
        meta: { title: '转铺列表'},
        hidden: true
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/index/index'),
      meta: { title: '转铺列表', icon: 'iconfont iconsell'},
    },
    {
      path: 'add',
      component: () => import('@/views/index/add'),
      meta: { title: '新增转铺'},
      hidden: true
    }]
  },
  {
    path: '/teacher',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/teacher/index'),
        meta: { title: '入驻商家', icon: 'iconfont iconInto'},
      },
      {
        path: 'add',
        component: () => import('@/views/teacher/add'),
        meta: { title: '新增教练' },
        hidden: true
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/course/index'),
        meta: { title: '系统设置', icon: 'iconfont iconsetting'},
      },
      {
        path: 'add',
        component: () => import('@/views/course/add'),
        meta: { title: '新增课程' },
        hidden: true
      }
    ]
  },
  {
    path: '/notice',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/notice/index'),
        meta: { title: '公告管理', icon: 'iconfont icongonggao'}
      }
    ]
  },
  {
    path: '/carousel',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/carousel/index'),
        meta: { title: '轮播图管理', icon: 'iconfont iconlunbotu1-copy'},
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // { path: '*', redirect: '/404', hidden: true }
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

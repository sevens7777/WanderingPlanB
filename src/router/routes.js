// import store from '../store'

export default [
    {
        path: '/',
        component: () => import('../views/base'),
        redirect: '/tab/',
        children:[
            {
                path: 'tab',
                component: () => import('../views/tabbar'),
                name: 'tab',
                redirect: '/tab/home',
                children:[
                    {
                        path: 'home',
                        name: 'home',
                        component: () => import('../views/tabbar/home'),
                        meta:{
                            icon: 'home-o',
                            showBack: false, //是否显示返回箭头
                            auth: false
                        }
                    },
                    {
                      path: 'add',
                      name: 'Add',
                      component: () => import('@/views/tabbar/add'),
                      meta: {
                          icon: 'add-o',
                          showBack: false
                      }
                    },
                    {
                        path: 'me',
                        name: 'me',
                        component: () => import('../views/tabbar/me'),
                        meta:{
                            icon: 'user-circle-o',
                            showBack: false //是否显示返回箭头
                        }
                    }
                ]
            },
            {
                path: 'login',
                name: 'login',
                component: () => import('../views/login'),
                meta: {
                    auth: false
                }
            },
            {
                path: 'reg',
                name: 'reg',
                component: () => import('../views/reg'),
                meta: {
                    auth: false
                }
            },
            {
                path: 'success',
                name: 'Success',
                component: () => import('../views/success')
            },
            {
                path: 'search',
                name: 'Search',
                component: () => import('../views/search')
            },
            {
                path: 'detail',
                name: 'Detail',
                component: () => import('../views/detail'),
                meta: {
                    title: '书本详情',
                    backColor: '#ff0000',
                    titleColor: '#000'
                }
            },
            {
                path: 'edit',
                name: 'Edit',
                component: () => import('../views/edit'),
                meta: {
                    backColor: '#000'
                }
            }
        ]
    }
]

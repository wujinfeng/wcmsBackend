import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Index from '@/components/Index'
import Login from '@/components/Login'
import PostList from '@/components/post/PostList'
import PostAdd from '@/components/post/PostAdd'
import PostcatecoryList from '@/components/postcatecory/PostcatecoryList'
import PostcatecoryAdd from '@/components/postcatecory/PostcatecoryAdd'
import MediaList from '@/components/media/MediaList'
import MediaAdd from '@/components/media/MediaAdd'
import UserList from '@/components/user/UserList'
import UserAdd from '@/components/user/UserAdd'
import Password from '@/components/user/Password'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {path: '/login', name: 'Login', component: Login},
    {
      name: 'Main',
      path: '/',
      component: Main,
      children: [
        {path: '/index', name: 'Index', component: Index},
        // 博客
        {path: 'posts', name: 'PostList', component: PostList},
        {path: 'post/add', name: 'PostAdd', component: PostAdd},
        // 分类
        {path: 'postcatecorys', name: 'PostcatecoryList', component: PostcatecoryList},
        {path: 'postcatecory/add', name: 'PostcatecoryAdd', component: PostcatecoryAdd},
        // 媒体
        {path: 'medias', name: 'MediaList', component: MediaList},
        {path: 'media/add', name: 'MediaAdd', component: MediaAdd},
        // 用户
        {path: 'user', name: 'UserList', component: UserList},
        {path: 'user/password', name: 'Password', component: Password},
        {path: 'user/add', name: 'UserAdd', component: UserAdd}
      ]
    }
  ]
})

router.beforeEach(({name}, from, next) => {
  if (localStorage.getItem('token')) {
    if (name === 'Login') {
      next('/index')
    } else {
      next()
    }
  } else {
    if (name === 'Login') {
      next()
    } else {
      next({name: 'Login'})
    }
  }
})

export default router

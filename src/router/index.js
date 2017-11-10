import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import PostList from '@/components/PostList'
import PostAdd from '@/components/PostAdd'
import PostUpdate from '@/components/PostUpdate'
import PostcatecoryList from '@/components/PostcatecoryList'
import PostcatecoryAdd from '@/components/PostcatecoryAdd'
import PostcatecoryUpdate from '@/components/PostcatecoryUpdate'
import MediaList from '@/components/MediaList'
import MediaAdd from '@/components/MediaAdd'
import MediaUpdate from '@/components/MediaUpdate'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'Index', component: Index},
    {path: '/login', name: 'Login', component: Login},
    {path: '/logout', name: 'Logout', component: Logout},
    // 博客
    {path: '/posts', name: 'PostList', component: PostList},
    {path: '/post/add', name: 'PostAdd', component: PostAdd},
    {path: '/post/update/:id', name: 'PostUpdate', component: PostUpdate},
    {path: '/postcatecorys', name: 'PostcatecoryList', component: PostcatecoryList},
    // 分类
    {path: '/postcatecory/add', name: 'PostcatecoryAdd', component: PostcatecoryAdd},
    {path: '/postcatecory/update/:id', name: 'PostcatecoryUpdate', component: PostcatecoryUpdate},
    {path: '/medias', name: 'MediaList', component: MediaList},
    // 媒体
    {path: '/media/add', name: 'MediaAdd', component: MediaAdd},
    {path: '/media/update/:id', name: 'MediaUpdate', component: MediaUpdate}
  ]
})

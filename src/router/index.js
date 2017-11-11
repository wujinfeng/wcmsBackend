import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import PostList from '@/components/post/PostList'
import PostAdd from '@/components/post/PostAdd'
import PostcatecoryList from '@/components/postcatecory/PostcatecoryList'
import PostcatecoryAdd from '@/components/postcatecory/PostcatecoryAdd'
import MediaList from '@/components/media/MediaList'
import MediaAdd from '@/components/media/MediaAdd'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'Index', component: Index},
    {path: '/login', name: 'Login', component: Login},
    // 博客
    {path: '/posts', name: 'PostList', component: PostList},
    {path: '/post/add', name: 'PostAdd', component: PostAdd},
    // 分类
    {path: '/postcatecorys', name: 'PostcatecoryList', component: PostcatecoryList},
    {path: '/postcatecory/add', name: 'PostcatecoryAdd', component: PostcatecoryAdd},
    // 媒体
    {path: '/medias', name: 'MediaList', component: MediaList},
    {path: '/media/add', name: 'MediaAdd', component: MediaAdd}
  ]
})

import VueRouter from 'vue-router'

import Home from './components/tabbar/Home.vue'
import Member from './components/tabbar/Member.vue'
import Search from './components/tabbar/Search.vue'
import Shopcar from './components/tabbar/Shopcar.vue'
//新闻资讯
import NewsList from './components/news/newsList.vue'
import NewInfo from './components/news/newInfo.vue'
//图片分享
import PhotosList from './components/photos/photosList.vue'
import PhotoInfo from './components/photos/photoInfo.vue'
//商品购买
import GoodsList from './components/goods/goodsList.vue'
import GoodInfo from './components/goods/goodInfo.vue'
import GoodInfoDesc from './components/goods/goodInfoDesc.vue'
import GoodComment from './components/goods/goodComment.vue'

export default new VueRouter({
    linkActiveClass: 'mui-active',
    routes: [{
        path: '/',
        redirect: '/home'
    }, {
        path: '/home',
        component: Home
    }, {
        path: '/member',
        component: Member
    }, {
        path: '/search',
        component: Search
    }, {
        path: '/shopcar',
        component: Shopcar
    }, {
        path: '/home/newsList',
        component: NewsList
    }, {
        path: '/home/newsList/:id',
        component: NewInfo
    }, {
        path: '/home/photosList',
        component: PhotosList
    }, {
        path: '/home/photoInfo/:id',
        component: PhotoInfo
    }, {
        path: '/home/goodsList',
        component: GoodsList
    }, {
        path: '/home/goodInfo/:id',
        component: GoodInfo,
        name: 'goodInfo'
    }, {
        path: '/home/goodInfoDesc/:id',
        component: GoodInfoDesc,
        name: 'goodInfoDesc'
    }, {
        path: '/home/goodComment/:id',
        component: GoodComment,
        name: 'goodComment'
    }]
})
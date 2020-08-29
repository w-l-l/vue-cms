import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
Vue.use(VueRouter)

import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://api.cms.liulongbin.top/api'
Vue.http.options.emulateJSON = true

import App from './App.vue'
//mui
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
//公共样式
import './css/common.css'

// import { Header,Swipe,SwipeItem,Button,Lazyload } from 'mint-ui'
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name,Swipe)
// Vue.component(SwipeItem.name,SwipeItem)
// Vue.component(Button.name,Button)
// Vue.use(Lazyload);
//mint-ui
import MintUi from 'mint-ui'
Vue.use(MintUi)
import 'mint-ui/lib/style.css'
//缩略图
import VuePreview from 'vue-preview'
Vue.use(VuePreview, {
    mainClass: 'pswp--minimal--dark',
    barsSize: {top: 0, bottom: 0},
    captionEl: false,
    fullscreenEl: false,
    shareEl: false,
    bgOpacity: 0.85,
    tapToClose: true,
    tapToToggleControls: false
  })

import moment from 'moment'
Vue.filter('dateFormat', (date, format = 'YYYY-MM-DD HH:mm:ss') => moment(date).format(format))

new Vue({
    el: '#app',
    render: c => c(App),
    router
})
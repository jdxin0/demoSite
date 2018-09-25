import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/index'
import First from '@/pages/first/index'
import Second from '@/pages/second/index'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/home',
    name: 'HomePage',
    component: Home
  }, {
    path: '/first',
    name: 'FirstPage',
    component: First
  }, {
    path: '/second',
    name: 'SecondPage',
    component: Second
  }]
})

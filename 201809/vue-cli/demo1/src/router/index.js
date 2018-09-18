import Vue from 'vue'
import Router from 'vue-router'
import First from '@/pages/first/First'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: First
    }
  ]
})

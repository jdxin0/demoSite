import Vue from 'vue'
import Router from 'vue-router'
import EleUi from '@/components/EleUi'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EleUi',
      component: EleUi
    }
  ]
})

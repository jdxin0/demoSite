import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Index'
import First from '@/pages/first/Index'
import Second from '@/pages/second/Index'

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

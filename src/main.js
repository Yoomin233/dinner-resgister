import Vue from 'vue'
import register from './components/Register'
import order from './components/Order'
import table from './components/Table'
import orderedList from './components/subRoutes/orderedList'
import chatRoom from './components/subRoutes/chatRoom'
import foodMenu from './components/subRoutes/foodMenu'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
let App = Vue.extend({});
let router = new VueRouter({
	saveScrollPosition: true,
	transitionOnLoad: true
});
router.map({
	'/register':{
		component:register
	}, 
	'/order':{
		component:order,
		subRoutes: {
			'/': {
				component: chatRoom
			},
			'/orderedList':{
				component: orderedList
			},
			'/chatRoom':{
				component: chatRoom
			}, 
			'/foodMenu':{
				component:foodMenu
			}
		}
	},
	'table':{
		component:table
	},
	'/':{
		component:order
	}
})
router.start(App, '#app')

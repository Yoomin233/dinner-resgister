import Vue from 'vue'
import register from './components/Register'
import order from './components/Order'
import table from './components/Table'
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
		component:order
	},
	'table':{
		component:table
	}
})
router.start(App, '#app')
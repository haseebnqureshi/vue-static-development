'use strict';


/*===================
Deps		
====================*/

var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');


/*===================
Configuring Vue			
====================*/

Vue.use(VueRouter);
Vue.use(VueResource);


/*===================
Configuring Routes			
====================*/

var router = new VueRouter({
	routes: [
		{ 
			path: '/', 
			name: 'home', 
			component: require('./home.vue') 
		},
		{ 
			path: '/list', 
			name: 'list', 
			component: require('./list.vue'),
			// meta: { auth: true }
		},
		{
			path: '/list/:id', 
			name: 'list-item', 
			component: require('./list-item.vue'),
			// meta: { auth: true }
		}
	],
	scrollBehavior: function(to, from, savedPosition) {
		return savedPosition ? savedPosition : { x:0, y:0 };
	}
});


/*===================
Configuring Middleware			
====================*/

router.beforeEach(function(to, from, next) {
	if (to.meta.auth === true) {
		return next({ name: 'home' });
	}
	next();
});


/*===================
Instantiating Application			
====================*/

var app = new Vue({
	router,
	// data: {
	// 	message: 'Hello, from Vue!'
	// }
}).$mount('#app');



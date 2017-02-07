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
		{ path: '/', name: 'home', component: require('./home.vue') }
	]
});

// var router = new VueRouter({
// 	routes: [
// 		{ path: '/foo', name: 'foo', component: Components.Foo },
// 		{ path: '/bar', name: 'bar', component: Components.Bar },
// 		{ path: '/login', name: 'login', component: Components.Login },
// 		{ path: '/user/:id', name: 'user', component: Components.User,
// 			children: [
// 				{
// 					path: 'profile',
// 					component: Components.UserProfile
// 				},
// 				{
// 					path: 'account',
// 					component: Components.UserAccount,
// 					name: 'userAccount',
// 					meta: { requiresAuth: true }
// 				},
// 				{
// 					path: 'posts',
// 					component: Components.UserPosts
// 				}
// 			] 
// 		}
// 	],
// 	// mode: 'history',
// 	scrollBehavior: function(to, from, savedPosition) {
// 		return savedPosition ? savedPosition : { x:0, y:0 }
// 	}
// });


/*===================
Configuring Middleware			
====================*/

router.beforeEach(function(to, from, next) {
	console.log({ to, from, next });
	if (to.meta.requiresAuth === true) {
		next({
			name: 'login'
		});
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



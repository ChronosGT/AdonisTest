'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.group(() => {
  Route.delete(':id', 'ServiceController.remove')
  Route.post('create', 'ServiceController.create')
  Route.get('all', 'ServiceController.all')
}).prefix('services');

Route.group(() => {
  Route.post('login', 'UserController.login')
  Route.post('register', 'UserController.register')
  Route.get('info/:id', 'UserController.show')
}).prefix('users');

import Vue from 'vue'
import Router from 'vue-router'

import App from 'components/App'
import { running as apiIsRunning } from 'src/api'
import routes from 'src/routes'
import store from 'src/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // Only allow a route change if api
  // is not currently running/loading
  if (!apiIsRunning) next()
})

// eslint-disable-next-line no-new
new Vue({
  components: { App },
  el: '#app',
  router,
  store,
  template: '<App/>'
})

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children:[
      {
        path: '/nodeRegister',
        name: 'NodeRegister',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/NodeRegister.vue'),
        meta: {requireAuth: false}
      },
      {
        path: '/transfer',
        name: 'Transfer',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/Transfer.vue')
      },
      
      {
        path: '/block',
        name: 'BlockPage',
        component: () => import('../views/explorer/BlockDetails.vue')
      },
      {

        path: '/deposit',
        name: 'DepositPage',
        component: () => import('../views/Deposit.vue')
      },
      {
        path: '/Transaction',
        name: 'TxnPage',
        component: () => import('../views/explorer/TransactionDetails.vue')
      },


      {
        path: '/explorer',
        name: 'Explorer',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../components/Explorer.vue'),
        children: [
          {
            path: '/',
            name: 'ExplorerHome',
            component: () => import('../views/explorer/Home.vue')
          }
        ]
      },

    ]
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (Boolean(sessionStorage.getItem("uid"))) {
      next();
    } else {
      next({
        path: '/',
      })
    }
  } else {
    next();
  }
})

export default router

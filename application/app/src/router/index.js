import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
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

        path: '/deposit',
        name: 'DepositPage',
        component: () => import('../views/Deposit.vue')
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
            path: '',
            name: 'Explorer.Home',
            component: () => import('../views/explorer/Home.vue')
          },
          {
            path: 'block',
            name: 'Explorer.BlockDetails',
            component: () => import('../views/explorer/BlockDetails.vue')
          },
          {
            path: 'transaction',
            name: 'Explorer.TxDetails',
            component: () => import('../views/explorer/TransactionDetails.vue')
          },
        ]
      },

    ]
  },
  


]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./routes"

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let promise = Promise.resolve()
  promise
    .then(next)
    .catch(error => {
      console.error(error)
    })
})
export default router

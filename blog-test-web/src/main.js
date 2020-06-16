import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./router"
import fetch from "./fetch"
import App from "./App.vue"

Vue.config.productionTip = false

Vue.prototype.$fetch = fetch

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app")

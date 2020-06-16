import Index from "../components/Index.vue"
import Detail from "../components/Detail.vue"

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    component: Index,
  },
  {
    path: "/detail/:id",
    component: Detail,
  },
]

export default routes

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/todo',
    name: 'ToDoList',
    component: () => import('../views/toDoList.vue')
  }
]
export default routes

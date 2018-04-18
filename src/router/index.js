import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: function(resolve){
        require(['../views/login.vue'],resolve);
      },
    },
    {
      path: '/',
      component: Index,
      children:[
        {
          path: '/addBook',
          component: function(resolve){
            require(['../views/home/addBook.vue'],resolve);
          },
        },
        {
          path: '/allBook',
          component: function(resolve){
            require(['../views/home/allBook.vue'],resolve);
          },
        },
        {
          path: '/technologyBook',
          component: function(resolve){
            require(['../views/home/technologyBook.vue'],resolve);
          },
        },
        {
          path: '/managementBook',
          component: function(resolve){
            require(['../views/home/managementBook.vue'],resolve);
          },
        },
        {
          path: '/literatureBook',
          component: function(resolve){
            require(['../views/home/literatureBook.vue'],resolve);
          },
        },
        {
          path: '/economicsBook',
          component: function(resolve){
            require(['../views/home/economicsBook.vue'],resolve);
          },
        },
        {
          path: '/historyBook',
          component: function(resolve){
            require(['../views/home/historyBook.vue'],resolve);
          },
        },
        {
          path: '/classStatistic',
          component: function(resolve){
            require(['../views/home/classStatistic.vue'],resolve);
          },
        }
      ]
    },
  ]
})

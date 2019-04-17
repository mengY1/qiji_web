import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//路由配置
let router = new Router({
  routes: [
    //首页
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/pages/home/index.vue'], resolve),
    },
  ],
});
export default router;

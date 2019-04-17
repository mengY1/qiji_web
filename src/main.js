// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import '../theme/index.css';
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/icon/iconfont.css'
//引用rem配置
import "@/config/rem";
Vue.config.productionTip = false
Vue.use(MuseUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
Vue.use(ElementUI)

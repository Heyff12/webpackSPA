// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/' //状态管理参数

Vue.config.productionTip = false
//本地模拟数据-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
import '../mock/global'
//ajax请求通用---------------------------------------------------------------------------------------------
import ajax_axios from "./util/ajax_axios"
Vue.prototype.$ajax_axios = ajax_axios //设置ajax请求全局变量
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>'
  render: h => h(App),
  mounted() {
    // You'll need this for renderAfterDocumentEvent.
    document.dispatchEvent(new Event('render-event'))
  }
})

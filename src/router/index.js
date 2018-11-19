import Vue from 'vue'
import Router from 'vue-router'

// 进度条
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false });  
import 'nprogress/nprogress.css'

// 权限 排除页面
import jurisdictionExclude from './jurisdictionExclude'
// 所有 页面 router
import pages from './pages'

if(process.env.NODE_ENV === 'development') {
  Vue.use(Router);
}

let router = new Router({
  routes: pages,
});

/* 前置钩子 */
router.beforeEach((to, from, next) => {
  // 返回顶部
  window.scrollTo(0, 0);
  NProgress.start();
  
  // 用户超时 拦截

  // 权限判断 start
    // 环境 判断
  if(process.env.NODE_ENV === 'development') {
    next();
    // 不需要权限 页面
  }else if(jurisdictionExclude.indexOf(to.path) !== -1) {
    next();
  }else{
    next();
    // 权限拦截
  }
  // 权限判断 end
});

/* 后置钩子 */
router.afterEach((to, from) => {
  NProgress.done();
});

export default router

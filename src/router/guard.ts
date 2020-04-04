import router from './index';
import { checkIsLogin } from '@/composition/login-ctx';

router.beforeEach((to, from , next) => {
  const isLogin = checkIsLogin();
  if (!isLogin && to.path !== '/login') {
    next('/login');
    return;
  }

  next();
})
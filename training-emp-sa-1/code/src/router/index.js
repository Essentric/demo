import Vue from 'vue';
import Router from 'vue-router';
import Admin from '@/views/Admin';
import User from '@/views/user';
import Login from '@/views/adminController/Login';
import Main from '@/views/adminController/Main';
import Answer from '@/views/userController/Answer';
import login from '@/views/userController/Login';
import result from '@/views/userController/answerController/Result';
import details from '@/views/userController/answerController/details';
import apiTest from '@/views/apiTest';
import surveyInfo from '@/views/adminController/mainInfoController/surveyInfo';
import summaryInfo from '@/views/adminController/mainInfoController/summaryInfo';
import personSummary from '@/views/adminController/mainInfoController/personSummaryController/personSummary';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/', //  默认进入路由
      redirect: 'user/login', //  重定向
    }, {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      redirect: { name: 'Login' },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login,
        }, {
          path: 'Main',
          name: 'Main',
          component: Main,
          redirect: { name: 'surveyInfo' },
          children: [
            {
              path: 'surveyInfo',
              name: 'surveyInfo',
              component: surveyInfo,
            }, {
              path: 'summaryInfo',
              name: 'summaryInfo',
              component: summaryInfo,
            },
          ],
        }, {
          path: 'personSummary',
          name: 'personSummary',
          component: personSummary,
        },
      ],
    }, {
      path: '/test',
      name: 'apiTest',
      component: apiTest,
    }, {
      path: '/user',
      name: 'user',
      component: User,
      children: [
        {
          path: 'Answer',
          name: 'Answer',
          component: Answer,
          redirect: { name: 'details' },
          children: [
            {
              path: 'details',
              name: 'details',
              component: details,
            }, {
              path: 'result',
              name: 'result',
              component: result,
            },
          ],
        }, {
          path: 'login',
          name: 'login',
          component: login,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAdminLogin = localStorage.getItem('authorization') !== '' && localStorage.getItem('authorization') !== null;
  const isUserLogin = localStorage.getItem('userName') !== '' && localStorage.getItem('userName') !== null;
  // const nextRoute = ['Admin', 'Login', 'Main', 'surveyInfo', 'user', 'Answer'];
  if (to.name !== 'login' && to.name !== 'Login') { //  如果输入的路径不是登录页
    if (!isAdminLogin && !isUserLogin) { //  如果用户、管理员都没有登录
      router.push({ name: 'login' }); //  重定向至用户登录页
    } else if (!isAdminLogin && isUserLogin) { //  如果用户登录，管理员没有登录
      if (to.path.substr(0, 7) === '/admin/') { //  如果用户进入管理员界面
        router.push({ name: 'login' }); //  重定向至用户登录页
      }
    } else if (isAdminLogin && !isUserLogin) { //  如果管理员登录，用户没有登录
      if (to.path.substr(0, 6) === '/user/') { //  如果管理员进入用户界面
        router.push({ name: 'login' }); //  重定向至用户登录页
      }
    }
  }
  next();
});

export default router;

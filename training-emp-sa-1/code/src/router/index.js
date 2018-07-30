import Vue from 'vue';
import Router from 'vue-router';
import login from '@/views/login';
import result from '@/views/result';
import index from '@/views/index';
import details from '@/views/details';
import surveyInfo from '@/views/surveyInfo';
import summaryInfo from '@/views/summaryInfo';
import personSummary from '@/views/personSummary';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/', //  默认进入路由
      redirect: { name: 'userLogin' }, //  重定向
    }, { path: '/admin/login', name: 'adminLogin', component: login },
    { path: '/user/login', name: 'userLogin', component: login },
    {
      path: '/personsummary',
      name: 'personSummary',
      component: personSummary,
    }, {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: '/admin/surveyinfo',
        name: 'surveyInfo',
        component: surveyInfo,
      }, {
        path: '/admin/summaryinfo',
        name: 'summaryInfo',
        component: summaryInfo,
      }, {
        path: '/user/details',
        name: 'details',
        component: details,
      }, {
        path: '/user/result',
        name: 'result',
        component: result,
      }],
    },
  ],
});

export default router;

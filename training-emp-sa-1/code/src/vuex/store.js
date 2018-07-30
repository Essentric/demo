import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import summaryData from '@/utils/getTableData';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    authorization: '',
    adminName: '',
    summaryData: [],
    layoutMenuIndex: ['1'], // 管理员layout菜单默认展开的index
    loading: false, // 页面加载遮罩
    surveyPage: {
      currentPage: 1,
      pageSize: 5,
    }, //  问卷信息页分页信息
    summaryPage: {
      currentPage: 1,
      pageSize: 5,
      loading: false,
    },
    count: 0, //  计数变量，统计递归的次数
  },
  mutations: {
    changeAuthorization(state, newToken) {
      localStorage.setItem('authorization', newToken);//  token存入localstorage
      state.authorization = newToken;
    },
    changeAdminName(state, adminName) {
      localStorage.setItem('adminName', adminName);//  用户名存入localstorage
      state.adminName = adminName;
    },
    getSummaryData(state, data) {
      localStorage.setItem('summaryData', JSON.stringify(data));//  用户名存入localstorage
      state.summaryData = data;
    },
    changeSurveyPage(state, pageData) {
      state.surveyPage[Object.keys(pageData)] = pageData[Object.keys(pageData)];
    },
    changeSummaryPage(state, pageData) {
      state.summaryPage[Object.keys(pageData)] = pageData[Object.keys(pageData)];
    },
    changeLayoutMenuIndex(state, layoutMenuIndex) {
      state.layoutMenuIndex = layoutMenuIndex;
    },
    changeLoading(state) {
      state.loading = !state.loading;
    },
    changeSummaryLoading(state, flag) {
      state.summaryPage.loading = flag;
    },
  },
  actions: {
    changeAuthorization({ commit }, newToken) {
      localStorage.setItem('authorization', newToken);
      commit('changeAuthorization', newToken);
    },
    changeAdminName({ commit }, adminName) {
      localStorage.setItem('adminName', adminName);
      commit('changeAdminName', adminName);
    },
    getSummaryData({ dispatch, commit }, params) {
      commit('changeSummaryLoading', true);
      const token = this.getters.authorization;
      axios.get('api/survey/summary', {
        headers: {
          Authorization: `Bearer${token}`,
        },
        params: params ? {
          'where[][survey_id]': params.survey_id,
        } : {},
      }).then((res) => { //  token可以使用，即获取数据后传递给mutation
        commit('getSummaryData', res.data);
        commit('changeSummaryLoading', false);
      }).catch(() => {
        //  token已过期或不存在
        // console.log('刷新token');
        if (this.state.count < 1) {
          axios.post('api/refresh-token', {}, {
            headers: {
              Authorization: `Bearer${token}`,
            },
          }).then((res) => {
            commit('changeAuthorization', res.headers.authorization);
            return dispatch('getSummaryData', params);
          }).catch(() => {
            //  token已过期且不可再刷新
          });
          this.state.count += 1;
        }
        commit('changeSummaryLoading', false);
      });
    },
  },
  getters: {
    authorization(state) {
      let getData;
      if (state.authorization !== '') {
        getData = state.authorization;
      } else {
        getData = localStorage.getItem('authorization');
      }
      return getData;
    },
    adminName(state) {
      let adminName;
      if (state.adminName !== '') {
        adminName = state.adminName;
      } else {
        adminName = localStorage.getItem('adminName');
      }
      return adminName;
    },
    summaryData(state) {
      let summaryDataInfo;
      if (state.summaryData.length !== 0) {
        summaryDataInfo = state.summaryData;
      } else {
        summaryDataInfo = JSON.parse(localStorage.getItem('summaryData')) || [];
      }
      return summaryData(summaryDataInfo);
    },
  },
});

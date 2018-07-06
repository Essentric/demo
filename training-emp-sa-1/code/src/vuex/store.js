import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import getScore from '@/utils/getScore';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    authorization: '',
    adminName: '',
    summaryData: [],
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
  },
  actions: {
    changeAuthorization({ commit }, newToken) {
      commit('changeAuthorization', newToken);
    },
    changeAdminName({ commit }, adminName) {
      commit('changeAdminName', adminName);
    },
    getSummaryData({ dispatch, commit }) {
      const token = this.getters.authorization;
      axios.get('api/survey/summary', {
        headers: {
          Authorization: `Bearer${token}`,
        },
      }).then((res) => { //  token可以使用，即获取数据后传递给mutation
        commit('getSummaryData', res.data);
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
            return dispatch('getSummaryData');
          }).catch(() => {
            //  token已过期且不可再刷新
          });
          this.state.count += 1;
        }
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
        summaryDataInfo = JSON.parse(localStorage.getItem('summaryData'));
      }
      const summaryData = new Map(); //  Map将拿回来的数据按同一个id归类
      const arr = [];
      summaryDataInfo.forEach((element) => {
        summaryData.set(element.staff_id, []);
      });
      summaryDataInfo.forEach((element) => {
        summaryData.get(element.staff_id).push({
          code: element.code,
          score: element.score,
          staff: element.staff,
          survey: element.survey,
        });
      });
      summaryData.forEach((value, key) => { //  将Map里的数据按照el-table的数据格式存储
        const summaryTableData = {};
        summaryTableData.scoreSum = [];
        value.forEach((element) => {
          summaryTableData.id = key;
          const scoreSum = getScore.getScoreSum(element.code, element.score);
          const sumObj = getScore.getEvaluation(element.code, scoreSum);
          summaryTableData[element.code] = element.score - 0;
          summaryTableData.staff_id = element.staff.id;
          summaryTableData.name = element.staff.name;
          summaryTableData.sex = element.staff.sex;
          summaryTableData.staff_no = element.staff.staff_no;
          summaryTableData.desc = element.survey.desc;
          summaryTableData.survey_id = element.survey.id;
          summaryTableData.survey_name = element.survey.name;
          summaryTableData.show = element.survey.show;
          summaryTableData.scoreSum.push(sumObj);
        });
        arr.push(summaryTableData);
      });
      return arr;
    },
  },
});

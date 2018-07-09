import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    personData: [{
      loginName: 'essentric',
      userName: '胖哥',
      post: '董事长',
      tel: '18271804115',
      password: '123',
      roleList: []
    }, {
      loginName: 'test1',
      userName: '始祖鸟',
      post: '总经理',
      tel: '18271804115',
      password: '123',
      roleList: []
    }, {
      loginName: 'test2',
      userName: '始祖鸟',
      post: '技术总监',
      tel: '18271804115',
      password: '123',
      roleList: []
    }, {
      loginName: 'test3',
      userName: '始祖鸟',
      post: '项目经理',
      tel: '18271804115',
      password: '123',
      roleList: []
    }],
    form: {
      loginName: '',
      userName: '',
      password: '',
      tel: '',
      post: '',
      roleList: []
    },
    title: '',
    dialogFormVisible: false,
    flag: '',
    index: '',
    field: ''
  },
  mutations: {
    // 切换与新增、编辑相关的状态
    toggleDialogValue (state, payload) {
      if (payload.index !== 'undefind') {
        state.index = payload.index
      }
      state.dialogFormVisible = payload.dialogValue
      state.title = payload.title
      state.flag = payload.flag
    },
    // 新增
    addPerson (state, newPerson) {
      state.personData.push(JSON.parse(newPerson))
    },
    // 删除
    deletePerson (state, index) {
      state.personData.splice(index, 1)
    },
    // 编辑
    editPerson (state) {
      const form = JSON.stringify(state.personData[state.index])
      state.form = JSON.parse(form)
    },
    clearForm (state, payload) {
      state.form = JSON.parse(payload.data)
    },
    // 提交
    commitEdit (state, payload) {
      state.personData[state.index] = JSON.parse(payload.data)
    },
    // 查找
    setField (state, value) {
      state.field = value
    }
  }
})

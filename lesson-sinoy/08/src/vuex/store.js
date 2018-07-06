import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    personData: [{
      id: 1,
      loginName: 'essentric',
      userName: '胖哥',
      post: '董事长',
      tel: '18271804115',
      password: '123',
      roleList: []
    }, {
      id: 2,
      loginName: 'excellent',
      userName: '胖爷',
      post: '总经理',
      tel: '18271804115',
      password: '123',
      roleList: []
    }, {
      id: 3,
      loginName: 'enemy',
      userName: '胖子',
      post: '技术总监',
      tel: '18271804115',
      password: '123',
      roleList: []
    }, {
      id: 4,
      loginName: 'test3',
      userName: '始祖鸟',
      post: '项目经理',
      tel: '18271804115',
      password: '123',
      roleList: []
    }],
    form: {
      id: '',
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
    id: '',
    field: ''
  },
  getters: {
    filterPerson: (state) => {
      const arr = []
      for (const person of state.personData) {
        if (state.field === '') {
          return state.personData
        }
        if (person.userName === state.field) {
          arr.push(person)
        }
      }
      return arr
    },
    setForm: (state, getters) => {
      for (const person of getters.filterPerson) {
        if (person.id === state.id) {
          state.form = person
        }
      }
      return state.form
    }
  },
  mutations: {
    // 切换与新增、编辑相关的状态
    toggleDialogValue (state, payload) {
      if (payload.id !== 'undefind') {
        state.id = payload.id
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
    deletePerson (state, id) {
      state.personData.forEach((person, index) => {
        if (person.id === id) {
          state.personData.splice(index, 1)
        }
      })
    },
    // 编辑
    editPerson (state) {
      const form = JSON.stringify(state.personData[state.id])
      state.form = JSON.parse(form)
    },
    // 清空表单数据
    clearForm (state, payload) {
      state.form = JSON.parse(payload.data)
    },
    // 提交
    commitEdit (state, payload) {
      state.personData[state.id] = JSON.parse(payload.data)
    },
    // 设置查找字段
    setField (state, payload) {
      state.field = payload
    },
    handleSearch (state) {
      console.log(state.field)
    }
  }
})

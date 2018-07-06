import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    personData: [{
<<<<<<< HEAD
      id: 1,
=======
>>>>>>> daf93dd0e625c78ded9fe7dff85b01ea5d2a5a80
      loginName: 'essentric',
      userName: '胖哥',
      post: '董事长',
      tel: '18271804115',
      password: '123',
      roleList: []
    }, {
<<<<<<< HEAD
      id: 2,
      loginName: 'excellent',
      userName: '胖爷',
=======
      loginName: 'test1',
      userName: '始祖鸟',
>>>>>>> daf93dd0e625c78ded9fe7dff85b01ea5d2a5a80
      post: '总经理',
      tel: '18271804115',
      password: '123',
      roleList: []
    }, {
<<<<<<< HEAD
      id: 3,
      loginName: 'enemy',
      userName: '胖子',
=======
      loginName: 'test2',
      userName: '始祖鸟',
>>>>>>> daf93dd0e625c78ded9fe7dff85b01ea5d2a5a80
      post: '技术总监',
      tel: '18271804115',
      password: '123',
      roleList: []
    }, {
<<<<<<< HEAD
      id: 4,
=======
>>>>>>> daf93dd0e625c78ded9fe7dff85b01ea5d2a5a80
      loginName: 'test3',
      userName: '始祖鸟',
      post: '项目经理',
      tel: '18271804115',
      password: '123',
      roleList: []
    }],
    form: {
<<<<<<< HEAD
      id: '',
=======
>>>>>>> daf93dd0e625c78ded9fe7dff85b01ea5d2a5a80
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
<<<<<<< HEAD
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
      getters.filterPerson.some((person) => {
        if (person.id === state.id) {
          state.form = person
          return state.form
        }
      })
      return state.form
    }
  },
  mutations: {
    // 切换与新增、编辑相关的状态
    toggleDialogValue (state, payload) {
      if (payload.id !== 'undefind') {
        state.id = payload.id
=======
    index: '',
    field: ''
  },
  mutations: {
    // 切换与新增、编辑相关的状态
    toggleDialogValue (state, payload) {
      if (payload.index !== 'undefind') {
        state.index = payload.index
>>>>>>> daf93dd0e625c78ded9fe7dff85b01ea5d2a5a80
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
<<<<<<< HEAD
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
=======
    deletePerson (state, index) {
      state.personData.splice(index, 1)
    },
    // 编辑
    editPerson (state) {
      const form = JSON.stringify(state.personData[state.index])
      state.form = JSON.parse(form)
    },
>>>>>>> daf93dd0e625c78ded9fe7dff85b01ea5d2a5a80
    clearForm (state, payload) {
      state.form = JSON.parse(payload.data)
    },
    // 提交
    commitEdit (state, payload) {
<<<<<<< HEAD
      state.personData[state.id] = JSON.parse(payload.data)
    },
    // 设置查找字段
    setField (state, payload) {
      state.field = payload
=======
      state.personData[state.index] = JSON.parse(payload.data)
    },
    // 查找
    setField (state, value) {
      state.field = value
>>>>>>> daf93dd0e625c78ded9fe7dff85b01ea5d2a5a80
    }
  }
})

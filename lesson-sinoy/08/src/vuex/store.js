import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    personData: [{
      id: 1,
      loginName: 'essentric',
      userName: '大娃',
      post: '董事长',
      tel: '18271804115',
      password: '123',
      roleList: []
    }, {
      id: 2,
      loginName: '孙行者',
      userName: '二娃',
      post: '总经理',
      tel: '18271804115',
      password: '123',
      roleList: []
    }, {
      id: 3,
      loginName: '猪悟能',
      userName: '三娃',
      post: '技术总监',
      tel: '18271804115',
      password: '123',
      roleList: []
    }, {
      id: 4,
      loginName: '沙悟净',
      userName: '四娃',
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
    id: '',
    field: ''
  },
  getters: {
    filterPersonData: (state) => {
      if (state.field !== '') {
        const personData = state.personData.filter(ele => ele.userName === state.field)
        return personData
      } else {
        return state.personData
      }
    }
  },
  mutations: {
    // 切换与新增、编辑相关的状态
    toggleDialogValue (state, payload) {
      const data = JSON.parse(payload)
      state.id = data.id
      state.dialogFormVisible = data.dialogValue
      state.title = data.title
      state.flag = data.flag
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
    editPerson (state, payload) {
      const person = JSON.stringify(state.personData.find((person) => {
        return person.id === state.id
      }))
      if (person) {
        state.form = JSON.parse(person)
      } else {
        state.form = {
          loginName: '',
          userName: '',
          password: '',
          tel: '',
          post: '',
          roleList: []
        }
      }
    },
    clearForm (state, payload) {
      state.form = JSON.parse(payload.data)
    },
    // 提交
    commitEdit (state, payload) {
      let person = state.personData.find((ele) => {
        return ele.id === state.id
      })
      for (const key in person) {
        person[key] = JSON.parse(payload)[key]
      }
    },
    // 查找
    setField (state, payload) {
      state.field = payload
    }
  }
})

<template>
  <el-dialog
  :visible.sync=$store.state.dialogFormVisible
  :fullscreen="true" width="40%"
  :close-on-click-modal=false>
    <template slot="title">{{$store.state.title}}</template>
    <el-form :model="getForm" ref="getForm">
      <el-form-item label="登录名" prop="loginName"
      :rules="{ required: true, message: '登录名不能为空', trigger: 'blur'}"
      :label-width="formLabelWidth">
        <el-input v-model="getForm.loginName" placeholder="用户登录时的用户名"></el-input>
      </el-form-item>
      <el-form-item label="用户姓名" prop="userName"
      :rules="{ required: true, message: '用户姓名不能为空', trigger: 'blur'}"
      :label-width="formLabelWidth">
        <el-input v-model="getForm.userName" placeholder="用户的真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-show="$store.state.flag === 'add'"
      :rules="{ required: true, message: '密码不能为空', trigger: 'blur'}"
      :label-width="formLabelWidth">
        <el-input type="password" v-model="getForm.password" placeholder="用户登录时的密码"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="tel"
      :label-width="formLabelWidth">
        <el-input v-model.number="getForm.tel" placeholder="用户的联系号码,会用来接收短信"></el-input>
      </el-form-item>
      <el-form-item label="职位" :label-width="formLabelWidth">
        <el-input v-model="getForm.post"></el-input>
      </el-form-item>
      <el-form-item label="用户角色" :label-width="formLabelWidth">
        <el-checkbox-group
        v-model="getForm.roleList">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="warning" style="float:left" @click="reset">重置</el-button>
      <el-button @click="handleCancle">取 消</el-button>
      <el-button type="primary" @click="handleSure(getForm)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'operateDialog',
  data () {
    return {
      formLabelWidth: '100px',
      cities: ['管理员', '技术专家', '运维工程师', '审核人员', '任务分配']
    }
  },
  computed: {
    getForm: function () {
      return this.$store.state.form
    }
  },
  methods: {
    reset () {
      this.$store.commit('clearForm', {data: JSON.stringify({
        loginName: '',
        userName: '',
        password: '',
        tel: '',
        post: '',
        roleList: []
      })})
      this.$refs.getForm.resetFields()
    },
    handleCancle () {
      this.$store.commit('toggleDialogValue', false)
    },
    handleSure (formName) {
      this.$refs.getForm.validate((valid) => {
        if (valid) {
          if (this.$store.state.flag === 'add') {
            this.$store.commit('addPerson', JSON.stringify(formName))
            this.$message({
              type: 'success',
              message: '成功新增用户!'
            })
            this.$store.commit('toggleDialogValue', false)
          } else if (this.$store.state.flag === 'edit') {
            console.log(formName)
            this.$store.commit('commitEdit', JSON.stringify(formName))
            this.$message({
              type: 'success',
              message: '成功编辑用户!'
            })
            this.$store.commit('toggleDialogValue', false)
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>
  .el-dialog {
    position: fixed;
    right: 0;
    text-align: left;
  }
</style>

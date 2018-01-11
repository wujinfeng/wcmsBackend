<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="原密码" prop="oldpassword">
      <el-input v-model="ruleForm.oldpassword" type="password" class="oldpassword"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newpassword">
      <el-input v-model="ruleForm.newpassword" type="password" class="newpassword"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="renewpassword">
      <el-input v-model="ruleForm.renewpassword" type="password" class="renewpassword"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'UserAdd',
    data () {
      var checkOldPasswd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('原密码不能为空'))
        }
        let that = this
        let params = {
          id: that.id || '',
          password: that.ruleForm.oldpassword
        }
        let url = '/admin/user/oldpassword'
        that.$axios.post(url, params).then(function (res) {
          if (res.status === 200 && res.data.code === 200) {
            callback()
          } else if (res.status === 200 && res.data.code === 400) {
            callback(new Error('原密码错误'))
          } else {
            callback(new Error('服务器错误'))
          }
        }).catch(function (err) {
          callback(err)
        })
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.renewpassword !== '') {
            this.$refs.ruleForm.validateField('renewpassword')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm.newpassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        ruleForm: {
          oldpassword: '',
          newpassword: '',
          renewpassword: ''
        },
        rules: {
          oldpassword: [
             { validator: checkOldPasswd, required: true, trigger: 'blur' }
          ],
          newpassword: [
            {required: true, min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'},
            { validator: validatePass, trigger: 'blur' }
          ],
          renewpassword: [
            {required: true, min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'},
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        id: ''
      }
    },
    beforeMount () {
      this.id = this.$route.params._id
    },
    methods: {
      submitForm (formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let form = {
              id: that.id || '',
              password: that.ruleForm.newpassword
            }
            let url = '/admin/user/newpassword'
            that.$axios.post(url, form).then(function (res) {
              if (res.status === 200 && res.data.code === 200) {
                that.$message({type: 'success', message: '保存成功'})
                // that.$router.push({name: 'UserList'}) // 跳转列表页
              } else {
                that.$message({type: 'error', message: '保存失败'})
              }
            }).catch(function (err) {
              console.log('查询err:')
              console.log(err)
              that.$message({type: 'error', message: '保存失败'})
            })
          } else {
            that.$message({type: 'error', message: '保存失败'})
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-form {
    max-width: 500px;
  }
</style>

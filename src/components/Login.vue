<template>
  <el-card class="box-card">
    <p class="title">后台管理</p>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" type="username" class="username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" class="password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import * as types from '@/store/mutations-types'
  export default {
    name: 'UserAdd',
    data () {
      return {
        ruleForm: {
          username: '',
          password: '',
          token: ''
        },
        rules: {
          username: [
            {required: true, message: '请填写用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let form = {
              username: that.ruleForm.username,
              password: that.ruleForm.password
            }
            let url = '/admin/login'
            that.$axios.post(url, form).then(function (res) {
              if (res.status === 200 && res.data.code === 200) {
                that.$message({type: 'success', message: '登录成功'})
                that.$store.commit(types.LOGIN, res.data.data)
                that.$router.push({name: 'Index'})  // 跳转首页
              } else {
                that.$message({type: 'error', message: '登录失败'})
              }
            }).catch(function (err) {
              console.log('查询err:')
              console.log(err)
              that.$message({type: 'error', message: '登录失败'})
            })
          } else {
            that.$message({type: 'error', message: '登录失败'})
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
  .box-card {
    max-width: 500px;
    margin: 80px auto;
  }
  .title {
    text-align: center;
    font-size: 18px;
  }
  .el-form {
    max-width: 400px;
    margin: 40px auto;
  }
</style>

<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" class="username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password" class="password"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="ruleForm.name" class="name"></el-input>
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model.number="ruleForm.mobile" class="mobile"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email" class="email"></el-input>
    </el-form-item>
    <el-form-item label="角色" prop="role">
      <el-select v-model="ruleForm.role" placeholder="">
        <el-option
          v-for="item in optionsRole"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="头像" prop="image">
      <el-input v-model="ruleForm.image" class="image" placeholder="头像地址"></el-input>
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
      return {
        ruleForm: {
          username: '',
          password: '',
          name: '',
          mobile: '',
          email: '',
          role: '',
          image: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ],
          mobile: [
            {required: false, message: '请输入手机号', trigger: 'change'}
          ],
          email: [
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
          ],
          role: [
            {required: true, message: '请输入角色', trigger: 'blur'}
          ]
        },
        id: '',
        optionsRole: [{
          value: 'admin',
          label: '管理员'
        }]
      }
    },
    beforeMount () {
      let that = this
      that.id = that.$route.params._id
      if (that.id) {
        that.$axios.get('/api/admin/user/get/' + that.id).then(function (res) {
          if (res.status === 200 && res.data.code === 200) {
            that.ruleForm = res.data.data
          }
        })
      }
    },
    methods: {
      submitForm (formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let form = {
              id: that.id || '',
              username: that.ruleForm.username,
              password: that.ruleForm.password,
              name: that.ruleForm.name,
              mobile: that.ruleForm.mobile,
              email: that.ruleForm.email,
              role: that.ruleForm.role,
              image: that.ruleForm.image
            }
            console.log(form)
            let url = '/api/admin/user/add'
            if (this.id) {
              url = '/api/admin/user/update'
            }
            that.$axios.post(url, form).then(function (res) {
              if (res.status === 200 && res.data.code === 200) {
                that.$message({type: 'success', message: '添加成功'})
                that.$router.push({name: 'UserList'}) // 跳转列表页
              } else {
                that.$message({type: 'error', message: '添加失败'})
              }
            }).catch(function (err) {
              console.log('查询err:')
              console.log(err)
              that.$message({type: 'error', message: '添加失败'})
            })
          } else {
            that.$message({type: 'error', message: '提交失败'})
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
    max-width: 450px;
  }
</style>

<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="原密码" prop="password">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newpassword">
      <el-input type="text" v-model="ruleForm.newpassword"></el-input>
    </el-form-item>
    <el-form-item label="再次输入" prop="newpassword2">
      <el-input v-model="ruleForm.newpassword2"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'PostAdd',
    data () {
      return {
        ruleForm: {
          id: '',
          password: '',
          newpassword: '',
          newpassword2: ''
        },
        rules: {
          password: [
            {required: true, message: '请输入标题', trigger: 'blur'},
            {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'}
          ],
          newpassword: [
            {required: true, message: '请输入内容', trigger: 'blur'},
            {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'}
          ],
          newpassword2: [
            {required: true, message: '请输入内容', trigger: 'blur'},
            {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    beforeMount () {
      this.id = this.$route.params._id
      console.log(this.id)
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let form = {
              id: this.ruleForm.id,
              password: this.ruleForm.password,
              newpassword: this.ruleForm.newpassword,
              newpassword2: this.ruleForm.newpassword2
            }
            console.log(form)
            let url = '/admin/post/add'
            let that = this
            that.$axios.post(url, form).then(function (res) {
              console.log(`查询ok`)
              if (res.status === 200 && res.data.status === 200) {
                alert('添加成功')
              } else {
                alert('添加失败')
              }
            }).catch(function (err) {
              console.log(`查询err: ${err}`)
              console.log(err)
              alert('失败')
            })
          } else {
            console.log('error submit!!')
            return false
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
</style>

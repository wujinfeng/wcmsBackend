<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="分类" prop="name">
      <el-input v-model="ruleForm.name" class="name"></el-input>
    </el-form-item>
    <el-form-item label="父分类" prop="fatherName">
      <el-cascader
        :options="options"
        v-model="ruleForm.fatherName"
        :show-all-levels="false"
        expand-trigger="hover"
        clearable=true
        change-on-select></el-cascader>
    </el-form-item>
    <el-form-item label="描述" prop="brief">
      <el-input type="textarea" v-model="ruleForm.brief" class="brief"></el-input>
    </el-form-item>
    <el-form-item label="图片" prop="image">
      <el-input v-model="ruleForm.image" class="image" placeholder="图片目录地址"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'PostcatecoryAdd',
  data () {
    return {
      ruleForm: {
        id: '',
        name: '',
        fatherName: '',
        brief: '',
        image: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入标题', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ]
      },
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [ {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }]
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
            name: this.ruleForm.name,
            fatherName: this.ruleForm.fatherName,
            brief: this.ruleForm.brief,
            image: this.ruleForm.image
          }
          console.log(form)
          let url = '/api/admin/postcatecory/add'
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
            alert('添加失败')
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

.name, .brief, .image {
  max-width: 500px;
}
</style>

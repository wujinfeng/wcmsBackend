<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="分类" prop="name">
      <el-input v-model="ruleForm.name" class="name"></el-input>
    </el-form-item>
    <el-form-item label="父分类" prop="parentId">
      <el-tree
        :props="props"
        :load="loadNode"
        node-key="_id"
        ref="tree"
        lazy
        check-strictly
        show-checkbox>
      </el-tree>
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
        name: '',
        brief: '',
        image: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入标题', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ]
      },
      props: {
        label: 'name',
        children: 'childrenArr',
        isLeaf: 'leaf'
      },
      id: '',
      options: [],
      lastCatecory: ''
    }
  },
  beforeMount () {
    this.id = this.$route.params._id
    let that = this
    console.log(this.id)
    if (that.id) {
      that.$axios.get('/api/admin/postcategory/get/' + this.id).then(function (res) {
        if (res.status === 200 && res.data.code === 200) {
          console.log(res.data.data)
          that.ruleForm = res.data.data
          that.$refs.tree.setCheckedKeys(res.data.data.parentId)
        }
      })
    }
  },
  methods: {
    submitForm (formName) {
      let that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          let form = {
            id: that.id,
            name: that.ruleForm.name,
            parentId: this.$refs.tree.getCheckedKeys(),
            brief: that.ruleForm.brief,
            image: that.ruleForm.image
          }
          console.log(form)
          let url = '/api/admin/postcategory/add'
          if (that.id) {
            url = '/api/admin/postcategory/update'
          }
          that.$axios.post(url, form).then(function (res) {
            console.log(`添加ok`)
            if (res.status === 200 && res.data.code === 200) {
              that.$message({type: 'success', message: '添加成功'})
              // 跳转列表页
              that.$router.push({name: 'PostcatecoryList'})
            } else {
              that.$message({type: 'error', message: '添加失败'})
            }
          }).catch(function (err) {
            console.log(`添加err:`)
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
    },
    loadNode (node, resolve) {
      // let that = this
      console.log('active item:')
      console.log(node)
      let that = this
      if (node.level === 0) {
        that.$axios.get('/api/admin/postcategory/getall').then(function (res) {
          if (res.status === 200 && res.data.code === 200) {
            let arr = res.data.data
            that.options = arr.map(function (item) {
              return {name: item.name, _id: item._id, childrenArr: []}
            })
          }
          resolve(that.options)
        })
      }
      if (node.level >= 1) {
        that.$axios.get('/api/admin/postcategory/getsub/' + node.key).then(function (res) {
          let data = []
          if (res.status === 200 && res.data.code === 200) {
            let arr = res.data.data
            console.log(arr)
            data = arr.map(function (item) {
              return {name: item.name, _id: item._id, childrenArr: []}
            })
          }
          resolve(data)
        })
      }
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.el-form {
  max-width: 500px;
}
</style>

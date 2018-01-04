<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="标题" prop="title">
      <el-input v-model="ruleForm.title" class="title"></el-input>
    </el-form-item>
    <el-form-item label="简介" prop="brief">
      <el-input type="textarea" v-model="ruleForm.brief" class="brief"></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="extended">
      <mavon-editor v-model="ruleForm.extended"/>
    </el-form-item>
    <el-form-item label="置顶" prop="top">
      <el-checkbox-group v-model="ruleForm.top">
        <el-checkbox label="是" name="top"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="分类" prop="postcategory">
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
    name: 'PostAdd',
    data () {
      return {
        ruleForm: {
          id: '',
          title: '',
          top: '',
          postcategory: [],
          brief: '',
          extended: '',
          image: ''
        },
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          extended: [
            {required: true, message: '请输入内容', trigger: 'blur'}
          ]
        },
        props: {
          label: 'name',
          children: 'childrenArr',
          isLeaf: 'leaf'
        },
        id: ''
      }
    },
    beforeMount () {
      let that = this
      that.id = that.$route.params._id
      console.log(that.id)
      if (that.id) {
        that.$axios.get('/api/admin/post/get/' + that.id).then(function (res) {
          if (res.status === 200 && res.data.code === 200) {
            console.log(res.data.data)
            that.ruleForm = res.data.data
            that.$refs.tree.setCheckedKeys(res.data.data.postcategoryId)
          }
        })
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          let that = this
          if (valid) {
            let form = {
              id: this.id,
              title: this.ruleForm.title,
              brief: this.ruleForm.brief,
              content: this.ruleForm.content,
              html: this.ruleForm.html,
              top: this.ruleForm.top,
              postcategoryId: this.$refs.tree.getCheckedKeys(),
              image: this.ruleForm.image
            }
            console.log(form)
            let url = '/api/admin/post/add'
            if (this.id) {
              url = '/api/admin/post/update'
            }

            that.$axios.post(url, form).then(function (res) {
              console.log(`查询ok`)
              if (res.status === 200 && res.data.status === 200) {
                that.$message({type: 'success', message: '添加成功'})
                that.$router.push({name: 'PostList'}) // 跳转列表页
              } else {
                that.$message({type: 'error', message: '添加失败'})
              }
            }).catch(function (err) {
              console.log(`查询err: ${err}`)
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title, .brief, .image {
    max-width: 500px;
  }
  .upload-demo{
    max-width: 400px;
  }
</style>

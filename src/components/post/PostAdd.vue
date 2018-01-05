<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="标题" prop="title">
      <el-input v-model="ruleForm.title" class="title"></el-input>
    </el-form-item>
    <el-form-item label="简介" prop="brief">
      <el-input type="textarea" v-model="ruleForm.brief" class="brief"></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <mavon-editor :toolbars="toolbars" default_open="edit" v-model="ruleForm.content" ref="md"/>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-tooltip class="item" effect="light" content="从大到小顺序，默认0" placement="right">
        <el-input-number v-model="ruleForm.sort" :min="0" label="描述文字"></el-input-number>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="状态" prop="status">
        <el-select v-model="ruleForm.status" placeholder="状态">
          <el-option
            v-for="item in optionsStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="分类" prop="postcategoryId">
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
      <el-input v-model="ruleForm.image" class="image" placeholder="图片地址"></el-input>
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
          title: '',
          sort: '',
          postcategoryId: [],
          brief: '',
          content: '',
          image: ''
        },
        rules: {
          title: [
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
        html: '',
        toolbars: {
          bold: true, // 粗体
          // italic: true, // 斜体
          // header: true, // 标题
          // underline: true, // 下划线
          // strikethrough: true, // 中划线
          // mark: true, // 标记
          // superscript: true, // 上角标
          // subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          // imagelink: true, // 图片链接
          // code: true, // code
          // table: true, // 表格
          // fullscreen: true, // 全屏编辑
          // readmodel: true, // 沉浸式阅读
          // htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          // trash: true, // 清空
          // save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          // navigation: true, // 导航目录
          /* 2.1.8 */
          // alignleft: true, // 左对齐
          // aligncenter: true, // 居中
          // alignright: true, // 右对齐
          /* 2.2.1 */
          // subfield: true, // 单双栏模式
          preview: true // 预览
        },
        optionsStatus: [{
          value: 1,
          label: '草稿'
        }, {
          value: 2,
          label: '发布'
        }, {
          value: 3,
          label: '私密'
        }]
      }
    },
    beforeMount () {
      let that = this
      that.id = that.$route.params._id
      if (that.id) {
        that.$axios.get('/api/admin/post/get/' + that.id).then(function (res) {
          if (res.status === 200 && res.data.code === 200) {
            that.ruleForm = res.data.data
            that.$refs.tree.setCheckedKeys(res.data.data.postcategoryId)
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
              html: that.$refs.md.s_markdown.render(that.ruleForm.content),
              title: that.ruleForm.title,
              brief: that.ruleForm.brief,
              content: that.ruleForm.content,
              sort: that.ruleForm.sort,
              status: that.ruleForm.status,
              image: that.ruleForm.image,
              postcategoryId: that.$refs.tree.getCheckedKeys()
            }
            console.log(form)
            let url = '/api/admin/post/add'
            if (this.id) {
              url = '/api/admin/post/update'
            }
            that.$axios.post(url, form).then(function (res) {
              if (res.status === 200 && res.data.code === 200) {
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
  .el-form {
    max-width: 90%;
  }
  .el-tree{
    max-width: 220px;
  }

</style>

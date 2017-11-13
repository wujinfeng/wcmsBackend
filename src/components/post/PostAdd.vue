<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="标题" prop="title">
      <el-input v-model="ruleForm.title" class="title"></el-input>
    </el-form-item>
    <el-form-item label="简介" prop="brief">
      <el-input type="textarea" v-model="ruleForm.brief" class="brief"></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="extended">
      <mavon-editor v-model="value"/>
    </el-form-item>
    <el-form-item label="置顶" prop="top">
      <el-checkbox-group v-model="ruleForm.top">
        <el-checkbox label="是" name="top"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="分类" prop="postcategory">
      <el-checkbox-group v-model="ruleForm.postcategory">
        <el-checkbox label="美食" name="type"></el-checkbox>
        <el-checkbox label="活动" name="type"></el-checkbox>
        <el-checkbox label="活动" name="type"></el-checkbox>
        <el-checkbox label="品牌" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="图片" prop="image">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList2"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
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
          top: '',
          postcategory: [],
          brief: '',
          extended: '',
          image: ''
        },
        value: '', // 编辑器
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ]
        },
        fileList2: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }]
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
            console.log(this.value)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title, .brief {
    max-width: 500px;
  }
  .upload-demo{
    max-width: 400px;
  }
</style>

<template>
    <el-upload
      class="upload"
      action="/api/admin/media/add/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :on-error="uploadError"
      :on-success="uploadSuccess"
      name="image"
      multiple
      :limit="10"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
</template>

<script>
  export default {
    name: 'MediaAdd',
    data () {
      return {
        id: '',
        picname: '',
        fileList: []
      }
    },
    beforeMount () {
      this.id = this.$route.params._id
      console.log(this.id)
    },
    methods: {
      handleRemove (file, fileList) {  // 文件列表移除文件时的钩子
        console.log('handleRemove:')
        console.log(file)
        console.log(fileList)
      },
      handlePreview (file) { // 点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据
        console.log('handlePreview:')
        console.log(file)
      },
      handleExceed (files, fileList) { // 文件超出个数限制时的钩子
        this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      // 上传成功后的回调
      uploadSuccess (response, file, fileList) {
        console.log('上传成功')
        console.log(response)
        console.log(file)
        console.log(fileList)
      },
      // 上传错误
      uploadError (err, file, fileList) {
        console.log('上传失败，请重试！')
        console.log(err)
      },
      beforeUpload (file) {
        let filename = file.name
        let extension = filename.substr(filename.lastIndexOf('.') + 1).toLowerCase()
        let isLt2M = file.size / 1024 / 1024 < 10
        console.log(extension, isLt2M)

        if (!(extension === 'jpg' || extension === 'png')) {
          console.log('图片格式错误!' + extension)
          return false
        }
        if (!isLt2M) {
          console.log('上传模板大小不能超过 10MB!')
          return false
        }
        return true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .upload {
    max-width: 500px;
  }
</style>

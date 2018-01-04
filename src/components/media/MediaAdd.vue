<template>
    <el-upload
      class="upload"
      action="/api/admin/media/add/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
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
      handleRemove  (file, fileList) {  // 文件列表移除文件时的钩子
        console.log('handleRemove:')
        console.log('file')
        console.log(file)
        console.log('fileList')
        console.log(fileList)
        return false
      },
      beforeRemove (file, fileList) {  // 文件列表移除文件前时的钩子
        console.log('beforeRemove:')
        console.log('file')
        console.log(file)
        let that = this
        let id = file.response.data
        let promise = new Promise(function (resolve, reject) {
          that.$axios.get('/api/admin/media/delete/' + id).then(function (res) {
            if (res.status === 200 && res.data.code === 200) {
              that.$message({type: 'success', message: '删除成功'})
              resolve()
            } else {
              that.$message({type: 'error', message: '删除失败'})
              reject(new Error('删除失败'))
            }
          })
        })
        return promise
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
        this.$message({message: '上传成功！', type: 'success'})
        console.log('response:')
        console.log(response)
        console.log('file')
        console.log(file)
        console.log('fileList')
        console.log(fileList)
      },
      // 上传错误
      uploadError (err, file, fileList) {
        this.$message({message: '上传失败，请重试！', type: 'error'})
        console.log(err)
      },
      beforeUpload (file) {
        let isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
        let isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传图片只能是 jpg,png 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
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

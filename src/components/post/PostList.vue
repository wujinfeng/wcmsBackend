<template>
  <div>
    <el-row :gutter="10">
      <el-date-picker
        v-model="publishedDate"
        type="date"
        :editable="false"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        :picker-options="pickerOptions0">
      </el-date-picker>
      <el-input v-model="title" placeholder="标题"></el-input>
      <el-input v-model="author" placeholder="作者"></el-input>
      <el-select v-model="postcatecory" placeholder="分类">
        <el-option label="分类一类" value="1"></el-option>
        <el-option label="分类二类" value="2"></el-option>
      </el-select>
      <el-select v-model="status" placeholder="状态">
        <el-option label="已发布" value="2"></el-option>
        <el-option label="草稿" value="1"></el-option>
        <el-option label="私密" value="3"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
    </el-row>
    <hr>
    <el-table :data="tableData">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="author" label="作者"></el-table-column>
      <el-table-column prop="postcatecory" label="分类"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="ctime" label="日期"></el-table-column>
    </el-table>
    <pagination v-on:getPageData="getTablePageData" :total-num="totalNum"></pagination>
  </div>
</template>

<script>
  export default {
    name: 'PostList',
    data () {
      const item = {
        title: '三国',
        author: '王小虎',
        postcatecory: '科技',
        status: '已发布',
        ctime: '2016-05-02 00:10:20'
      }
      return {
        pickerOptions0: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        tableData: Array(2).fill(item),
        totalNum: 300,
        publishedDate: '',
        title: '',
        author: '',
        postcatecory: '',
        status: ''
      }
    },
    methods: {
      getTablePageData (pagerObj) {
        let currentPage = pagerObj.currentPage
        let pageSize = pagerObj.pageSize
        console.log(currentPage, pageSize)
        const item = {
          title: '三国2',
          author: '王小虎',
          postcatecory: '科技',
          status: '已发布',
          ctime: '2016-05-02 00:10:20'
        }
        this.tableData = Array(6).fill(item)
      },
      search () {
        let params = {
          publishedDate: this.publishedDate,
          title: this.title,
          author: this.author,
          postcatecory: this.postcatecory,
          status: this.status
        }
        console.log(params)
        let that = this
        that.$axios.get('/api/admin/post/list', {params: params}).then(function (res) {
          console.log(`查询ok`)
          if (res.status === 200 && res.data.status === 200) {
            that.tableData = res.data.data
          } else {
            that.tableData = []
          }
        }).catch((error) => {
          console.log(`查询err: ${error}`)
          that.tableData = []
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-input {
    display: inline-block;
    width: 140px;
  }
  .el-select{
    width: 100px;
  }

</style>

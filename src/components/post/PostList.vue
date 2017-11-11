<template>
  <div>
    <date-picker v-on:pick="datePicker"></date-picker>
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
        tableData: Array(2).fill(item),
        totalNum: 300,
        start: '',
        end: ''
      }
    },
    methods: {
      datePicker (date) {
        let [start, end] = date
        this.start = start
        this.end = end
        console.log(this.start, this.end)
      },
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
</style>

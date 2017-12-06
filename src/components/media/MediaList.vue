<template>
  <div>
    <el-row :gutter="10">
      <el-date-picker
        v-model="ctime"
        type="date"
        :editable="false"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="创建日期"
        :picker-options="pickerOptions0">
      </el-date-picker>
      <el-input v-model="title" placeholder="标题"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
    </el-row>
    <hr>
    <el-table :data="tableData">
      <el-table-column prop="address" label="图片"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="brief" label="简介"></el-table-column>
      <el-table-column prop="ctime" label="创建日期"></el-table-column>
      <el-table-column prop="_id" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-on:getPageData="getTablePageData" :total-num="totalNum"></pagination>
  </div>
</template>

<script>
  export default {
    name: 'MediaList',
    data () {
      const item = {
        _id: 'sjkfldsjkf',
        title: '三国',
        brief: '科技',
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
        _id: '',
        title: '',
        brief: '',
        ctime: ''
      }
    },
    methods: {
      getTablePageData (pagerObj) {
        let currentPage = pagerObj.currentPage
        let pageSize = pagerObj.pageSize
        console.log(currentPage, pageSize)
        const item = {
          title: '三国2',
          brief: 'sads',
          ctime: '2016-05-02 00:10:20'
        }
        this.tableData = Array(6).fill(item)
      },
      search () {
        let params = {
          title: this.title,
          ctime: this.ctime
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

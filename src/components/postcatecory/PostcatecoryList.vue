<template>
  <div>
    <el-row :gutter="10">
      <el-input v-model="name" placeholder="分类"></el-input>
      <el-input v-model="fatherName" placeholder="父分类"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
    </el-row>
    <hr>
    <el-table :data="tableData">
      <el-table-column prop="name" label="分类"></el-table-column>
      <el-table-column prop="fatherName" label="父分类"></el-table-column>
      <el-table-column prop="ctime" label="日期"></el-table-column>
       <el-table-column prop="_id" label="操作">
        <template slot-scope="scope">
          <router-link :to="{name:'PostcatecoryAdd',params:{_id: scope.row._id}}">
            <el-button type="primary" size="small">编辑</el-button>
          </router-link>
          <el-button type="danger" size="small" @click="del(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-on:getPageData="getTablePageData" :total-num="totalNum"></pagination>
  </div>
</template>

<script>
  export default {
    name: 'PostcatecoryList',
    data () {
      const item = {
        _id: 'sjkfldsjkf',
        name: '三国',
        fatherName: '王小虎',
        ctime: '2016-05-02 00:10:20'
      }
      return {
        tableData: Array(2).fill(item),
        totalNum: 300,
        _id: 'sjkfldsjkf',
        ctime: '',
        name: '',
        fatherName: ''
      }
    },
    methods: {
      getTablePageData (pagerObj) {
        let currentPage = pagerObj.currentPage
        let pageSize = pagerObj.pageSize
        console.log(currentPage, pageSize)
        const item = {
          name: '三国1',
          fatherName: '王小虎',
          ctime: '2016-05-02 00:10:20'
        }
        this.tableData = Array(6).fill(item)
      },
      search () {
        let params = {
          name: this.name,
          fatherName: this.fatherName
        }
        console.log(params)
        let that = this
        that.$axios.get('/api/admin/postcategory/list', {params: params}).then(function (res) {
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
      },
      del (val) {
        console.log(val)
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
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

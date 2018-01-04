<template>
  <div>
    <el-row :gutter="10">
      <el-input v-model="name" placeholder="分类"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
    </el-row>
    <hr>
    <el-table :data="tableData">
      <el-table-column prop="name" label="分类"></el-table-column>
      <el-table-column prop="parentId" label="父分类">
        <template slot-scope="scope">
          {{scope.row.parentId | contactArr }}
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="日期"></el-table-column>
       <el-table-column prop="_id" label="操作">
        <template slot-scope="scope">
          <router-link :to="{name:'PostcatecoryAdd',params:{_id: scope.row._id}}">
            <el-button type="primary" size="small">编辑</el-button>
          </router-link>
          <el-button type="danger" size="small" @click="del(scope.row._id, scope.$index)">删除</el-button>
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
      return {
        tableData: [],
        totalNum: 0,
        _id: '',
        createdAt: '',
        name: '',
        fatherName: ''
      }
    },
    filters: {
      contactArr: function (arr) {
        if (!arr || !arr.length) {
          return ''
        }
        return arr.map(function (o) {
          return o.name
        }).join('，')
      }
    },
    methods: {
      getTablePageData (pagerObj) {
        let params = {
          name: this.name,
          currentPage: pagerObj.currentPage,
          pageSize: pagerObj.pageSize
        }
        console.log(params)
        let that = this
        that.$axios.get('/api/admin/postcategory/list', {params: params}).then(function (res) {
          console.log(`查询ok`)
          if (res.status === 200 && res.data.code === 200) {
            that.tableData = res.data.data.tableData
            that.totalNum = res.data.data.totalNum
          } else {
            that.tableData = []
            that.totalNum = 0
          }
        }).catch((error) => {
          console.log(`查询err: ${error}`)
          that.tableData = []
          that.totalNum = 0
        })
      },
      search () {
        let params = {name: this.name}
        console.log(params)
        let that = this
        that.$axios.get('/api/admin/postcategory/list', {params: params}).then(function (res) {
          console.log(`查询ok`)
          if (res.status === 200 && res.data.code === 200) {
            that.tableData = res.data.data.tableData
            that.totalNum = res.data.data.totalNum
          } else {
            that.tableData = []
            that.totalNum = 0
          }
        }).catch((error) => {
          console.log(`查询err: ${error}`)
          that.tableData = []
          that.totalNum = 0
        })
      },
      del (val, index) {
        console.log(val)
        let that = this
        that.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$axios.get('/api/admin/postcategory/delete/' + val).then(function (res) {
            if (res.status === 200 && res.data.code === 200) {
              that.tableData.splice(index, 1)
              that.$message({type: 'success', message: '删除成功!'})
            } else {
              that.$message({type: 'error', message: '删除失败'})
            }
          })
        }).catch(() => {
          that.$message({type: 'info', message: '已取消删除'})
        })
      }
    },
    mounted () {
      let that = this
      that.$axios.get('/api/admin/postcategory/list').then(function (res) {
        if (res.status === 200 && res.data.code === 200) {
          that.tableData = res.data.data.tableData
          that.totalNum = res.data.data.totalNum
        }
      })
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

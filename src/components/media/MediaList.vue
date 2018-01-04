<template>
  <div>
    <el-row :gutter="10">
      <el-date-picker
        v-model="createdAt"
        type="date"
        :editable="false"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="创建日期"
        :picker-options="pickerOptions0">
      </el-date-picker>
      <el-input v-model="originalname" placeholder="标题"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
    </el-row>
    <hr>
    <el-table :data="tableData">
      <el-table-column prop="address" label="图片">
        <template slot-scope="scope">
          <a :href="scope.row.relativeDir" target="_blank">
            <img :src="scope.row.address" style="max-width: 100px;height: 50px" />
          </a>
        </template>
      </el-table-column>
      <el-table-column label="目录">
        <template slot-scope="scope">
          {{scope.row.relativeDir + scope.row.filename}}
        </template>
      </el-table-column>
      <el-table-column prop="originalname" label="标题"></el-table-column>
      <el-table-column prop="createdAt" label="创建日期"></el-table-column>
      <el-table-column prop="_id" label="操作">
        <template slot-scope="scope">
          <!--<router-link :to="{name:'MediaAdd',params:{_id: scope.row._id}}">
            <el-button type="primary" size="small">编辑</el-button>
          </router-link>-->
          <el-button type="danger" size="small" @click="del(scope.row._id, scope.$index)">删除</el-button>
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
      return {
        pickerOptions0: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        tableData: [],
        totalNum: 0,
        _id: '',
        originalname: '',
        address: '',
        createdAt: ''
      }
    },
    methods: {
      getTablePageData (pagerObj) {
        let params = {
          originalname: this.originalname,
          createdAt: this.createdAt,
          currentPage: pagerObj.currentPage,
          pageSize: pagerObj.pageSize
        }
        console.log(params)
        let that = this
        that.$axios.get('/api/admin/media/list', {params: params}).then(function (res) {
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
        let params = {
          originalname: this.originalname,
          createdAt: this.createdAt
        }
        console.log(params)
        let that = this
        that.$axios.get('/api/admin/media/list', {params: params}).then(function (res) {
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
          that.$axios.get('/api/admin/media/delete/' + val).then(function (res) {
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
      that.$axios.get('/api/admin/media/list').then(function (res) {
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

  .el-select {
    width: 100px;
  }

</style>

<template>
  <div>
    <el-row :gutter="10">
      <el-date-picker
        v-model="createdAt"
        type="daterange"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions2">
      </el-date-picker>
      <el-input v-model="title" placeholder="标题"></el-input>
      <el-input v-model="author" placeholder="作者"></el-input>
      <el-select v-model="postcategoryId" clearable placeholder="分类">
        <el-option
          v-for="pc in optionsPostcategory"
          :key="pc.value"
          :label="pc.label"
          :value="pc.value">
        </el-option>
      </el-select>
      <el-select v-model="status" clearable placeholder="状态">
        <el-option
          v-for="item in optionsStatus"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
    </el-row>
    <hr>
    <el-table :data="tableData">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="author.username" label="作者"></el-table-column>
      <el-table-column label="分类">
        <template slot-scope="scope">
          {{scope.row.postcategoryId | contactArr }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          {{scope.row.status | getStatus }}
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="日期"></el-table-column>
      <el-table-column prop="_id" label="操作">
        <template slot-scope="scope">
          <router-link :to="{name:'PostAdd',params:{_id: scope.row._id}}">
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
    name: 'PostList',
    data () {
      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        createdAt: '',
        tableData: [],
        totalNum: 0,
        _id: '',
        title: '',
        author: '',
        postcategoryId: '',
        status: '',
        optionsStatus: [{
          value: 1,
          label: '草稿'
        }, {
          value: 2,
          label: '发布'
        }, {
          value: 3,
          label: '私密'
        }],
        optionsPostcategory: []
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
      },
      getStatus: function (num) {
        let text = ''
        if (num === 1) {
          text = '草稿'
        } else if (num === 2) {
          text = '发布'
        } else if (num === 3) {
          text = '私密'
        }
        return text
      }
    },
    methods: {
      getTablePageData (pagerObj) {
        let params = {
          title: this.title,
          currentPage: pagerObj.currentPage,
          pageSize: pagerObj.pageSize
        }
        console.log(params)
        let that = this
        that.$axios.get('/api/admin/post/list', {params: params}).then(function (res) {
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
          createdAt: this.createdAt,
          title: this.title,
          author: this.author,
          postcategoryId: this.postcategoryId,
          status: this.status
        }
        console.log(params)
        let that = this
        that.$axios.get('/api/admin/post/list', {params: params}).then(function (res) {
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
        let that = this
        that.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$axios.get('/api/admin/post/delete/' + val).then(function (res) {
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
      that.$axios.get('/api/admin/post/list').then(function (res) {
        if (res.status === 200 && res.data.code === 200) {
          that.tableData = res.data.data.tableData
          that.totalNum = res.data.data.totalNum
        }
      })
      that.$axios.get('/api/admin/postcategory/all').then(function (res) {
        if (res.status === 200 && res.data.code === 200) {
          that.optionsPostcategory = res.data.data.map(function (o) {
            return {value: o._id, label: o.name}
          })
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

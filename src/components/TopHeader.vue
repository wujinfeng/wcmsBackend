<template>
  <el-header>
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span>{{name}}</span>
  </el-header>
</template>

<script>
export default {
  name: 'TopHeader',
  data () {
    return {
      name: '管理员'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header{
  text-align: right;
  line-height: 60px;
  background-color: #000;
  color: #aaa;
}
</style>

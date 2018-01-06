<template>
  <el-aside width="200px">
    <el-menu :default-openeds="['1']" :router="true" >
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>文章</template>
        <el-menu-item :route="{name: 'PostList'}" index="1-1">文章列表</el-menu-item>
        <el-menu-item :route="{name: 'PostAdd'}" index="1-2">写文章</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>分类目录</template>
        <el-menu-item :route="{name: 'PostcatecoryList'}" index="2-1">分类列表</el-menu-item>
        <el-menu-item :route="{name: 'PostcatecoryAdd'}" index="2-2">添加</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>媒体库</template>
        <el-menu-item :route="{name: 'MediaList'}" index="3-1">媒体列表</el-menu-item>
        <el-menu-item :route="{name: 'MediaAdd'}" index="3-2">添加</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-setting"></i>用户</template>
        <el-menu-item :route="{name: 'UserList'}" index="4-1">用户列表</el-menu-item>
        <el-menu-item :route="{name: 'UserAdd'}" index="4-2">添加</el-menu-item>
        <el-menu-item :route="{name: 'Password'}" index="4-3">修改密码</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'LeftMenu',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<template>
  <el-container>
    <el-header>
      欢迎您：管理员
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">概览</span>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>文章</span>
                </template>
                <el-menu-item index='2-1' >所有文章</el-menu-item>
                <el-menu-item index='2-2' >写文章</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>文章分类</span>
                </template>
                <el-menu-item index="3-1">所有分类</el-menu-item>
                <el-menu-item index="3-2">添加</el-menu-item>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>媒体</span>
                </template>
                <el-menu-item index="4-1">媒体库</el-menu-item>
                <el-menu-item index="4-2">添加</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'app',
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style>
  .el-header, .el-footer {
    background-color: #333;
    color: #cccccc;
    line-height: 60px;
  }

  .el-aside {
    background-color: #34a;
    color: #333;
  }

  .el-main {
    background-color: #ffffff;
    color: #333;
  }





</style>

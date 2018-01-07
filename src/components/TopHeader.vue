<template>
  <el-header>
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link :to="{name:'Password',params:{_id: id}}" tag="span">
            修改密码
            </router-link>
          </el-dropdown-item>
        <el-dropdown-item><span @click="quit">退出</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span>{{username}}</span>
  </el-header>
</template>

<script>
export default {
  name: 'TopHeader',
  data () {
    return {
      id: '',
      username: ''
    }
  },
  methods: {
    quit () {
      sessionStorage.removeItem('id')
      sessionStorage.removeItem('username')
      this.$router.push({name: 'Login'})
    }
  },
  mounted () {
    this.id = sessionStorage.getItem('id')
    this.username = sessionStorage.getItem('username')
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

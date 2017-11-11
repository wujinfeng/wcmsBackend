<template>
  <div class="welcome">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
        msg: '登录成功！' + new Date().toLocaleString()
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

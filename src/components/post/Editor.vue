<template>
  <div id="editor">
    <mavon-editor style="height:100%"></mavon-editor>
  </div>
</template>

<script>
  // Local Registration
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default {
    name: 'Editor',
    components: {
      mavonEditor
    }
  }
</script>

<style scoped>
  #editor {
    margin: auto;
    height: 300px;
  }
</style>

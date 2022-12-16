<template>
  <div>
    <uploadIndex  :fileType="fileType"></uploadIndex>
  </div>
</template>

<script>
import uploadIndex from '@/views/upload/index'
import { reqFileList } from '@/api/file'
export default {
  name: 'bianance_upload',
  data() {
    return {
      fileType:'bianance',
    }
  },
  components: {
    uploadIndex
  },
  methods: {

  },
  mounted() {
  }
}
</script>

<style scoped>

</style>

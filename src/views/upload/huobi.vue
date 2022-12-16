<template>
  <div>
    <uploadIndex :fileType="fileType"></uploadIndex>
  </div>
</template>

<script>
import uploadIndex from '@/views/upload/index'
import { reqFileList } from '@/api/file'

export default {
  name: 'huobi_upload',
  data() {
    return {
      fileType:'huobi',
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

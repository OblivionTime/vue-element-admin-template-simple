<template>
  <div>
    <uploadIndex :fileType="fileType"></uploadIndex>
  </div>
</template>

<script>
import uploadIndex from '@/views/upload/index'
import { reqFileList } from '@/api/file'

export default {
  name: 'okex_upload',
  data() {
    return {
      fileType:'okex',
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

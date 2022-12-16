<template>
  <div style="padding:2rem">
    <div style="margin-bottom: 2em;">
      <el-button type="primary" style="width:120px;" @click="aKeyTreasury">一键入库</el-button>
    </div>
    <div class="box">
      <el-upload :action="fileUp" :auto-upload="true" :on-success="FileSuccess" :on-error="FileError"
        :show-file-list="false" drag multiple>
        <div style="display: flex;flex-direction: column;align-items: center;justify-content: center;height: 100%;">
          <i class="el-icon-upload" style="margin-bottom: 20px;"></i>
          <div class="el-upload__text">拖拽文件到这</div>
        </div>
      </el-upload>
      <el-card class="box-card" v-for="(item, index) in fileList" :key="index">
        <div slot="header" class="clearfix">
          <span>文件详情</span>
        </div>
        <div>
          <div style="margin-top: 10px">
            <label>文件名:</label>
            <span style="white-space:pre-wrap;">&nbsp;&nbsp;{{ item.fileName }}</span>
          </div>
          <div style="margin-top: 10px">
            <div v-if="item.status === 1">
              <label>状态:</label>
              <el-tag type="info" disable-transitions size="small" style="margin-left:10px">未入库
              </el-tag>
            </div>
            <div v-if="item.status === 2">
              <label>状态:</label>
              <el-tag type="success" disable-transitions size="small" style="margin-left:10px">入库中
              </el-tag>
            </div>
            <div v-if="item.status === 3">
              <label>状态:</label>
              <el-tag type="success" disable-transitions size="small" style="margin-left:10px">已入库
              </el-tag>
            </div>
            <div v-if="item.status === 4">
              <label>状态:</label>
              <el-tag type="danger" disable-transitions size="small" style="margin-left:10px">入库失败
              </el-tag>
            </div>
          </div>
        </div>
        <div style="margin-top: 35px">
          <el-button type="primary" icon="el-icon-edit" size="small" round
            @click="loadFile(item.fileName, item.fileType)">入库
          </el-button>
          <el-button type="primary" icon="el-icon-delete" size="small" round
            @click="deleteFile(item.fileName, item.fileType)">删除
          </el-button>
        </div>
      </el-card>
    </div>


  </div>

</template>

<script>
import { fileUpload, reqFileDelete, reqFileImport, reqFileList, postFileloadlist } from '@/api/file'

export default {
  name: 'uploadIndex',
  props: ['fileType'],
  data() {
    return {
      fileUp: '',
      fileList: [],
      timer: ''
    }
  },
  mounted() {
    this.fileUp = fileUpload(this.fileType)
    this.getFileList()
    this.timer = setInterval(() => {
      this.getFileList()
    }, 5000)
  },
  methods: {
    getFileList() {
      reqFileList(this.fileType).then((res) => {
        if (res.code === 20000) {
          this.fileList = res.data
        }
      })
    },
    //文件上传成功
    FileSuccess(res) {
      if (res.code === 20000) {
        this.$message.success("文件上传成功")
      } else {
        this.$message.warning("文件已存在,请勿重复上传")
      }

    },
    FileError(res) {
      this.$message.error("文件上传失败")
    },
    loadFile(fileName, fileType) {
      postFileloadlist(fileName, fileType).then((res) => {
        if (res.code === 20000) {
          this.$message({ message: '导入文件成功', type: 'success' })
        }
      })
      setTimeout(() => {
        this.getFileList()
      }, 100)
    },
    deleteFile(fileName, fileType) {
      reqFileDelete(fileName, fileType).then((res) => {
        if (res.code === 20000) {
          this.$message({ message: '删除文件成功', type: 'success' })
        } else {
          this.$message.error('删除文件失败')
          this.$message.error(res.data.message)
        }
      })
      setTimeout(() => {
        this.getFileList()
      }, 100)
    },
    //一键入库
    aKeyTreasury() {
      let fileList = []
      for (const fileInfo of this.fileList) {
        if (fileInfo.status == 1) {
          fileList.push(fileInfo.fileName)
        }
      }
      if (fileList.length > 0) {
        return this.$message.warning("文件都已入库/入库中")
      }
      this.$message.info("正在导入未入库文件.....")
      postAkeytoimport({ fileList: fileList, fileType: this.fileType })
        .then((res) => {
          if (res.code == 20000) {
            return this.$message.success("导入完成")
          }
        })
    }

  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box {
  display: grid;
  grid-template-columns: repeat(auto-fill, 22.5rem);
  grid-gap: 2.5em;
  margin: 10px 0;
}

.box-card {
  width: 360px;
  z-index: 9999;
  padding-bottom: 1em;
}

.el-card ::v-deep .el-card__header {
  height: 50px;
  background-color: snow;
}

.el-card ::v-deep .el-card__body {
  height: 170px;
  background-color: white;
}

::v-deep .el-upload-dragger {
  height: 230px;
}
</style>

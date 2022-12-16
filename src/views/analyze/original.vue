<template>
  <div>
    <div style="margin: 15px;">
      <el-alert
        title="原始数据"
        type="info"
        description=""
        show-icon
      >
      </el-alert>
      <el-input placeholder="请输入内容" v-model="inputAddress" class="input-with-select" style="margin: 5px;width: 600px">
        <el-select v-model="inputAddressType" slot="prepend" placeholder="请选择" filterable style="width: 130px">
          <el-option label="usdt_trc20" value="1"></el-option>
          <el-option label="tron" value="2"></el-option>
          <el-option label="eth" value="3"></el-option>
          <el-option label="usdt_erc20" value="4"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="searchResults(inputAddress,inputAddressType)"
        ></el-button>
      </el-input>
      <el-button @click="exportData" style="float: right;margin-right: 30px;margin-top: 5px">下载excel</el-button>
    </div>
    <div style="margin: 20px">
      <el-table
        id="out_table"
        :data="tableData"
        style="width: 100%"
        stripe
        border
      >
        <el-table-column
          prop="transactionId"
          label="transactionId"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="fromAddress"
          label="fromAddress"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="toAddress"
          label="toAddress"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          prop="date"
          label="date"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="value"
          label="value"
          align="center"
        >
        </el-table-column>
      </el-table>
    </div>

    <div style="text-align: center">
        <el-pagination
          background
          layout="pager"
          :current-page="page"
          :hide-on-single-page="true"
          :page-size="pageSize"
          :total="countNumber"
          :page-count=1
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>

  </div>
</template>
<script>
import { origin } from '@/api/analyze'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  name: 'original',
  data() {
    return {
      countNumber: 1,
      tableData: [],
      inputAddress: 'TABjBawvyxwMa7gpQSbuhsE6fWyeWghyov',
      direct: 'from',
      inputAddressType: 'usdt_trc20',
      pageSize: 15,
      page: 1
    }
  },
  mounted() {
  },
  methods: {
    searchResults(address, addressType, page = 1) {
      origin(address, addressType, page,this.pageSize).then((res) => {
        console.log(res)
        this.tableData = res.data
        console.log(this.tableData)
        this.countNumber = res.countNumber
      })
    },
    handleCurrentChange(val) {
      this.searchResults(this.inputAddress, this.inputAddressType, val)
    },
    exportData() {
      var vm = this
      var xlsxParam = { raw: true }
      var wb = XLSX.utils.table_to_book(document.querySelector('#out_table'), xlsxParam)
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet-stream' }),
          '数据导出' + '.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    }
  }
}
</script>

<style scoped>
.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

</style>

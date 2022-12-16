<template>
  <div>
    <div style="margin: 15px;">
      <el-alert
        title="输出聚合统计"
        type="info"
        description=""
        show-icon
      >
      </el-alert>
      <el-input placeholder="请输入地址哈希" v-model="inputAddress" class="input-with-select" style="margin: 5px;width: 800px">
        <el-select v-model="inputAddressType" slot="prepend" placeholder="请选择" filterable style="width: 180px">
          <el-option label="usdt_trc20" value="usdt_trc20"></el-option>
          <el-option label="tron" value="tron"></el-option>
          <el-option label="eth" value="eth"></el-option>
          <el-option label="usdt_erc20" value="usdt_erc20"></el-option>
        </el-select>
        <el-select v-model="direct" slot="prepend" placeholder="选择查询方向" filterable style="width: 160px">
          <el-option label="from" value="from"></el-option>
          <el-option label="to" value="to"></el-option>
        </el-select>
        <el-select v-model="day" slot="prepend" placeholder="选择时间范围筛选" filterable style="width: 140px">
          <el-option label="ALL" value=0></el-option>
          <el-option label="过去24小时" value=1></el-option>
          <el-option label="过去7天" value=7></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="searchResults(inputAddress,inputAddressType,direct,day)"
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
          prop="sumValue"
          label="sumValue"
          align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
      </el-table>
      <div style="text-align: center">
        <el-pagination
          background
          layout=" pager"
          :hide-on-single-page="true"
          :page-size=pageSize
          :total=countNumber
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { aggregation } from '@/api/analyze'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  name: 'aggregation',
  data() {
    return {
      tableData: [],
      inputAddress: 'TABjBawvyxwMa7gpQSbuhsE6fWyeWghyov',
      direct: 'from',
      day: 0,
      inputAddressType: 'usdt_trc20',
      countNumber: 1,
      pageSize: 15

    }
  },
  mounted() {
    // this.searchResults(this.inputAddress,this.inputAddressType)
  },
  methods: {
    searchResults(address, addressType, direct, day, page) {
      day=Number(day)
      aggregation(address, addressType, direct, day, page,this.pageSize).then((res) => {
        this.tableData = res.data
        this.countNumber = res.countNumber
      })
    },
    handleCurrentChange(val) {
      this.searchResults(this.inputAddress, this.inputAddressType, this.direct, this.day, val)
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

<style>
.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>

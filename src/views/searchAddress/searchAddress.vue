<template>
  <div>
    <div style="margin: 20px">
      <el-input
        placeholder="请输入内容"
        v-model="address"
        clearable
        style="width: 500px"
      >
        <el-button slot="append" icon="el-icon-search" @click="searchAddress">搜索</el-button>

      </el-input>
    </div>
    <div style="margin: 20px">
      <el-container>
        <el-aside width="200px" style="background: white">
          <div v-for="(value, key) in resultNumber" style="margin: 20px">
            <span v-if="value===0" style="font-size:20px">{{ translateList(key) }} {{ value }}</span>
            <el-link v-else type="primary" style="font-size:20px" @click="searchAddressDetail(key)">
              {{ translateList(key) }}
              {{ value }}
            </el-link>
          </div>
        </el-aside>
        <el-main>
          <div>
            <el-table
              :data="tableList"
              max-height="700px"
              fit
              border
              @sort-change="changeTableSort"
            >
              <!--        v-fit-columns-->

              <template v-for="(col,index) in cols">
                <el-table-column
                  :key="index"
                  :prop="col"
                  :sortable="'custom'"
                  :label="translateList(col)"
                  align="center"
                  min-width="120px"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
              </template>
            </el-table>
            <el-pagination
              background
              align="center"
              layout="prev,total,sizes, pager, next"
              :page-sizes="[10,20,30,40,50]"
              :page-size.sync="limit"
              :total="total"
              :current-page.sync="page"
              @current-change="searchAddressTable"
              @size-change="searchAddressTable"
              :hide-on-single-page="true"
            >
            </el-pagination>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>

</template>

<script>
import { reqSearchAddress, reqSearchAddressDetail } from '@/api/analyze'
import { translate } from '@/utils/dictionaries'

export default {
  name: 'searchAddress',
  data() {
    return {
      resultNumber: {},
      address: 'TCvd8q68ss4B6fhCFp31LDW7SUtYXZgACx',
      tableList: [],
      addressType:'',
      cols: [],
      total: 0,
      page: 1,
      limit: 10,
      orderCol: '',
      order: ''
    }
  },
  methods: {
    searchAddress() {
      reqSearchAddress(this.address).then((res) => {
        if (res.code === 20000) {
          this.resultNumber = res.data
        }
      })
    },
    // 翻译函数
    translateList(text) {
      return translate(text)
    },

    searchAddressDetail(type) {
      this.addressType=type
      this.orderCol=''
      this.order=''
      this.page=1
      this.searchAddressTable()
    },
    searchAddressTable(){
      reqSearchAddressDetail(this.address, this.addressType, this.page, this.limit, this.orderCol, this.order).then((res) => {
        if (res.code === 20000) {
          this.tableList = res.data
          this.cols = Object.keys(this.tableList[0])
          this.page = res.page
          this.total = res.total
          this.limit = res.limit
        }
      })
    },
    changeTableSort(column) {
      var orderCol = column.prop
      var order
      if (column.order === 'ascending') {
        order = 'asc'
      } else if (column.order === 'descending') {
        order = 'desc'
      }
      this.order = order
      this.orderCol = orderCol
      this.searchAddressTable()
    },

  }
}
</script>

<style scoped>

</style>

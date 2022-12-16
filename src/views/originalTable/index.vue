<template>
  <div>
    <div style="margin: 10px">
      <el-cascader
        v-model="tableName"
        :options="TableNameLists"
        :props="{ expandTrigger: 'hover' }"
        @change="changTableResult"
      ></el-cascader>
    </div>
    <div>
      <el-table
        :data="TableLists"
        max-height="700px"
        fit
        border
        @sort-change="changeTableSort"
        style="margin-bottom: 20px;"
      >
        <!--        v-fit-columns-->
        <template v-for="(col,index) in cols">
          <el-table-column
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
        @current-change="getTableLists"
        @size-change="getTableLists"
      >
      </el-pagination>
    </div>
    <!--    <el-button @click="doSomthing()"></el-button>-->
  </div>
</template>
<script>
import { reqFileOriginalTable, reqFileOriginalTableNameList } from '@/api/origionalTable'
import { translate } from '@/utils/dictionaries'
export default {
  name: 'originalTable',
  data() {
    return {
      TableNameLists: [{
        value: 'HuobiRegistrationInformation',
        label: '用户注册信息'
      }],
      tableName: [],
      TableLists: [],
      cols: [],
      total: 0,
      page: 1,
      limit: 10,
      orderCol: '',
      order: ''
    }
  },
  methods: {
    changTableResult() {
      this.orderCol = ''
      this.order = ''
      this.TableLists = []
      this.page = 1
      this.getTableLists()
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
      this.getTableLists()
    },
    doSomthing() {
      console.log(this.tableName)
    },
    getTableLists() {
      reqFileOriginalTable(this.tableName[1], this.page, this.limit, this.orderCol, this.order).then((res) => {
        if (res.code === 20000) {
          this.TableLists = res.data
          this.cols = Object.keys(this.TableLists[0])
          this.page = res.page
          this.total = res.total
          this.limit = res.limit
        }
      })
    },
    gettableNameList() {
      reqFileOriginalTableNameList().then((res) => {
        if (res.code === 20000) {
          this.TableNameLists = res.data
        }
      })
    },
    // 翻译函数
    translateList(text) {
      return translate(text)
    }
  },
  mounted() {
    this.gettableNameList()
  }
}
</script>
<style scoped>
</style>
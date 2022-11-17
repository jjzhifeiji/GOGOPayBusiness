<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom: 10px;">
      <el-input
        v-model="listQuery.name"
        placeholder="姓名/手机号码"
        style="width: 200px;margin-left: 5px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>

    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      row-key="id"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="selectCall"
    >

      <el-table-column label="订单编号" prop="order_no" width="200px" align="center"/>
      <el-table-column label="订单金额" prop="order_amount" width="150px" align="center"/>
      <el-table-column label="商户" prop="business_name" align="center" width="100px"/>
      <el-table-column label="状态" prop="status" width="150px" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="支付类型" prop="pay_type" width="150px" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.pay_type | payTypeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="最近更新时间" prop="update_time" align="center" width="180px"/>
      <el-table-column label="通知状态" prop="notify_status" align="center" width="50px"/>
      <el-table-column label="操作" align="center" width="80px" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />


  </div>
</template>

<script>
import {
  getsCollectOrder
} from '@/api/collect'

import Pagination from '@/components/Pagination'

const status = [
  {id: '1', name: '待接单'},
  {id: '2', name: '已接单'},
  {id: '3', name: '已收款'},
  {id: '4', name: '已超时'}
]

const payType = [
  {id: '1', name: '银行卡'},
  {id: '2', name: '微信'},
  {id: '3', name: '支付宝'},
  {id: '4', name: 'USDT'}
]

const statusFilterKeyValue = status.reduce((acc, cur) => {
  acc[cur.id] = cur.name
  return acc
}, {})

const payTypeFilterKeyValue = payType.reduce((acc, cur) => {
  acc[cur.id] = cur.name
  return acc
}, {})

export default {
  name: 'Collect',
  components: {Pagination},
  filters: {
    statusFilter(key) {
      return statusFilterKeyValue[key]
    },
    payTypeFilter(key) {
      return payTypeFilterKeyValue[key]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      status
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getsCollectOrder(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      }).catch(error => {
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    updateData() {
    },
    handleUpdate(row) {
      console.log(row)
    },
    handleDelete(row) {
      console.log(row)
    },
    checkboxT(row, rowIndex) {
      return true
      // if (row['status'] > 20) {
      //   return false
      // } else {
      //   return true
      // }
    }
  }
}
</script>

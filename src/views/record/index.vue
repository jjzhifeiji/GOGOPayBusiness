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

      <el-date-picker
        v-model="listQuery.start_time"
        value-format="timestamp"
        style="margin-left: 10px;width:150px;"
        placeholder="最近联系时间段"
      />

      <el-date-picker
        v-model="listQuery.end_time"
        value-format="timestamp"
        style="margin-left: 10px;width: 150px;"
        placeholder="最近联系时间段"
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

    <div>
      <el-row :gutter="20">

        <el-col ref="class_customer_list" class="test" :span="6" :xs="24" style="width:100%;">

          <el-table
            v-loading="listLoading"
            :data="list"
            row-key="id"
            border
            fit
            highlight-current-row
            style="margin-top: 5px"
          >

            <el-table-column label="ID" prop="id" width="80px" align="center"/>
            <el-table-column label="变动前" prop="before_amount" width="150px" align="center"/>
            <el-table-column label="变动金额" prop="change_amount" width="150px" align="center"/>
            <el-table-column label="变动后" prop="result_amount" width="150px" align="center"/>
            <el-table-column label="创建时间" prop="create_time" align="center" width="180px"/>
            <el-table-column label="类型" prop="type" align="center" width="150px">
              <template slot-scope="{row}">
                <el-tag>{{ row.type | typeFilter }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="订单编号" prop="order_no" align="center" width="200px"/>
            <el-table-column label="备注" prop="remark" align="center" width="300px"/>

          </el-table>

          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
          />

        </el-col>

      </el-row>
    </div>

  </div>

</template>

<script>
import Pagination from '@/components/Pagination'
import {MessageBox} from 'element-ui'

import {
  getsAmountLog
} from '@/api/business'

const typeStatus = [
  {id: '1', name: '收款'},
  {id: '2', name: '收款手续费'},
  {id: '3', name: '代付'},
  {id: '4', name: '代付手续费'},
  {id: '5', name: '提现'}
]

const typeFilterKeyValue = typeStatus.reduce((acc, cur) => {
  acc[cur.id] = cur.name
  return acc
}, {})

export default {
  name: 'OutOrder',
  // eslint-disable-next-line vue/no-unused-components
  components: {Pagination},
  filters: {
    typeFilter(key) {
      return typeFilterKeyValue[key]
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        start_time: '',
        end_time: '',
        type: '',
        page: 1,
        limit: 20
      },
      userGroup: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getsAmountLog(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>

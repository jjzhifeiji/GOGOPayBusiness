<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom: 10px;">
      <el-input
        v-model="listQuery.name"
        placeholder="关键字"
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
      <el-table-column label="名字" prop="user_name" width="100px" align="center"/>
      <el-table-column label="账户" prop="user_account" width="150px" align="center"/>
      <el-table-column label="状态" prop="status" width="150px" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="type" width="150px" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.type | typeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="收款姓名" prop="pay_name" width="150px" align="center"/>

      <el-table-column label="收款账户" prop="pay_account" align="center" width="250px"/>
      <el-table-column label="更新时间" prop="create_time" align="center" width="200px"/>
<!--      <el-table-column label="收款信息" prop="pay_info" align="center" width="150px"/>-->
      <el-table-column label="备注" prop="remark" align="center" width="150px"/>

      <el-table-column label="操作" align="center" width="400px" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="codePass(row)">
            通过
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            拒绝
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
import Pagination from '@/components/Pagination'
import {getsCollectInfo} from '@/api/collect-info'
import {MessageBox} from "element-ui";

const status = [
  {id: '0', name: '删除'},
  {id: '1', name: '正常'},
  {id: '2', name: '待审核'},
]

const type = [
  {id: '1', name: '银行卡'},
  {id: '2', name: '微信'},
  {id: '3', name: '支付宝'},
  {id: '4', name: 'USDT'}
]

const statusFilterKeyValue = status.reduce((acc, cur) => {
  acc[cur.id] = cur.name
  return acc
}, {})

const typeFilterKeyValue = type.reduce((acc, cur) => {
  acc[cur.id] = cur.name
  return acc
}, {})

const search_type = [
  {key: '', display_name: '无'},
  {key: '1', display_name: '手机号'},
  {key: '2', display_name: '姓名'},
  {key: '3', display_name: '身份证'}
]

export default {
  name: 'Resource',
  components: {Pagination},
  filters: {
    statusFilter(key) {
      return statusFilterKeyValue[key]
    },
    typeFilter(key) {
      return typeFilterKeyValue[key]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        type: undefined,
        status: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getsCollectInfo(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      })
    },
    codePass() {
    },
    handleDelete(row, index) {
      MessageBox.confirm('确认删除？', '删除', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return new Promise((resolve, reject) => {
          this.listLoading = true

        })
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>

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

      <el-select
        v-model="listQuery.name_status"
        placeholder="搜索类型"
        clearable
        class="filter-item"
        style="width: 130px;margin-left: 5px;"
      >
        <el-option
          v-for="item in search_type"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
        />
      </el-select>

      <el-select
        v-model="listQuery.type"
        placeholder="数据类型"
        style="width: 140px;margin-left: 5px;"
        class="filter-item"
      >
        <el-option v-for="item in originalType" :key="item.name" :label="item.name" :value="item.id" />
      </el-select>

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
      <el-table-column
        type="selection"
        width="50"
        :selectable="checkboxT"
      />

      <el-table-column label="姓名" prop="name" width="150px" align="center" />
      <el-table-column label="手机号码" prop="mobile" width="150px" align="center" />
      <el-table-column label="意向度" prop="Intentionality" align="center" width="100px" />
      <!--      <el-table-column label="资源分组" prop="type_desc" align="center" width="100px">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column label="所属团队" prop="type_desc" align="center" width="100px">-->
      <!--      </el-table-column>-->
      <el-table-column label="所有者" prop="user_name" align="center" width="100px" />
      <el-table-column label="最近联系时间" prop="update_time" align="center" width="180px" />

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
import { MessageBox } from 'element-ui'
import { getCustomerList } from '@/api/out-order'
const search_type = [
  { key: '', display_name: '无' },
  { key: '1', display_name: '手机号' },
  { key: '2', display_name: '姓名' },
  { key: '3', display_name: '身份证' }
]
export default {
  name: 'Customer',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      search_type,
      originalType: [],
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        name_status: undefined,
        type: undefined,
        status: undefined
      },
      temp: {
        id: '',
        res_id: '',
        name: '',
        mobile: '',
        card_id: '',
        status: '',
        communication_times: '',
        Intentionality: '',
        is_wechat: '',
        create_time: '',
        update_time: '',
        user_id: '',
        user_name: '',
        user_account: '',
        remark: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getCustomerList(this.listQuery).then(response => {
        this.list = response.items
        this.total = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    selectCall(sels) {
      this.selectData = sels
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    checkboxT(row, rowIndex) {
      if (row['status'] > 20) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

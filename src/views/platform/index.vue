<template>
  <div class="app-container">

    <el-button type="primary" @click="withdrawalDialog()">提现</el-button>

    <el-table>

    </el-table>
    <el-dialog :title="'提现申请'" :visible.sync="dialogWithdrawalVisible">
      <el-form
        ref="dataForm"
        :model="platformWithdrawal"
        label-position="left"
        label-width="70px"
        style="width:auto; margin-left:50px;"
      >
        <div style="width:auto; ">
          金额:
          <el-input
            v-model="platformWithdrawal.amount"
            placeholder="商户名称"
            style="width: 200px;margin-left: 5px;"
          />
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddPlatformVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="AddPlatform()">
          确认
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getsPlatform, addPlatform } from '@/api/platform'

const status = [
  { id: '0', name: '禁用' },
  { id: '1', name: '正常' }
]

const statusFilterKeyValue = status.reduce((acc, cur) => {
  acc[cur.id] = cur.name
  return acc
}, {})

export default {
  name: 'Platform',
  components: { Pagination },
  filters: {
    statusFilter(key) {
      return statusFilterKeyValue[key]
    }
  },
  data() {
    return {
      tableKey: 0,
      platform: {
        amount: '',
        name: ''
      },
      listLoading: true,
      dialogWithdrawalVisible: false,
      platformWithdrawal: {
        amount: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getPlatformInfo().then(response => {
        this.platform = response
        this.listLoading = false
      })
    },
    withdrawalDialog() {
      this.dialogWithdrawalVisible = true
    },
    Withdrawal() {
      withdrawal(this.platformAdd).then(response => {
        this.listLoading = false
        this.dialogWithdrawalVisible = false
        this.getList()
      })
    },
    handleUpdate(row) {
      console.log(row)
    },
    handleDelete(row) {
      console.log(row)
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

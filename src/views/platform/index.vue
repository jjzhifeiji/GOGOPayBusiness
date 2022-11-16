<template>
  <div class="app-container">


    <div>

      <el-form
        ref="dataForm"
        :model="platform"
        label-position="left"
        label-width="70px"
        style="width:auto; margin-left:50px;"
      >
        <div style="width:auto; ">
          <p> 名称:<span v-text="platform.name"></span></p>
          <p> 后台账号:<span v-text="platform.account"></span></p>
          <p> 商户号:<span v-text="platform.platform_sn"></span></p>
          <p> 余额:<span v-text="platform.business_amount"></span>
            <el-button></el-button>
            <el-button style="padding-left: 20px" type="primary" @click="withdrawalDialog()">提现</el-button>
          </p>
          <p> 代收费率:<span v-text="platform.collect_free">/万</span></p>
          <p> 代付费率:<span v-text="platform.out_free">/万</span></p>
          <p> 私钥:<span v-text="platform.private_key"></span></p>
          <!--          <p> 状态:<span v-text="platform.status"></span></p>-->
          <p> 白名单:<span v-text="platform.whitelist"></span></p>

        </div>

      </el-form>
    </div>


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
        <el-button @click="dialogWithdrawalVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="withdrawal()">
          确认
        </el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import {getInfo} from '@/api/business'
import {withdrawal} from '@/api/out-order'

const status = [
  {id: '0', name: '禁用'},
  {id: '1', name: '正常'}
]

const statusFilterKeyValue = status.reduce((acc, cur) => {
  acc[cur.id] = cur.name
  return acc
}, {})

export default {
  name: 'Platform',
  components: {Pagination},
  filters: {
    statusFilter(key) {
      return statusFilterKeyValue[key]
    }
  },
  data() {
    return {
      tableKey: 0,
      platform: {
        id: '',
        name: '',
        account: '',
        business_amount: '',
        collect_free: '',
        out_free: '',
        platform_sn: '',
        private_key: '',
        status: '',
        whitelist: ''
      },
      listLoading: true,
      dialogWithdrawalVisible: false,
      platformWithdrawal:
        {
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
      getInfo().then(response => {
        console.log(response)
        this.platform = response
        this.listLoading = false
      })
    },
    withdrawalDialog() {
      this.dialogWithdrawalVisible = true
    },
    withdrawal() {
      withdrawal(this.platformWithdrawal).then(response => {
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

<template>
  <div class="app-container">

    <div :key="key" style="margin-top:30px;">

      <div>
        <span class="permission-alert">
          商户余额
          <el-tag class="permission-tag" size="small">{{ detail.business_amount }}</el-tag>
        </span>
      </div>
      <div>
        <span class="permission-alert">
          商户编号
          <el-tag class="permission-tag" size="small">{{ detail.platform_sn }}</el-tag>
        </span>
      </div>
      <div>
        <span class="permission-alert">
          名称
          <el-tag class="permission-tag" size="small">{{ detail.name }}</el-tag>
        </span>
      </div>
      <div>
        <span class="permission-alert">
          账号
          <el-tag class="permission-tag" size="small">{{ detail.account }}</el-tag>
        </span>
      </div>
      <div>
        <span class="permission-alert">
          密钥
          <el-tag class="permission-tag" size="small">{{ detail.private_key }}</el-tag>
        </span>
      </div>
      <div>
        <span class="permission-alert">
          白名单
          <el-tag class="permission-tag" size="small">{{ detail.whitelist }}</el-tag>
        </span>
      </div>

      <div>
        <span class="permission-alert">
          银行卡代收费率
          <el-tag class="permission-tag" size="small">{{ detail.bank_collect_val }}/万</el-tag>
        </span>
      </div>

      <div>
        <span class="permission-alert">
          微信代收费率
          <el-tag class="permission-tag" size="small">{{ detail.wx_collect_val }}/万</el-tag>
        </span>
      </div>

      <div>
        <span class="permission-alert">
          支付宝代收费率
          <el-tag class="permission-tag" size="small">{{ detail.ali_collect_val }}/万</el-tag>
        </span>
      </div>

      <div>
        <span class="permission-alert">
          银行卡代付费率
          <el-tag class="permission-tag" size="small">{{ detail.bank_out_free }}/万</el-tag>
        </span>
      </div>

      <div>
        <span class="permission-alert">
          微信代付费率
          <el-tag class="permission-tag" size="small">{{ detail.wx_out_free }}/万</el-tag>
        </span>
      </div>

      <div>
        <span class="permission-alert">
          支付宝代付费率
          <el-tag class="permission-tag" size="small">{{ detail.ali_out_free }}/万</el-tag>
        </span>
      </div>

    </div>

  </div>
</template>


<script>
import Pagination from '@/components/Pagination'
import {MessageBox} from 'element-ui'

import {
  getInfo
} from '@/api/business'


export default {
  name: 'OutOrder',
  // eslint-disable-next-line vue/no-unused-components
  components: {Pagination},
  filters: {},
  data() {
    return {
      detail: [],
      listLoading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getInfo().then(response => {
        this.detail = response
        this.listLoading = false
      })
    }
  }
}
</script>

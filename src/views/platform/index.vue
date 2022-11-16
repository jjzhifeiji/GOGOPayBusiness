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
    <el-button type="primary" @click="addPlatformDialog()">添加商户</el-button>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      row-key="id"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >

      <el-table-column label="ID" prop="id" width="50px" align="center"/>
      <el-table-column label="编号" prop="platform_sn" width="150px" align="center"/>
      <el-table-column label="名称" prop="name" width="100px" align="center"/>
      <el-table-column label="余额" prop="business_amount" width="100px" align="center"/>
      <el-table-column label="代收费率" prop="collect_free" width="100px" align="center"/>
      <el-table-column label="代付费率" prop="out_free" width="100px" align="center"/>
      <el-table-column label="状态" prop="desire" align="center" width="100px">
        <template slot-scope="{row}">
          <el-tag>{{ row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="密钥" prop="private_key" align="center" width="300px"/>
      <el-table-column label="白名单" prop="whitelist" align="center" width="250px"/>

      <el-table-column label="操作" align="center" width="200px" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog :title="'添加商户'" :visible.sync="dialogAddPlatformVisible">
      <el-form
        ref="dataForm"
        :model="platformAdd"
        label-position="left"
        label-width="70px"
        style="width:auto; margin-left:50px;"
      >
        <div style="width:auto; ">
          商户名称:
          <el-input
            v-model="platformAdd.name"
            placeholder="商户名称"
            style="width: 200px;margin-left: 5px;"
          />
        </div>
        <div style="width:auto; margin-top: 10px">
          代收费率/万:
          <el-input
            v-model="platformAdd.collect_free"
            oninput="value=value.replace(/[^0-9.]/g,'')"
            placeholder="代收费率"
            style="width: 200px;margin-left: 5px;"
          />
        </div>

        <div style="width:auto; margin-top: 10px">
          代付费率/万:
          <el-input
            v-model="platformAdd.out_free"
            oninput="value=value.replace(/[^0-9.]/g,'')"
            placeholder="代付费率"
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
import {getsPlatform, addPlatform} from '@/api/platform'


const status = [
  {id: '0', name: '禁用'},
  {id: '1', name: '正常'},
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
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        type: undefined,
        status: undefined
      },
      dialogAddPlatformVisible: false,
      platformAdd: {
        name: '',
        collect_free: '',
        out_free: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getsPlatform(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      })
    },
    addPlatformDialog() {
      this.dialogAddPlatformVisible = true
    },
    AddPlatform() {
      addPlatform(this.platformAdd).then(response => {
        this.listLoading = false
        this.dialogAddPlatformVisible = false
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

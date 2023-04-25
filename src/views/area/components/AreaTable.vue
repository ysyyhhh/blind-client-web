<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" /> -->
      <el-select v-model="listQuery.level" placeholder="行政级别" clearable style="width: 130px" class="filter-item">
        <el-option v-for="item in options.level" :key="item" :value="item" />
      </el-select>

      <el-select v-model="listQuery.fullName" placeholder="区域名称" clearable style="width: 130px" class="filter-item">
        <el-option v-for="item in options.fullName" :key="item" :value="item" />
      </el-select>
      <!-- <el-input v-model="listQuery.fullName" placeholder="区域名称" clearable style="width: 130px" class="filter-item" /> -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Filter
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row

      style="width: 100%;text-align:center"
    >
      <el-table-column label="区域编号" prop="id" align="center" min-width="10%">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区域全称" align="center" min-width="30%">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.fullName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="行政级别" align="center" min-width="10%">
        <template slot-scope="{row}">
          <span> {{ row.level }}</span>
          <!-- <el-tag>{{ row.location }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column label="检测总数" min-width="10%" align="center">
        <template slot-scope="{row}">
          <span>{{ row.obstacleCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="待处理总数" min-width="10%" align="center">
        <template slot-scope="{row}">
          <span>{{ row.unprocessedObstacleCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订阅情况" align="center" min-width="10%" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.isSubscribed!=1" size="mini" type="success" @click="handleModifyStatus(row,1)">
            订阅
          </el-button>
          <el-button v-if="row.isSubscribed!=0" size="mini" @click="handleModifyStatus(row,0)">
            取消订阅
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { createArticle } from '@/api/article'
import { updateObstacle } from '@/api/obstacle'
import { getMySubscribedAreaList, subscribeArea, unSubscribeArea, getOptions } from '@/api/area'
import { isAdmin } from '@/utils/auth'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { parseTime } from '@/utils'

export default {
  name: 'AreaTable',
  components: { Pagination },
  directives: { waves },
  filters: {
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        level: undefined,
        fullName: undefined
        // processingStatus: undefined,
        // processingStartTime: undefined,
        // processingEndTime: undefined,
        // discoveryStartTime: undefined,
        // discoveryEndTime: undefined,
        // processorId: undefined
        // sort: '+id'
      },
      options: {
        level: [],
        fullName: []
      },
      temp: {
        // id: undefined,
        // importance: 1,
        // remark: '',
        // timestamp: new Date(),
        // title: '',
        // type: '',
        // status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        // title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
    this.myGetOptions()
  },
  methods: {
    setValueNull(val) {
      this.value_ = null
    },
    myGetOptions() {
      getOptions().then(response => {
        console.log(response)
        this.options.level = response.data.level
        this.options.fullName = response.data.fullName
        // this.options.fullName = response.data.processorOptions
      })
    },
    setUndefined() {
      if (this.listQuery.level === '') {
        this.listQuery.level = undefined
      }
      if (this.listQuery.fullName === '') {
        this.listQuery.fullName = undefined
      }
    },
    getList() {
      console.log(this.listQuery)
      console.log(this.listQuery)

      // this.listLoading = true
      getMySubscribedAreaList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data.list
        this.total = response.data.total
        console.log(this.list)
        console.log(this.total)
        // Just to simulate the time of the request
        // setTimeout(() => {
        //   this.listLoading = false
        // }, 1)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.setUndefined()
      this.getList()
    },
    handleModifyStatus(row, status) {
      console.log(row)
      const data = {
        'areaId': row.id
      }
      if (status == 0) { // 取消订阅
        unSubscribeArea(data).then(response => {
          console.log(response)
          if (response.code != 1) {
            this.$message({
              message: '取消订阅失败',
              type: 'error'
            })
            return
          }
          this.$message({
            message: '取消订阅成功',
            type: 'success'
          })
          this.getList()
        })
      } else {
        subscribeArea(data).then(response => {
          console.log(response)
          if (response.code != 1) {
            this.$message({
              message: '订阅失败',
              type: 'error'
            })
            return
          }
          this.$message({
            message: '订阅成功',
            type: 'success'
          })
          this.getList()
        })
      }
    },
    handleUpdate(row) {
      // console.log(isAdmin())
      if (!isAdmin()) return
      this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    setNull() {
      if (this.temp.area == '') {
        this.temp.area = null
      }
      if (this.temp.type == '') {
        this.temp.type = null
      }
      if (this.temp.processingStatus == '') {
        this.temp.processingStatus = null
      }
      if (this.temp.processorId === '') {
        this.temp.processorId = null
      }
      if (this.temp.discoveryTime == '') {
        this.temp.discoveryTime = null
      }
      if (this.temp.processingTime == '') {
        this.temp.processingTime = null
      }
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.setNull()
          const tempData = Object.assign({}, this.temp)
          tempData.discoveryTime = parseTime(tempData.discoveryTime, '{y}-{m}-{d} {h}:{i}:{s}')
          tempData.processingTime = parseTime(tempData.processingTime, '{y}-{m}-{d} {h}:{i}:{s}')
          // parseTime(tempData., '{y}-{m}-{d} {h}:{i}:{s}')
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateObstacle(tempData).then(() => {
            // const index = this.list.findIndex(v => v.id === this.temp.id)
            // this.list.splice(index, 1, this.temp)
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'successx',
        duration: 2000
      })
      this.list.splice(index, 1)
    }
  }
}
</script>

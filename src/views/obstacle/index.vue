<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" /> -->
      <el-select v-model="listQuery.area" placeholder="所属区域" clearable style="width: 130px" class="filter-item">
        <el-option v-for="item in options.area" :key="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="类型" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in options.type" :key="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.processingStatus" placeholder="处理状态" clearable style="width: 140px" class="filter-item">
        <el-option v-for="item in options.status" :key="item" :value="item" :label="`${item}` == `0`?'未处理':'已处理'" />
      </el-select>
      <el-select v-model="listQuery.processorId" placeholder="处理人员" clearable style="width: 140px" class="filter-item">
        <el-option v-for="item in options.processor" :key="item.processorId" :value="item.processorId" :label="`${item.realName}`+ `, ` +`${item.processorId}` " />
      </el-select>
      发现:
      <el-date-picker
        v-model="listQuery.discoveryStartTime"
        clearable
        style="width:135px"
        type="date"
        placeholder="开始日期"
      />
      -
      <el-date-picker
        v-model="listQuery.discoveryEndTime"
        clearable
        style="width:135px"
        type="date"
        placeholder="结束日期"
      />
      处理:
      <el-date-picker
        v-model="listQuery.processingStartTime"
        clearable
        style="width:135px"
        type="date"
        placeholder="开始日期"
      />
      -
      <el-date-picker
        v-model="listQuery.processingEndTime"
        clearable
        style="width:135px"
        type="date"
        placeholder="结束日期"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Filter
      </el-button>
      <!--
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button> -->
      <!-- <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox> -->
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" align="center" min-width="5%">
        <template slot-scope="{row}">
          <router-link :to="{path: '/obstacleDetail/index', query: {obstacleId:row.id }}">
            <span>{{ row.id }}</span>
          </router-link>
          <!-- <span>{{ row.id }}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="type" min-width="10%" align="center">
        <template slot-scope="{row}">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="location" min-width="20%">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.location }}</span>
          <!-- <el-tag>{{ row.location }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column label="discoveryTime" min-width="10%" align="center">
        <template slot-scope="{row}">
          <span>{{ row.discoveryTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="image" min-width="10%">
        <template slot-scope="{row}">
          <img :src="row.imagePath" class="meta-item__icon">
        </template>
      </el-table-column>
      <el-table-column label="processingTime" min-width="10%" align="center">
        <template slot-scope="{row}">
          <span>{{ row.processingTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="processor" min-width="10%" align="center">
        <template slot-scope="{row}">
          <span>{{ row.realName }} {{ row.processorId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="processingStatus" min-width="10%" align="center">
        <template slot-scope="{row}">
          <span>{{ row.processingStatus == 1?'已处理':'未处理' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" min-width="15%" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.processingStatus!=1" size="mini" type="success" @click="handleModifyStatus(row,1)">
            处理
          </el-button>
          <el-button v-if="row.processingStatus!=0" size="mini" @click="handleModifyStatus(row,0)">
            撤销处理
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Type" prop="type">
          <el-select v-model="temp.type" class="filter-item" clearable placeholder="Please select">
            <el-option v-for="item in options.type" :key="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="location" prop="location">
          <el-select v-model="temp.location" class="filter-item" clearable placeholder="Please select">
            <el-option v-for="item in options.area" :key="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="discoveryTime" prop="timestamp">
          <el-date-picker v-model="temp.discoveryTime" type="datetime" clearable placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="processingTime" prop="timestamp" :rules="temp.processorId?[{required: true, message: '请输入处理时间', trigger: 'blur'}]:[{required:false}]">
          <el-date-picker v-model="temp.processingTime" type="datetime" clearable placeholder="Please pick a date" />
        </el-form-item>

        <el-form-item label="processor" prop="title" :rules="temp.processingTime?[{required: true, message: '请输入处理人', trigger: 'blur'}]:[{required:false}]">
          <!-- <el-input v-model="temp.processor" /> -->
          <el-select v-model="temp.processorId" class="filter-item" clearable placeholder="Please select">
            <el-option v-for="item in options.processor" :key="item.processorId" :value="item.processorId" :label="`${item.realName}`" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createArticle } from '@/api/article'
import { getObstacleList, updateObstacleProcessingStatus, getOptions, updateObstacle } from '@/api/obstacle'
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
        area: undefined,
        type: undefined,
        processingStatus: undefined,
        processingStartTime: undefined,
        processingEndTime: undefined,
        discoveryStartTime: undefined,
        discoveryEndTime: undefined,
        processorId: undefined
        // sort: '+id'
      },
      options: {
        area: [],
        type: [],
        status: [0, 1],
        processor: []
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
        this.options.area = response.data.locationOptions
        this.options.processor = response.data.processorOptions
        this.options.type = response.data.typeOptions
      })
    },
    setUndefined() {
      if (this.listQuery.area == '') {
        this.listQuery.area = undefined
      }
      if (this.listQuery.type == '') {
        this.listQuery.type = undefined
      }
      if (this.listQuery.processingStatus === '') {
        this.listQuery.processingStatus = undefined
      }
      if (this.listQuery.processorId == '') {
        this.listQuery.processorId = undefined
      }
      if (this.listQuery.discoveryStartTime == '') {
        this.listQuery.discoveryStartTime = undefined
      }
      if (this.listQuery.discoveryEndTime == '') {
        this.listQuery.discoveryEndTime = undefined
      }
      if (this.listQuery.processingStartTime == '') {
        this.listQuery.processingStartTime = undefined
      }
      if (this.listQuery.processingEndTime == '') {
        this.listQuery.processingEndTime = undefined
      }
    },
    getList() {
      console.log(this.listQuery)
      this.setUndefined()
      if (this.listQuery.discoveryStartTime != undefined) {
        this.listQuery.discoveryStartTime = new Date(new Date(this.listQuery.discoveryStartTime.toLocaleDateString()).getTime())
        if (this.listQuery.discoveryEndTime == undefined) {
          this.listQuery.discoveryEndTime = this.listQuery.discoveryStartTime
        }
      }
      if (this.listQuery.discoveryEndTime != undefined) {
        this.listQuery.discoveryEndTime = new Date(new Date(this.listQuery.discoveryEndTime.toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
      }
      if (this.listQuery.processingStartTime != undefined) {
        this.listQuery.processingStartTime = new Date(new Date(this.listQuery.processingStartTime.toLocaleDateString()).getTime())
        if (this.listQuery.processingEndTime == undefined) {
          this.listQuery.processingEndTime = this.listQuery.processingStartTime
        }
      }
      if (this.listQuery.processingEndTime != undefined) {
        this.listQuery.processingEndTime = new Date(new Date(this.listQuery.processingEndTime.toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
      }
      // this.listLoading = true
      getObstacleList(this.listQuery).then(response => {
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
      this.getList()
    },
    handleModifyStatus(row, status) {
      console.log(row)
      const data = {
        'obstacleId': row.id,
        'newStatus': status
      }
      updateObstacleProcessingStatus(data).then(response => {
        console.log(response)
        if (response.code != 1) {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
          return
        }
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.getList()
      })
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
      if (this.temp.processingStatus === '') {
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

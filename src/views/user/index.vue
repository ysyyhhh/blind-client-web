<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" /> -->

      <el-input v-model="listQuery.search" placeholder="用户名/手机号/姓名" style="width: 130px;" class="filter-item" />

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-download" @click="handleAdd">
        Add
      </el-button>
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
      <el-table-column label="ID" prop="id" align="center" width="80px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.id }}</span>
          <!-- <span>{{ row.id }}</span> -->
        </template>
      </el-table-column>

      <el-table-column label="phone" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.phoneNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="username" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
          <!-- <el-tag>{{ row.location }}</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column label="realName" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.realName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="type" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.userType!='admin'" size="mini" type="success" @click="modifyType(row,'admin')">
            设为管理
          </el-button>
          <el-button v-else size="mini" @click="modifyType(row,'user')">
            撤销管理
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
        <el-form-item label="phone" prop="phoneNumber">
          <el-input v-model="temp.phoneNumber" :disabled="dialogStatus!='create'" />
        </el-form-item>
        <el-form-item label="username" prop="username">
          <el-input v-model="temp.username" />
        </el-form-item>
        <el-form-item label="realName" prop="realName">
          <el-input v-model="temp.realName" />
        </el-form-item>
        <el-form-item label="password" prop="realName">
          <el-input v-model="temp.password" type="password" />
        </el-form-item>
        <!-- <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item> -->
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
import { updateObstacleProcessingStatus, getOptions, updateObstacle } from '@/api/obstacle'
import { isAdmin } from '@/utils/auth'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { parseTime } from '@/utils'
import { deleteUser, updateUser, addUser, getUserListByQuery, modifyUserType } from '@/api/user'
import { encryptPassword } from '@/utils/auth'

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
        search: ''
        // sort: '+id'
      },
      options: {
        area: [],
        type: [],
        status: [0, 1],
        processor: []
      },
      temp: {
        phoneNumber: '',
        username: '',
        realName: '',
        password: ''
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
  },
  methods: {

    getList() {
      console.log(this.listQuery)
      // this.listLoading = true
      getUserListByQuery(this.listQuery).then(response => {
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
    modifyType(row, status) {
      console.log(row)
      const data = {
        'userId': parseInt(row.id),
        'userType': status
      }
      modifyUserType(data).then(response => {
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

    async updateData() {
      console.log(this.temp)
      var tempData = Object.assign({}, this.temp)
      if (tempData.password == '' || tempData.password == null) {
        delete tempData.password
      } else {
        var encodeData = await encryptPassword(tempData.phoneNumber, tempData.password)
        tempData.password = encodeData
      }
      console.log(tempData)
      updateUser(tempData).then(response => {
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
        this.dialogFormVisible = false
      })
    },
    handleAdd() {
      // console.log(isAdmin())
      if (!isAdmin()) return
      // this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    async createData() {
      console.log(this.temp)
      var tempData = Object.assign({}, this.temp)
      var encodeData = await encryptPassword(tempData.phoneNumber, tempData.password)
      tempData.password = encodeData
      addUser(tempData).then(response => {
        console.log(response)
        if (response.code != 1) {
          this.$message({
            message: '添加失败',
            type: 'error'
          })
          return
        }
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.getList()
        this.dialogFormVisible = false
      })
    },
    handleDelete(row, index) {
      deleteUser(row.id).then(response => {
        console.log(response)
        if (response.code != 1) {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
          return
        }
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.list.splice(index, 1)
      })
      // this.$notify({
      //   title: 'Success',
      //   message: 'Delete Successfully',
      //   type: 'successx',
      //   duration: 2000
      // })
      // this.list.splice(index, 1)
    }
  }
}
</script>

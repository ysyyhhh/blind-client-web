<template>
  <div>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              数据源总数
            </div>
            <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="message" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              运行中
            </div>
            <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              总计障碍物数量
            </div>
            <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="addDataSource">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="shopping" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text" @click="addDataSource">
              新增数据源
            </div>
            <!-- <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" /> -->
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <!-- <el-col v-for="(item,i) in list" span="6" style="padding-right:8px;margin-bottom:30px;"> -->
      <el-col v-for="(item) in list" :key="item.id" :span="6" :offset="1">
        <card :data-source="item" @edit="handleUpdate" />
      </el-col>
      <!-- <el-col span="6" style="padding-right:8px;margin-bottom:30px;">
        <card />
      </el-col>
      <el-col span="6" style="padding-right:8px;margin-bottom:30px;">
        <card />
      </el-col>
      <el-col span="6" style="padding-right:8px;margin-bottom:30px;">
        <card />
      </el-col> -->
      <!-- <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <card />
      </el-col> -->
    </el-row>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit="4" @pagination="getList" />
    <el-dialog width="800px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px;">
        <el-form-item label="运行状态" prop="phoneNumber">
          <el-input v-model="temp.status" />
        </el-form-item>
        <el-form-item label="类型" prop="username">
          <el-input v-model="temp.type" />
        </el-form-item>
        <el-form-item label="描述" prop="username">
          <el-input v-model="temp.description" />
        </el-form-item>
        <el-form-item v-if="dialogStatus!='create'" label="Token" prop="token">
          <el-input v-model="temp.token" disabled />

          <!-- <span v-text="temp.token" /> -->
          <el-button type="primary" @click="getDatsSourceToken(temp.id)">获取数据源token</el-button>
          <el-button
            v-if="temp.token"
            type="text"
            size="small"
            icon="el-icon-copy-document"
            @click="copy(temp.token)"
          />
        </el-form-item>
      </el-form>
      <div style="text-align: right;">
        <el-button v-if="dialogStatus!='create'" type="warning" @click="deleteData()">
          删除
        </el-button>
        <!-- <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button> -->
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>

      </div>

      <el-card v-if="dialogStatus != 'create'">
        <div>
          待处理数据列表
          <!-- <div style="text-align: right;">
            <el-switch
              v-model="value2"
              style="right:0px;"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
            AI自动处理
          </div> -->
        </div>
        <raw-table :list="rawImageList" />
      </el-card>
    </el-dialog>
  </div>

</template>

<script>
import CountTo from 'vue-count-to'
import Card from './components/Card'
import Pagination from '@/components/Pagination'
import RawTable from './components/RawTable'
import { getRawImageList, getDatsSourceToken, getDataSourceList, addDataSource, deleteDataSource, updateDataSource } from '@/api/dataSource'
import RawTableVue from './components/RawTable.vue'
export default {

  name: 'Profile',
  components: {
    CountTo, Card, Pagination, RawTable
  },
  data() {
    return {
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      total: 10,
      listQuery: {
        page: 1,
        limit: 5
      },
      list: [],
      dataSourceList: [],
      temp: {
        id: 1,
        number: 0,
        runtime: 10,
        status: '',
        type: '',
        token: ''
      },
      rawImageList: [],
      dialogStatus: 'update',
      dialogFormVisible: false
    }
  },

  created() {
    // this.getUser()
    this.initDataSourceList()
  },
  mounted() {

  },
  methods: {
    getRawImageList() {
      getRawImageList(this.temp.id).then(res => {
        this.rawImageList = res.data
        // http://127.0.0.1:9000/datasource-1/2023-04-15_17-42-52_125.16516-151.1561.jpg
        // for (let i = 0; i < res.data.length; i++) {
        //   const url = res.data[i]
        //   console.log(url)
        //   const arr = url.split('/')
        //   var endUrl = arr[arr.length - 1]
        //   const endArr = endUrl.split('_')
        //   var date = endArr[0] + ' ' + endArr[1].replaceAll('-', ':')
        //   var gps = endArr[2].replace('.jpg', '').split('-')
        //   var tmp = {
        //     url: url,
        //     date: date,
        //     gps: gps
        //   }
        //   this.rawImageList.push(tmp)
        // }
      })
    },
    deleteData() {
      deleteDataSource(this.temp.id).then(res => {
        console.log(res)
        this.dialogFormVisible = false
        this.initDataSourceList()
      })
    },
    initDataSourceList() {
      getDataSourceList().then(res => {
        this.dataSourceList = res.data
        this.total = res.data.length
        this.getList()
      })
    },
    copy(data) {
      const url = data
      const oInput = document.createElement('input')
      oInput.value = url
      document.body.appendChild(oInput)
      oInput.select() // 选择对象;
      document.execCommand('Copy') // 执行浏览器复制命令  如果页面是选择好了直接只用执行这一行代码就可以在浏览器里复制上
      // this.$modal.msgSuccess('复制成功')
      this.$message({
        message: '复制成功',
        type: 'success'
      })
      oInput.remove()
    },
    createData() {
      addDataSource(this.temp).then(res => {
        console.log(res)
        // this.dialogFormVisible = false
        if (res.code === 1) {
          this.$message({
            message: '创建成功',
            type: 'success'
          })

          this.dialogFormVisible = false
          this.initDataSourceList()
        } else {
          this.$message({
            message: '创建失败',
            type: 'error'
          })
        }
      })
    },
    updateData() {
      updateDataSource(this.temp).then(res => {
        console.log(res)
        // this.dialogFormVisible = false
        if (res.code === 1) {
          this.$message({
            message: '更新成功',
            type: 'success'
          })

          this.dialogFormVisible = false
          this.initDataSourceList()
        } else {
          this.$message({
            message: '更新失败',
            type: 'error'
          })
        }
      })
    },
    getDatsSourceToken(id) {
      console.log('获取token ' + id)
      getDatsSourceToken(id).then(res => {
        console.log(res)
        // this.temp.token = res.data
        this.$set(this.temp, 'token', res.data)
        console.log(this.temp)
      })
    },
    handleUpdate(item) {
      // console.log(isAdmin())
      // if (!isAdmin()) return
      this.temp = Object.assign({}, item) // copy obj
      console.log(this.temp)
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.getRawImageList()
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    addDataSource() {
      this.temp = Object.assign({}) // copy obj
      console.log(this.temp)
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    getList() {
      this.list = this.dataSourceList.slice((this.listQuery.page - 1) * this.listQuery.limit, this.listQuery.page * this.listQuery.limit)
    }

  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>

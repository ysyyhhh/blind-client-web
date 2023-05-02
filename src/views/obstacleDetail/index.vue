<template>
  <div class="app-container">
    <div>
      <el-row :gutter="30">

        <el-col :span="7" :xs="24">
          <!-- <user-card :user="user" /> -->
          <el-card style="margin-bottom:20px;">
            <div slot="header" class="clearfix">
              <span>缩略图</span>
            </div>
            <div class="user-profile">
              <div class="box-center">
                <!-- <pan-thumb :image="'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'+'?imageView2/1/w/80/h/80'" :height="'100px'" :width="'100px'" :hoverable="false">
                   -->
                <img :src="obstacle.imagePath" style="width:100%;height:100%">
                <!-- </pan-thumb> -->
              </div>
              <div class="box-center">
                <div>具体位置</div>
                <div class="text-center">{{ obstacle.longitude }} , {{ obstacle.latitude }} </div>
                <!-- <div class="user-role text-center text-muted">{{ user.userType }}</div> -->

              </div>
            </div>

          </el-card>
          <el-card v-if="isAdmin" style="margin-bottom:20px;">
            <div slot="header" class="clearfix">
              <span>职责内人员列表</span>
              <el-button size="small" type="primary" @click="showAddUserDialog">添加人员</el-button>
            </div>
            <el-table
              :data="userList"
              border

              highlight-current-row
              style="width: 100%; font-size:12px;"
            >
              <el-table-column label="手机号" align="center" width="110px" :show-overflow-tooltip="true">
                <template slot-scope="{row}">
                  <span>{{ row.phoneNumber }}</span>
                </template>
              </el-table-column>
              <el-table-column label="姓名" width="80px">
                <template slot-scope="{row}">
                  <span>{{ row.realName }}</span>
                  <!-- <el-tag>{{ row.data.location }}</el-tag> -->
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150px" align="center">
                <template slot-scope="{row}">
                  <!-- <span>1</span> -->
                  <el-button size="mini" type="primary" @click="deleteUser(row.id)">删除</el-button>
                  <el-button size="mini" @click="informUser(row.id)">通知</el-button>

                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>

        <el-col :span="17" :xs="24">
          <el-card>
            <div slot="header" class="clearfix">
              <span>基本信息</span>
            </div>
            <el-form ref="form" :model="obstacle" label-width="120px">
              <el-row>
                <el-col :span="12" class="lightgreen-box">
                  <el-form-item label="编号">
                    <el-input v-model="obstacle.id" disabled />
                  </el-form-item>

                </el-col>
                <el-col :span="12" class="orange-box">
                  <el-form-item label="类型">
                    <el-input v-model="obstacle.type" :disabled="!isAdmin" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="lightgreen-box">
                  <el-form-item label="所属区域">
                    <el-select v-model="obstacle.location" style="width:100%" placeholder="please select your zone" :disabled="!isAdmin">
                      <el-option v-for="item in options.area" :key="item.fullName" :value="item.fullName" :label="item.fullName" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="orange-box">
                  <el-form-item label="发现时间">
                    <el-date-picker v-model="obstacle.discoveryTime" :disabled="!isAdmin" type="date" placeholder="Pick a date" style="width: 100%;" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="处理情况">
                <!-- <el-col :span="12" class="lightgreen-box"> -->
                {{ obstacle.processingStatus==1?'已处理':'未处理' }}
                <!-- </el-col> -->

                <el-button v-if="obstacle.processingStatus!=1" size="mini" type="success" @click="modifyStatus(1)">
                  处理
                </el-button>
                <el-button v-if="obstacle.processingStatus!=0" size="mini" @click="modifyStatus(0)">
                  撤销处理
                </el-button>
              </el-form-item>

              <!-- <el-form-item v-if="obstacle.processingStatus==1" label="Activity name">
                <el-input v-model="form.name" />
              </el-form-item> -->
              <el-row v-if="obstacle.processingStatus==1 && isAdmin">
                <el-col :span="12" class="lightgreen-box">
                  <el-form-item label="处理人员">
                    <el-select v-model="obstacle.processorId" placeholder="please select your zone">
                      <el-option v-for="item in options.processor" :key="item.id" :value="item.id" :label="`${item.realName}`" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="orange-box">
                  <el-form-item label="处理时间">
                    <el-date-picker v-model="obstacle.processingTime" type="date" placeholder="Pick a date" style="width: 100%;" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item v-if="isAdmin">
                <el-button type="primary" @click="onSave">Save</el-button>
                <el-button @click="onReset">Reset</el-button>
              </el-form-item>
            </el-form>

          </el-card>
          <!-- <el-card style="margin-bottom:20px;">
            <div slot="header" class="clearfix">
              <span>图像数据</span>
            </div>

          </el-card> -->
        </el-col>

      </el-row>
    </div>

    <el-dialog :visible.sync="isShowAddUserDialog">
      <div slot="header" class="clearfix">
        <span>职责外人员列表</span>
        <el-button size="small" type="primary" @click="showAddUserDialog">添加人员</el-button>
      </div>
      <el-table
        :data="unUserList"
        border
        fit
        highlight-current-row
        style="width: 100%; font-size:12px;"
      >
        <el-table-column label="手机号" align="center" style="width:50%" :show-overflow-tooltip="true">
          <template slot-scope="{row}">
            <span>{{ row.phoneNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" style="width:20%">
          <template slot-scope="{row}">
            <span>{{ row.realName }}</span>
            <!-- <el-tag>{{ row.data.location }}</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column label="操作" style="width:30%" align="center">
          <template slot-scope="{row}">
            <!-- <span>1</span> -->
            <el-button size="mini" type="primary" @click="assignUser(row.id)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="isShowAddUserDialog = false">
          Cancel
        </el-button>
        <el-button type="primary">
          Confirm
        </el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { assignResponsibility, deleteResponsibility, getUserListByNotObstacleId, getUserListByObstacleId, getObstacleDetail, updateObstacleProcessingStatus } from '@/api/obstacle'
import { getAreaList, updateObstacle } from '@/api/area'
import { getUserList } from '@/api/user'
import { addMessage } from '@/api/message'
import { isAdmin } from '@/utils/auth'
export default {
  name: 'Profile',
  components: { },
  data() {
    return {
      options: {
        processor: [],
        area: []
      },
      isShowAddUserDialog: false,
      isAdmin: isAdmin(),
      unUserList: [],
      userList: [],
      form: {
      },
      obstacle: {
        'id': 1, 'type': 'Type 1',
        'location': '北京市-北京市-朝阳区',
        'discoveryTime': '2023-04-02',
        'processingTime': '2023-04-03',
        'processingStatus': 1, 'processorId': 5,
        'imagePath': 'image1.png',
        'latitude': 39.963839,
        'longitude': 116.444657
      },
      obstacleId: 0,
      myUser: {},
      activeTab: 'account'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'user'
    ])
  },

  created() {
    // this.getUser()
  },
  mounted() {
    this.obstacleId = this.$route.query.obstacleId
    this.initObstacle()
    if (this.isAdmin) {
      this.initUserList()
      this.getOptions()
    }
    // getObstacleDetail(this.obstacleId).then(res => {
    // //   console.log(res)
    //   this.obstacle = res.data
    // })
  },
  methods: {
    onReset() {
      this.initObstacle()
    },
    onSave() {
      console.log(this.obstacle)
      updateObstacle(this.obstacle).then(response => {
        // console.log(res)
        if (response.code != 1) {
          this.$message({
            message: '保存失败',
            type: 'error'
          })
          return
        }
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      })
    },
    getOptions() {
      if (!this.isAdmin) return
      console.log('getOptions')
      // console.log(this.options)
      getAreaList().then(res => {
        this.options.area = res.data
      })
      getUserList().then(res => {
        this.options.processor = res.data
      })
    },
    informUser(userId) {
      console.log('informuser')
      const data = {
        'userId': parseInt(userId),
        'obstacleId': parseInt(this.obstacleId)
      }
      addMessage(data).then(response => {
        console.log(response)
        if (response.code != 1) {
          this.$message({
            message: '已通知过了',
            type: 'error'
          })
          return
        }
        this.$message({
          message: '通知成功',
          type: 'success'
        })
      })
    },
    assignUser(userId) {
      assignResponsibility(userId, this.obstacleId).then(res => {
        console.log(res)
        this.initUnUserList()
        this.initUserList()
      })
    },
    deleteUser(userId) {
      deleteResponsibility(userId, this.obstacleId).then(res => {
        console.log(res)
        this.initUnUserList()
        this.initUserList()
      })
    },
    showAddUserDialog() {
      console.log('showAddUserDialog')
      this.isShowAddUserDialog = true
      this.initUnUserList()
    },
    initUnUserList() {
      if (!isAdmin) return
      getUserListByNotObstacleId(this.obstacleId).then(res => {
        //   console.log(res)
        this.unUserList = res.data
      })
    },
    initUserList() {
      if (!isAdmin) return
      getUserListByObstacleId(this.obstacleId).then(res => {
        //   console.log(res)
        this.userList = res.data
      })
    },
    initObstacle() {
      getObstacleDetail(this.obstacleId).then(res => {
        //   console.log(res)
        this.obstacle = res.data
      })
    },
    modifyStatus(status) {
      // console.log(row)
      const data = {
        'obstacleId': this.obstacle.id,
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
        this.initObstacle()
        // this.getList()
      })
    }
    // getUser() {
    //   // this.user = {
    //   //   name: this.name,
    //   //   role: this.roles.join(' | '),
    //   //   email: 'admin@test.com',
    //   //   avatar: this.avatar
    //   // }

    //   this.myUser = this.user
    //   console.log('myUser')
    //   console.log(this.myUser)
    //   console.log(this.name)
    // }
  }
}
</script>

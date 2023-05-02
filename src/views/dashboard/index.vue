<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div>
    <el-tooltip class="item" effect="dark" content="admin权限显示" placement="top-start">
      <el-button v-permission="['admin']">admin</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="admin&editor权限都能显示" placement="top-start">
      <el-button v-permission="['admin','user']">editor</el-button>
    </el-tooltip>

    <router-link :to="{path: '/obstacleDetail/index', query: {obstacleId:'1' }}">
      <button>跳转</button>
    </router-link> -->

    <div class="left-bar">
      <div>
        <div style="padding-top:20px;padding-left:20px;">
          <!-- <el-input style="width:220px"> -->
          <!-- <select id="" name="" /> -->
          <el-select v-model="listQuery.fullName" placeholder="区域名称" clearable style="width: 250px" class="filter-item" @change="initLeft">
            <el-option v-for="item in options.fullName" :key="item" :value="item" />
          </el-select>
          <!-- </el-input> -->
        </div>
        <el-row>
          <el-col :span="12">
            <el-card style="margin:15px;height:390px;">

              <div style="font-size:18px;margin-bottom:35px;margin-top:10px;">障碍物数量统计</div>
              <el-table
                style="height:100%;width:100%;text-align:center"
                :data="tableData"
              >
                <el-table-column prop="date" label="" min-width="25%">
                  <template slot-scope="{row}">
                    {{ row.date || '暂无' }}
                  </template>
                </el-table-column>
                <el-table-column prop="number" label="数值" min-width="25%">
                  <!-- <template slot-scope="{row}">
                    {{ row.number || '暂无' }}
                  </template> -->
                </el-table-column>
                <el-table-column prop="tb" label="同比(%)" min-width="25%">
                  <template slot-scope="{row}">
                    {{ row.tb || '暂无' }}
                  </template>
                </el-table-column>
                <el-table-column prop="hb" label="环比(%)" min-width="25%">
                  <template slot-scope="{row}">
                    {{ row.hb || '暂无' }}
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card style="margin:15px">
              <div style="margin-bottom:10px;">
                <span style="font-size:18px;margin-right:30px">分类</span>

                <el-date-picker v-model="classBegData" size="10px" style="width:160px" placeholder="开始时间" @change="initClass" /> -
                <el-date-picker v-model="classEndData" placeholder="结束时间" style="width:160px" @change="initClass" />
              </div>
              <div style="height:300px"><pie-chart height="100%" width="100%" :pie-data="pieData" /></div>

            </el-card>
          </el-col>
        </el-row>
        <el-row style="height:350px">
          <el-col :span="24">
            <el-card style="margin:15px;height:300px;">
              <div style="font-size:18px;margin-bottom:10px;margin-top:10px">障碍物检测&处理</div>
              <div style="height:230px">
                <line-marker height="100%" width="100%" :weeks="weeks" :discovery="discoveryData" :processing="processingData" />
              </div>
            </el-card>
          </el-col>
          <!-- <el-col :span="12">
            <el-card style="margin:15px">
              数据源情况
              <el-row>
                <el-col :span="12">
                  <div style="margin-top:20px;text-align:center">
                    <div style="font-size:20px;color:#66ccff"> 100 </div>
                    <div style="font-size:12px;">  无人车总数 </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div style="margin-top:20px;text-align:center">
                    <div style="font-size:20px;color:#66ccff"> 100 </div>
                    <div style="font-size:12px;">  无人车总数 </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div style="margin-top:20px;text-align:center">
                    <div style="font-size:20px;color:#66ccff"> 100 </div>
                    <div style="font-size:12px;">  无人车总数 </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div style="margin-top:20px;text-align:center">
                    <div style="font-size:20px;color:#66ccff"> 100 </div>
                    <div style="font-size:12px;">  无人车总数 </div>
                  </div>
                </el-col>

              </el-row>

            </el-card>
          </el-col> -->

        </el-row>
      </div>
    </div>
    <div class="right-bar">
      <div><total-card /></div>
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import TotalCard from './components/TotalCard.vue'
import LineChart from './components/left/LineChart.vue'
import LineMarker from './components/left/LineMarker.vue'
import PieChart from './components/left/PieChart.vue'
import { getOptions } from '@/api/area'

import { getObstacleStatistics, getObstacleTypeByDate, getObstacleCountByDate } from '@/api/dashboard'

export default {
  name: 'Dashboard',
  components: { TotalCard, PieChart, LineChart, LineMarker },
  directives: { permission }, // 自定义指令
  data() {
    return {
      weeks: [],
      discoveryData: [],
      processingData: [],
      pieData: [],
      listQuery: {
        fullName: ''
      },
      classBegData: '',
      classEndData: '',
      options: {
        level: [],
        fullName: []
      },
      tableData: [{
        date: '今日发现',
        number: 155,
        tb: 30,
        hb: -10
      }, {
        date: '本周发现',
        number: 155,
        tb: 30,
        hb: -10
      }, {
        date: '本月发现',
        number: 155,
        tb: 30,
        hb: -10
      }, {
        date: '今年发现',
        number: 155,
        tb: 30,
        hb: -10
      }]
    }
  },
  created() {
    this.myGetOptions()
    this.initLeft()
  },
  methods: {
    /*
    0: {num: 0}
num: 0
1: {num: 0, tb: -100}
num: 0
tb: -100
2: {num: 0, hb: -100}
hb: -100
num: 0
3: {num: 20}
num: 20
    */
    initLeft() {
      this.initStatistics()
      this.initClass()
      this.initWeek()
    },
    initStatistics() {
      console.log(this.listQuery.fullName)
      getObstacleStatistics(this.listQuery.fullName).then(response => {
        console.log(response)
        for (let i = 0; i < response.data.length; i++) {
          this.tableData[i].number = response.data[i].num
          this.tableData[i].tb = response.data[i].tb
          this.tableData[i].hb = response.data[i].hb
        }
      })
    },
    initWeek() {
      const weeks = []
      const discoveryNum = []
      const processingNum = []
      // 获取最近7天的日期 YYYY-MM-DD
      for (let i = 0; i < 7; i++) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        const year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        weeks.push(year + '-' + month + '-' + day)
        discoveryNum.push(0)
        processingNum.push(0)
      }
      console.log(weeks)

      getObstacleCountByDate(this.listQuery.fullName).then(response => {
        console.log(response)
        // this.lineData = response.data
        response.data.forEach(element => {
          const index = weeks.indexOf(element.date)
          if (index !== -1) {
            if (element.status === 'discovery') {
              discoveryNum[index] = element.count
            } else {
              processingNum[index] = element.count
            }
          }
        })
        this.weeks = weeks
        this.discoveryData = discoveryNum
        this.processingData = processingNum
        // discoveryNum[0] = 10
        console.log(weeks)
        console.log(discoveryNum)
        console.log(processingNum)
      })
    },
    initClass() {
      // [
      //         { value: 320, name: 'Industries' },
      //         { value: 240, name: 'Technology' },
      //         { value: 149, name: 'Forex' },
      //         { value: 100, name: 'Gold' },
      //         { value: 59, name: 'Forecasts' }
      //       ]
      console.log(this.classBegData, this.classEndData)
      let searchBegin = this.classBegData
      let searchEnd = this.classEndData
      if (searchBegin === '') {
        searchBegin = '1999-01-01'
      }
      if (searchEnd === '') {
        searchEnd = '9999-12-31'
      }
      getObstacleTypeByDate(this.listQuery.fullName, searchBegin, searchEnd).then(response => {
        console.log(response)
        this.pieData = Object.assign([])
        for (let i = 0; i < response.data.length; i++) {
          const obj = {}
          obj.value = response.data[i].count
          obj.name = response.data[i].type
          this.pieData.push(obj)
          // this.pieData[i].value = response.data[i].num
          // this.pieData[i].name = response.data[i].type
        }
        console.log(this.pieData)
      })
    },
    myGetOptions() {
      getOptions().then(response => {
        console.log(response)
        this.options.level = response.data.level
        this.options.fullName = response.data.fullName
        // this.options.fullName = response.data.processorOptions
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.left-bar {
  float: left;
  width: 66%;
  height: 100%;
  position: absolute;
  overflow: auto;
  background-color: azure;
}
.right-bar {
  // margin-top: -190px;
  float: right;
  right: 0px;
  width: 33%;
  height: 100%;
  position: absolute;
  overflow: auto;
  background-color: antiquewhite;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

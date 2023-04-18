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
        <div style="padding:10px">
          <el-input style="width:220px">
            <select id="" name="" />
          </el-input></div>
        <el-row>
          <el-col :span="12">
            <el-card style="margin:15px;height:300px;">
              <div style="font-size:18px;margin-bottom:10px">障碍物数量统计</div>
              <el-table
                style="height:100%;width:100%;text-align:center"
                :data="tableData"
              >
                <el-table-column prop="date" label="" min-width="25%" />
                <el-table-column prop="number" label="数值" min-width="25%" />
                <el-table-column prop="yoy" label="同比(%)" min-width="25%" />
                <el-table-column prop="qoq" label="环比(%)" min-width="25%" />
              </el-table>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card style="margin:15px;height:300px;">
              <div style="font-size:18px;margin-bottom:10px">障碍物检测&处理</div>
              <div style="height:230px">
                <line-marker height="100%" width="100%" />
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row style="height:600px">
          <el-col :span="12">
            <el-card style="margin:15px">
              <div style="margin-bottom:10px;">
                <span style="font-size:18px;margin-right:30px">分类</span>

                <el-date-picker size="10px" style="width:130px" placeholder="开始时间" /> -
                <el-date-picker placeholder="结束时间" style="width:130px" />
              </div>
              <div style="height:300px"><pie-chart height="100%" width="100%" /></div>

            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card style="margin:15px">
              数据源情况
              <el-row>
                <el-col :span="12">
                  <!-- <el-card> -->
                  <div style="margin-top:20px;text-align:center">
                    <div style="font-size:20px;color:#66ccff"> 100 </div>
                    <div style="font-size:12px;">  无人车总数 </div>
                  </div>
                  <!-- </el-card> -->
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
          </el-col>
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
export default {
  name: 'Dashboard',
  components: { TotalCard, LineChart, PieChart, LineMarker },
  directives: { permission }, // 自定义指令
  data() {
    return {
      tableData: [{
        date: '今日发现',
        number: 155,
        yoy: 30,
        qoq: -10
      }, {
        date: '本周发现',
        number: 155,
        yoy: 30,
        qoq: -10
      }, {
        date: '本月发现',
        number: 155,
        yoy: 30,
        qoq: -10
      }, {
        date: '今年发现',
        number: 155,
        yoy: 30,
        qoq: -10
      }]
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
